<script setup lang="ts">
// 下载中心：左侧目标树（整站 → 章节 → 条目），右侧 PDF 预览 + 模板切换 + 下载
// 支持 URL 参数直达：/export?target=graph&tpl=double
import { ref, computed, watch, onMounted } from 'vue'
import { loadManifest, pdfUrl, fmtBytes, type PdfManifest } from './manifest'

const manifest = ref<PdfManifest | null>(null)
const failed = ref(false)
const targetId = ref('all')
const tplId = ref('')

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
</script>

<template>
  <div class="ec">
    <div v-if="failed" class="ec-warn">
      尚未生成预构建 PDF。本地请运行 <code>pnpm prebuild:pdf</code>；线上版本由 CI 自动构建。
    </div>
    <div v-else-if="!manifest" class="ec-warn">加载中…</div>

    <div v-else class="ec-body">
      <aside class="ec-list">
        <button class="ec-item ec-site" :class="{ on: targetId === 'all' }" @click="targetId = 'all'">
          {{ site?.title ?? '整站合集' }}
        </button>
        <div v-for="c in chapters" :key="c.id" class="ec-group">
          <button class="ec-item ec-chapter" :class="{ on: targetId === c.id }" @click="targetId = c.id">
            {{ c.title }}
          </button>
          <button
            v-for="p in pagesOf(c.id)" :key="p.id"
            class="ec-item ec-page" :class="{ on: targetId === p.id }"
            @click="targetId = p.id"
          >{{ p.title }}</button>
        </div>
      </aside>

      <main class="ec-main">
        <div class="ec-toolbar">
          <div class="ec-seg">
            <button
              v-for="t in manifest.templates" :key="t.id"
              :class="{ on: tplId === t.id }" :title="t.description"
              @click="tplId = t.id"
            >{{ t.name }}</button>
          </div>
          <span v-if="current" class="ec-meta">
            {{ current.title }} · {{ fmtBytes(current.pdfs[tplId]?.bytes) }}
          </span>
          <a v-if="current" class="ec-dl" :href="pdfUrl(current, tplId)" download>下载 PDF</a>
        </div>
        <iframe v-if="current" class="ec-frame" :src="pdfUrl(current, tplId)" title="PDF 预览"></iframe>
      </main>
    </div>
  </div>
</template>

<style scoped>
.ec-body {
  display: flex;
  gap: 20px;
  min-height: 70vh;
}
.ec-list {
  width: 200px;
  flex-shrink: 0;
  overflow-y: auto;
  max-height: 76vh;
  border-right: 1px solid var(--vp-c-divider);
  padding-right: 12px;
}
.ec-group { margin-top: 8px; }
.ec-item {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}
.ec-item:hover { background: var(--vp-c-bg-soft); }
.ec-item.on { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); font-weight: 600; }
.ec-site { font-weight: 700; }
.ec-chapter { font-weight: 600; }
.ec-page { padding-left: 26px; font-size: 13px; color: var(--vp-c-text-2); }
.ec-main { flex: 1; min-width: 0; }
.ec-toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.ec-seg {
  display: inline-flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
.ec-seg button {
  border: none;
  background: none;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}
.ec-seg button.on { background: var(--vp-c-brand-1); color: #fff; }
.ec-meta { font-size: 13px; color: var(--vp-c-text-2); flex: 1; }
.ec-dl {
  padding: 6px 18px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  text-decoration: none;
  font-size: 14px;
}
.ec-frame {
  width: 100%;
  height: 68vh;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
}
.ec-warn { color: var(--vp-c-text-2); line-height: 1.8; }
@media (max-width: 768px) {
  .ec-body { flex-direction: column; }
  .ec-list { width: 100%; max-height: none; border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
}
</style>
