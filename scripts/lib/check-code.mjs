import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { availableParallelism, tmpdir } from 'node:os'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const run = promisify(execFile)
const flags = ['-std=gnu++20']

export function checkCodeOptions(args, env = process.env) {
  let jobs = env.CHECK_CODE_JOBS ?? '4'
  let pch = env.CHECK_CODE_PCH !== '0'
  for (const arg of args) {
    if (arg === '--no-pch') pch = false
    else if (/^--jobs=/.test(arg)) jobs = arg.slice(7)
    else throw new Error(`Unknown option: ${arg}; use --jobs=1..4 or --no-pch`)
  }
  if (!/^[1-9]\d*$/.test(String(jobs)) || !Number.isSafeInteger(Number(jobs))) {
    throw new Error('CHECK_CODE_JOBS / --jobs must be a positive integer')
  }
  return { concurrency: Math.min(4, availableParallelism(), Number(jobs)), pch, compiler: env.CXX || 'g++' }
}

export async function checkCodeFiles({ root, files, concurrency = 4, pch = true, compiler = 'g++', temporaryRoot = tmpdir(), log = console.log }) {
  const jobs = Math.min(4, availableParallelism(), Math.max(1, concurrency))
  const diagnostics = Array(files.length).fill(null)
  let temporary, includeDir, next = 0, completed = 0
  try {
    if (pch) {
      temporary = mkdtempSync(join(temporaryRoot, 'ohmyxcpc-pch-'))
      includeDir = join(temporary, 'include')
      mkdirSync(join(includeDir, 'bits'), { recursive: true })
      const input = join(temporary, 'stdlib.hpp')
      writeFileSync(input, '#include <bits/stdc++.h>\n')
      // GCC discovers the PCH at an existing include; the text header preserves fallback and repeated includes.
      writeFileSync(join(includeDir, 'bits/stdc++.h'), '#include_next <bits/stdc++.h>\n')
      try {
        await run(compiler, [...flags, '-x', 'c++-header', input, '-o', join(includeDir, 'bits/stdc++.h.gch')], { maxBuffer: 1024 * 1024 })
        log('Standard-library PCH ready')
      } catch (error) {
        includeDir = undefined
        log(`PCH unavailable; checking with ordinary headers: ${error.stderr || error.message}`)
      }
    }
    log(`Checking ${files.length} C++ files with ${jobs} workers; PCH ${includeDir ? 'enabled' : 'disabled'}`)
    async function worker() {
      while (next < files.length) {
        const index = next++
        try {
          await run(compiler, [...flags, '-fsyntax-only', ...(includeDir ? ['-I', includeDir] : []), resolve(root, 'content', files[index].target)], { maxBuffer: 1024 * 1024 })
        } catch (error) {
          diagnostics[index] = `${files[index].target}\n${error.stderr || error.message}`
        }
        completed++
        if (completed % 20 === 0 || completed === files.length) log(`Checked ${completed}/${files.length}`)
      }
    }
    await Promise.all(Array.from({ length: Math.min(jobs, files.length) }, worker))
    return diagnostics.filter(Boolean)
  } finally {
    if (temporary) rmSync(temporary, { recursive: true, force: true })
  }
}
