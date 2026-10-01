// Each installation belongs to one renderer and its fixed MathJax/Shiki configuration.
export function cacheMarkdownRendering(md) {
  const stats = { mathCalls: 0, mathMisses: 0, highlightCalls: 0, highlightMisses: 0, bytes: 0 }
  for (const name of ['math_inline', 'math_block']) {
    const render = md.renderer.rules[name]
    if (!render) continue
    const cache = new Map()
    md.renderer.rules[name] = (...args) => {
      stats.mathCalls++
      const key = args[0][args[1]].content
      if (!cache.has(key)) {
        const result = render(...args)
        cache.set(key, result)
        stats.mathMisses++
        stats.bytes += Buffer.byteLength(result)
      }
      return cache.get(key)
    }
  }
  const highlight = md.options.highlight
  if (highlight) {
    const cache = new Map()
    md.options.highlight = (...args) => {
      stats.highlightCalls++
      const key = JSON.stringify(args)
      if (!cache.has(key)) {
        const result = highlight(...args)
        cache.set(key, result)
        stats.highlightMisses++
        stats.bytes += Buffer.byteLength(result)
      }
      return cache.get(key)
    }
  }
  return stats
}
