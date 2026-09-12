import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as fs from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { publishPdfSet } from '../pdf/publication.mjs'

function fixture(t) {
  const dir = fs.mkdtempSync(join(tmpdir(), 'pdf-publication-'))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  const outDir = join(dir, 'pdfs')
  fs.mkdirSync(outDir)
  fs.writeFileSync(join(outDir, 'manifest.json'), 'previous manifest')
  fs.writeFileSync(join(outDir, 'all.pdf'), 'previous PDF')
  return { dir, outDir, build: async staging => {
    fs.writeFileSync(join(staging, 'all.pdf'), 'new PDF')
    return { generatedAt: '2026-09-12T00:00:00Z', targets: [
      { id: 'all', type: 'site', title: '整本', pdf: { url: 'pdfs/all.pdf', bytes: 7 } }
    ] }
  } }
}
function previous(outDir) {
  assert.equal(fs.readFileSync(join(outDir, 'manifest.json'), 'utf8'), 'previous manifest')
  assert.equal(fs.readFileSync(join(outDir, 'all.pdf'), 'utf8'), 'previous PDF')
}

test('publishes a complete set and removes obsolete files', async t => {
  const options = fixture(t)
  fs.writeFileSync(join(options.outDir, 'obsolete.pdf'), 'old')
  assert.deepEqual(await publishPdfSet(options), { status: 'published' })
  assert.deepEqual(fs.readdirSync(options.outDir).sort(), ['all.pdf', 'manifest.json'])
  const manifest = JSON.parse(fs.readFileSync(join(options.outDir, 'manifest.json')))
  assert.equal(manifest.targets[0].pdf.bytes, fs.statSync(join(options.outDir, 'all.pdf')).size)
  assert.deepEqual(fs.readdirSync(options.dir), ['pdfs'])
})

test('build failure preserves the previous set and removes partial output', async t => {
  const options = fixture(t)
  options.build = async staging => {
    fs.writeFileSync(join(staging, 'partial.pdf'), 'partial')
    throw new Error('compiler failed')
  }
  await assert.rejects(publishPdfSet(options), error => {
    assert.equal(error.code, 'PREPARATION_FAILED')
    assert.equal(error.published, 'previous')
    assert.match(error.cause.message, /compiler failed/)
    return true
  })
  previous(options.outDir)
  assert.deepEqual(fs.readdirSync(options.dir), ['pdfs'])
})

for (const mode of ['commit', 'recovery', 'backup', 'cleanup', 'first-commit']) {
  test(`${mode} failure reports available artifacts`, async t => {
    const options = fixture(t)
    if (mode === 'first-commit') fs.rmSync(options.outDir, { recursive: true })
    // Real filesystem operations, with failures at the publication mutation seam.
    const files = {
      rename(source, destination) {
        const isCommit = destination === options.outDir && fs.existsSync(join(source, 'all.pdf')) && fs.readFileSync(join(source, 'all.pdf'), 'utf8') === 'new PDF'
        if ((isCommit && ['commit', 'recovery', 'first-commit'].includes(mode)) ||
            (mode === 'recovery' && destination === options.outDir) ||
            (mode === 'backup' && source === options.outDir)) throw new Error(`injected ${mode}`)
        fs.renameSync(source, destination)
      },
      remove(path) {
        if (mode === 'cleanup' && fs.existsSync(join(path, 'all.pdf'))) throw new Error('injected cleanup')
        fs.rmSync(path, { recursive: true, force: true })
      }
    }
    await assert.rejects(publishPdfSet(options, files), error => {
      assert.equal(error.code, { commit: 'COMMIT_FAILED', recovery: 'RECOVERY_FAILED', backup: 'COMMIT_FAILED', cleanup: 'CLEANUP_FAILED', 'first-commit': 'COMMIT_FAILED' }[mode])
      assert.equal(error.published, mode === 'cleanup' ? 'new' : ['recovery', 'first-commit'].includes(mode) ? 'none' : 'previous')
      if (mode === 'recovery') {
        previous(error.backupPath)
        assert.equal(fs.readFileSync(join(error.stagingPath, 'all.pdf'), 'utf8'), 'new PDF')
        assert.match(error.recoveryError.message, /injected recovery/)
      }
      if (mode === 'cleanup') {
        assert.equal(fs.readFileSync(join(options.outDir, 'all.pdf'), 'utf8'), 'new PDF')
        previous(error.backupPath)
      }
      return true
    })
    if (['commit', 'backup'].includes(mode)) {
      previous(options.outDir)
      assert.deepEqual(fs.readdirSync(options.dir), ['pdfs'])
    }
    if (['recovery', 'first-commit'].includes(mode)) assert.equal(fs.existsSync(options.outDir), false)
  })
}

