import { readFileSync, mkdirSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { launchBrowser } from './lib/browser.mjs'
import { scanContent } from './lib/content.mjs'
import { serveDist } from './lib/serve-dist.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.vitepress/dist')
const base = process.env.VITEPRESS_BASE || '/'
const { site, close } = await serveDist(dist, base)
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

  const pdfRequests = []
  const recordPdf = request => { if (request.url().endsWith('.pdf')) pdfRequests.push(request.url()) }
  page.on('request', recordPdf)
  await page.goto(site + '/export', { waitUntil: 'networkidle' })
  await page.waitForSelector('.ep-preview')
  check('普通进入下载中心不创建 iframe、不请求 PDF', await page.locator('.ep-frame').count() === 0 && pdfRequests.length === 0)
  mkdirSync(join(root, 'pdf/verification'), { recursive: true })
  await page.screenshot({ path: join(root, 'pdf/verification/export-desktop-idle.png') })
  await page.locator('.ep-preview').click()
  await page.waitForSelector('.ep-frame')
  check('点击后预览整本', (await page.locator('.ep-frame').getAttribute('src')).endsWith('/pdfs/all.pdf'))
  check('只显示整本与章节', await page.locator('.ep-item').count() === chapters.length + 1)
  check('没有版式切换与单条 PDF', await page.locator('.ep-seg, .ep-page').count() === 0)
  check('下载中心无文档侧栏', await page.locator('.VPSidebar, .VPDocAside').count() === 0)
  await page.locator('.ep-chapter').filter({ hasText: /^串$/ }).click()
  check('选择章节同步 URL，等待预览操作', await page.locator('.ep-frame').count() === 0 && new URL(page.url()).searchParams.get('target') === 'string')
  await page.locator('.ep-preview').click()
  check('点击后预览所选章节', (await page.locator('.ep-frame').getAttribute('src')).endsWith('/pdfs/string.pdf'))
  await page.waitForLoadState('networkidle')
  if (process.env.HEADED === '1') await page.waitForTimeout(2000)
  await page.screenshot({ path: join(root, 'pdf/verification/export-desktop.png') })
  await page.goto(site + '/export?target=does-not-exist&tpl=double', { waitUntil: 'networkidle' })
  check('无效旧参数仍有默认下载入口，不自动预览', (await page.locator('.ep-dl').getAttribute('href')).endsWith('/pdfs/all.pdf') && await page.locator('.ep-frame').count() === 0)
  page.off('request', recordPdf)

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
  check('章节预览链接显式请求自动预览', (await page.locator('.cp-more').getAttribute('href')).endsWith('/export?target=string&preview=1'))
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
  check('网页实际选择 WebP，保留 PNG 回退', await page.locator('.vp-doc picture img').evaluateAll(images => images.length > 0 && images.every(image => image.currentSrc.endsWith('.webp') && image.src.endsWith('.png'))))
  await page.locator('.vp-doc picture').first().scrollIntoViewIfNeeded()
  await page.screenshot({ path: join(root, 'pdf/verification/images-desktop.png') })
  const pixels = await page.evaluate(async base => {
    const decode = async url => {
      const image = new Image()
      image.src = url
      await image.decode()
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0)
      return { width: canvas.width, height: canvas.height, data: ctx.getImageData(0, 0, canvas.width, canvas.height).data }
    }
    const png = await decode(base + 'images/img-09.png'), webp = await decode(base + 'images/img-09.webp')
    return png.width === webp.width && png.height === webp.height && png.data.every((value, i) => value === webp.data[i])
  }, site + '/')
  check('浏览器 Canvas 原图与 WebP 尺寸和像素一致', pixels)
  await page.locator('.vp-doc picture source').evaluateAll(sources => sources.forEach(source => source.type = 'image/unsupported'))
  await page.waitForFunction(() => [...document.querySelectorAll('.vp-doc picture img')].every(image => image.complete && image.naturalWidth > 0 && image.currentSrc.endsWith('.png')))
  check('不支持 WebP 时 PNG 回退正常显示', await page.locator('.vp-doc picture img').evaluateAll(images => images.every(image => image.currentSrc.endsWith('.png'))))
  const internal = page.locator('.vp-doc a[href*="#s-"]').filter({ hasText: /./ }).first()
  if (await internal.count()) {
    await internal.click()
    await page.waitForTimeout(300)
    check('内部引用目标存在', await page.evaluate(() => !!document.getElementById(decodeURIComponent(location.hash.slice(1)))))
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${site}/graph/${imageEntry.slug}`, { waitUntil: 'networkidle' })
  check('移动端 WebP 实际显示且没有页面溢出', await page.locator('.vp-doc picture img').evaluateAll(images => images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0 && image.currentSrc.endsWith('.webp'))) && await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  await page.locator('.vp-doc picture').first().scrollIntoViewIfNeeded()
  await page.screenshot({ path: join(root, 'pdf/verification/images-mobile.png') })
  await page.goto(site + '/export?target=string&preview=1', { waitUntil: 'networkidle' })
  check('章节直达自动预览', (await page.locator('.ep-frame').getAttribute('src')).endsWith('/pdfs/string.pdf'))
  await page.screenshot({ path: join(root, 'pdf/verification/export-mobile-preview.png') })
  check('移动端目录初始折叠', !await page.locator('.ep-catalog').isVisible())
  await page.locator('.ep-catalog-toggle').click()
  check('移动端可展开目录', await page.locator('.ep-catalog').isVisible())
  await page.locator('.ep-site').click()
  check('移动端选择后收起', !await page.locator('.ep-catalog').isVisible())
  check('移动端无页面横向溢出', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  if (process.env.HEADED === '1') await page.waitForTimeout(2000)
  await page.screenshot({ path: join(root, 'pdf/verification/export-mobile.png') })
  for (const trigger of ['pointer', 'focus', 'touch', 'direct', 'shortcut', 'failure', 'component-failure', 'failure-retry']) {
    const searchContext = await browser.newContext({ viewport: trigger === 'touch' ? { width: 390, height: 844 } : { width: 1440, height: 1000 }, hasTouch: trigger === 'touch' })
    const searchPage = await searchContext.newPage()
    const requests = []
    searchPage.on('pageerror', error => runtimeErrors.push(error.message))
    searchPage.on('request', request => { if (/VPLocalSearchBox|@localSearchIndex/.test(request.url())) requests.push(request.url()) })
    let failed = false
    if (trigger.includes('failure')) {
      await searchPage.route(trigger === 'component-failure' ? '**/*VPLocalSearchBox*.js' : '**/*localSearchIndexroot*.js', route => {
        if (!failed) {
          failed = true
          return trigger === 'failure-retry' ? route.fulfill({ status: 503, body: 'unavailable' }) : route.abort('failed')
        }
        return route.continue()
      })
    }
    await searchPage.goto(`${site}/string/${entry.slug}`, { waitUntil: 'networkidle' })
    check(`搜索 ${trigger} 初始不加载组件和索引`, requests.length === 0)
    const button = searchPage.locator('.VPNavBarSearch button')
    if (['pointer', 'focus', 'touch'].includes(trigger) || trigger.includes('failure')) {
      if (trigger === 'focus') await button.focus()
      else if (trigger === 'touch') await button.dispatchEvent('touchstart')
      else await button.hover()
      await searchPage.waitForTimeout(400)
      check(`搜索 ${trigger} 预热组件与当前语言索引`, requests.some(url => url.includes('VPLocalSearchBox')) && requests.some(url => url.includes('@localSearchIndexroot')))
      check(`搜索 ${trigger} 预热不打开或抢焦点`, await searchPage.locator('.VPLocalSearchBox').count() === 0 && !await searchPage.locator('.VPLocalSearchBox input').count())
      if (!trigger.includes('failure')) {
        const count = requests.length
        await button.dispatchEvent('pointerover')
        await button.dispatchEvent('focusin')
        await button.dispatchEvent('touchstart')
        await searchPage.waitForTimeout(100)
        check(`搜索 ${trigger} 重复触发复用任务`, requests.length === count)
      }
      if (trigger === 'failure-retry') {
        const count = requests.length
        await button.dispatchEvent('pointerover')
        await searchPage.waitForTimeout(200)
        check('搜索失败后再次触发会重试索引预热', requests.length === count + 1)
      }
    }
    if (trigger === 'shortcut') await searchPage.keyboard.press('Control+k')
    else await button.evaluate(element => element.click())
    await searchPage.locator('.VPLocalSearchBox input').fill('kmp')
    await searchPage.locator('.VPLocalSearchBox .result').first().waitFor()
    const result = searchPage.locator('.VPLocalSearchBox .result').first()
    check(`搜索 ${trigger} 首次结果一致`, (await result.innerText()).toLowerCase().includes('kmp'))
    await result.click()
    await searchPage.waitForURL(url => url.pathname.endsWith(`/string/${entry.slug}`))
    check(`搜索 ${trigger} 跳转正常`, (await searchPage.locator('.vp-doc h1').innerText()).includes('kmp'))
    await searchContext.close()
  }
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
  await close()
}
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
}
