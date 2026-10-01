import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, cpSync, writeFileSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { checkCodeFiles, checkCodeOptions } from '../lib/check-code.mjs'

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'ohmyxcpc-code-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'content'))
  return root
}

test('job options are CPU-bounded and capped at four, with serial mode and PCH override', () => {
  assert.equal(checkCodeOptions(['--jobs=1', '--no-pch'], {}).concurrency, 1)
  assert.equal(checkCodeOptions([], { CHECK_CODE_PCH: '0' }).pch, false)
  assert.ok(checkCodeOptions(['--jobs=99'], {}).concurrency <= 4)
  assert.throws(() => checkCodeOptions(['--jobs=0'], {}), /positive integer/)
  assert.throws(() => checkCodeOptions(['--unknown'], {}), /Unknown option/)
})

test('worker limits, completion progress, and ordered diagnostics survive out-of-order completion', async t => {
  const root = fixture(t)
  const compiler = join(root, 'compiler.mjs')
  const timeline = join(root, 'timeline.jsonl')
  writeFileSync(compiler, `#!/usr/bin/env node
import { appendFileSync } from 'node:fs';
const source = process.argv.at(-1);
const id = Number(source.match(/(\\d+)\\.cpp$/)[1]);
appendFileSync(${JSON.stringify(timeline)}, JSON.stringify({event:'start',id})+'\\n');
setTimeout(() => { appendFileSync(${JSON.stringify(timeline)}, JSON.stringify({event:'end',id})+'\\n'); console.error('error '+id); process.exit(1); }, id === 0 ? 180 : 20);
`, { mode: 0o755 })
  const files = Array.from({ length: 22 }, (_, i) => ({ target: `${i}.cpp` }))
  for (const concurrency of [1, 2, 4]) {
    writeFileSync(timeline, '')
    const messages = []
    const diagnostics = await checkCodeFiles({ root, files, compiler, concurrency, pch: false, log: value => messages.push(value) })
    assert.deepEqual(diagnostics.map(value => value.split('\n')[0]), files.map(file => file.target))
    let active = 0, maximum = 0
    for (const event of readFileSync(timeline, 'utf8').trim().split('\n').map(JSON.parse)) {
      active += event.event === 'start' ? 1 : -1
      maximum = Math.max(maximum, active)
    }
    assert.equal(active, 0)
    assert.ok(maximum <= concurrency)
    assert.ok(messages.includes('Checked 20/22'))
    assert.ok(messages.includes('Checked 22/22'))
  }
})

test('real GCC preserves missing-header and syntax failures, repeated includes, and incompatible PCH fallback', { timeout: 90_000 }, async t => {
  const root = fixture(t)
  const sources = [
    '#include <bits/stdc++.h>\nint main() { std::vector<int> v; }\n',
    '#include <bits/stdc++.h>\n#include <bits/stdc++.h>\nint main() {}\n',
    'int main() { std::vector<int> v; }\n',
    '#include <bits/stdc++.h>\nint main() { broken syntax }\n',
    '#define _GLIBCXX_DEBUG 1\n#include <bits/stdc++.h>\nint main() { std::vector<int> v; }\n'
  ]
  const files = sources.map((source, i) => {
    writeFileSync(join(root, `content/${i}.cpp`), source)
    return { target: `${i}.cpp` }
  })
  const compiler = join(root, 'gcc.mjs'), trace = join(root, 'gcc.jsonl')
  writeFileSync(compiler, `#!/usr/bin/env node
import {spawnSync} from 'node:child_process'; import {appendFileSync} from 'node:fs';
const args = process.argv.slice(2); const result = spawnSync('g++', [...args, ...(args.includes('-fsyntax-only') ? ['-H'] : [])], {encoding:'utf8'});
appendFileSync(${JSON.stringify(trace)}, JSON.stringify({args,stderr:result.stderr})+'\\n');
process.stdout.write(result.stdout || ''); process.stderr.write(result.stderr || ''); process.exit(result.status ?? 1);
`, { mode: 0o755 })
  const options = { root, files, compiler, temporaryRoot: root, log: () => {} }
  const plain = await checkCodeFiles({ ...options, pch: false, concurrency: 1 })
  const cached = await checkCodeFiles({ ...options, pch: true, concurrency: 4 })
  assert.deepEqual(plain.map(value => value.split('\n')[0]), ['2.cpp', '3.cpp'])
  assert.deepEqual(cached.map(value => value.split('\n')[0]), ['2.cpp', '3.cpp'])
  const logs = readFileSync(trace, 'utf8').trim().split('\n').map(JSON.parse)
  assert.ok(logs.some(entry => /! .*stdc\+\+\.h\.gch/.test(entry.stderr)), 'GCC actually reuses the PCH')
  assert.ok(logs.some(entry => /x .*stdc\+\+\.h\.gch/.test(entry.stderr)), 'GCC rejects the incompatible PCH and parses the text header')
  assert.ok(!readdirSync(root).some(name => name.startsWith('ohmyxcpc-pch-')))
  const failPch = join(root, 'fail-pch.mjs')
  writeFileSync(failPch, `#!/usr/bin/env node
import {spawnSync} from 'node:child_process'; const args=process.argv.slice(2);
if(args.includes('-x')) {console.error('injected PCH failure');process.exit(1)}
const result=spawnSync('g++',args,{stdio:'inherit'});process.exit(result.status ?? 1);
`, { mode: 0o755 })
  const messages = []
  const fallback = await checkCodeFiles({ ...options, compiler: failPch, pch: true, log: value => messages.push(value) })
  assert.deepEqual(fallback.map(value => value.split('\n')[0]), ['2.cpp', '3.cpp'])
  assert.ok(messages.some(message => message.includes('PCH unavailable')))
  assert.ok(!readdirSync(root).some(name => name.startsWith('ohmyxcpc-pch-')))
  mkdirSync(join(root, 'scripts/lib'), { recursive: true })
  mkdirSync(join(root, 'docs/migration'), { recursive: true })
  cpSync(new URL('../check-code.mjs', import.meta.url), join(root, 'scripts/check-code.mjs'))
  cpSync(new URL('../lib/check-code.mjs', import.meta.url), join(root, 'scripts/lib/check-code.mjs'))
  writeFileSync(join(root, 'docs/migration/source-manifest.json'), JSON.stringify({ code: files.map(file => ({ ...file, kind: 'independent' })) }))
  const cli = spawnSync(process.execPath, [join(root, 'scripts/check-code.mjs'), '--no-pch', '--jobs=2'], { encoding: 'utf8', env: { ...process.env, CXX: 'g++' } })
  assert.equal(cli.status, 1)
  assert.match(cli.stdout, /C\+\+ syntax checks: 3\/5/)
  assert.ok(cli.stderr.indexOf('2.cpp\n') < cli.stderr.indexOf('3.cpp\n'))
})
