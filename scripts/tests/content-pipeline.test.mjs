import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, cpSync, writeFileSync, readFileSync, symlinkSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { execFileSync, spawnSync } from 'node:child_process'
import { launchBrowser } from '../lib/browser.mjs'

const root = resolve(import.meta.dirname, '../..')
function fixture(t) {
  mkdirSync(join(root, '.cache'), { recursive: true })
  const dir = mkdtempSync(join(root, '.cache/pipeline-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  cpSync(join(root, 'scripts'), join(dir, 'scripts'), { recursive: true, filter: source => !source.includes('/.build') && !source.includes('/tests') })
  cpSync(join(root, '.vitepress'), join(dir, '.vitepress'), { recursive: true, filter: source => !source.includes('/cache') && !source.includes('/dist') })
  symlinkSync(join(root, 'node_modules'), join(dir, 'node_modules'), 'dir')
  mkdirSync(join(dir, '.cache'))
  symlinkSync(join(root, '.cache/fonts'), join(dir, '.cache/fonts'), 'dir')
  for (const path of ['content/sample', 'content/other', 'content/snippets', 'content/public']) mkdirSync(join(dir, path), { recursive: true })
  for (const name of ['index', 'export', 'preface']) writeFileSync(join(dir, `content/${name}.md`), `# ${name}\n`)
  for (const chapter of ['sample', 'other']) writeFileSync(join(dir, `content/${chapter}/index.md`), `---\ntitle: ${chapter}\n---\n# ${chapter}\n`)
  writeFileSync(join(dir, 'content/other/entry.md'), '# Other {#other}\nOther chapter.\n')
  cpSync(join(root, 'content/public/logo.png'), join(dir, 'content/public/logo.png'))
  return dir
}
function exportChapter(dir) {
  return spawnSync(process.execPath, [join(dir, 'scripts/export-pdf.mjs'), 'sample'], { cwd: dir, encoding: 'utf8', maxBuffer: 2e6 })
}

test('missing snippet fails the public export with a source filename', t => {
  const dir = fixture(t)
  writeFileSync(join(dir, 'content/sample/entry.md'), '# Missing\n\n<<< @/snippets/missing.cpp\n')
  const result = exportChapter(dir)
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /missing\.cpp/)
})

test('missing image fails export instead of inserting placeholder prose', t => {
  const dir = fixture(t)
  writeFileSync(join(dir, 'content/sample/entry.md'), '# Missing\n\n![diagram](./missing.png)\n')
  const result = exportChapter(dir)
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /Missing image in sample\/entry\.md/)
})

test('unsupported Markdown container fails export explicitly', t => {
  const dir = fixture(t)
  writeFileSync(join(dir, 'content/sample/entry.md'), '# Unsupported\n\n::: details More\nHidden prose\n:::\n')
  const result = exportChapter(dir)
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /Unsupported Markdown container/)
})

test('malformed code region is rejected before publishing a PDF', t => {
  const dir = fixture(t)
  writeFileSync(join(dir, 'content/snippets/test.cpp'), '// @book-begin\nint value = 7;\n')
  writeFileSync(join(dir, 'content/sample/entry.md'), '# Invalid\n\n<<< @/snippets/test.cpp\n')
  const result = exportChapter(dir)
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /Invalid code region/)
})

test('a prose and code edit reaches both website and PDF without copying scaffolding', { timeout: 180_000 }, async t => {
  const dir = fixture(t)
  const update = (version, value) => {
    writeFileSync(join(dir, 'content/snippets/test.cpp'), `// scaffold-only\n// @book-begin\nint shared_value = ${value};\n// @book-end\n`)
    writeFileSync(join(dir, 'content/sample/entry.md'), `# Arithmetic {#arithmetic}\n\n${version}\n\n1. FirstItem\n\n2. SecondItem\n\n$x^2 + 1$\n\n[Other](/other/entry#other)\n\n![diagram](/logo.png)\n\n<<< @/snippets/test.cpp\n`)
  }
  const pdfText = () => execFileSync('uv', ['run', '--with', 'pymupdf==1.26.7', 'python', '-c', 'import pymupdf,sys; print("".join(p.get_text() for p in pymupdf.open(sys.argv[1])))', join(dir, 'pdf/sample.pdf')], { encoding: 'utf8', maxBuffer: 2e6 })
  update('FirstRevision', 7)
  let result = exportChapter(dir)
  assert.equal(result.status, 0, result.stderr)
  const firstText = pdfText()
  assert.match(firstText, /FirstRevision/)
  assert.match(firstText, /2\./, 'A loose ordered list keeps its second item number in PDF')
  update('SecondRevision', 11)
  result = exportChapter(dir)
  assert.equal(result.status, 0, result.stderr)
  const text = pdfText()
  assert.match(text, /SecondRevision/)
  assert.match(text, /shared_value\s*=\s*11/)
  assert.doesNotMatch(text, /FirstRevision|scaffold-only|@book-/)
  execFileSync('pnpm', ['exec', 'vitepress', 'build', dir], { cwd: root, encoding: 'utf8', maxBuffer: 2e6 })
  const html = readFileSync(join(dir, '.vitepress/dist/sample/entry.html'), 'utf8')
  const browser = await launchBrowser()
  t.after(() => browser.close())
  const page = await browser.newPage()
  await page.setContent(html)
  assert.match(await page.locator('.vp-doc').innerText(), /SecondRevision/)
  assert.equal((await page.locator('.vp-doc pre code').innerText()).trim(), 'int shared_value = 11;')
  assert.doesNotMatch(await page.locator('.vp-doc').innerText(), /FirstRevision|scaffold-only|@book-/)
})

