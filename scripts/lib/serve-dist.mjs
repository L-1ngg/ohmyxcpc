import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'
import { gzipSync } from 'node:zlib'

export async function serveDist(dist, base = '/') {
  const compressed = new Map()
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.pdf': 'application/pdf' }
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (base !== '/' && path.startsWith(base)) path = '/' + path.slice(base.length)
    for (const candidate of [path, path + '.html', join(path, 'index.html')]) {
      const file = resolve(dist, '.' + (candidate.startsWith('/') ? candidate : '/' + candidate))
      if (file.startsWith(dist + '/') && existsSync(file) && statSync(file).isFile()) {
        const compress = /\.(html|js|css|json|svg)$/.test(file) && req.headers['accept-encoding']?.includes('gzip')
        if (compress && !compressed.has(file)) compressed.set(file, gzipSync(readFileSync(file)))
        res.writeHead(200, {
          'content-type': mime[extname(file)] ?? 'application/octet-stream',
          'cache-control': 'public, max-age=3600', 'vary': 'Accept-Encoding',
          ...(compress ? { 'content-encoding': 'gzip' } : {})
        })
        return res.end(compress ? compressed.get(file) : readFileSync(file))
      }
    }
    res.writeHead(404).end('Not found')
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const origin = `http://127.0.0.1:${server.address().port}`
  return { site: origin + (base === '/' ? '' : base.replace(/\/$/, '')), close: () => new Promise(resolve => server.close(resolve)) }
}
