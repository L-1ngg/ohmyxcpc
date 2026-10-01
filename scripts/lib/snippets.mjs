import { readFileSync } from 'node:fs'
import { resolve, extname, sep } from 'node:path'

export function codeRegion(source, path) {
  const lines = source.split(/\r?\n/)
  const begins = lines.flatMap((line, i) => line.includes('@book-begin') ? [i] : [])
  const ends = lines.flatMap((line, i) => line.includes('@book-end') ? [i] : [])
  if (!begins.length && !ends.length) return source.trimEnd()
  if (begins.length !== 1 || ends.length !== 1 || ends[0] <= begins[0]) {
    throw new Error(`Invalid code region: ${path}`)
  }
  const body = lines.slice(begins[0] + 1, ends[0])
  const indents = body.filter(line => line.trim()).map(line => line.match(/^ */)[0].length)
  const indent = indents.length ? Math.min(...indents) : 0
  return body.map(line => line.slice(Math.min(indent, line.length))).join('\n').trimEnd()
}

export function expandSnippets(source, contentDir, onDependency = () => {}) {
  // A fenced example containing an include directive is documentation, not an import.
  const lines = source.split('\n')
  let fence = null
  return lines.map(line => {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/)
    if (marker) {
      if (!fence) fence = marker[1]
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null
      return line
    }
    if (fence) return line
    const include = line.match(/^<<<\s+@\/(.+?)\s*$/)
    if (!include) return line
    const path = resolve(contentDir, include[1])
    if (!path.startsWith(resolve(contentDir, 'snippets') + sep)) throw new Error(`Invalid snippet path: ${include[1]}`)
    onDependency(path)
    const code = codeRegion(readFileSync(path, 'utf8'), include[1])
    let delimiter = '```'
    while (code.includes(delimiter)) delimiter += '`'
    return `${delimiter}${extname(path).slice(1) || 'text'}\n${code}\n${delimiter}`
  }).join('\n')
}
