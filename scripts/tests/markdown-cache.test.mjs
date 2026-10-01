import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'
import { cacheMarkdownRendering } from '../lib/markdown-cache.mjs'

const source = `# Formula and code

$x^2$ and $x^2$.

$$x^2$$

\`\`\`cpp {1}
int answer = 42;
\`\`\`

\`\`\`cpp {2}
int answer = 42;
\`\`\`

\`\`\`cpp-vue
const char* name = "{{ name }}";
\`\`\`
`

test('cached MathJax and Shiki preserve complete HTML, highlighting attributes, and renderer isolation', async () => {
  try {
    const plain = await createMarkdownRenderer(process.cwd(), { math: true, lineNumbers: true })
    const expected = plain.render(source, {})
    disposeMdItInstance()
    const cached = await createMarkdownRenderer(process.cwd(), { math: true, lineNumbers: true })
    const stats = cacheMarkdownRendering(cached)
    assert.equal(cached.render(source, {}), expected)
    assert.equal(cached.render(source, {}), expected)
    assert.equal(stats.mathMisses, 2, 'inline and display math remain distinct')
    assert.equal(stats.highlightMisses, 3, 'highlight attributes and Vue interpolation are part of the cache key')
    assert.equal(stats.mathCalls, 6)
    disposeMdItInstance()
    const changed = await createMarkdownRenderer(process.cwd(), { math: true, theme: 'github-dark' })
    const fresh = cacheMarkdownRendering(changed)
    const html = changed.render(source, {})
    assert.notEqual(html, expected)
    assert.equal(fresh.mathMisses, 2)
    assert.equal(fresh.highlightMisses, 3)
  } finally { disposeMdItInstance() }
})
