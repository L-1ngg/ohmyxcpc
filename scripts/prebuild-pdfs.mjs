import { rmSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanContent, chapterGroup, bookGroups } from './lib/content.mjs'
import { publishPdfSet } from './pdf/publication.mjs'
import { exportOne } from './pdf/exporter.mjs'
import { composeBody } from './pdf/md2typst.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content')
const buildDir = join(root, 'scripts/pdf/.build/prebuild')
const outDir = join(contentDir, 'public/pdfs')
const chapters = scanContent(contentDir)
const targets = [
  { id: 'all', type: 'site', title: '整本手册', groups: bookGroups(chapters) },
  ...chapters.map(chapter => ({ id: chapter.dir, type: 'chapter', title: chapter.title, groups: [chapterGroup(chapter)] }))
]

try {
  await publishPdfSet({ outDir, build: async stagingDir => {
    rmSync(buildDir, { recursive: true, force: true })
    const manifest = { generatedAt: new Date().toISOString(), targets: [] }
    // Sequential compilation bounds memory for the full book and CJK fonts.
    for (const { groups, ...target } of targets) {
      const { bytes } = await exportOne({
        root, buildDir, outDir: stagingDir, name: target.id,
        body: composeBody(groups, contentDir), cover: target.type === 'site'
      })
      manifest.targets.push({ ...target, pdf: { url: `pdfs/${target.id}.pdf`, bytes } })
      console.log(`完成 ${manifest.targets.length}/${targets.length}: ${target.title}`)
    }
    return manifest
  } })
} catch (error) {
  console.error(error.message)
  if (error.cause?.stderr) console.error(error.cause.stderr)
  if (error.backupPath) console.error(`Backup: ${error.backupPath}`)
  if (error.stagingPath) console.error(`Staging: ${error.stagingPath}`)
  if (error.recoveryError) console.error(`Recovery: ${error.recoveryError.message}`)
  if (error.cleanupError) console.error(`Cleanup: ${error.cleanupError.message}`)
  process.exitCode = 1
}
