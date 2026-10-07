/**
 * Post-build prerender.
 *
 * Vite emits one empty shell for every route, so a crawler that does not run
 * JavaScript would see an empty <div id="root"> on /services/*. This script
 * serves dist/ with SPA fallback, drives headless Chrome over the DevTools
 * Protocol, waits for each route to hydrate, then writes the rendered DOM back
 * out as a real static HTML file at the same path.
 *
 * No extra dependencies: it uses Node's built-in http/fs and the global
 * WebSocket (Node 22+). If no browser is listening on the CDP port it warns
 * and exits 0 so an ordinary `npm run build` still succeeds. Set
 * PRERENDER_STRICT=1 to turn that warning into a build failure.
 *
 * Usage: node scripts/prerender.mjs   (also runs as `npm run postbuild`)
 */

import http from 'node:http'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const CDN = process.env.CDP_URL ?? 'http://127.0.0.1:9222'
const STRICT = process.env.PRERENDER_STRICT === '1'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

/** Service slugs come from the config, so a new service needs no edit here. */
function readServiceIds() {
  const src = fs.readFileSync(path.join(ROOT, 'src/config/businessConfig.js'), 'utf8')
  const block = src.slice(src.indexOf('services: ['))
  const end = block.indexOf('\n  // why us')
  const ids = [...block.slice(0, end > 0 ? end : block.length).matchAll(/^\s{6}id: '([^']+)'/gm)]
  return ids.map((m) => m[1])
}

/**
 * Standalone page paths come from secondaryNavigation in the config, so the
 * prerender list, the router and the navbar menu cannot drift apart.
 */
function readSecondaryPaths() {
  const src = fs.readFileSync(path.join(ROOT, 'src/config/businessConfig.js'), 'utf8')
  const block = src.slice(src.indexOf('secondaryNavigation: ['))
  const end = block.indexOf('\n  ],')
  const paths = [
    ...block.slice(0, end > 0 ? end : block.length).matchAll(/href: '(\/[^']+)'/g),
  ]
  return paths.map((m) => m[1])
}

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0])
    let file = path.join(DIST, urlPath)

    // Guard against path traversal before touching the filesystem.
    if (!file.startsWith(DIST)) file = path.join(DIST, 'index.html')

    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      const asIndex = path.join(file, 'index.html')
      file = fs.existsSync(asIndex) ? asIndex : path.join(DIST, 'index.html')
    }

    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    fs.createReadStream(file).pipe(res)
  })

  return new Promise((resolve, reject) => {
    // Port 0 lets the OS pick a free port, so a stray server on a fixed port
    // cannot fail the build.
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })
}

async function connect() {
  const list = await (await fetch(`${CDN}/json/list`)).json()
  const page = list.find((t) => t.type === 'page')
  if (!page) throw new Error('no debuggable page target')

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  const pending = new Map()
  let id = 0

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
    }
  })

  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', () => reject(new Error('CDP socket failed')), { once: true })
  })

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const msgId = ++id
      pending.set(msgId, resolve)
      ws.send(JSON.stringify({ id: msgId, method, params }))
    })

  const evaluate = async (expression) => {
    const res = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    if (res.result?.exceptionDetails) {
      throw new Error(JSON.stringify(res.result.exceptionDetails).slice(0, 300))
    }
    return res.result?.result?.value
  }

  return { ws, send, evaluate }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Waits until the route has an h1 and no pending Suspense fallback. */
async function waitForHydration(evaluate) {
  for (let i = 0; i < 60; i++) {
    const ready = await evaluate(`(() => {
      const root = document.getElementById('root');
      if (!root || root.children.length === 0) return false;
      if (document.querySelector('[aria-busy="true"]')) return false;
      if (!document.querySelector('h1')) return false;
      if (!document.title) return false;
      return true;
    })()`)
    if (ready) {
      // Let reveal animations settle so captured markup is not mid-transition.
      await sleep(350)
      return true
    }
    await sleep(150)
  }
  return false
}

async function prerenderRoute(route, port, send, evaluate) {
  await send('Page.navigate', { url: `http://127.0.0.1:${port}${route}` })
  await sleep(500)
  const ready = await waitForHydration(evaluate)
  if (!ready) return { route, ok: false, bytes: 0 }

  const html = await evaluate(`(() => {
    // Drop the runtime "js" marker before serialising. It is re-added by the
    // inline head script on every real page load, so leaving it in the static
    // file would hide the scroll-reveal content for visitors without
    // JavaScript. Any is-visible picked up by the observer during the capture is
    // stripped too, so the saved markup is exactly the pre-hydration state React
    // expects and nothing mismatches on the next load.
    document.documentElement.classList.remove('js');
    document
      .querySelectorAll('.reveal.is-visible')
      .forEach((el) => el.classList.remove('is-visible'));
    return document.documentElement.outerHTML;
  })()`)

  // "/" is dist/index.html and "/404.html" is the static-host not-found
  // document; every other route becomes <route>/index.html so plain static
  // servers resolve it without any rewrite rule.
  const outFile =
    route === '/'
      ? path.join(DIST, 'index.html')
      : route === '/404.html'
        ? path.join(DIST, '404.html')
        : path.join(DIST, route.replace(/^\//, ''), 'index.html')

  await fsp.mkdir(path.dirname(outFile), { recursive: true })
  await fsp.writeFile(outFile, `<!doctype html>\n${html}`, 'utf8')

  return { route, ok: true, bytes: Buffer.byteLength(html) }
}

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('prerender: dist/index.html not found - run vite build first')
    process.exit(STRICT ? 1 : 0)
  }

  const routes = [
    '/',
    ...readServiceIds().map((id) => `/services/${id}`),
    ...readSecondaryPaths(),
    // Static hosts (GitHub Pages, Netlify, Cloudflare Pages) serve this file
    // for unknown URLs, so the styled 404 works without JavaScript or rewrites.
    '/404.html',
  ]
  const { server, port } = await startServer()

  let client
  try {
    client = await connect()
  } catch (err) {
    server.close()
    const msg = `prerender: could not reach Chrome at ${CDN} (${err.message}) - SPA routes were NOT prerendered`
    if (STRICT) {
      console.error(msg)
      process.exit(1)
    }
    console.warn(`${msg}\nprerender: start Chrome with --remote-debugging-port=9222 or set PRERENDER_STRICT=1 to fail the build`)
    return
  }

  const { ws, send, evaluate } = client
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })

  console.log(`prerender: ${routes.length} routes`)
  let failed = 0

  for (const route of routes) {
    const result = await prerenderRoute(route, port, send, evaluate)
    if (!result.ok) {
      failed++
      console.warn(`  FAIL  ${route}  (never hydrated)`)
    } else {
      console.log(`  ok    ${route}  ${(result.bytes / 1024).toFixed(1)} kB`)
    }
  }

  ws.close()
  server.close()

  if (failed) {
    console.error(`prerender: ${failed} route(s) failed`)
    process.exit(STRICT ? 1 : 0)
  }
}

main().catch((err) => {
  console.error('prerender crashed:', err)
  process.exit(1)
})