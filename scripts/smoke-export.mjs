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

// 从 manifest 动态选取测试目标（不硬编码具体页面，内容变化不影响测试）
const manifest = JSON.parse(readFileSync(join(distDir, 'pdfs/manifest.json'), 'utf8'))
const samplePage = manifest.targets.find(t => t.type === 'page')
const sampleChapter = manifest.targets.find(t => t.type === 'chapter' && t.id === samplePage.id.split('/')[0])
const stdTpl = manifest.templates.find(t => t.id === 'standard')?.id ?? manifest.templates[0].id
const dblTpl = manifest.templates.find(t => t.id === 'double')?.id ?? manifest.templates[1].id

// 1. 入口：导航链接 + 首页 hero
await page.goto(origin + '/', { waitUntil: 'networkidle' })
check('导航栏存在「下载中心」', await page.locator('nav a:has-text("下载中心")').count() >= 1)
check('首页 hero 存在「下载整站 PDF」', await page.locator('a:has-text("下载整站 PDF")').count() >= 1)

// 2. 下载中心页：默认整站 + standard，且无站点侧栏/大纲
await page.goto(origin + '/export', { waitUntil: 'networkidle' })
await page.waitForSelector('.ep-frame', { timeout: 8000 }).catch(() => {})
check('下载中心无站点侧栏与大纲', await page.locator('.VPSidebar, .VPDocAside').count() === 0)
check('下载中心渲染目标树', (await page.locator('.ep-item').count()) >= manifest.targets.length - 1)
let src = await page.locator('.ep-frame').getAttribute('src').catch(() => '')
check('默认预览整站单栏版', !!src?.includes(`all.${stdTpl}.pdf`))

// 3. URL 参数直达：?target=<章节>&tpl=double
await page.goto(`${origin}/export?target=${sampleChapter.id}&tpl=${dblTpl}`, { waitUntil: 'networkidle' })
await page.waitForSelector('.ep-frame', { timeout: 8000 }).catch(() => {})
src = await page.locator('.ep-frame').getAttribute('src').catch(() => '')
check('参数直达 章节 + 双栏', !!src?.includes(`${sampleChapter.id}.${dblTpl}.pdf`))
check('URL 参数选中态正确', (await page.locator('.ep-item.on').first().textContent()) === sampleChapter.title)
mkdirSync(join(root, 'pdf'), { recursive: true })
await page.screenshot({ path: join(root, 'pdf/export-center.png'), fullPage: false })

// 4. 章节内固定卡片
await page.goto(`${origin}/${samplePage.id}`, { waitUntil: 'networkidle' })
await page.waitForSelector('.chapter-pdf', { timeout: 8000 }).catch(() => {})
const card = page.locator('.chapter-pdf')
check('条目页存在章节卡片', await card.count() === 1)
check('卡片标题含章节名', (await card.locator('.cp-title').textContent())?.includes(sampleChapter.title) ?? false)
const hrefs = await card.locator('.cp-actions a').evaluateAll(els => els.map(e => e.getAttribute('href')))
check('卡片含两个模板下载链接',
  hrefs.some(h => h?.includes(`${sampleChapter.id}.${stdTpl}.pdf`)) && hrefs.some(h => h?.includes(`${sampleChapter.id}.${dblTpl}.pdf`)))
await page.screenshot({ path: join(root, 'pdf/chapter-card.png') })

// 5. 移动端：目录默认折叠，点击展开，选择后自动收起
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(origin + '/export', { waitUntil: 'networkidle' })
await page.waitForSelector('.ep-frame', { timeout: 8000 }).catch(() => {})
check('移动端目录默认折叠', !(await page.locator('.ep-catalog').isVisible()))
await page.locator('.ep-catalog-toggle').click()
check('移动端目录可展开', await page.locator('.ep-catalog.open').isVisible())
await page.locator('.ep-catalog .ep-item').nth(1).click()
check('移动端选择后目录自动收起', !(await page.locator('.ep-catalog').isVisible()))
await page.screenshot({ path: join(root, 'pdf/export-mobile.png') })

await browser.close()
server.close()
console.log(fails.length ? `失败 ${fails.length} 项: ${fails.join(', ')}` : '全部通过')
process.exit(fails.length ? 1 : 0)
