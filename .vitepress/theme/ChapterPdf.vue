<script setup lang="ts">
// 章节 PDF 卡片：固定在右侧大纲栏底部（aside-bottom 插槽），提供本章下载
import { ref, computed, onMounted } from 'vue'
import { useRoute, useData, withBase } from 'vitepress'
import { loadManifest, pdfUrl, fmtBytes, type PdfManifest } from './manifest'

const route = useRoute()
const { site } = useData()
const manifest = ref<PdfManifest | null>(null)
onMounted(async () => { manifest.value = await loadManifest() })

const chapter = computed(() => {
  // route.path 带部署 base（如 /ohmyxcpc/graph/dinic.html），需先剥离
  const b = site.value.base
  const p = b !== '/' && route.path.startsWith(b) ? route.path.slice(b.length - 1) : route.path
  const dir = p.replace(/^\//, '').replace(/\.html$/, '').split('/')[0]
  return manifest.value?.targets.find(t => t.type === 'chapter' && t.id === dir)
})
</script>

<template>
  <div v-if="chapter" class="chapter-pdf">
    <div class="cp-title">本章 PDF · {{ chapter.title }}</div>
    <div class="cp-actions">
      <a v-for="t in manifest!.templates" :key="t.id" :href="pdfUrl(chapter, t.id)" download>
        {{ t.name }} <span class="cp-size">{{ fmtBytes(chapter.pdfs[t.id]?.bytes) }}</span>
      </a>
    </div>
    <a class="cp-more" :href="`${withBase('/export')}?target=${chapter.id}`">预览与更多 →</a>
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
