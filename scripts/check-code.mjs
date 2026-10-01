import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { checkCodeFiles, checkCodeOptions } from './lib/check-code.mjs'
const manifest = JSON.parse(readFileSync(new URL('../docs/migration/source-manifest.json', import.meta.url), 'utf8'))
const root = fileURLToPath(new URL('..', import.meta.url))
const files = manifest.code.filter(code => code.kind === 'independent')
try {
  const failures = await checkCodeFiles({ root, files, ...checkCodeOptions(process.argv.slice(2)) })
  for (const diagnostic of failures) console.error(diagnostic)
  console.log(`C++ syntax checks: ${files.length - failures.length}/${files.length}; inline snippets require their documented context.`)
  if (failures.length) process.exitCode = 1
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
