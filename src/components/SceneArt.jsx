import { useId } from 'react'

// Original, dependency-free industrial illustrations. Every gallery / hero image
// on this site is drawn here as SVG, so the site ships with crisp artwork at any
// resolution and zero external assets. Each scene variant maps to an `art`
// value in BUSINESS_CONFIG.gallery.

const PALETTES = {
  day: {
    skyTop: '#0B1526',
    skyMid: '#1B2C46',
    skyLow: '#33455F',
    glow: '#F59E0B',
    glowOpacity: 0.5,
    ground: '#0A101C',
    groundTop: '#16233A',
    haze: '#94A3B8',
    machine: '#F59E0B',
    machineDark: '#B4740A',
    body: '#F8FAFC',
    bodyShade: '#CBD5E1',
    accent: '#38BDF8',
    light: '#FFF7E0',
  },
  dusk: {
    skyTop: '#0A0F1E',
    skyMid: '#1E293B',
    skyLow: '#5B3F2E',
    glow: '#FBBF24',
    glowOpacity: 0.62,
    ground: '#080C15',
    groundTop: '#131C2E',
    haze: '#64748B',
    machine: '#FBBF24',
    machineDark: '#A16207',
    body: '#F1F5F9',
    bodyShade: '#94A3B8',
    accent: '#F59E0B',
    light: '#FFF1D0',
  },
  night: {
    skyTop: '#05080F',
    skyMid: '#0B1220',
    skyLow: '#16233A',
    glow: '#93C5FD',
    glowOpacity: 0.28,
    ground: '#04070D',
    groundTop: '#0E1725',
    haze: '#334155',
    machine: '#F59E0B',
    machineDark: '#B4740A',
    body: '#E2E8F0',
    bodyShade: '#64748B',
    accent: '#38BDF8',
    light: '#BAE6FD',
  },
  indoor: {
    skyTop: '#0E1626',
    skyMid: '#1C2A40',
    skyLow: '#2B3C56',
    glow: '#F59E0B',
    glowOpacity: 0.3,
    ground: '#0A101C',
    groundTop: '#18243A',
    haze: '#94A3B8',
    machine: '#F59E0B',
    machineDark: '#B4740A',
    body: '#F1F5F9',
    bodyShade: '#94A3B8',
    accent: '#38BDF8',
    light: '#FEF3C7',
  },
}

/** Distant industrial skyline silhouette. */
function Skyline({ p, seed = 0 }) {
  const towers = [
    { x: 6, w: 20, h: 46 },
    { x: 30, w: 13, h: 66 },
    { x: 47, w: 26, h: 38 },
    { x: 78, w: 16, h: 58 },
  ]
  return (
    <g opacity="0.5" fill={p.skyTop}>
      {towers.map((t, i) => (
        <g key={i} transform={`translate(${t.x + seed}, 92)`}>
          <rect x="0" y={-t.h} width={t.w} height={t.h} />
          <rect x={t.w / 2 - 2} y={-t.h - 12} width="4" height="12" />
          {i % 2 === 0 && <rect x="4" y={-t.h + 8} width="4" height="4" fill={p.accent} opacity="0.6" />}
        </g>
      ))}
    </g>
  )
}

/** Smokestacks with drifting smoke. */
function Stacks({ p, x = 150, y = 92, scale = 1 }) {
  return (
    <g opacity="0.55">
      {[0, 14, 30].map((dx, i) => (
        <g key={i} transform={`translate(${x + dx}, ${y}) scale(${scale})`}>
          <path d="M0 0 L4 -54 L12 -54 L16 0 Z" fill={p.skyTop} />
          <ellipse cx="8" cy="-62" rx="14" ry="7" fill={p.haze} opacity="0.28" />
          <ellipse cx="20" cy="-70" rx="18" ry="8" fill={p.haze} opacity="0.18" />
        </g>
      ))}
    </g>
  )
}

/** Hatched ground plane with a safety line. */
function Ground({ p, y = 118 }) {
  return (
    <g>
      <rect x="0" y={y} width="400" height={200 - y} fill={p.groundTop} />
      <rect x="0" y={y} width="400" height="3" fill={p.haze} opacity="0.35" />
      <path
        d={`M0 ${y + 16} H400`}
        stroke={p.machine}
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeDasharray="16 14"
      />
      <path
        d={`M0 ${y + 34} H400`}
        stroke={p.haze}
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeDasharray="8 10"
      />
    </g>
  )
}

