import { rmSync, mkdirSync, writeFileSync, renameSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanContent, chapterGroup, bookGroups } from './lib/content.mjs'
import { composeBody, exportOne } from './pdf/exporter.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content')
const buildDir = join(root, 'scripts/pdf/.build/prebuild')
const outDir = join(contentDir, 'public/pdfs')
const backup = join(contentDir, 'public/.pdfs-backup')
const temporary = join(buildDir, 'pdfs')
const chapters = scanContent(contentDir)
const targets = [
  { id: 'all', type: 'site', title: '整本手册', groups: bookGroups(chapters) },
  ...chapters.map(chapter => ({ id: chapter.dir, type: 'chapter', title: chapter.title, groups: [chapterGroup(chapter)] }))
]

rmSync(buildDir, { recursive: true, force: true })
mkdirSync(temporary, { recursive: true })
const manifest = { generatedAt: new Date().toISOString(), targets: [] }
try {
  // Sequential compilation bounds memory for the full book and CJK fonts.
  for (const { groups, ...target } of targets) {
    const { bytes } = await exportOne({
      root, buildDir, outDir: temporary, name: target.id,
      body: composeBody(groups, contentDir), cover: target.type === 'site'
    })
    manifest.targets.push({ ...target, pdf: { url: `pdfs/${target.id}.pdf`, bytes } })
    console.log(`完成 ${manifest.targets.length}/${targets.length}: ${target.title}`)
  }
  writeFileSync(join(temporary, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  if (existsSync(backup)) throw new Error(`Previous PDF backup needs recovery: ${backup}`)
  const hadPrevious = existsSync(outDir)
  if (hadPrevious) renameSync(outDir, backup)
  try {
    renameSync(temporary, outDir)
  } catch (error) {
    if (hadPrevious) renameSync(backup, outDir)
    throw error
  }
  rmSync(backup, { recursive: true, force: true })
} catch (error) {
  rmSync(temporary, { recursive: true, force: true })
  console.error(error.stderr ?? error.message)
  process.exitCode = 1
}
