import { lstatSync, readdirSync, existsSync, mkdirSync, mkdtempSync, writeFileSync, renameSync, rmSync } from 'node:fs'
import { dirname, basename, join } from 'node:path'

// The mutation adapter is internal: tests inject failures without changing Node globals.
const mutations = { rename: renameSync, remove: path => rmSync(path, { recursive: true, force: true }) }

export class PdfPublicationError extends Error {
  constructor(code, published, cause, details = {}) {
    super(`${code}: published=${published}; ${cause.message}`, { cause })
    this.name = 'PdfPublicationError'
    Object.assign(this, { code, published }, details)
  }
}

export async function publishPdfSet({ outDir, build }, files = mutations) {
  const parent = dirname(outDir)
  const backup = join(parent, `.${basename(outDir)}-backup`)
  const previous = existsSync(outDir) ? 'previous' : 'none'
  if (existsSync(backup)) {
    throw new PdfPublicationError('BACKUP_EXISTS', previous,
      new Error(`Previous PDF backup needs recovery: ${backup}`), { backupPath: backup })
  }
  let staging
  try {
    mkdirSync(parent, { recursive: true })
    staging = mkdtempSync(join(parent, `.${basename(outDir)}-staging-`))
    const manifest = await build(staging)
    validateSet(staging, manifest)
    writeFileSync(join(staging, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
  } catch (cause) {
    const error = new PdfPublicationError('PREPARATION_FAILED', previous, cause)
    discard(staging, error, files)
    throw error
  }
  let backedUp = false
  try {
    if (previous === 'previous') {
      files.rename(outDir, backup)
      backedUp = true
    }
    files.rename(staging, outDir)
  } catch (cause) {
    if (backedUp) {
      try { files.rename(backup, outDir) } catch (recoveryError) {
        throw new PdfPublicationError('RECOVERY_FAILED', 'none', cause, {
          backupPath: backup, stagingPath: staging, recoveryError
        })
      }
    }
    const error = new PdfPublicationError('COMMIT_FAILED', previous, cause)
    discard(staging, error, files)
    throw error
  }
  try { files.remove(backup) } catch (cause) {
    throw new PdfPublicationError('CLEANUP_FAILED', 'new', cause, { backupPath: backup })
  }
  return { status: 'published' }
}

function discard(staging, error, files) {
  if (!staging) return
  try { files.remove(staging) } catch (cleanupError) {
    Object.assign(error, { cleanupError, stagingPath: staging })
  }
}

// Match docs/pdf-manifest-contract.md and additionally verify the local artifact set.
function validateSet(staging, manifest) {
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value)
  if (!record(manifest) || 'templates' in manifest ||
      typeof manifest.generatedAt !== 'string' || !Number.isFinite(Date.parse(manifest.generatedAt)) ||
      !Array.isArray(manifest.targets) || manifest.targets.length === 0) {
    throw new Error('Invalid PDF manifest')
  }
  const ids = new Set()
  for (const target of manifest.targets) {
    if (!record(target) || 'pdfs' in target || typeof target.id !== 'string' ||
        !/^[a-zA-Z0-9_-]+$/.test(target.id) || ids.has(target.id) ||
        typeof target.title !== 'string' || !target.title.trim() ||
        target.type !== (target.id === 'all' ? 'site' : 'chapter') ||
        !record(target.pdf) || target.pdf.url !== `pdfs/${target.id}.pdf` ||
        !Number.isSafeInteger(target.pdf.bytes) || target.pdf.bytes <= 0) {
      throw new Error('Invalid PDF target')
    }
    const file = lstatSync(join(staging, `${target.id}.pdf`))
    if (!file.isFile() || file.size !== target.pdf.bytes) throw new Error(`Invalid PDF artifact: ${target.id}`)
    ids.add(target.id)
  }
  if (!ids.has('all')) throw new Error('Missing whole-book PDF')
  const expected = new Set([...ids].map(id => `${id}.pdf`))
  if (readdirSync(staging).some(name => !expected.has(name))) throw new Error('Unlisted PDF artifacts')
}
