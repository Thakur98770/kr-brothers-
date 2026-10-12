import { copyFile, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = path.join(projectRoot, 'dist')

const supersededAssets = [
  'assets/gallery/imgs/about-crane-operator.jpg',
  'assets/gallery/imgs/gallery-image-1.jpeg',
  'assets/gallery/imgs/gallery-image-2.jpg',
  ...Array.from({ length: 12 }, (_, index) => `assets/gallery/imgs/img${index + 3}.jpg`),
  'assets/gallery/videos/hero-background-desktop.mp4',
  'assets/gallery/videos/hero-background-mobile.mp4',
  'assets/gallery/videos/hero-background-laptop.mp4',
  'assets/gallery/imgs/hero-main-photo.jpeg',
]

for (const asset of supersededAssets) {
  const destination = path.resolve(distRoot, asset)
  if (!destination.startsWith(`${distRoot}${path.sep}`)) {
    throw new Error(`Refusing to remove a path outside dist: ${asset}`)
  }

  try {
    await stat(destination)
    await rm(destination)
    console.log(`Excluded superseded build asset: ${asset}`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

await copyFile(
  path.join(projectRoot, 'public', '.htaccess'),
  path.join(distRoot, '.htaccess'),
)
