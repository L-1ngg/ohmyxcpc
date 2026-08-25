// 将站点内容经 Typst 导出为 PDF
// 用法:
//   node scripts/export-pdf.mjs                          # 整站 × 全部模板（含封面/目录）
//   node scripts/export-pdf.mjs graph                    # 单章节 × 全部模板
//   node scripts/export-pdf.mjs graph double             # 单章节 × 指定模板
//   node scripts/export-pdf.mjs graph/dinic standard     # 单页 × 指定模板
import { readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanContent, chapterGroup } from './lib/content.mjs'
import { composeBody, exportOne } from './pdf/exporter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content')
const templateDir = join(root, 'scripts/pdf/templates')
const buildDir = join(root, 'scripts/pdf/.build')
const outDir = join(root, 'pdf')

const [target, tplArg] = process.argv.slice(2)
const chapters = scanContent(contentDir)

// ---- 解析目标：整站 / 章节 / 单页 ----
let groups, headerTitle, cover = false
if (!target) {
  groups = chapters.map(chapterGroup)
  headerTitle = '整站合集'
  cover = true
} else if (chapters.some(c => c.dir === target)) {
  const c = chapters.find(c => c.dir === target)
  groups = [chapterGroup(c)]
  headerTitle = c.title
} else {
  for (const c of chapters) {
    const p = c.pages.find(p => `${c.dir}/${p.slug}` === target)
    if (p) {
      groups = [{ title: p.title, entries: [{ path: p.path, demote: false }] }]
      headerTitle = p.title
      break
    }
  }
  if (!groups) { console.error('没有匹配的内容:', target); process.exit(1) }
}

const templates = tplArg
  ? [tplArg]
  : readdirSync(templateDir).filter(d => existsSync(join(templateDir, d, 'template.typ')))
const name = (target ?? 'all').replaceAll('/', '-')

mkdirSync(outDir, { recursive: true })
rmSync(buildDir, { recursive: true, force: true })

const body = composeBody(groups, contentDir)
for (const tpl of templates) {
  await exportOne({ root, buildDir, outDir, name, headerTitle, body, templateId: tpl, templateDir, cover, preview: true })
  console.log(`完成: pdf/${name}.${tpl}.pdf`)
}
