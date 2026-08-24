import { defineConfig } from 'vitepress'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanContent } from '../scripts/lib/content.mjs'

// 内容根目录（srcDir）
const srcDir = join(dirname(fileURLToPath(import.meta.url)), '../content')

// 扫描 content/ 自动生成 sidebar：一级子目录 = 章节，目录内 .md = 条目。
// 排序与收录规则见 scripts/lib/content.mjs（与 PDF 导出共用同一数据源）。
const sidebar = scanContent(srcDir).map(c => ({
  text: c.title,
  collapsed: false,
  ...(c.index ? { link: `/${c.dir}/` } : {}),
  items: c.pages.map(p => ({ text: p.title, link: `/${c.dir}/${p.slug}` }))
}))

export default defineConfig({
  title: 'OhMyXCPC',
  description: 'XCPC 算法模板库',
  srcDir: './content',
  // 部署到子路径（如 GitHub Pages 项目页）时由 CI 注入 VITEPRESS_BASE
  base: process.env.VITEPRESS_BASE || '/',
  srcExclude: ['_inbox/**', 'snippets/**'],
  cleanUrls: true,
  markdown: {
    math: true,
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '下载中心', link: '/export' }
    ],
    sidebar,
    search: { provider: 'local' }
  }
})
