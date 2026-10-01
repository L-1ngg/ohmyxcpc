import resources from '@ohmyxcpc/search-preload'

let component: Promise<unknown> | undefined
const indexes = new Map<string, Promise<unknown>>()

export function prewarmSearch(locale: string): Promise<unknown> {
  if (!component) {
    component = preload(resources.component).catch(() => { component = undefined })
  }
  if (!indexes.has(locale) && resources.indexes[locale]) {
    indexes.set(locale, preload(resources.indexes[locale]).catch(() => { indexes.delete(locale) }))
  }
  return Promise.all([component, indexes.get(locale)])
}

async function preload(url: string): Promise<void> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Search preload HTTP ${response.status}`)
  await response.arrayBuffer()
}
