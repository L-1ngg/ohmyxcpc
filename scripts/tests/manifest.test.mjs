import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import ts from 'typescript'

const valid = () => ({ generatedAt: '2026-09-12T00:00:00.000Z', targets: [
  { id: 'all', type: 'site', title: '整本', pdf: { url: 'pdfs/all.pdf', bytes: 120 } },
  { id: 'string', type: 'chapter', title: '串', pdf: { url: 'pdfs/string.pdf', bytes: 60 } },
] })

// Run the production loader with real HTTP. Only VitePress's deployment base is adapted.
async function loader(t, respond) {
  const server = createServer(respond)
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  t.after(() => new Promise(resolve => server.close(resolve)))
  const base = `http://127.0.0.1:${server.address().port}/ohmyxcpc/`
  const adapter = 'data:text/javascript,' + encodeURIComponent(`export const withBase = path => ${JSON.stringify(base)} + path.replace(/^\\//, '')`)
  const source = readFileSync(new URL('../../.vitepress/theme/manifest.ts', import.meta.url), 'utf8')
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
  return import('data:text/javascript,' + encodeURIComponent(js.replace(/from ['"]vitepress['"]/, `from ${JSON.stringify(adapter)}`)))
}

function json(res, value) { res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify(value)) }

test('old manifest cannot expose broken PDF targets', async t => {
  const old = valid()
  old.targets[0].pdfs = old.targets[0].pdf
  delete old.targets[0].pdf
  const api = await loader(t, (_, res) => json(res, old))
  assert.equal(await api.loadManifest(), null)
})

test('a later load recovers from network failure and shares a valid result', async t => {
  let requests = 0
  const api = await loader(t, (req, res) => {
    requests++
    if (requests === 1) { req.socket.destroy(); return }
    json(res, valid())
  })
  assert.equal(await api.loadManifest(), null)
  const [first, second] = await Promise.all([api.loadManifest(), api.loadManifest()])
  assert.deepEqual(first, valid())
  assert.deepEqual(second, valid())
  assert.deepEqual(await api.loadManifest(), valid())
  assert.equal(requests, 2, 'concurrent consumers and later consumers share the successful load')
  assert.match(api.pdfUrl(first.targets[1]), /\/ohmyxcpc\/pdfs\/string\.pdf$/)
})

for (const [name, change] of [
  ['empty targets', m => { m.targets = [] }],
  ['missing whole book', m => { m.targets.shift() }],
  ['duplicate target', m => { m.targets.push(m.targets[1]) }],
  ['wrong target type', m => { m.targets[1].type = 'page' }],
  ['blank title', m => { m.targets[1].title = ' ' }],
  ['invalid timestamp', m => { m.generatedAt = 'invalid' }],
  ['external URL', m => { m.targets[1].pdf.url = 'https://example.com/file.pdf' }],
  ['path traversal', m => { m.targets[1].id = '../string'; m.targets[1].pdf.url = 'pdfs/../string.pdf' }],
  ['wrong PDF target', m => { m.targets[1].pdf.url = 'pdfs/all.pdf' }],
  ['invalid byte count', m => { m.targets[1].pdf.bytes = -1 }],
  ['legacy templates', m => { m.templates = [] }],
]) {
  test(`${name} is rejected and a later valid response recovers`, async t => {
    let requests = 0
    const invalid = valid()
    change(invalid)
    const api = await loader(t, (_, res) => json(res, ++requests === 1 ? invalid : valid()))
    assert.equal(await api.loadManifest(), null)
    assert.deepEqual(await api.loadManifest(), valid())
  })
}

for (const status of [200, 404, 503]) {
  test(`invalid JSON or HTTP ${status} failure permits retry`, async t => {
    let requests = 0
    const api = await loader(t, (req, res) => {
      assert.equal(req.url, '/ohmyxcpc/pdfs/manifest.json')
      assert.match(req.headers['cache-control'], /max-age=0|no-cache/)
      if (++requests === 1) { res.writeHead(status); res.end('{'); return }
      json(res, valid())
    })
    assert.equal(await api.loadManifest(), null)
    assert.deepEqual(await api.loadManifest(), valid())
  })
}
