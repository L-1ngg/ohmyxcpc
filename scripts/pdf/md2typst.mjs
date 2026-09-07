// Markdown → Typst 转换器（覆盖 XCPC 模板库的内容子集）
// 支持：标题、段落、粗斜体、行内/块级代码、行内/块级 LaTeX 公式（经 mitex）、
//       列表、链接、图片、表格、引用、分割线
import MarkdownIt from 'markdown-it'
import math from 'markdown-it-mathjax3'
import containerPlugin from 'markdown-it-container'
import { expandSnippets } from '../lib/snippets.mjs'

const md = new MarkdownIt({ html: false }).use(math)

// VitePress 容器 → typst 提示卡片
const CONTAINERS = {
  tip:       { label: '提示', fill: '#e8f5e9', stroke: '#43a047' },
  warning:   { label: '注意', fill: '#fff8e1', stroke: '#f9a825' },
  danger:    { label: '警告', fill: '#ffebee', stroke: '#e53935' },
  caution:   { label: '小心', fill: '#ffebee', stroke: '#e53935' },
  info:      { label: '信息', fill: '#eceff1', stroke: '#90a4ae' },
  note:      { label: '备注', fill: '#e3f2fd', stroke: '#1e88e5' },
  important: { label: '重要', fill: '#f3e5f5', stroke: '#8e24aa' }
}
for (const name of Object.keys(CONTAINERS)) {
  md.use(containerPlugin, name, {
    validate: info => info.trim() === name || info.trim().startsWith(name + ' ')
  })
}

