import { defineConfig } from 'vitepress'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { scanContent } from '../scripts/lib/content.mjs'
import { expandSnippets } from '../scripts/lib/snippets.mjs'
import { cacheMarkdownRendering } from '../scripts/lib/markdown-cache.mjs'
import { pictureImages, webImagesPlugin } from '../scripts/lib/web-images.mjs'
import { searchPreloadPlugin } from '../scripts/lib/search-preload.mjs'

// 内容根目录（srcDir）
const srcDir = join(dirname(fileURLToPath(import.meta.url)), '../content')
const base = process.env.VITEPRESS_BASE || '/'
const vitepressDir = dirname(createRequire(import.meta.url).resolve('vitepress/package.json'))

// 扫描 content/ 自动生成 sidebar：一级子目录 = 章节，目录内 .md = 条目。
// 排序与收录规则见 scripts/lib/content.mjs（与 PDF 导出共用同一数据源）。
const chapters = scanContent(srcDir)
const sidebar = chapters.map(c => ({
  text: c.title,
  collapsed: false,
  ...(c.index ? { link: `/${c.dir}/` } : {}),
  items: c.pages.map(p => ({ text: p.title, link: `/${c.dir}/${p.slug}` }))
}))

export default defineConfig({
  title: 'OhMyXCPC',
  description: '面向 ICPC / CCPC 的现代 C++ 算法模板库：简明说明、清晰代码，支持在线搜索与整本 / 分章 PDF 下载。',
  srcDir: './content',
  // 部署到子路径（如 GitHub Pages 项目页）时由 CI 注入 VITEPRESS_BASE
  base,
  srcExclude: ['_inbox/**', 'snippets/**'],
  cleanUrls: true,
  markdown: {
    math: true,
    lineNumbers: true,
    config(md) {
      cacheMarkdownRendering(md)
      pictureImages(md, srcDir, base)
      md.core.ruler.before('normalize', 'shared-snippets', state => {
        state.src = expandSnippets(state.src, srcDir)
        const chapter = chapters.find(chapter => chapter.index === state.env.relativePath)
        if (chapter) {
          const items = chapter.pages.map(page => `- [${page.title.replace(/[\[\]]/g, '\\$&')}](./${page.slug})`)
          state.src += '\n\n## 算法条目\n\n' + items.join('\n') + '\n'
        }
      })
    }
  },
  vite: {
    plugins: [
      webImagesPlugin(srcDir),
      searchPreloadPlugin(join(vitepressDir, 'dist/client/theme-default/components/VPLocalSearchBox.vue'))
    ]
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '下载中心', link: '/export' },
      { text: '前言与致谢', link: '/preface' }
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/L-1ngg/ohmyxcpc' }
    ],
    search: { provider: 'local' }
  }
})