/** Small background human figure for scale. */
function Figure({ x, y, p, color }) {
  return (
    <g transform={`translate(${x}, ${y})`} fill={color ?? p.haze} opacity="0.85">
      <circle cx="0" cy="-22" r="4" />
      <rect x="-4" y="-18" width="8" height="12" rx="3" />
      <rect x="-4" y="-6" width="3" height="8" rx="1.5" />
      <rect x="1" y="-6" width="3" height="8" rx="1.5" />
    </g>
  )
}

/** Stacked steel / material bundles. */
function SteelStack({ x, y, rows = 3, p }) {
  return (
    <g>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: 5 }).map((__, c) => (
          <rect
            key={`${r}-${c}`}
            x={x + c * 17 - r * 8}
            y={y - r * 8}
            width="15"
            height="6"
            rx="1.5"
            fill={c % 2 === 0 ? p.bodyShade : p.haze}
            opacity="0.85"
          />
        )),
      )}
    </g>
  )
}

/** Shared scene chrome: sky, sun glow, skyline, ground. */
function Backdrop({ p, uid, children, glow = true, ground = true, extra }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skyTop} />
          <stop offset="55%" stopColor={p.skyMid} />
          <stop offset="100%" stopColor={p.skyLow} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity={p.glowOpacity} />
          <stop offset="70%" stopColor={p.glow} stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.groundTop} />
          <stop offset="100%" stopColor={p.ground} />
        </linearGradient>
      </defs>

      <rect width="400" height="200" fill={`url(#${uid}-sky)`} />
      {glow && <ellipse cx="305" cy="58" rx="120" ry="86" fill={`url(#${uid}-glow)`} />}
      <Skyline p={p} />
      {extra}
      {ground && <Ground p={p} />}
      {children}
    </>
  )
}

// Crane sub-drawings

/** Truck chassis + wheels, shared by all crane scenes. */
function Chassis({ x, y, p, width = 92, wheelR = 9 }) {
  const wheels = [x + 18, x + 26, x + width - 20, x + width - 6]
  return (
    <g>
      <rect x={x} y={y} width={width} height="10" rx="3" fill={p.bodyShade} />
      <rect x={x + width - 34} y={y - 26} width="34" height="30" rx="5" fill={p.machine} />
      <rect x={x + width - 30} y={y - 22} width="20" height="13" rx="2.5" fill="#0F172A" opacity="0.72" />
      {wheels.map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={y + 14} r={wheelR} fill="#0B1220" />
          <circle cx={cx} cy={y + 14} r={wheelR * 0.42} fill={p.haze} opacity="0.8" />
        </g>
      ))}
    </g>
  )
}

/** Rotating crane house with boom, hook block and sling. */
function Boom({
  x,
  y,
  p,
  length = 150,
  angle = -34,
  thickness = 11,
  hookDrop = 46,
  load,
  house = true,
}) {
  return (
    <g>
      {house && (
        <g>
          <circle cx={x} cy={y} r="17" fill={p.machine} />
          <circle cx={x} cy={y} r="17" fill="none" stroke={p.machineDark} strokeWidth="2" opacity="0.5" />
          <rect x={x - 7} y={y - 7} width="14" height="14" rx="2" fill="#0F172A" opacity="0.65" />
        </g>
      )}
      <g transform={`rotate(${angle} ${x} ${y})`}>
        <rect x={x} y={y - thickness / 2} width={length} height={thickness} rx="4" fill={p.machine} />
        <rect
          x={x + 12}
          y={y - thickness / 2 - 4}
          width={length - 20}
          height="4"
          rx="2"
          fill={p.machineDark}
          opacity="0.55"
        />
        {[0.45, 0.72].map((t, i) => (
          <rect
            key={i}
            x={x + length * t}
            y={y + thickness / 2}
            width="3"
            height={hookDrop * (1 - t * 0.35)}
            fill={p.haze}
            opacity="0.75"
          />
        ))}
        <circle
          cx={x + length * 0.72}
          cy={y + thickness / 2 + hookDrop * (1 - 0.72 * 0.35)}
          r="4"
          fill={p.accent}
        />
      </g>
      {load}
    </g>
  )
}

