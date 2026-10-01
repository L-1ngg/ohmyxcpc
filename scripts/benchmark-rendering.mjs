import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'
import config from '../.vitepress/config.ts'
import { scanContent } from './lib/content.mjs'
import { cacheMarkdownRendering } from './lib/markdown-cache.mjs'

const content = resolve(import.meta.dirname, '../content')
const chapters = scanContent(content)
const paths = [
  ...readdirSync(content).filter(name => name.endsWith('.md')),
  ...chapters.flatMap(chapter => [chapter.index, ...chapter.pages.map(page => page.path)].filter(Boolean))
]
const documents = paths.map(path => ({ path, source: readFileSync(join(content, path), 'utf8') }))
const results = []
try {
  for (const cached of [false, true]) {
    let stats
    const md = await createMarkdownRenderer(content, {
      ...config.markdown,
      config(md) {
        const inline = md.renderer.rules.math_inline, block = md.renderer.rules.math_block, highlight = md.options.highlight
        config.markdown.config(md)
        md.renderer.rules.math_inline = inline
        md.renderer.rules.math_block = block
        md.options.highlight = highlight
        if (cached) stats = cacheMarkdownRendering(md)
      }
    }, config.base)
    const hashes = []
    const started = performance.now()
    for (let pass = 0; pass < 2; pass++) {
      for (const { path, source } of documents) {
        const html = md.render(source, { path: join(content, path), relativePath: path, cleanUrls: true })
        hashes.push(createHash('sha256').update(html).digest('hex'))
      }
    }
    const seconds = (performance.now() - started) / 1000
    results.push(hashes)
    console.log(JSON.stringify({ cached, seconds, renders: hashes.length, stats }))
    disposeMdItInstance()
  }
  assert.deepEqual(results[1], results[0])
  console.log(`PASS: ${results[0].length} complete HTML outputs are SHA-256 identical`)
} finally { disposeMdItInstance() }
