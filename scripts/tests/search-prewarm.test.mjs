import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
import { searchPreloadPlugin } from '../lib/search-preload.mjs'

test('resource URLs are emitted by Rollup for configured locales and use Vite endpoints in development', async () => {
  const plugin = searchPreloadPlugin('/native/VPLocalSearchBox.vue')
  const config = { command: 'build', build: {}, vitepress: { site: { locales: { root: {}, en: {} } } } }
  plugin.configResolved(config)
  const ids = []
  let indexed = false
  const context = {
    resolve: async () => ({ id: '/@localSearchIndex' }),
    load: async () => { indexed = true },
    emitFile: file => { assert.ok(indexed); ids.push(file.id); return String(ids.length) }
  }
  const code = await plugin.load.call(context, plugin.resolveId('@ohmyxcpc/search-preload'))
  assert.deepEqual(ids, ['/native/VPLocalSearchBox.vue', '@localSearchIndexroot', '@localSearchIndexen'])
  assert.match(code, /import.meta.ROLLUP_FILE_URL_1/)
  config.vitepress.site.locales = {}
  const implicitRoot = []
  await plugin.load.call({ ...context, emitFile: file => { implicitRoot.push(file.id); return String(implicitRoot.length) } }, plugin.resolveId('@ohmyxcpc/search-preload'))
  assert.deepEqual(implicitRoot, ['/native/VPLocalSearchBox.vue', '@localSearchIndexroot'])
  config.vitepress.site.locales = { root: {}, en: {} }
  config.command = 'serve'
  const dev = await plugin.load(plugin.resolveId('@ohmyxcpc/search-preload'))
  assert.match(dev, /\/@fs\/native\/VPLocalSearchBox\.vue/)
  assert.match(dev, /\/@localSearchIndexen/)
  config.build.ssr = true
  assert.match(await plugin.load(plugin.resolveId('@ohmyxcpc/search-preload')), /indexes: \{\}/)
})

test('prewarm shares pending tasks, fetches only the current locale, and retries HTTP or network failures', async t => {
  const requests = []
  let fail = true
  const server = createServer((req, res) => {
    requests.push(req.url)
    if (fail && req.url === '/en.js') return res.writeHead(503).end('try again')
    if (fail && req.url === '/component.js') return req.socket.destroy()
    // Prewarming downloads bytes without evaluating the native component or opening it.
    res.writeHead(200, { 'content-type': 'text/javascript' })
    res.end('throw new Error("must not evaluate during prewarm");')
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  t.after(() => new Promise(resolve => server.close(resolve)))
  const origin = `http://127.0.0.1:${server.address().port}`
  const adapter = 'data:text/javascript,' + encodeURIComponent(`export default ${JSON.stringify({ component: origin + '/component.js', indexes: { root: origin + '/root.js', en: origin + '/en.js' } })}`)
  const source = readFileSync(new URL('../../.vitepress/theme/search-prewarm.ts', import.meta.url), 'utf8')
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
  const api = await import('data:text/javascript,' + encodeURIComponent(js.replace(/from ['"]@ohmyxcpc\/search-preload['"]/, `from ${JSON.stringify(adapter)}`)))
  await Promise.all(Array.from({ length: 8 }, () => api.prewarmSearch('en')))
  assert.deepEqual(requests.sort(), ['/component.js', '/en.js'])
  fail = false
  await api.prewarmSearch('en')
  assert.deepEqual(requests.sort(), ['/component.js', '/component.js', '/en.js', '/en.js'])
  await Promise.all(Array.from({ length: 8 }, () => api.prewarmSearch('en')))
  assert.equal(requests.length, 4)
  await api.prewarmSearch('root')
  assert.equal(requests.length, 5)
  assert.equal(requests.at(-1), '/root.js')
  await api.prewarmSearch('unknown')
  assert.equal(requests.length, 5)
})
