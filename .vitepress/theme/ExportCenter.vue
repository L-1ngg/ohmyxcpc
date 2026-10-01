<script setup lang="ts">
// 下载中心：整本与章节共用一种版式，支持 URL 参数直达。
import { ref, computed, onMounted } from 'vue'
import { loadManifest, pdfUrl, fmtBytes, type PdfManifest } from './manifest'

const manifest = ref<PdfManifest | null>(null)
const failed = ref(false)
const targetId = ref('all')
const preview = ref(false)
const catalogOpen = ref(false) // 移动端目录展开状态（默认折叠，避免长列表遮挡预览）

// 选择目标（移动端选择后自动收起目录）
const select = (id: string) => {
  targetId.value = id
  preview.value = false
  catalogOpen.value = false
  history.replaceState(null, '', `?target=${encodeURIComponent(id)}`)
}

async function reload() {
  failed.value = false
  const q = new URLSearchParams(location.search)
  manifest.value = await loadManifest()
  if (!manifest.value) { failed.value = true; return }
  const t = q.get('target')
  if (t && manifest.value.targets.some(x => x.id === t)) targetId.value = t
  preview.value = q.get('preview') === '1' && !!t && manifest.value.targets.some(x => x.id === t && x.type === 'chapter')
}
onMounted(reload)

const current = computed(() => manifest.value?.targets.find(t => t.id === targetId.value))
const site = computed(() => manifest.value?.targets.find(t => t.type === 'site'))
const chapters = computed(() => manifest.value?.targets.filter(t => t.type === 'chapter') ?? [])
const toggleLabel = computed(() =>
  catalogOpen.value ? '收起目录 ▴' : `选择内容：${current.value?.title ?? ''} ▾`)
</script>

<template>
  <div class="ep">
    <div v-if="failed" class="ep-warn">
      PDF 暂时不可用。
      <button class="ep-retry" @click="reload">重试</button>
    </div>
    <div v-else-if="!manifest" class="ep-warn">加载中…</div>

    <div v-else class="ep-body">
      <!-- 移动端共用章节列表，选择后收起。 -->
      <aside class="ep-catalog" :class="{ open: catalogOpen }">
        <button class="ep-item ep-site" :class="{ on: targetId === 'all' }" @click="select('all')">
          {{ site?.title ?? '整本手册' }}
        </button>
        <button v-for="c in chapters" :key="c.id" class="ep-item ep-chapter"
          :class="{ on: targetId === c.id }" @click="select(c.id)">
          {{ c.title }}
        </button>
      </aside>

      <!-- 预览区：工具条 + 全高 PDF -->
      <main class="ep-main">
        <button class="ep-catalog-toggle" @click="catalogOpen = !catalogOpen">
          {{ toggleLabel }}
        </button>
        <div class="ep-toolbar">
          <span v-if="current" class="ep-meta">
            {{ current.title }} · {{ fmtBytes(current.pdf.bytes) }}
          </span>
          <button v-if="current && !preview" class="ep-preview" @click="preview = true">预览 PDF</button>
          <a v-if="current" class="ep-dl" :href="pdfUrl(current)" download>下载 PDF</a>
        </div>
        <iframe v-if="current && preview" :key="current.id" class="ep-frame" :src="pdfUrl(current)" title="PDF 预览"></iframe>
      </main>
    </div>
  </div>
</template>

<style scoped>
.ep-body {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 目录列：吸顶、独立滚动 */
.ep-catalog {
  position: sticky;
  top: calc(var(--vp-nav-height) + 16px);
  width: 210px;
  flex-shrink: 0;
  max-height: calc(100vh - var(--vp-nav-height) - 32px);
  overflow-y: auto;
  padding-right: 14px;
  border-right: 1px solid var(--vp-c-divider);
}
.ep-item {
  display: block;
  flex: 1;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  width: 100%;
}
.ep-item:hover { background: var(--vp-c-bg-soft); }
.ep-item.on { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); font-weight: 600; }
.ep-site { font-weight: 700; }
.ep-chapter { font-weight: 600; }

/* 预览区 */
.ep-main { flex: 1; min-width: 0; }
.ep-toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.ep-meta { font-size: 13px; color: var(--vp-c-text-2); flex: 1; }
.ep-dl {
  padding: 6px 18px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  text-decoration: none;
  font-size: 14px;
}
.ep-preview {
  padding: 6px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  cursor: pointer;
}
.ep-frame {
  width: 100%;
  height: calc(100vh - var(--vp-nav-height) - 130px);
  min-height: 480px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
}
.ep-retry { color: var(--vp-c-brand-1); text-decoration: underline; cursor: pointer; }
.ep-warn { color: var(--vp-c-text-2); line-height: 1.8; }
.ep-catalog-toggle { display: none; }

/* 移动端：目录默认折叠为按钮，展开后为限高滚动面板 */
@media (max-width: 768px) {
  .ep-body { flex-direction: column; }
  .ep-catalog-toggle {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px 12px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    font-size: 14px;
    text-align: left;
    cursor: pointer;
  }
  .ep-catalog { display: none; }
  .ep-catalog.open {
    display: flex;
    position: static;
    width: 100%;
    max-height: 45vh;
    overflow-y: auto;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
    padding: 0 0 10px;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }
  .ep-item {
    width: auto;
    flex: none;
    border: 1px solid var(--vp-c-divider);
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 13px;
  }
  .ep-frame { height: 55vh; min-height: 320px; }
}
</style>
