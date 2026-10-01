import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, mkdirSync, symlinkSync, writeFileSync, readFileSync, readdirSync, statSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { scanContent } from './lib/content.mjs'

const root = resolve(import.meta.dirname, '..')
mkdirSync(join(root, '.cache'), { recursive: true })
const dir = mkdtempSync(join(root, '.cache/pdf-benchmark-'))
const sha = file => createHash('sha256').update(readFileSync(file)).digest('hex')
try {
  for (const path of ['scripts', 'content', '.vitepress', 'docs/migration']) {
    cpSync(join(root, path), join(dir, path), {
      recursive: true,
      filter: source => !source.includes('/.build') && !source.includes('/tests') && !source.includes('/.vitepress/dist') && !source.includes('/.vitepress/cache') && !source.includes('/content/public/pdfs') && !source.includes('/content/public/.pdfs-') && !source.endsWith('.webp')
    })
  }
  for (const path of ['package.json', 'pnpm-lock.yaml']) cpSync(join(root, path), join(dir, path))
  symlinkSync(join(root, 'node_modules'), join(dir, 'node_modules'), 'dir')
  mkdirSync(join(dir, '.cache'))
  symlinkSync(join(root, '.cache/fonts'), join(dir, '.cache/fonts'), 'dir')
  const expected = scanContent(join(dir, 'content')).length + 1
  function measure(scenario, compiled) {
    const started = performance.now()
    const result = spawnSync(process.execPath, [join(dir, 'scripts/prebuild-pdfs.mjs')], { cwd: dir, encoding: 'utf8', maxBuffer: 8e6 })
    const seconds = (performance.now() - started) / 1000
    assert.equal(result.status, 0, result.stderr)
    assert.ok(result.stdout.includes(`PDF compilation: ${compiled}; reused: ${expected - compiled}; total: ${expected}`), result.stdout)
    const out = join(dir, 'content/public/pdfs')
    const manifest = JSON.parse(readFileSync(join(out, 'manifest.json'), 'utf8'))
    assert.equal(manifest.targets.length, expected)
    assert.equal(readdirSync(out).length, expected + 1)
    const hashes = {}
    for (const target of manifest.targets) {
      const file = join(out, `${target.id}.pdf`)
      assert.equal(statSync(file).size, target.pdf.bytes)
      assert.equal(readFileSync(file).subarray(0, 5).toString(), '%PDF-')
      hashes[target.id] = sha(file)
    }
    console.log(JSON.stringify({ scenario, seconds, compiled, reused: expected - compiled, targets: expected }))
    return hashes
  }
  const cold = measure('cold', expected)
  assert.deepEqual(measure('all cached', 0), cold)
  writeFileSync(join(dir, '.vitepress/theme/custom.css'), readFileSync(join(dir, '.vitepress/theme/custom.css'), 'utf8') + '\n/* website-only edit */\n')
  assert.deepEqual(measure('website-only edit', 0), cold)
  const chapter = scanContent(join(dir, 'content')).find(chapter => chapter.dir === 'string')
  const path = join(dir, 'content', chapter.pages[0].path)
  writeFileSync(path, readFileSync(path, 'utf8') + '\nBenchmark prose revision.\n')
  const prose = measure('one chapter prose edit', 2)
  for (const [id, value] of Object.entries(cold)) {
    if (!['all', 'string'].includes(id)) assert.equal(prose[id], value)
  }
  const code = chapter.pages.flatMap(page => {
    const dependencies = readFileSync(join(dir, 'content', page.path), 'utf8').split('\n').filter(line => line.startsWith('<<< @/'))
    return dependencies.map(line => join(dir, 'content', line.slice(6).trim()))
  })[0]
  writeFileSync(code, readFileSync(code, 'utf8') + '\n// Benchmark dependency revision.\n')
  const changedCode = measure('one chapter code edit', 2)
  for (const [id, value] of Object.entries(prose)) {
    if (!['all', 'string'].includes(id)) assert.equal(changedCode[id], value)
  }
  const template = join(dir, 'scripts/pdf/template.typ')
  writeFileSync(template, readFileSync(template, 'utf8') + '\n// Benchmark shared dependency revision.\n')
  measure('shared dependency edit', expected)
  console.log('PASS: full-set publication, cache identity, and chapter isolation in every scenario')
} finally { rmSync(dir, { recursive: true, force: true }) }
