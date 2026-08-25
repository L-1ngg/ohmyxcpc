// PDF 导出核心：内容组装 + typst 编译（CLI 与预生成管线共用）
import { readFileSync, mkdirSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mdToTypst, preprocessMd } from './md2typst.mjs'

const execFileAsync = promisify(execFile)
export const TYPST = process.env.TYPST_PATH ?? 'typst'

// groups: [{ title, entries: [{ path（content 相对路径）, demote }] }]
// demote 的条目整体标题降一级：章节标题 H1、条目 H2，使目录与 PDF 书签形成层级
export function composeBody(groups, contentDir) {
  return groups
    .map(g => g.entries
      .map(e => {
        let body = mdToTypst(preprocessMd(readFileSync(join(contentDir, e.path), 'utf8'), contentDir))
        if (e.demote) body = body.replace(/^(={1,5}) /gm, '$1= ')
        return body
      })
      .join('\n'))
    .join('\n#pagebreak()\n\n')
}

// 编译单个 (目标 × 模板)
//   cover:   整站导出时启用封面与目录页（模板根据 cover/date 输入渲染）
//   preview: 额外产出首页 PNG 预览（CLI 用）
export async function exportOne({ root, buildDir, outDir, name, headerTitle, body, templateId, templateDir, cover = false, preview = false }) {
  const src = readFileSync(join(templateDir, templateId, 'template.typ'), 'utf8') + '\n' + body
  mkdirSync(buildDir, { recursive: true })
  mkdirSync(outDir, { recursive: true })
  const typFile = join(buildDir, `${name}.${templateId}.typ`)
  writeFileSync(typFile, src)
  const pdf = join(outDir, `${name}.${templateId}.pdf`)
  const common = [
    'compile', '--root', root,
    '--input', `chapter=${headerTitle}`,
    '--input', `date=${new Date().toISOString().slice(0, 10)}`,
    ...(cover ? ['--input', 'cover=1'] : [])
  ]
  await execFileAsync(TYPST, [...common, typFile, pdf])
  if (preview) {
    await execFileAsync(TYPST, [...common, '--pages', '1', typFile, join(outDir, `${name}.${templateId}-preview.png`)])
  }
  return { pdf, bytes: statSync(pdf).size }
}
