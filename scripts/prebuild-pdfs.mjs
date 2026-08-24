// 预生成全量 PDF 矩阵（整站 + 每章节 + 每页面 × 全部模板）与 manifest.json
// 产物写入 content/public/pdfs/，随站点构建一同部署（应先于 vitepress build 执行）
import { readdirSync, readFileSync, existsSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanContent, chapterGroup } from './lib/content.mjs'
import { composeBody, exportOne } from './pdf/exporter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content')
const templateDir = join(root, 'scripts/pdf/templates')
const buildDir = join(root, 'scripts/pdf/.build')
const outDir = join(root, 'content/public/pdfs')

const chapters = scanContent(contentDir)
const templates = readdirSync(templateDir)
  .filter(d => existsSync(join(templateDir, d, 'template.typ')) && existsSync(join(templateDir, d, 'meta.json')))
  .map(id => ({ id, ...JSON.parse(readFileSync(join(templateDir, id, 'meta.json'), 'utf8')) }))

// 目标清单：整站 + 每章节 + 每页面
const targets = [
  { id: 'all', type: 'site', title: '整站合集', groups: chapters.map(chapterGroup) },
  ...chapters.map(c => ({ id: c.dir, type: 'chapter', title: c.title, groups: [chapterGroup(c)] })),
  ...chapters.flatMap(c => c.pages.map(p => ({
    id: `${c.dir}/${p.slug}`,
    type: 'page',
    title: p.title,
    chapter: c.title,
    groups: [{ title: p.title, entries: [{ path: p.path, demote: false }] }]
  })))
]

rmSync(outDir, { recursive: true, force: true })
rmSync(buildDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const manifest = { generatedAt: new Date().toISOString(), templates, targets: [] }
for (const t of targets) {
  const body = composeBody(t.groups, contentDir)
  const name = t.id.replaceAll('/', '-')
  const pdfs = {}
  for (const tpl of templates) {
    const { bytes } = exportOne({
      root, buildDir, outDir, name, headerTitle: t.title, body,
      templateId: tpl.id, templateDir, cover: t.type === 'site', preview: false
    })
    pdfs[tpl.id] = { url: `pdfs/${name}.${tpl.id}.pdf`, bytes }
  }
  manifest.targets.push({ id: t.id, type: t.type, title: t.title, ...(t.chapter ? { chapter: t.chapter } : {}), pdfs })
  console.log('✓', t.id)
}
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`完成：${targets.length} 个目标 × ${templates.length} 个模板 → content/public/pdfs/`)
