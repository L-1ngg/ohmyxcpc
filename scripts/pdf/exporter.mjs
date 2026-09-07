import { readFileSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import MarkdownIt from 'markdown-it'
import math from 'markdown-it-mathjax3'
import { mdToTypst, preprocessMd } from './md2typst.mjs'

const execFileAsync = promisify(execFile)
const parser = new MarkdownIt().use(math)
export const TYPST = process.env.TYPST_PATH ?? 'typst'
const label = value => 'doc-' + createHash('sha256').update(value).digest('hex').slice(0, 16)

export function composeBody(groups, contentDir) {
  const root = dirname(contentDir)
  const entries = groups.flatMap(group => group.entries).map(entry => ({
    ...entry,
    source: preprocessMd(readFileSync(join(contentDir, entry.path), 'utf8'), contentDir),
    route: '/' + entry.path.replace(/\.md$/, '')
  }))
  const links = {}
  for (const entry of entries) {
    links[entry.route] = label(entry.route)
    if (entry.route.endsWith('/index')) links[entry.route.slice(0, -5)] = label(entry.route)
    for (const match of entry.source.matchAll(/^#{1,6} .+?\s+\{#([\w-]+)\}\s*$/gm)) {
      links[`${entry.route}#${match[1]}`] = label(`${entry.route}#${match[1]}`)
    }
  }
  return entries.map(entry => {
    const images = {}
    const walk = tokens => {
      for (const token of tokens) {
        if (token.type === 'image') {
          const src = token.attrGet('src')
          const path = src.startsWith('/') ? resolve(contentDir, 'public', '.' + src) : resolve(contentDir, dirname(entry.path), src)
          if (!path.startsWith(resolve(contentDir) + '/') || !existsSync(path)) throw new Error(`Missing image in ${entry.path}: ${src}`)
          images[src] = '/' + relative(root, path)
        }
        if (token.children) walk(token.children)
      }
    }
    walk(parser.parse(entry.source, {}))
    return `#metadata(none) <${label(entry.route)}>\n` + mdToTypst(entry.source, {
      images, links, headingOffset: entry.demote ? 1 : 0,
      headingLabel: anchor => anchor ? label(`${entry.route}#${anchor}`) : undefined
    })
  }).join('\n')
}

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