test('a leftover backup blocks publication before build and remains untouched', async t => {
  const options = fixture(t)
  const backup = join(options.dir, '.pdfs-backup')
  fs.mkdirSync(backup)
  fs.writeFileSync(join(backup, 'valuable.pdf'), 'recover me')
  options.build = () => assert.fail('must not compile when recovery is pending')
  await assert.rejects(publishPdfSet(options), error => {
    assert.equal(error.code, 'BACKUP_EXISTS')
    assert.equal(error.backupPath, backup)
    assert.equal(error.published, 'previous')
    return true
  })
  previous(options.outDir)
  assert.equal(fs.readFileSync(join(backup, 'valuable.pdf'), 'utf8'), 'recover me')
  assert.deepEqual(fs.readdirSync(options.dir).sort(), ['.pdfs-backup', 'pdfs'])
})

for (const [name, change] of [
  ['missing PDF', (m, dir) => fs.unlinkSync(join(dir, 'all.pdf'))],
  ['wrong bytes', m => { m.targets[0].pdf.bytes = 100 }],
  ['unlisted PDF', (m, dir) => fs.writeFileSync(join(dir, 'extra.pdf'), 'extra')],
  ['duplicate ID', m => m.targets.push(m.targets[0])],
  ['missing book', m => { m.targets = [] }],
  ['unsafe path', m => { m.targets[0].id = '../all' }],
  ['bad URL', m => { m.targets[0].pdf.url = 'elsewhere/all.pdf' }],
  ['bad date', m => { m.generatedAt = 'invalid' }],
  ['blank title', m => { m.targets[0].title = ' ' }],
  ['wrong type', m => { m.targets[0].type = 'chapter' }],
  ['legacy manifest', m => { m.templates = [] }],
  ['symlink PDF', (m, dir) => {
    fs.unlinkSync(join(dir, 'all.pdf'))
    fs.symlinkSync(join(dir, '../pdfs/all.pdf'), join(dir, 'all.pdf'))
    m.targets[0].pdf.bytes = 12
  }],
]) {
  test(`${name} cannot replace a complete published set`, async t => {
    const options = fixture(t)
    const build = options.build
    options.build = async dir => {
      const manifest = await build(dir)
      change(manifest, dir)
      return manifest
    }
    await assert.rejects(publishPdfSet(options), { code: 'PREPARATION_FAILED', published: 'previous' })
    previous(options.outDir)
    assert.deepEqual(fs.readdirSync(options.dir), ['pdfs'])
  })
}

test('initial publication creates the complete set without a previous directory', async t => {
  const options = fixture(t)
  fs.rmSync(options.outDir, { recursive: true })
  assert.deepEqual(await publishPdfSet(options), { status: 'published' })
  assert.equal(fs.readFileSync(join(options.outDir, 'all.pdf'), 'utf8'), 'new PDF')
  assert.deepEqual(fs.readdirSync(options.dir), ['pdfs'])
})

test('cleanup after build failure retains the original failure and reports remaining staging', async t => {
  const options = fixture(t)
  options.build = async staging => {
    fs.writeFileSync(join(staging, 'partial.pdf'), 'partial')
    throw new Error('compiler failed')
  }
  await assert.rejects(publishPdfSet(options, {
    rename: fs.renameSync,
    remove() { throw new Error('cleanup failed') }
  }), error => {
    assert.equal(error.code, 'PREPARATION_FAILED')
    assert.match(error.cause.message, /compiler failed/)
    assert.match(error.cleanupError.message, /cleanup failed/)
    assert.equal(fs.readFileSync(join(error.stagingPath, 'partial.pdf'), 'utf8'), 'partial')
    return true
  })
  previous(options.outDir)
})
