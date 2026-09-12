import { createServer } from 'node:http'
import { readFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { join, resolve, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { launchBrowser } from './lib/browser.mjs'
import { scanContent } from './lib/content.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.vitepress/dist')
const base = process.env.VITEPRESS_BASE || '/'
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.pdf': 'application/pdf' }
const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  if (base !== '/' && path.startsWith(base)) path = '/' + path.slice(base.length)
  for (const candidate of [path, path + '.html', join(path, 'index.html')]) {
    const file = resolve(dist, '.' + (candidate.startsWith('/') ? candidate : '/' + candidate))
    if (file.startsWith(dist + '/') && existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { 'content-type': mime[extname(file)] ?? 'application/octet-stream' })
      return res.end(readFileSync(file))
    }
  }
  res.writeHead(404).end('Not found')
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`
const site = origin + (base === '/' ? '' : base.replace(/\/$/, ''))
const failures = [], runtimeErrors = []
const check = (name, ok) => { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failures.push(name) }
let browser
try {
  browser = await launchBrowser()
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'] })
  const page = await context.newPage()
  page.on('pageerror', error => runtimeErrors.push(error.message))
  const manifest = JSON.parse(readFileSync(join(dist, 'pdfs/manifest.json'), 'utf8'))
  const chapters = scanContent(join(root, 'content'))
  const chapter = chapters.find(chapter => chapter.dir === 'string')
  const entry = chapter.pages.find(entry => entry.title === 'kmp')
  await page.goto(`${site}/string/`, { waitUntil: 'networkidle' })
  check('章节首页列出算法条目', await page.locator('.vp-doc a[href*="entry-"]').count() === chapter.pages.length)
  check('整本和全部章节各一份 PDF', manifest.targets.length === chapters.length + 1 && manifest.targets.every(target => ['site', 'chapter'].includes(target.type) && target.pdf && !target.pdfs))
  check('无旧模板清单', !('templates' in manifest))
  for (const target of manifest.targets) {
    const response = await context.request.get(`${site}/${target.pdf.url}`)
    check(`${target.id} 下载有效 PDF`, response.ok() && (await response.body()).subarray(0, 5).toString() === '%PDF-')
  }

  await page.goto(site + '/export', { waitUntil: 'networkidle' })
  await page.waitForSelector('.ep-frame')
  check('默认整本预览', (await page.locator('.ep-frame').getAttribute('src')).endsWith('/pdfs/all.pdf'))
  check('只显示整本与章节', await page.locator('.ep-item').count() === chapters.length + 1)
  check('没有版式切换与单条 PDF', await page.locator('.ep-seg, .ep-page').count() === 0)
  check('下载中心无文档侧栏', await page.locator('.VPSidebar, .VPDocAside').count() === 0)
  await page.locator('.ep-chapter').filter({ hasText: /^串$/ }).click()
  check('选择章节同步预览与 URL', (await page.locator('.ep-frame').getAttribute('src')).endsWith('/pdfs/string.pdf') && new URL(page.url()).searchParams.get('target') === 'string')
  mkdirSync(join(root, 'pdf/verification'), { recursive: true })
  if (process.env.HEADED === '1') await page.waitForTimeout(2000)
  await page.screenshot({ path: join(root, 'pdf/verification/export-desktop.png') })
  await page.goto(site + '/export?target=does-not-exist&tpl=double', { waitUntil: 'networkidle' })
  check('无效旧参数仍有可用默认预览', (await page.locator('.ep-frame').getAttribute('src')).endsWith('/pdfs/all.pdf'))

  await page.goto(`${site}/${chapter.dir}/${entry.slug}`, { waitUntil: 'networkidle' })
  check('算法独立页面及标题', (await page.locator('.vp-doc h1').innerText()).includes('kmp'))
  check('公式正常渲染', await page.locator('.vp-doc mjx-container').count() > 0 && await page.locator('.vp-doc [data-mjx-error]').count() === 0)
  const code = page.locator('.vp-doc div[class*="language-"]').first()
  await code.hover()
  await code.locator('button.copy').click()
  const copied = await page.evaluate(() => navigator.clipboard.readText())
  check('复制算法展示区域', copied.includes('std::vector<int> get_next') && !copied.includes('@book-') && !copied.includes('#include'))
  check('章节卡片只有一个下载链接', await page.locator('.chapter-pdf .cp-actions a').count() === 1)
  check('章节卡片指向本章', (await page.locator('.chapter-pdf .cp-actions a').getAttribute('href')).endsWith('/pdfs/string.pdf'))
  await page.screenshot({ path: join(root, 'pdf/verification/algorithm-desktop.png') })

  await page.locator('.VPNavBarSearch button').click()
  await page.waitForSelector('.VPLocalSearchBox input')
  await page.locator('.VPLocalSearchBox input').fill('kmp')
  await page.waitForSelector('.VPLocalSearchBox .result')
  check('搜索命中新算法页面', (await page.locator('.VPLocalSearchBox').innerText()).toLowerCase().includes('kmp'))
  await page.locator('.VPLocalSearchBox .result').first().click()
  await page.waitForURL(url => url.pathname.endsWith(`/string/${entry.slug}`))
  check('搜索结果跳转到算法页面', (await page.locator('.vp-doc h1').innerText()).includes('kmp'))

  await page.goto(`${site}/string/entry-001`, { waitUntil: 'networkidle' })
  check('Markdown 表格实际显示', await page.locator('.vp-doc table').isVisible() && await page.locator('.vp-doc table th').count() > 0 && await page.locator('.vp-doc table td').count() > 0)

  const imageChapter = chapters.find(chapter => chapter.dir === 'graph')
  const imageEntry = imageChapter.pages.find(entry => readFileSync(join(root, 'content', entry.path), 'utf8').includes('](/images/'))
  await page.goto(`${site}/graph/${imageEntry.slug}`, { waitUntil: 'networkidle' })
  check('来源图片实际加载', await page.locator('.vp-doc img').evaluateAll(images => images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0)))
  const internal = page.locator('.vp-doc a[href*="#s-"]').filter({ hasText: /./ }).first()
  if (await internal.count()) {
    await internal.click()
    await page.waitForTimeout(300)
    check('内部引用目标存在', await page.evaluate(() => !!document.getElementById(decodeURIComponent(location.hash.slice(1)))))
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(site + '/export?target=string', { waitUntil: 'networkidle' })
  check('移动端目录初始折叠', !await page.locator('.ep-catalog').isVisible())
  await page.locator('.ep-catalog-toggle').click()
  check('移动端可展开目录', await page.locator('.ep-catalog').isVisible())
  await page.locator('.ep-site').click()
  check('移动端选择后收起', !await page.locator('.ep-catalog').isVisible())
  check('移动端无页面横向溢出', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  if (process.env.HEADED === '1') await page.waitForTimeout(2000)
  await page.screenshot({ path: join(root, 'pdf/verification/export-mobile.png') })
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    for (const [path, container, link] of [
      ['/export?target=string', '.ep', '.ep-dl'],
      [`/${chapter.dir}/${entry.slug}`, '.chapter-pdf', '.cp-actions a'],
    ]) {
      // The mobile layout hides the chapter aside; its desktop behavior is checked above.
      if (viewport.width < 768 && container === '.chapter-pdf') continue
      for (const failure of ['network', 'legacy']) {
        let recover = false
        await page.route('**/pdfs/manifest.json', route => {
          if (recover) return route.continue()
          if (failure === 'network') return route.abort('failed')
          return route.fulfill({ json: { generatedAt: manifest.generatedAt, targets: [{ id: 'all', type: 'site', pdfs: {} }] } })
        })
        await page.goto(site + path, { waitUntil: 'networkidle' })
        const panel = page.locator(container)
        const retry = panel.getByRole('button', { name: '重试', exact: true })
        await retry.waitFor({ state: 'visible' })
        check(`${viewport.width} ${container} ${failure} 无损坏下载入口`, await panel.locator(link).count() === 0)
        recover = true
        await retry.click()
        await panel.locator(link).waitFor({ state: 'visible' })
        check(`${viewport.width} ${container} ${failure} 重试恢复章节链接`, (await panel.locator(link).getAttribute('href')) === `${base}pdfs/string.pdf`)
        await page.unroute('**/pdfs/manifest.json')
      }
    }
  }
  check('无页面运行异常', runtimeErrors.length === 0)
} catch (error) {
  failures.push(error.stack ?? String(error))
} finally {
  await browser?.close()
  await new Promise(resolve => server.close(resolve))
}
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
}