test('failed full export preserves the last complete published manifest', t => {
  const dir = fixture(t)
  mkdirSync(join(dir, 'content/public/pdfs'))
  const path = join(dir, 'content/public/pdfs/manifest.json')
  const previous = '{"generatedAt":"previous","targets":[]}'
  writeFileSync(path, previous)
  const result = spawnSync(process.execPath, [join(dir, 'scripts/prebuild-pdfs.mjs')], {
    cwd: dir, encoding: 'utf8', env: { ...process.env, TYPST_PATH: '/not-a-compiler' }
  })
  assert.notEqual(result.status, 0)
  assert.equal(readFileSync(path, 'utf8'), previous)
})

test('missing Chromium installation reports an actionable message', t => {
  const dir = fixture(t)
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', `import { launchBrowser } from ${JSON.stringify(join(root, 'scripts/lib/browser.mjs'))}; await launchBrowser()`], {
    encoding: 'utf8', env: { ...process.env, HOME: dir, CHROMIUM_PATH: '' }
  })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /CHROMIUM_PATH or install Chromium/)
  assert.doesNotMatch(result.stderr, /ENOENT/)
})

test('publication rename failure restores the previous PDF set', { timeout: 120_000 }, t => {
  const dir = fixture(t)
  const published = join(dir, 'content/public/pdfs')
  mkdirSync(published)
  writeFileSync(join(published, 'manifest.json'), 'previous manifest')
  writeFileSync(join(published, 'all.pdf'), 'previous PDF')
  const preload = join(dir, 'fail-publication.cjs')
  writeFileSync(preload, `
const fs = require('node:fs');
const { syncBuiltinESMExports } = require('node:module');
const rename = fs.renameSync;
fs.renameSync = function(source, destination) {
  if (source.endsWith('/prebuild/pdfs')) throw new Error('injected publication failure');
  return rename(source, destination);
};
syncBuiltinESMExports();
`)
  const result = spawnSync(process.execPath, ['--require', preload, join(dir, 'scripts/prebuild-pdfs.mjs')], {
    cwd: dir, encoding: 'utf8', maxBuffer: 2e6
  })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /injected publication failure/)
  assert.equal(readFileSync(join(published, 'manifest.json'), 'utf8'), 'previous manifest')
  assert.equal(readFileSync(join(published, 'all.pdf'), 'utf8'), 'previous PDF')
})

test('PDF links use real headings and retain cross-chapter web destinations', { timeout: 120_000 }, t => {
  const dir = fixture(t)
  writeFileSync(join(dir, 'content/sample/entry.md'), `# Links {#links}

[Real target](/other/entry#other)

[Code example](/other/entry#example)

::: tip
![diagram](/logo.png)
:::
`)
  writeFileSync(join(dir, 'content/other/entry.md'), `# Other {#other}

RealDestination

\`\`\`text
# Only code {#example}
\`\`\`
`)
  const inspect = name => JSON.parse(execFileSync('uv', ['run', '--with', 'pymupdf==1.26.7', 'python', '-c', `import pymupdf,json,sys
doc=pymupdf.open(sys.argv[1])
print(json.dumps({'toc': doc.get_toc(), 'images': sum(len(page.get_images()) for page in doc), 'text': ''.join(page.get_text() for page in doc), 'links': [{'kind': link['kind'], 'uri': link.get('uri'), 'targetText': doc[link['page']].get_text() if link['kind']==1 and link.get('page', -1)>=0 else None} for page in doc for link in page.get_links()]}))`, join(dir, 'pdf', name + '.pdf')], { encoding: 'utf8' }))
  let result = exportChapter(dir)
  assert.equal(result.status, 0, result.stderr)
  const chapter = inspect('sample')
  assert.deepEqual(chapter.toc.map(([level, title]) => [level, title]), [[1, 'sample'], [2, 'Links']])
  assert.ok(chapter.images > 0, 'An image inside a supported container reaches the PDF')
  let links = chapter.links
  assert.ok(links.some(link => link.uri === 'https://l-1ngg.github.io/ohmyxcpc/other/entry#other'))
  result = spawnSync(process.execPath, [join(dir, 'scripts/export-pdf.mjs')], { cwd: dir, encoding: 'utf8', maxBuffer: 2e6 })
  assert.equal(result.status, 0, result.stderr)
  const book = inspect('all')
  assert.deepEqual(book.toc.map(([level, title]) => [level, title]), [[1, 'preface'], [1, 'other'], [2, 'Other'], [1, 'sample'], [2, 'Links']])
  assert.match(book.text, /# Only code \{#example\}/)
  assert.ok(book.images > 0)
  links = book.links
  assert.ok(links.some(link => link.kind === 1 && link.targetText.includes('RealDestination')))
  assert.ok(!links.some(link => link.uri?.endsWith('/other/entry#other')))
  assert.ok(links.some(link => link.uri === 'https://l-1ngg.github.io/ohmyxcpc/other/entry#example'))
})
