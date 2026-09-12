import { readFileSync, mkdirSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
export const TYPST = process.env.TYPST_PATH ?? 'typst'

export async function exportOne({ root, buildDir, outDir, name, body, cover = false, preview = false }) {
  mkdirSync(buildDir, { recursive: true })
  mkdirSync(outDir, { recursive: true })
  const typFile = join(buildDir, `${name}.typ`)
  const template = readFileSync(join(root, 'scripts/pdf/template.typ'), 'utf8')
  writeFileSync(typFile, `${template}\n\n${body}`)
  const pdf = join(outDir, `${name}.pdf`)
  const common = ['compile', '--root', root, '--font-path', join(root, '.cache/fonts'), ...(cover ? ['--input', 'cover=1'] : [])]
  const { stderr } = await execFileAsync(TYPST, [...common, typFile, pdf], { maxBuffer: 8 * 1024 * 1024 })
  if (/unknown font family|does not contain|failed to converge/i.test(stderr)) throw new Error(stderr)
  if (stderr.trim()) console.warn(stderr.trim())
  if (preview) await execFileAsync(TYPST, [...common, '--pages', '1', typFile, join(outDir, `${name}-preview.png`)])
  return { pdf, bytes: statSync(pdf).size }
}
