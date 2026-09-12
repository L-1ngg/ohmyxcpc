// pnpm export:pdf [chapter]: the single print layout, whole book or one chapter.
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanContent, chapterGroup, bookGroups } from './lib/content.mjs'
import { exportOne } from './pdf/exporter.mjs'
import { composeBody } from './pdf/md2typst.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const [target, ...extra] = process.argv.slice(2)
try {
  if (extra.length || target?.includes('/')) throw new Error('仅支持整本或章节导出：pnpm export:pdf [章节]')
  const contentDir = join(root, 'content')
  const chapters = scanContent(contentDir)
  const selected = target ? chapters.filter(chapter => chapter.dir === target) : chapters
  if (!selected.length) throw new Error(`没有匹配的章节：${target}`)
  const { pdf } = await exportOne({
    root, buildDir: join(root, 'scripts/pdf/.build/cli'), outDir: join(root, 'pdf'),
    name: target ?? 'all', body: composeBody(target ? selected.map(chapterGroup) : bookGroups(chapters), contentDir), cover: !target, preview: true
  })
  console.log(`完成：${pdf}`)
} catch (error) {
  console.error(error.stderr ?? error.message)
  process.exitCode = 1
}