/** Suspended load: slings + block + payload. */
function SuspendedLoad({ x, y, w = 44, h = 26, p, payloadColor, hookLen = 0 }) {
  return (
    <g>
      {hookLen > 0 && (
        <line x1={x} y1={y - hookLen} x2={x} y2={y - h / 2 - 6} stroke={p.haze} strokeWidth="2" />
      )}
      <path
        d={`M${x - w / 2} ${y - h / 2} L${x} ${y - h / 2 - 14} L${x + w / 2} ${y - h / 2} L${x} ${y - h / 2 + 12} Z`}
        fill="none"
        stroke={p.machine}
        strokeWidth="1.8"
        opacity="0.9"
      />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="3" fill={payloadColor ?? p.body} />
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height="5"
        rx="2"
        fill={p.machine}
        opacity="0.8"
      />
      <rect
        x={x - w / 2 + 5}
        y={y - h / 2 + 9}
        width={w - 10}
        height="3"
        rx="1.5"
        fill={p.haze}
        opacity="0.5"
      />
    </g>
  )
}

// Scene variants

const SCENES = {
  'mobile-crane': (p) => (
    <>
      <Chassis x={40} y={118} p={p} />
      <Boom
        x={74}
        y={82}
        p={p}
        length={172}
        angle={-32}
        hookDrop={30}
        load={<SuspendedLoad x={236} y={48} w={54} h={30} p={p} hookLen={0} />}
      />
      <Figure x={288} y={122} p={p} />
      <Figure x={300} y={122} p={p} />
    </>
  ),
  'hydra-crane': (p) => (
    <>
      <Chassis x={120} y={120} p={p} width={104} wheelR={8} />
      <g fill={p.haze} opacity="0.6">
        <rect x={130} y={132} width="26" height="4" rx="2" />
        <rect x={192} y={132} width="26" height="4" rx="2" />
      </g>
      <Boom
        x={150}
        y={84}
        p={p}
        length={186}
        angle={-52}
        thickness={9}
        hookDrop={34}
        load={<SuspendedLoad x={276} y={22} w={44} h={24} p={p} />}
      />
      <Figure x={48} y={122} p={p} />
      <SteelStack x={248} y={118} rows={2} p={p} />
    </>
  ),
  'truck-crane': (p) => (
    <>
      <g opacity="0.85">
        <Chassis x={16} y={112} p={p} width={78} wheelR={7} />
        <Boom x={44} y={86} p={p} length={116} angle={-28} thickness={8} />
      </g>
      <Chassis x={148} y={120} p={p} width={96} />
      <Boom
        x={184}
        y={84}
        p={p}
        length={166}
        angle={-34}
        load={<SuspendedLoad x={330} y={42} w={46} h={26} p={p} />}
      />
      <Figure x={122} y={124} p={p} />
      <Figure x={312} y={124} p={p} />
    </>
  ),
  'night-crane': (p) => (
    <>
      <g fill={p.light} opacity="0.75">
        {[
          [22, 22],
          [58, 40],
          [96, 16],
          [140, 34],
          [248, 18],
          [318, 38],
          [368, 24],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.5 : 1} />
        ))}
      </g>
      <ellipse cx="330" cy="30" rx="34" ry="34" fill={p.light} opacity="0.14" />
      <Chassis x={28} y={120} p={p} />
      <path
        d="M200 96 L360 20 L380 40 L224 116 Z"
        fill={p.light}
        opacity="0.13"
      />
      <path
        d="M214 100 L330 44 L340 56 L226 112 Z"
        fill={p.light}
        opacity="0.1"
      />
      <Boom
        x={62}
        y={84}
        p={p}
        length={178}
        angle={-30}
        load={<SuspendedLoad x={220} y={50} w={48} h={26} p={p} />}
      />
      <g fill={p.light} opacity="0.2">
        <path d="M340 118 L388 46 L398 56 L352 120 Z" />
      </g>
      <Figure x={120} y={124} p={p} color={p.machine} />
      <Figure x={134} y={124} p={p} color={p.machine} />
    </>
  ),
  'yard-stacking': (p) => (
    <>
      <Chassis x={30} y={116} p={p} width={86} />
      <Boom
        x={62}
        y={80}
        p={p}
        length={150}
        angle={-40}
        thickness={9}
        load={<SuspendedLoad x={172} y={30} w={60} h={12} p={p} />}
      />
      <SteelStack x={244} y={118} rows={4} p={p} />
      <SteelStack x={316} y={118} rows={2} p={p} />
      <rect x={228} y={100} width="120" height="3" rx="1.5" fill={p.haze} opacity="0.35" />
      <Figure x={206} y={122} p={p} />
    </>
  ),
  'truck-loading': (p) => (
    <>
      <g>
        <rect x={196} y={104} width="168" height="8" rx="3" fill={p.bodyShade} />
        {[
          214, 232, 250, 268, 286, 304, 322, 340,
        ].map((cx) => (
          <circle key={cx} cx={cx} cy={122} r="7" fill="#0B1220" />
        ))}
        <rect x={196} y={96} width="168" height="4" rx="2" fill={p.machine} opacity="0.7" />
      </g>
      <g>
        <rect x={244} y={112} width="76" height="12" rx="2" fill={p.haze} opacity="0.3" />
        <rect x={200} y={112} width="40" height="12" rx="2" fill={p.haze} opacity="0.3" />
      </g>
      <Chassis x={22} y={124} p={p} width={84} wheelR={7} />
      <Boom
        x={54}
        y={88}
        p={p}
        length={210}
        angle={-8}
        thickness={9}
        load={<SuspendedLoad x={252} y={74} w={62} h={26} p={p} />}
      />
      <Figure x={176} y={126} p={p} />
    </>
  ),
  'machine-shifting': (p) => (
    <>
      <g opacity="0.5">
        <rect x="0" y="0" width="400" height="18" fill={p.skyTop} />
        {[40, 130, 220, 310].map((x) => (
          <g key={x}>
            <rect x={x} y={14} width="4" height="90" fill={p.skyTop} />
            <path d={`M${x} 22 L${x + 90} 44`} stroke={p.skyTop} strokeWidth="4" />
          </g>
        ))}
      </g>
      <rect x="0" y="104" width="400" height="8" fill={p.haze} opacity="0.16" />
      <Boom
        x={168}
        y={40}
        p={p}
        length={150}
        angle={-6}
        thickness={10}
        load={
          <g>
            <rect x={296} y={62} width="76" height="44" rx="4" fill={p.body} />
            <rect x={296} y={62} width="76" height="7" rx="3" fill={p.machine} />
            <rect x={306} y={76} width="20" height="16" rx="2" fill={p.accent} opacity="0.6" />
            <rect x={334} y={76} width="30" height="6" rx="2" fill={p.haze} opacity="0.5" />
            <rect x={300} y={104} width="12" height="6" fill={p.haze} opacity="0.6" />
            <rect x={356} y={104} width="12" height="6" fill={p.haze} opacity="0.6" />
          </g>
        }
      />
      <Figure x={262} y={112} p={p} />
      <Figure x={278} y={112} p={p} />
    </>
  ),
  transformer: (p) => (
    <>
      <rect x={244} y={92} width="98" height="34" rx="3" fill={p.body} />
      <rect x={244} y={92} width="98" height="6" rx="3" fill={p.machine} />
      {[258, 276].map((x) => (
        <g key={x}>
          <rect x={x} y={84} width="6" height="9" fill={p.haze} />
          <ellipse cx={x + 3} cy={82} rx="5" ry="3" fill={p.accent} opacity="0.75" />
        </g>
      ))}
      {[306, 324].map((x) => (
        <circle key={x} cx={x} cy={108} r="7" fill="none" stroke={p.haze} strokeWidth="2.5" opacity="0.8" />
      ))}
      <rect x={232} y={126} width="124" height="6" rx="2" fill={p.haze} opacity="0.5" />
      <Chassis x={24} y={114} p={p} width={82} />
      <Boom
        x={56}
        y={78}
        p={p}
        length={196}
        angle={-14}
        thickness={9}
        load={
          <g>
            <line x1={234} y1={44} x2={234} y2={84} stroke={p.haze} strokeWidth="2" />
            <path
              d="M214 86 L234 68 L254 86"
              fill="none"
              stroke={p.machine}
              strokeWidth="2"
            />
          </g>
        }
      />
      <Figure x={200} y={122} p={p} />
    </>
  ),
  'steel-erection': (p) => (
    <>
      <g fill={p.haze} opacity="0.42">
        {[62, 130, 198].map((x) => (
          <rect key={x} x={x} y={40} width="7" height="86" rx="2" />
        ))}
        <rect x={56} y={40} width="150" height="7" rx="2" />
      </g>
      <g fill={p.machine} opacity="0.9">
        <rect x={206} y={52} width="7" height="74" rx="2" />
        <rect x={196} y={44} width="120" height="12" rx="3" />
        <rect x={204} y={48} width="104" height="3" rx="1.5" fill={p.machineDark} />
      </g>
      <Chassis x={16} y={120} p={p} width={78} wheelR={7} />
      <Boom
        x={46}
        y={84}
        p={p}
        length={170}
        angle={-24}
        thickness={9}
        load={<g />}
      />
      <Figure x={352} y={124} p={p} />
      <Figure x={366} y={124} p={p} />
    </>
  ),
  precast: (p) => (
    <>
      <g fill={p.haze} opacity="0.4">
        {[46, 116, 186].map((x) => (
          <rect key={x} x={x} y={44} width="6" height="82" rx="2" />
        ))}
        {[46, 116, 186].map((x) => (
          <rect key={`s${x}`} x={x} y={70} width="146" height="5" rx="2" />
        ))}
        <rect x={40} y={44} width="152" height="5" rx="2" />
      </g>
      <g>
        <rect x={244} y={78} width="104" height="8" rx="2" fill={p.body} />
        <rect x={244} y={86} width="104" height="42" rx="2" fill={p.body} opacity="0.85" />
        <rect x={250} y={92} width="26" height="36" rx="2" fill={p.skyTop} opacity="0.4" />
        <rect x={282} y={92} width="26" height="36" rx="2" fill={p.skyTop} opacity="0.4" />
        <rect x={244} y={78} width="104" height="4" rx="2" fill={p.machine} />
      </g>
      <Chassis x={16} y={126} p={p} width={80} wheelR={7} />
      <Boom
        x={48}
        y={90}
        p={p}
        length={200}
        angle={-19}
        thickness={9}
        load={<g />}
      />
      <Figure x={220} y={130} p={p} />
    </>
  ),
  highrise: (p) => (
    <>
      <g fill={p.haze} opacity="0.34">
        <rect x={214} y={16} width="112" height="112" rx="2" />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 5 }).map((__, c) => (
            <rect
              key={`${r}-${c}`}
              x={222 + c * 20}
              y={26 + r * 20}
              width="13"
              height="12"
              rx="1.5"
              fill={p.accent}
              opacity={((r + c) % 3 === 0 ? 0.5 : 0.16)}
            />
          )),
        )}
      </g>
      <g>
        <path d="M96 18 L100 12 L104 18" fill={p.machine} />
        <rect x={98} y={18} width="4" height="112" fill={p.machine} />
        {[36, 62, 88, 114].map((y) => (
          <g key={y}>
            <path
              d={`M100 ${y} L${196} ${y - 14}`}
              stroke={p.machine}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1={100}
              y1={y}
              x2={196}
              y2={y - 14}
              stroke={p.haze}
              strokeWidth="1"
              opacity="0.4"
            />
          </g>
        ))}
        <line x1={196} y1={22} x2={196} y2={100} stroke={p.haze} strokeWidth="1.6" opacity="0.6" />
      </g>
      <Chassis x={14} y={132} p={p} width={74} wheelR={7} />
      <Figure x={344} y={132} p={p} />
    </>
  ),
  'plant-equipment': (p) => (
    <>
      <g opacity="0.45">
        <rect x="0" y="0" width="400" height="16" fill={p.skyTop} />
        <rect x={12} y={16} width="376" height="4" fill={p.skyTop} />
        {[44, 140, 236, 332].map((x) => (
          <rect key={x} x={x} y={20} width="5" height="96" fill={p.skyTop} />
        ))}
        <rect x={330} y={40} width="48" height="30" rx="2" fill={p.accent} opacity="0.16" />
      </g>
      <rect x="0" y="116" width="400" height="6" fill={p.haze} opacity="0.14" />
      <g>
        <rect x={228} y={58} width="118" height="58" rx="4" fill={p.body} />
        <rect x={228} y={58} width="118" height="7" rx="3" fill={p.machine} />
        <rect x={240} y={72} width="34" height="26" rx="2" fill={p.skyTop} opacity="0.45" />
        <rect x={282} y={72} width="52" height="8" rx="2" fill={p.haze} opacity="0.55" />
        <circle cx={258} cy={106} r="6" fill={p.haze} opacity="0.7" />
        <circle cx={320} cy={106} r="6" fill={p.haze} opacity="0.7" />
        <rect x={226} y={112} width="122" height="6" rx="2" fill={p.haze} opacity="0.5" />
      </g>
      <Boom x={140} y={36} p={p} length={118} angle={-8} thickness={10} />
      <Figure x={200} y={116} p={p} />
      <Figure x={214} y={116} p={p} />
    </>
  ),
  'bridge-girder': (p) => (
    <>
      <g fill={p.haze} opacity="0.5">
        <rect x={46} y={66} width="20" height="62" rx="3" />
        <rect x={36} y={58} width="40" height="10" rx="2" />
        <rect x={238} y={66} width="20" height="62" rx="3" />
        <rect x={228} y={58} width="40" height="10" rx="2" />
      </g>
      <g>
        <rect x={30} y={40} width="244" height="16" rx="3" fill={p.body} />
        <rect x={30} y={40} width="244" height="5" rx="2" fill={p.machine} />
        <rect x={30} y={52} width="244" height="3" rx="1.5" fill={p.haze} opacity="0.5" />
        {[60, 90, 120, 150, 180, 210, 240].map((x) => (
          <circle key={x} cx={x} cy={48} r="3.4" fill={p.skyTop} opacity="0.35" />
        ))}
      </g>
      <Chassis x={292} y={126} p={p} width={86} wheelR={7} />
      <Boom
        x={320}
        y={90}
        p={p}
        length={132}
        angle={-108}
        thickness={9}
        load={<g />}
      />
      <Figure x={282} y={130} p={p} />
    </>
  ),
  'oversize-cargo': (p) => (
    <>
      <g>
        <rect x={128} y={112} width="200" height="8" rx="3" fill={p.bodyShade} />
        {[146, 166, 250, 274, 298, 318].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={124} r="8" fill="#0B1220" />
            <circle cx={cx} cy={124} r="3" fill={p.haze} opacity="0.8" />
          </g>
        ))}
        <rect x={118} y={84} width="152" height="30" rx="4" fill={p.body} />
        <rect x={118} y={84} width="152" height="6" rx="3" fill={p.machine} />
        {[130, 168, 206, 244].map((x) => (
          <rect key={x} x={x} y={94} width="22" height="16" rx="2" fill={p.haze} opacity="0.45" />
        ))}
        <rect x={116} y={78} width="156" height="6" rx="2" fill={p.machineDark} opacity="0.6" />
      </g>
      <Chassis x={18} y={112} p={p} width={98} />
      <Boom
        x={52}
        y={78}
        p={p}
        length={104}
        angle={-30}
        thickness={8}
        load={<g />}
      />
      <Figure x={342} y={130} p={p} />
      <g>
        <circle cx={372} cy={118} r="12" fill={p.body} />
        <path d="M372 112 L372 120 L379 124" stroke="#0B1220" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </>
  ),
}

/**
 * Renders one industrial scene.
 * @param {{ art?: string, variant?: string, className?: string, label?: string }} props
 */
export function SceneArt({ art = 'mobile-crane', className = '', label, ...rest }) {
  const reactId = useId()
  const uid = `sa${reactId.replace(/[^a-zA-Z0-9]/g, '')}`
  const key = SCENES[art] ? art : 'mobile-crane'

  const isNight = key === 'night-crane'
  const isIndoor = ['machine-shifting', 'plant-equipment'].includes(key)
  const p = isNight
    ? PALETTES.night
    : isIndoor
      ? PALETTES.indoor
      : key === 'truck-loading' || key === 'bridge-girder'
        ? PALETTES.dusk
        : PALETTES.day

  const draw = SCENES[key]

  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role={label ? 'img' : 'presentation'}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
      {...rest}
    >
      <Backdrop p={p} uid={uid} ground={!isIndoor}>
        {!isIndoor && <Stacks p={p} x={300} y={116} scale={0.7} />}
        {isNight && <rect width="400" height="200" fill={PALETTES.night.skyTop} opacity="0.35" />}
        {draw(p)}
      </Backdrop>
    </svg>
  )
}

export const SCENE_VARIANTS = Object.keys(SCENES)

export default SceneArt