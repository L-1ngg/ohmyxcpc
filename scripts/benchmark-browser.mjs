import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { gzipSync } from 'node:zlib'
import { launchBrowser } from './lib/browser.mjs'
import { serveDist } from './lib/serve-dist.mjs'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, '.vitepress/dist')
const { site, close } = await serveDist(dist, process.env.VITEPRESS_BASE || '/')
let browser
try {
  browser = await launchBrowser()
  const results = []
  for (const mode of ['cold', '250ms', 'warm']) {
    const samples = []
    for (let sample = 0; sample < 3; sample++) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
      const page = await context.newPage()
      await page.goto(site + '/string/entry-002', { waitUntil: 'networkidle' })
      const session = await context.newCDPSession(page)
      await session.send('Network.enable')
      await session.send('Network.emulateNetworkConditions', { offline: false, latency: 120, downloadThroughput: 1_600_000 / 8, uploadThroughput: 1_600_000 / 8 })
      await session.send('Emulation.setCPUThrottlingRate', { rate: 4 })
      const button = page.locator('.VPNavBarSearch button')
      if (mode !== 'cold') {
        const finished = Promise.all([
          page.waitForResponse(response => response.url().includes('VPLocalSearchBox') && response.ok()).then(response => response.finished()),
          page.waitForResponse(response => response.url().includes('@localSearchIndexroot') && response.ok()).then(response => response.finished())
        ])
        await button.hover()
        if (mode === 'warm') await finished
        else await page.waitForTimeout(250)
      }
      const started = performance.now()
      await button.evaluate(element => element.click())
      await page.locator('.VPLocalSearchBox input').fill('kmp')
      await page.locator('.VPLocalSearchBox .result').first().waitFor()
      samples.push((performance.now() - started) / 1000)
      const titles = await page.locator('.VPLocalSearchBox .result').allTextContents()
      if (results.length) assert.deepEqual(titles, results[0])
      results.push(titles)
      await context.close()
    }
    console.log(JSON.stringify({ mode, samples, median: [...samples].sort((a, b) => a - b)[1], networkMbps: 1.6, latencyMs: 120, cpuSlowdown: 4 }))
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  const pdfRequests = []
  page.on('request', request => { if (request.url().endsWith('.pdf')) pdfRequests.push(request.url()) })
  await page.goto(site + '/export', { waitUntil: 'networkidle' })
  await page.locator('.ep-preview').waitFor()
  assert.equal(pdfRequests.length, 0)
  assert.equal(await page.locator('.ep-frame').count(), 0)
  console.log(JSON.stringify({ downloadCenterInitialPdfRequests: 0, downloadCenterInitialPdfBytes: 0 }))
  const chunks = join(dist, 'assets/chunks')
  for (const prefix of ['VPLocalSearchBox.', '@localSearchIndexroot.']) {
    const name = readdirSync(chunks).find(name => name.startsWith(prefix))
    const data = readFileSync(join(chunks, name))
    console.log(JSON.stringify({ resource: prefix, bytes: data.length, gzipBytes: gzipSync(data).length }))
  }
  console.log('PASS: all nine searches have identical results; no eager PDF preview')
  await context.close()
} finally {
  await browser?.close()
  await close()
}
