import { readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'

export function launchBrowser() {
  let executablePath = process.env.CHROMIUM_PATH
  if (!executablePath) {
    const cache = join(process.env.HOME, '.cache/ms-playwright')
    for (const dir of (existsSync(cache) ? readdirSync(cache) : []).filter(dir => dir.startsWith('chromium_headless_shell')).reverse()) {
      for (const file of ['chrome-linux/headless_shell', 'chrome-headless-shell-linux64/chrome-headless-shell']) {
        const path = join(cache, dir, file)
        if (existsSync(path)) { executablePath = path; break }
      }
      if (executablePath) break
    }
  }
  if (!executablePath) throw new Error('Set CHROMIUM_PATH or install Chromium with Playwright')
  return chromium.launch({ executablePath, headless: process.env.HEADED !== '1' })
}
