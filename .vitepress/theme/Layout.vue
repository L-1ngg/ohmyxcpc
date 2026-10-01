<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ChapterPdf from './ChapterPdf.vue'
import { onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import { prewarmSearch } from './search-prewarm'

const { localeIndex } = useData()
const prewarm = (event: Event) => {
  if (event.target instanceof Element && event.target.closest('.VPNavBarSearch button')) {
    void prewarmSearch(localeIndex.value)
  }
}
onMounted(() => {
  document.addEventListener('pointerover', prewarm)
  document.addEventListener('focusin', prewarm)
  document.addEventListener('touchstart', prewarm, { passive: true })
})
onUnmounted(() => {
  document.removeEventListener('pointerover', prewarm)
  document.removeEventListener('focusin', prewarm)
  document.removeEventListener('touchstart', prewarm)
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #aside-bottom>
      <ChapterPdf />
    </template>
  </DefaultTheme.Layout>
</template>
