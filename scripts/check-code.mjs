import { readFileSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { resolve } from 'node:path'
const run = promisify(execFile)
const manifest = JSON.parse(readFileSync(new URL('../docs/migration/source-manifest.json', import.meta.url), 'utf8'))
const root = new URL('..', import.meta.url).pathname
const files = manifest.code.filter(code => code.kind === 'independent')
const failures = []
for (const [index, file] of files.entries()) {
  try {
    await run('g++', ['-std=gnu++20', '-fsyntax-only', resolve(root, 'content', file.target)], { maxBuffer: 1024 * 1024 })
  } catch (error) {
    failures.push(file.target)
    console.error(`${file.target}\n${error.stderr ?? error.message}`)
  }
  if ((index + 1) % 20 === 0) console.log(`Checked ${index + 1}/${files.length}`)
}
console.log(`C++ syntax checks: ${files.length - failures.length}/${files.length}; inline snippets require their documented context.`)
if (failures.length) process.exitCode = 1