// ---- typst 文本转义 ----
function esc(s) {
  return s
    .replace(/[\\#$@\[\]*_`<>~]/g, c => '\\' + c)
    .replace(/\n(?=[-+=])/g, '\n\\') // 行首的列表/标题标记
}

// ---- 公式：LaTeX 源码交给 mitex ----
function miRaw(fn, tex) {
  const t = tex.trim()
  if (!t.includes('`')) return `#${fn}(\`${t}\`)`
  return `#${fn}("${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`
}
const mi = t => miRaw('mi', t)
const miDisplay = t => miRaw('mitex', t)

// ---- 代码 ----
function rawInline(code) {
  let f = '`'
  while (code.includes(f)) f += '`'
  return `${f}${code}${f}`
}
function fenceBlock(content, info) {
  const lang = (info || '').trim().split(/\s+/)[0] || 'txt'
  let f = '```'
  while (content.includes(f)) f += '`'
  return `${f}${lang}\n${content.replace(/\n+$/, '')}\n${f}\n`
}

// ---- 行内 token 渲染 ----
function renderInline(tokens, options) {
  let out = ''
  const linkStack = []
  for (const t of tokens ?? []) {
    switch (t.type) {
      case 'text': out += esc(t.content); break
      case 'code_inline': out += rawInline(t.content); break
      case 'math_inline': out += mi(t.content); break
      case 'softbreak': out += '\n'; break
      case 'hardbreak': out += ' \\ \n'; break
      case 'strong_open': out += '*'; break
      case 'strong_close': out += '*'; break
      case 'em_open': out += '_'; break
      case 'em_close': out += '_'; break
      case 's_open': out += '#strike['; break
      case 's_close': out += ']'; break
      case 'link_open': {
        const href = t.attrGet('href') ?? ''
        const target = options.links?.[href]
        const destination = target ? `<${target}>` : JSON.stringify(/^https?:\/\//.test(href) ? href : `https://l-1ngg.github.io/ohmyxcpc${href.startsWith('/') ? '' : '/'}${href}`)
        linkStack.push(true)
        out += `#link(${destination})[`
        break
      }
      case 'link_close': if (linkStack.pop()) out += ']'; break
      case 'image': {
        const src = t.attrGet('src') ?? ''
        const alt = (t.children ?? []).map(c => c.content).join('')
        const local = options.images?.[src]
        if (!local) throw new Error(`Unresolved PDF image: ${src}`)
        out += `#align(center)[#image(${JSON.stringify(local)}, alt: ${JSON.stringify(alt)})]`
        break
      }
      default: throw new Error(`Unsupported inline Markdown token: ${t.type}`)
    }
  }
  return out
}

// ---- 主转换 ----
export function mdToTypst(src, options = {}) {
  const tokens = md.parse(src, {})
  const out = []
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    const cm = t.type.match(/^container_(\w+)_(open|close)$/)
    if (cm) {
      const conf = CONTAINERS[cm[1]] ?? { label: cm[1], fill: '#f5f5f5', stroke: '#9e9e9e' }
      if (cm[2] === 'open') {
        const custom = (t.info ?? '').trim().slice(cm[1].length).trim()
        out.push(`\n#block(fill: rgb("${conf.fill}"), stroke: (left: 2.5pt + rgb("${conf.stroke}")), inset: (x: 8pt, y: 6pt), radius: 2pt, width: 100%)[\n*${conf.label}${custom ? '：' + esc(custom) : ''}*\n\n`)
      } else {
        out.push(']\n')
      }
      continue
    }
    switch (t.type) {
      case 'heading_open': {
        const inline = tokens[i + 1]
        const anchor = inline.content.match(/\s*\{#([\w-]+)\}\s*$/)?.[1]
        if (anchor) {
          const tail = inline.children.at(-1)
          if (tail?.type !== 'text') throw new Error('Invalid heading anchor')
          tail.content = tail.content.replace(/\s*\{#[\w-]+\}\s*$/, '')
        }
        const label = options.headingLabel?.(anchor, inline.content)
        out.push(`${'='.repeat(Math.min(6, +t.tag.slice(1) + (options.headingOffset ?? 0)))} ${renderInline(inline.children, options)}${label ? ` <${label}>` : ''}\n`)
        i += 2
        break
      }
      case 'paragraph_open': if (!t.hidden) out.push('\n'); break
      case 'paragraph_close': if (!t.hidden) out.push('\n'); break
      case 'inline': {
        const unsupported = t.content.match(/^\s*:{3,}\s*(\w+)/m)
        if (unsupported) throw new Error(`Unsupported Markdown container: ${unsupported[1]}`)
        out.push(renderInline(t.children, options))
        break
      }
      case 'math_block': out.push(`\n${miDisplay(t.content)}\n`); break
      case 'fence': out.push(`\n${fenceBlock(t.content, t.info)}`); break
      case 'bullet_list_open': out.push('\n#list(\n'); break
      case 'ordered_list_open': out.push(`\n#enum(start: ${Number(t.attrGet('start') ?? 1)},\n`); break
      case 'bullet_list_close':
      case 'ordered_list_close': out.push(')\n'); break
      case 'list_item_open': out.push('['); break
      case 'list_item_close': out.push('],\n'); break
      case 'blockquote_open': out.push('\n#quote(block: true)[\n'); break
      case 'blockquote_close': out.push(']\n'); break
      case 'hr': out.push('\n#line(length: 100%, stroke: 0.4pt)\n'); break
      case 'table_open': {
        const rows = []
        let cur = null
        while (tokens[i] && tokens[i].type !== 'table_close') {
          const tt = tokens[i]
          if (tt.type === 'tr_open') cur = []
          else if (tt.type === 'th_open' || tt.type === 'td_open') cur.push(renderInline(tokens[i + 1].children, options))
          else if (tt.type === 'tr_close') rows.push(cur)
          i++
        }
        const cols = Math.max(...rows.map(r => r.length), 1)
        const [head, ...body] = rows
        const cell = c => `[${c ?? ''}]`
        out.push(`\n#table(columns: ${cols},\n` +
          `  table.header(${head.map(cell).join(', ')}),` +
          body.map(r => `\n  ${r.map(cell).join(',')},`).join('') + '\n)\n')
        break
      }
      case 'code_block': out.push(`\n${fenceBlock(t.content, 'text')}`); break
      default: throw new Error(`Unsupported block Markdown token: ${t.type}`)
    }
  }
  return out.join('').replace(/\n{3,}/g, '\n\n')
    // #mi(...) 紧跟 ( 或 [ 会被 typst 解析为链式调用，插入空格断开
    .replace(/(#mi(?:tex)?\((?:`[^`]*`|"(?:\\.|[^"\\])*")\))(?=[(\[])/g, '$1 ')
    .trim() + '\n'
}

// ---- 站点 Markdown 预处理：frontmatter、代码片段导入、VitePress 容器 ----
export function preprocessMd(src, contentDir) {
  src = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  return expandSnippets(src, contentDir)
}
