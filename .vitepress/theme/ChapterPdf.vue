<script setup lang="ts">
// 章节 PDF 卡片：固定在右侧大纲栏底部（aside-bottom 插槽），提供本章下载
import { ref, computed, onMounted } from 'vue'
import { useRoute, useData, withBase } from 'vitepress'
import { loadManifest, pdfUrl, fmtBytes, type PdfManifest } from './manifest'

const route = useRoute()
const { site } = useData()
const manifest = ref<PdfManifest | null>(null)
const loading = ref(true)
async function reload() {
  loading.value = true
  manifest.value = await loadManifest()
  loading.value = false
}
onMounted(reload)

const chapter = computed(() => {
  // route.path 带部署 base（如 /ohmyxcpc/graph/dinic.html），需先剥离
  const b = site.value.base
  const p = b !== '/' && route.path.startsWith(b) ? route.path.slice(b.length - 1) : route.path
  const dir = p.replace(/^\//, '').replace(/\.html$/, '').split('/')[0]
  return manifest.value?.targets.find(t => t.type === 'chapter' && t.id === dir)
})
</script>

<template>
  <div v-if="loading || !manifest" class="chapter-pdf" role="status">
    <span v-if="loading">PDF 加载中…</span>
    <template v-else>
      PDF 暂时不可用。
      <button class="cp-retry" @click="reload">重试</button>
    </template>
  </div>
  <div v-else-if="chapter" class="chapter-pdf">
    <div class="cp-title">本章 PDF · {{ chapter.title }}</div>
    <div class="cp-actions">
      <a :href="pdfUrl(chapter)" download>
        下载本章 <span class="cp-size">{{ fmtBytes(chapter.pdf.bytes) }}</span>
      </a>
    </div>
    <a class="cp-more" :href="`${withBase('/export')}?target=${chapter.id}`">预览本章 →</a>
  </div>
</template>

<style scoped>
.chapter-pdf {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
}
.cp-retry { color: var(--vp-c-brand-1); text-decoration: underline; cursor: pointer; }
.cp-title {
  font-weight: 600;
  margin-bottom: 8px;
}
.cp-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cp-actions a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.cp-size {
  color: var(--vp-c-text-2);
  font-size: 12px;
}
.cp-more {
  display: inline-block;
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  text-decoration: none;
}
.cp-more:hover { color: var(--vp-c-brand-1); }
</style>
