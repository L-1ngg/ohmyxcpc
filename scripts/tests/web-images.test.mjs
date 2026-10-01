import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, cpSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import MarkdownIt from 'markdown-it'
import { prepareWebImages, pictureImages } from '../lib/web-images.mjs'
import { composeBody } from '../pdf/md2typst.mjs'

test('all eleven PNGs produce lossless WebP while Markdown retains PNG fallback and PDF originals', async t => {
  const content = mkdtempSync(join(tmpdir(), 'ohmyxcpc-images-'))
  t.after(() => rmSync(content, { recursive: true, force: true }))
  const images = join(content, 'public/images')
  mkdirSync(images, { recursive: true })
  cpSync(new URL('../../content/public/images', import.meta.url), images, { recursive: true, filter: path => !path.endsWith('.webp') })
  writeFileSync(join(images, 'obsolete.webp'), 'old derivative')
  const names = await prepareWebImages(content)
  assert.equal(names.length, 11)
  assert.ok(!readdirSync(images).includes('obsolete.webp'))
  let pngBytes = 0, webpBytes = 0
  for (const name of names) {
    const png = readFileSync(join(images, name))
    const webp = readFileSync(join(images, name.replace(/\.png$/, '.webp')))
    const first = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const second = await sharp(webp).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    assert.deepEqual(second.info, first.info)
    assert.deepEqual(second.data, first.data, name)
    pngBytes += png.length
    webpBytes += webp.length
  }
  assert.ok(webpBytes < pngBytes)
  const md = new MarkdownIt()
  pictureImages(md, content, '/ohmyxcpc/')
  const source = '![diagram](/images/img-09.png)'
  const html = md.render(source)
  assert.match(html, /<picture><source type="image\/webp"/)
  assert.match(html, /ohmyxcpc\/images\/img-09\.webp/)
  assert.match(html, /<img src="\/images\/img-09\.png" alt="diagram">/)
  assert.doesNotMatch(md.render('![remote](https://example.org/remote.png)'), /<picture>/)
  writeFileSync(join(content, 'entry.md'), '# Image\n\n' + source)
  const body = composeBody([{ entries: [{ path: 'entry.md' }] }], content)
  assert.match(body, /img-09\.png/)
  assert.doesNotMatch(body, /webp|picture/)
  console.log(`Image bytes: PNG ${pngBytes}; WebP ${webpBytes}; all decoded RGBA pixels identical`)
})
