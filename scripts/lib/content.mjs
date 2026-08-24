// content/ 目录扫描：站点 sidebar 与 PDF 导出共用的唯一数据源
// 收录规则：content/ 一级子目录 = 章节；`_`/`.` 开头目录与 snippets/ 不收录
// 排序规则：frontmatter `order` 升序（缺省排最后），其次按标题，再其次按目录/文件名
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// 解析 frontmatter 中的 title / order（仅支持简单标量，符合本站内容规范）
export function parseMeta(src) {
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const get = k => fm.match(new RegExp(`^${k}:\\s*(.+)\\s*$`, 'm'))?.[1].replace(/^["']|["']$/g, '')
  const order = parseFloat(get('order') ?? '')
  return { title: get('title') || null, order: Number.isFinite(order) ? order : null }
}

// 显示名：frontmatter title → 首个一级标题 → fallback
export function titleOf(src, fallback) {
  return parseMeta(src).title || src.match(/^#\s+(.+)$/m)?.[1].trim() || fallback
}

const EXCLUDED = name => /^[._]/.test(name) || name === 'snippets' || name === 'public'

const cmp = (a, b) =>
  (a.order ?? 1e9) - (b.order ?? 1e9) ||
  a.title.localeCompare(b.title, 'zh') ||
  (a.dir ?? a.slug).localeCompare(b.dir ?? b.slug)

// 返回章节数组（已排序）：
// [{ dir, title, order, index: 'graph/index.md'|null,
//    pages: [{ path: 'graph/dinic.md', slug: 'dinic', title, order }] }]
export function scanContent(contentDir) {
  return readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !EXCLUDED(d.name))
    .map(d => {
      const dir = join(contentDir, d.name)
      const files = readdirSync(dir).filter(f => f.endsWith('.md'))
      const read = f => readFileSync(join(dir, f), 'utf8')
      const index = files.includes('index.md') ? `${d.name}/index.md` : null
      const title = index ? titleOf(read('index.md'), d.name) : d.name
      const order = index ? parseMeta(read('index.md')).order : null
      const pages = files
        .filter(f => f !== 'index.md')
        .map(f => {
          const src = read(f)
          const meta = parseMeta(src)
          return {
            path: `${d.name}/${f}`,
            slug: f.replace(/\.md$/, ''),
            title: titleOf(src, f.replace(/\.md$/, '')),
            order: meta.order
          }
        })
        .sort(cmp)
      return { dir: d.name, title, order, index, pages }
    })
    .sort(cmp)
}

// 章节 → 导出分组：index 在最前（标题不降级），条目按 order 排序（标题降一级，形成目录/书签层级）
export const chapterGroup = c => ({
  title: c.title,
  entries: [
    ...(c.index ? [{ path: c.index, demote: false }] : []),
    ...c.pages.map(p => ({ path: p.path, demote: true }))
  ]
})
