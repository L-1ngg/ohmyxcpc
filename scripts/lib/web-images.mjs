import { readdirSync, existsSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

export async function prepareWebImages(contentDir) {
  const dir = join(contentDir, 'public/images')
  if (!existsSync(dir)) return []
  const originals = readdirSync(dir).filter(name => name.endsWith('.png')).sort()
  for (const name of originals) {
    await sharp(readFileSync(join(dir, name))).keepMetadata().webp({ lossless: true, effort: 6 }).toFile(join(dir, name.replace(/\.png$/, '.webp')))
  }
  for (const name of readdirSync(dir).filter(name => name.endsWith('.webp'))) {
    if (!originals.includes(name.replace(/\.webp$/, '.png'))) rmSync(join(dir, name))
  }
  return originals
}

export function webImagesPlugin(contentDir) {
  return {
    name: 'ohmyxcpc:web-images',
    async buildStart() { await prepareWebImages(contentDir) },
    async handleHotUpdate({ file }) {
      if (file.startsWith(join(contentDir, 'public/images') + '/') && file.endsWith('.png')) await prepareWebImages(contentDir)
    }
  }
}

export function pictureImages(md, contentDir, base) {
  const render = md.renderer.rules.image
  md.renderer.rules.image = (...args) => {
    const token = args[0][args[1]]
    const src = token.attrGet('src')
    const image = render(...args)
    if (!src?.match(/^\/images\/[^/]+\.png$/) || !existsSync(join(contentDir, 'public', src))) return image
    const url = base + src.slice(1).replace(/\.png$/, '.webp')
    // A bound URL avoids Vue rewriting an already base-prefixed public asset.
    return `<picture><source type="image/webp" :srcset="${md.utils.escapeHtml(JSON.stringify(url))}">${image}</picture>`
  }
}
