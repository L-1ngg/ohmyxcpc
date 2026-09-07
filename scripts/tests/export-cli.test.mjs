import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

test('PDF CLI rejects removed layout arguments before attempting compilation', () => {
  const result = spawnSync(process.execPath, ['scripts/export-pdf.mjs', 'basics', 'double'], {
    encoding: 'utf8', env: { ...process.env, TYPST_PATH: '/not-a-compiler' }
  })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /仅支持整本或章节/)
  assert.doesNotMatch(result.stderr, /ENOENT/)
})
