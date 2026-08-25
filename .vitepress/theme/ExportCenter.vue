<script setup lang="ts">
// 下载中心：阅读器式布局——左侧下载目录（可折叠章节），右侧全高 PDF 预览
// 支持 URL 参数直达：/export?target=graph&tpl=double
import { ref, computed, watch, onMounted } from 'vue'
import { loadManifest, pdfUrl, fmtBytes, type PdfManifest } from './manifest'

const manifest = ref<PdfManifest | null>(null)
const failed = ref(false)
const targetId = ref('all')
const tplId = ref('')
const collapsed = ref<Set<string>>(new Set())
const catalogOpen = ref(false) // 移动端目录展开状态（默认折叠，避免长列表遮挡预览）

// 选择目标（移动端选择后自动收起目录）
const select = (id: string) => {
  targetId.value = id
  catalogOpen.value = false
}

onMounted(async () => {
  const q = new URLSearchParams(location.search)
  manifest.value = await loadManifest()
  if (!manifest.value) { failed.value = true; return }
  tplId.value = q.get('tpl')
    || manifest.value.templates.find(t => t.id === 'standard')?.id
    || manifest.value.templates[0]?.id || ''
  const t = q.get('target')
  if (t && manifest.value.targets.some(x => x.id === t)) targetId.value = t
})

// 选择变化同步到 URL（可分享直达链接）
watch([targetId, tplId], ([t, tpl]) => {
  if (t && tpl) history.replaceState(null, '', `?target=${t}&tpl=${tpl}`)
})

const current = computed(() => manifest.value?.targets.find(t => t.id === targetId.value))
const site = computed(() => manifest.value?.targets.find(t => t.type === 'site'))
const chapters = computed(() => manifest.value?.targets.filter(t => t.type === 'chapter') ?? [])
const pagesOf = (cid: string) =>
  manifest.value?.targets.filter(t => t.type === 'page' && t.id.startsWith(cid + '/')) ?? []

const toggle = (cid: string) => {
  const s = new Set(collapsed.value)
  s.has(cid) ? s.delete(cid) : s.add(cid)
  collapsed.value = s
}

const toggleLabel = computed(() =>
  catalogOpen.value ? '收起目录 ▴' : `选择内容：${current.value?.title ?? ''} ▾`)
</script>

<template>
  <div class="ep">
    <div v-if="failed" class="ep-warn">
      尚未生成预构建 PDF。本地请运行 <code>pnpm prebuild:pdf</code>；线上版本由 CI 自动构建。
    </div>
    <div v-else-if="!manifest" class="ep-warn">加载中…</div>

    <div v-else class="ep-body">
      <!-- 下载目录：整站置顶，章节可折叠，条目缩进；移动端为可展开面板 -->
      <aside class="ep-catalog" :class="{ open: catalogOpen }">
        <button class="ep-item ep-site" :class="{ on: targetId === 'all' }" @click="select('all')">
          {{ site?.title ?? '整站合集' }}
        </button>
        <div v-for="c in chapters" :key="c.id" class="ep-group">
          <div class="ep-chapter-row">
            <button
              class="ep-fold"
              :title="collapsed.has(c.id) ? '展开' : '折叠'"
              @click="toggle(c.id)"
            >{{ collapsed.has(c.id) ? '▸' : '▾' }}</button>
            <button class="ep-item ep-chapter" :class="{ on: targetId === c.id }" @click="select(c.id)">
              {{ c.title }}
            </button>
          </div>
          <template v-if="!collapsed.has(c.id)">
            <button
              v-for="p in pagesOf(c.id)" :key="p.id"
              class="ep-item ep-page" :class="{ on: targetId === p.id }"
              @click="select(p.id)"
            >{{ p.title }}</button>
          </template>
        </div>
      </aside>

      <!-- 预览区：工具条 + 全高 PDF -->
      <main class="ep-main">
        <button class="ep-catalog-toggle" @click="catalogOpen = !catalogOpen">
          {{ toggleLabel }}
        </button>
        <div class="ep-toolbar">
          <div class="ep-seg">
            <button
              v-for="t in manifest.templates" :key="t.id"
              :class="{ on: tplId === t.id }" :title="t.description"
              @click="tplId = t.id"
            >{{ t.name }}</button>
          </div>
          <span v-if="current" class="ep-meta">
            {{ current.title }} · {{ fmtBytes(current.pdfs[tplId]?.bytes) }}
          </span>
          <a v-if="current" class="ep-dl" :href="pdfUrl(current, tplId)" download>下载 PDF</a>
        </div>
        <iframe v-if="current" class="ep-frame" :src="pdfUrl(current, tplId)" title="PDF 预览"></iframe>
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
.ep-group { margin-top: 6px; }
.ep-chapter-row {
  display: flex;
  align-items: center;
}
.ep-fold {
  border: none;
  background: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  width: 18px;
  padding: 0;
  font-size: 12px;
  flex-shrink: 0;
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
.ep-page { padding-left: 24px; font-size: 13px; color: var(--vp-c-text-2); }

/* 预览区 */
.ep-main { flex: 1; min-width: 0; }
.ep-toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.ep-seg {
  display: inline-flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
.ep-seg button {
  border: none;
  background: none;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}
.ep-seg button.on { background: var(--vp-c-brand-1); color: #fff; }
.ep-meta { font-size: 13px; color: var(--vp-c-text-2); flex: 1; }
.ep-dl {
  padding: 6px 18px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  text-decoration: none;
  font-size: 14px;
}
.ep-frame {
  width: 100%;
  height: calc(100vh - var(--vp-nav-height) - 130px);
  min-height: 480px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
}
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
  .ep-group { margin-top: 0; display: contents; }
  .ep-chapter-row { display: contents; }
  .ep-fold { display: none; }
  .ep-item {
    width: auto;
    flex: none;
    border: 1px solid var(--vp-c-divider);
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 13px;
  }
  .ep-page { padding-left: 12px; }
  .ep-frame { height: 55vh; min-height: 320px; }
}
</style>
