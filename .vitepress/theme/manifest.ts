// 预生成 PDF 清单的共享加载器（导出中心页与章节卡片共用，模块级缓存）
import { withBase } from 'vitepress'

export interface PdfInfo { url: string; bytes: number }
export interface PdfTarget { id: string; type: 'site' | 'chapter'; title: string; pdf: PdfInfo }
export interface PdfManifest { generatedAt: string; targets: PdfTarget[] }

let cache: Promise<PdfManifest | null> | null = null

export function loadManifest(): Promise<PdfManifest | null> {
  if (!cache) {
    cache = fetch(withBase('/pdfs/manifest.json'))
      .then(r => (r.ok ? r.json() as Promise<PdfManifest> : null))
      .catch(() => null)
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
