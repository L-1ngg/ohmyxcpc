import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, lstatSync, existsSync, mkdirSync, copyFileSync, writeFileSync, renameSync, rmSync } from 'node:fs'
import { join, relative } from 'node:path'
import { execFileSync } from 'node:child_process'
import { TYPST } from './exporter.mjs'

const schema = 1
const hash = value => createHash('sha256').update(value).digest('hex')

function filesIn(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? filesIn(path) : entry.isFile() ? [path] : []
  }).sort()
}

function digestFiles(root, paths) {
  return paths.sort().map(path => [relative(root, path), hash(readFileSync(path))])
}

export function sharedFingerprint(root, targets) {
  const paths = [
    ...filesIn(join(root, 'scripts/pdf')).filter(path => /\.(mjs|typ)$/.test(path) && !path.includes('/.build/')),
    join(root, 'scripts/prebuild-pdfs.mjs'), join(root, 'scripts/lib/content.mjs'), join(root, 'scripts/lib/snippets.mjs'),
    ...filesIn(join(root, '.cache/fonts')).filter(path => /\.(otf|ttf|ttc|woff2?)$/i.test(path)),
    ...['package.json', 'pnpm-lock.yaml', 'scripts/fonts.json', 'content/preface.md', 'docs/migration/source-manifest.json']
      .map(path => join(root, path)).filter(existsSync)
  ]
  return hash(JSON.stringify({
    schema, node: process.version, platform: process.platform, arch: process.arch,
    typst: execFileSync(TYPST, ['--version'], { encoding: 'utf8' }).trim(),
    catalog: targets, files: digestFiles(root, paths)
  }))
}

export function targetFingerprint(root, shared, target, body, dependencies) {
  return hash(JSON.stringify({ shared, target, body, files: digestFiles(root, [...dependencies]) }))
}

export function loadPdfCache(cacheDir) {
  try {
    const index = JSON.parse(readFileSync(join(cacheDir, 'index.json'), 'utf8'))
    return index.schema === schema && index.targets && typeof index.targets === 'object' ? index.targets : {}
  } catch { return {} }
}

export function reusePdf(cacheDir, index, id, fingerprint, stagingDir) {
  try {
    const entry = index[id]
    const path = join(cacheDir, `${id}.pdf`)
    if (entry?.fingerprint !== fingerprint || !lstatSync(path).isFile()) return null
    const data = readFileSync(path)
    if (data.length !== entry.bytes || data.subarray(0, 5).toString() !== '%PDF-' || hash(data) !== entry.sha256) return null
    copyFileSync(path, join(stagingDir, `${id}.pdf`))
    return { bytes: data.length }
  } catch { return null }
}

// Save only the successfully published set. A partial cache write is detected by its artifact hashes next time.
export function savePdfCache(cacheDir, outDir, fingerprints) {
  mkdirSync(cacheDir, { recursive: true })
  const targets = {}
  try {
    for (const [id, fingerprint] of Object.entries(fingerprints)) {
      const source = join(outDir, `${id}.pdf`)
      const data = readFileSync(source)
      const temporary = join(cacheDir, `${id}.pdf.tmp`)
      copyFileSync(source, temporary)
      renameSync(temporary, join(cacheDir, `${id}.pdf`))
      targets[id] = { fingerprint, bytes: data.length, sha256: hash(data) }
    }
    const temporary = join(cacheDir, 'index.json.tmp')
    writeFileSync(temporary, JSON.stringify({ schema, targets }, null, 2) + '\n')
    renameSync(temporary, join(cacheDir, 'index.json'))
    for (const name of readdirSync(cacheDir)) {
      if (name.endsWith('.pdf') && !Object.hasOwn(targets, name.slice(0, -4))) rmSync(join(cacheDir, name))
    }
  } finally {
    for (const name of readdirSync(cacheDir).filter(name => name.endsWith('.tmp'))) rmSync(join(cacheDir, name), { force: true })
  }
}
