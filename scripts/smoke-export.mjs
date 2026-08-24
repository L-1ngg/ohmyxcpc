// 导出功能冒烟测试：下载中心页 + 章节卡片 + 入口
// 前置：pnpm prebuild:pdf && pnpm build
import { createServer } from 'node:http'
import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { join, resolve, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, '.vitepress/dist')

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.json': 'application/json', '.pdf': 'application/pdf', '.webp': 'image/webp' }
const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  for (const cand of [p, p + '.html', join(p, 'index.html')]) {
    const file = join(distDir, cand)
    if (existsSync(file) && !file.endsWith('/')) {
      res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
      return res.end(readFileSync(file))
    }
  }
  res.writeHead(404); res.end('not found')
})
await new Promise(r => server.listen(0, r))
const origin = `http://127.0.0.1:${server.address().port}`

const shellDir = join(process.env.HOME, '.cache/ms-playwright')
const exe = process.env.CHROMIUM_PATH ?? readdirSync(shellDir)
  .filter(d => d.startsWith('chromium_headless_shell'))
  .map(d => join(shellDir, d, 'chrome-linux/headless_shell'))[0]

const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage()
const fails = []
const check = (name, ok) => { console.log(ok ? '✓' : '✗', name); if (!ok) fails.push(name) }

// 1. 入口：导航链接 + 首页 hero
await page.goto(origin + '/', { waitUntil: 'networkidle' })
check('导航栏存在「下载中心」', await page.locator('nav a:has-text("下载中心")').count() >= 1)
check('首页 hero 存在「下载整站 PDF」', await page.locator('a:has-text("下载整站 PDF")').count() >= 1)

// 2. 下载中心页：默认整站 + standard
await page.goto(origin + '/export', { waitUntil: 'networkidle' })
await page.waitForSelector('.ec-frame', { timeout: 5000 }).catch(() => {})
check('下载中心渲染目标树', (await page.locator('.ec-item').count()) >= 8)
let src = await page.locator('.ec-frame').getAttribute('src').catch(() => '')
check('默认预览整站单栏版', !!src?.includes('all.standard.pdf'))

// 3. URL 参数直达：?target=graph&tpl=double
await page.goto(origin + '/export?target=graph&tpl=double', { waitUntil: 'networkidle' })
await page.waitForSelector('.ec-frame', { timeout: 5000 }).catch(() => {})
src = await page.locator('.ec-frame').getAttribute('src').catch(() => '')
check('参数直达 graph + 双栏', !!src?.includes('graph.double.pdf'))
check('URL 参数选中态正确', await page.locator('.ec-item.on').first().textContent() === '图论')
mkdirSync(join(root, 'pdf'), { recursive: true })
await page.screenshot({ path: join(root, 'pdf/export-center.png'), fullPage: false })

// 4. 章节内固定卡片
await page.goto(origin + '/graph/dinic', { waitUntil: 'networkidle' })
const card = page.locator('.chapter-pdf')
check('条目页存在章节卡片', await card.count() === 1)
check('卡片标题含章节名', (await card.locator('.cp-title').textContent())?.includes('图论') ?? false)
const hrefs = await card.locator('.cp-actions a').evaluateAll(els => els.map(e => e.getAttribute('href')))
check('卡片含两个模板下载链接', hrefs.some(h => h?.includes('graph.standard.pdf')) && hrefs.some(h => h?.includes('graph.double.pdf')))
await page.screenshot({ path: join(root, 'pdf/chapter-card.png') })

await browser.close()
server.close()
console.log(fails.length ? `失败 ${fails.length} 项: ${fails.join(', ')}` : '全部通过')
process.exit(fails.length ? 1 : 0)
