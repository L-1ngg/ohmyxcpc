// 预生成全量 PDF 矩阵（整站 + 每章节 + 每页面 × 全部模板）与 manifest.json
// 产物写入 content/public/pdfs/，随站点构建一同部署（应先于 vitepress build 执行）
// 并发编译；任一目标失败则列出清单并以非零码退出（宁缺毋滥，不静默缺页）
import { readdirSync, readFileSync, existsSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableParallelism } from 'node:os'
import { scanContent, chapterGroup } from './lib/content.mjs'
import { composeBody, exportOne } from './pdf/exporter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content')
const templateDir = join(root, 'scripts/pdf/templates')
const buildDir = join(root, 'scripts/pdf/.build')
const outDir = join(root, 'content/public/pdfs')
const CONCURRENCY = Math.min(8, availableParallelism())

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

// 每个目标只组装一次正文，模板间复用
const jobs = targets.flatMap(t => {
  const body = composeBody(t.groups, contentDir)
  const name = t.id.replaceAll('/', '-')
  return templates.map(tpl => ({ t, tpl, body, name }))
})

console.log(`开始预生成：${targets.length} 个目标 × ${templates.length} 个模板（并发 ${CONCURRENCY}）`)
const t0 = Date.now()
let done = 0
const failures = []
const results = new Map() // targetId -> { pdfs }

let cursor = 0
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (cursor < jobs.length) {
    const job = jobs[cursor++]
    try {
      const { bytes } = await exportOne({
        root, buildDir, outDir, name: job.name, headerTitle: job.t.title, body: job.body,
        templateId: job.tpl.id, templateDir, cover: job.t.type === 'site', preview: false
      })
      if (!results.has(job.t.id)) results.set(job.t.id, {})
      results.get(job.t.id)[job.tpl.id] = { url: `pdfs/${job.name}.${job.tpl.id}.pdf`, bytes }
      if (++done % 20 === 0) console.log(`  进度 ${done}/${jobs.length}`)
    } catch (e) {
      failures.push(`${job.t.id} [${job.tpl.id}]: ${String(e.stderr ?? e).slice(0, 300)}`)
    }
  }
}))

const manifest = { generatedAt: new Date().toISOString(), templates, targets: [] }
for (const t of targets) {
  const pdfs = results.get(t.id)
  if (!pdfs) continue
  manifest.targets.push({ id: t.id, type: t.type, title: t.title, ...(t.chapter ? { chapter: t.chapter } : {}), pdfs })
}
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))

console.log(`完成：${manifest.targets.length}/${targets.length} 个目标，耗时 ${((Date.now() - t0) / 1000).toFixed(1)}s → content/public/pdfs/`)
if (failures.length) {
  console.error(`\n${failures.length} 个编译失败：`)
  failures.forEach(f => console.error('  ✗', f))
  process.exit(1)
}
