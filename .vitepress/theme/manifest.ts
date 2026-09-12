// 预生成 PDF 清单的共享加载器（导出中心页与章节卡片共用，模块级缓存）
import { withBase } from 'vitepress'

export interface PdfInfo { url: string; bytes: number }
export interface PdfTarget { id: string; type: 'site' | 'chapter'; title: string; pdf: PdfInfo }
export interface PdfManifest { generatedAt: string; targets: PdfTarget[] }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isManifest(value: unknown): value is PdfManifest {
  if (!isRecord(value) || 'templates' in value ||
      typeof value.generatedAt !== 'string' || !Number.isFinite(Date.parse(value.generatedAt)) ||
      !Array.isArray(value.targets) || value.targets.length === 0) return false
  const ids = new Set<string>()
  let sites = 0
  for (const target of value.targets) {
    if (!isRecord(target) || 'pdfs' in target ||
        typeof target.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(target.id) || ids.has(target.id) ||
        typeof target.title !== 'string' || !target.title.trim() ||
        !isRecord(target.pdf) || target.pdf.url !== `pdfs/${target.id}.pdf` ||
        typeof target.pdf.bytes !== 'number' || !Number.isSafeInteger(target.pdf.bytes) || target.pdf.bytes <= 0) return false
    if (target.type === 'site' && target.id === 'all') sites++
    else if (target.type !== 'chapter' || target.id === 'all') return false
    ids.add(target.id)
  }
  return sites === 1
}

let cache: Promise<PdfManifest | null> | null = null

export function loadManifest(): Promise<PdfManifest | null> {
  if (!cache) {
    cache = fetch(withBase('/pdfs/manifest.json'), { cache: 'no-cache' })
      .then(async r => {
        const value: unknown = r.ok ? await r.json() : null
        return isManifest(value) ? value : null
      })
      .catch(() => null)
      .then(manifest => {
        if (!manifest) cache = null
        return manifest
      })
  }
  return cache
}

export function pdfUrl(t: PdfTarget): string {
  const u = t.pdf.url
  return u ? withBase('/' + u) : ''
}

export function fmtBytes(b = 0): string {
  return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB'
}
