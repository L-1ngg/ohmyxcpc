const id = '/@ohmyxcpc/search-preload'

// Rollup owns chunk URLs, including hashes and deployment paths. Fetching bytes avoids failed-import module caching.
export function searchPreloadPlugin(componentPath) {
  let config
  return {
    name: 'ohmyxcpc:search-preload',
    configResolved(resolved) { config = resolved },
    resolveId(source) { if (source === '@ohmyxcpc/search-preload') return id },
    async load(source) {
      if (source !== id) return
      if (config.build.ssr) return 'export default { component: "", indexes: {} }'
      if (config.command === 'build') {
        // The native loader finishes indexing before individual locale chunks may be emitted.
        const index = await this.resolve('@localSearchIndex')
        await this.load({ id: index.id })
      }
      const locales = [...new Set(['root', ...Object.keys(config.vitepress.site.locales)])]
      const url = path => config.command === 'build'
        ? `import.meta.ROLLUP_FILE_URL_${this.emitFile({ type: 'chunk', id: path, preserveSignature: 'strict' })}`
        : JSON.stringify(path.startsWith('@localSearchIndex') ? '/' + path : '/@fs' + path)
      return `export default { component: ${url(componentPath)}, indexes: {${locales.map(locale => `${JSON.stringify(locale)}: ${url('@localSearchIndex' + locale)}`).join(',')}} }`
    }
  }
}
