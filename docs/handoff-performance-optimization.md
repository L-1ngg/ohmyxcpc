# 性能优化跨窗口交接

交接日期：2026-10-01，时区 Asia/Shanghai。工作目录：`/home/l1ngg/dev/ohmyxcpc`。

## 1. 当前目标与状态

用户最初要求调查性能优化空间，逐项阐述、逐项确认。以下 8 项方案均已确认。当前完成的是调查与隔离探针，尚未修改项目源码、依赖或 CI，尚未接入任何优化。

最新要求是跨窗口交接，因此本次仅创建本文档。下个窗口若用户要求实施，直接按已确认的完整范围推进到实现、必要验证和交付，不重新确认已定方案。

- 本次交接现场核对：HEAD 为 `2ad3c4a1d4534c38830404834827d95f16214ec1`，创建本文档前 `git status --short` 输出为空。
- 前序调查的临时文件、浏览器及服务器已清理；没有需要接续的工具会话。原始探针脚本未保留。
- 本次不提交、不推送、不触发远端部署。用户已有改动必须保留。
- 测量数据来自本窗口前序调查记录，本次交接未重新运行性能测试；不能当作优化全部接入后的实测结果。

## 2. 已确认的 8 项方案

| 项目 | 已确认行为与边界 | 主要入口 |
| --- | --- | --- |
| 1. PDF 按需预览 | 普通进入下载中心先展示目录、大小与下载入口，点击预览才创建 iframe；从“预览本章”直达仍自动加载章节 PDF。 | `.vitepress/theme/ExportCenter.vue`、`ChapterPdf.vue`、`Layout.vue`、`manifest.ts` |
| 2. 公式与代码高亮构建缓存 | 复用 MathJax、Shiki 输出，缓存仅属于当前 Markdown 渲染器实例；新构建或配置变化重新建立。 | `.vitepress/config.ts` 的 Markdown hook |
| 3. PDF 增量导出 | 有效缓存下：仅改网页样式或交互编译 0 份；单章正文或代码变化编译该章及整本 2 份；首次构建或公共依赖变化全量编译 20 份。CI 恢复和保存缓存；继续串行编译，保留整批发布与恢复机制。 | `scripts/prebuild-pdfs.mjs`、`scripts/pdf/exporter.mjs`、`publication.mjs`、CI |
| 4. 首次搜索资源预热 | 指向、聚焦搜索按钮，或移动端触摸按下时，并行加载原生搜索组件与当前语言索引；不自动打开或抢焦点，复用加载任务，预热失败不阻塞正常搜索。 | VitePress 原生搜索组件与主题接入 |
| 5. 无损 WebP 插图 | 原始 PNG 仍为统一来源，构建时自动派生网页 WebP，使用 `<picture>` 提供 PNG 回退；PDF 继续读取原图，尺寸与像素保持一致。转换库尚未确定，选维护中的图像库。 | `content/public/images/`、Markdown 图片渲染与构建流程 |
| 6. C++ 语法检查受限并发 | 默认最多 4 个 `g++`，按可用 CPU 收紧，可手动降至 1 或 2；仍检查全部 183 份独立源码，保留 `-std=gnu++20 -fsyntax-only`，按完成数量显示进度，按源码顺序汇总错误，失败退出非零。 | `scripts/check-code.mjs` |
| 7. 标准库预编译头 PCH | 每次检查用当前编译器生成临时 PCH，仅在源码现有 include 处复用；GCC 不兼容时普通解析，PCH 生成失败走普通检查，支持关闭，结束清理；不做跨运行的长期 PCH 缓存。 | `scripts/check-code.mjs` |
| 8. CI job 并行 | 独立 `check-code` job 与 PDF/网站 `build` 同时运行；`deploy` 使用 `needs: [build, check-code]`。C++ job 只需 checkout、Node 和 runner 自带的 `g++`，直接运行 Node 脚本。 | `.github/workflows/deploy.yml` |

## 3. 必须保留的决策与契约

- 用户明确拒绝关闭页面自动预取，认为预取有助于响应速度。保留 VitePress 默认页面预取。
- 不采用 MathJax `fontCache: local`：探针虽使原始 HTML 更小，但 gzip 和 DOM 更大。
- 不采用 `content-visibility: auto`：虽然减少屏幕外布局成本，但目录锚点偏移。
- 图片懒加载仅做过探针，未纳入已确认方案；初始流量减少，首屏改善很小。
- 保持 Markdown 为唯一正文源、独立 C++ 文件为共享代码源；只导出整本与章节 PDF，保持现有版式。
- PDF 增量复用也必须组成完整暂存集合，经校验后整批发布。缓存元数据放发布目录之外，正式目录只保存合同允许的文件。
- PDF 指纹须覆盖实际依赖，包括 Markdown、代码、图片、字体、模板及工具版本；实现时保守覆盖共享脚本、章节目录与顺序、前言和封面等会影响产物的输入。
- 不宣称目录交换对持续读者完全原子可见。现行发布合同明确两次目录交换间可能短暂无正式目录。
- 当前 CI smoke 为 `continue-on-error: true`。两个必需 job 成功不能表述成所有可选检查均通过。
- 搜索不得写死构建产物 hash；直接使用快捷键且未触发预热时，收益有限。
- 清单读取、错误提示、重试和部署子路径行为以当前合同为准。历史发生过旧 manifest 缓存造成下载中心空白，不能只验证全新浏览器的成功路径。

现行合同已现场读取：`docs/pdf-publication-contract.md`、`docs/pdf-manifest-contract.md`。旧记忆中的迁移或修复进度是历史快照，不覆盖这些现行合同。

## 4. 前序探针结果

以下数据测量条件不同，提速百分比不能相加。全部接入后需在统一条件下复测。

| 探针 | 结果与验证边界 |
| --- | --- |
| 网站基线 | `pnpm build` 通过，约 71.36 秒；19 章、229 个算法条目、251 个网站 Markdown 页面。 |
| 下载中心 | 冷加载约 11.5 MB，其中默认加载的整本 PDF 约 11.3 MB。 |
| 渲染缓存 | 全部页面渲染两遍：无缓存 32.290 秒，缓存 15.972 秒；502 份 HTML 的 SHA-256 全部一致。公式计算 4888 → 1307 次，高亮 748 → 371 次；缓存字符串约 13.5 MB，另有键与 Map 开销。 |
| PDF 全量导出 | 隔离全量导出 20 份成功，36.220 秒；其中整本 12.712 秒。PDF 合计 24,947,662 bytes，校验复制约 96 ms。不是接入增量缓存后的整流程数据。 |
| 搜索预热 | 搜索组件 gzip 22,146 bytes，索引 gzip 159,744 bytes，合计约 182 KB。页面已加载后模拟 1.6 Mbps、120 ms 延迟、CPU 4 倍降速，每组 3 次：冷搜索结果 1.76 秒，提前 250 ms 预热 1.32 秒，完全预热 0.61 秒。18 次结果顺序一致，桌面和移动跳转正常。 |
| 无损 WebP | 11 张 PNG 合计 567,210 bytes，无损 WebP 267,802 bytes；全部解码 RGBA 一致。代表图 `img-09` 的浏览器 Canvas 像素校验一致。 |
| WebP 页面效果 | 图论代表页 4 张图 366,124 → 159,302 bytes。相同网络与 CPU 模拟下，图片全部可显示的时间：桌面 3.74 → 2.55 秒，移动 3.29 → 2.68 秒；首屏无明显改善，尺寸与最终标题位置一致。 |
| C++ 并发 | 固定 18 类样本各测 3 次，中位数：串行 42.1 秒，双并发 21.7 秒，四并发 12.2 秒。四并发全量 183/183 通过，用时 116.0 秒；错误输入仍能识别。 |
| 并发加 PCH | 四并发全量 183/183 通过，用时 45.6 秒，包含 5.6 秒 PCH 生成；167 命中、16 普通解析。PCH 为 159,721,499 bytes，约 152 MiB。缺失头、语法错误、重复 include、宏不兼容结果均与普通检查一致。 |

前序核对的成功 CI：<https://github.com/L-1ngg/ohmyxcpc/actions/runs/34683532953>。当时 build job 409 秒，C++ 256 秒、PDF 28 秒、PDF 校验 9 秒、网站构建 61 秒。交接时未刷新远端，不能视为当前最新运行。

## 5. PCH 已验证的具体做法

使用 GCC 自带的 PCH 查找机制，在源码已有 include 处复用，不强制 `-include`，避免掩盖源码缺失 include。

```text
临时输入 stdlib.hpp:              #include <bits/stdc++.h>
临时搜索目录 bits/stdc++.h:       #include_next <bits/stdc++.h>
临时搜索目录 bits/stdc++.h.gch:   g++ -std=gnu++20 -x c++-header stdlib.hpp -o ...
源码检查:                        g++ -std=gnu++20 -fsyntax-only -I 临时搜索目录 source.cpp
```

- 编译 PCH 输入时不要加临时搜索目录，确保读取真实系统头。
- 必须保留文本回退头。初次只有 `.gch` 时，9 份重复 include 源码报缺失文本头；加入 `#include_next` 后全量通过。
- `-H` 探针中 `! <path>.gch` 表示命中，`x <path>.gch` 表示拒绝。正式检查不必输出大量 `-H` 日志。
- 167 份源码直接首行包含 `<bits/stdc++.h>`；16 份首行包含 `../contest.hpp`，后者嵌套引入标准库，未命中 PCH。
- 官方依据：<https://gcc.gnu.org/onlinedocs/gcc/Precompiled-Headers.html>。

## 6. 下个窗口优先读取的文件

- 全局规则：`/home/l1ngg/.agents/AGENTS.md`。本次未发现适用于仓库的额外 `AGENTS.md`。
- 配置与主题：`.vitepress/config.ts`、`.vitepress/theme/ExportCenter.vue`、`ChapterPdf.vue`、`Layout.vue`、`manifest.ts`、`index.ts`。
- 原生搜索实现：`node_modules/vitepress/dist/client/theme-default/components/VPNavBarSearch.vue`、`VPLocalSearchBox.vue`。后者使用 `@localSearchIndex` 的 locale loader，再调用 `MiniSearch.loadJSON`。
- PDF：`scripts/prebuild-pdfs.mjs`、`scripts/pdf/exporter.mjs`、`publication.mjs`、`md2typst.mjs`、`template.typ`、`theme.typ`；两份 PDF 合同。
- C++：`scripts/check-code.mjs`、`docs/migration/source-manifest.json`、`content/snippets/code/contest.hpp`。
- 图片：`content/public/images/img-01.png` 至 `img-11.png`；代表页 `content/graph/entry-020.md`。
- 工具与验证：`package.json`、`scripts/lib/browser.mjs`、`scripts/smoke-export.mjs`、`scripts/check-pdfs.py`、`scripts/tests/*.test.mjs`、`.github/workflows/deploy.yml`。

工具沿用 pnpm、Node、Typst 与现有测试体系。探针时版本：Node v24.14.1、pnpm 10.22.0、Typst 0.14.2、g++ 14.2.0，本机可用 8 个 CPU。版本与可用 CPU 在恢复实施前现场核对。

`playwright-core` 已安装；探针时完整 Chromium 路径为 `/home/l1ngg/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`，`launchBrowser()` 默认使用 headless shell。图片探针用 `uv run --no-project --with pillow==12.1.1`，未增加项目依赖；正式转换库仍需选择。

## 7. 恢复实施后的完成标准

先核对工作树与现行代码，再实施完整 8 项已确认方案。普通实现细节由执行者按现有模式选择，不再次访谈已定设计。

- PDF 按需预览：普通进入不请求整本 PDF，点击后可预览，章节直达自动预览；保留加载失败与重试、桌面和移动布局、部署 base 行为。
- 渲染缓存：验证网页与搜索索引的公式及高亮输出一致，缓存随渲染器生命周期隔离；不能只报告命中率。
- PDF 缓存：覆盖冷构建 20 份、全命中 0 份、单章变化 2 份、公共依赖变化 20 份；验证缓存缺失或无效时可重建，以及复用后的整批清单、文件一致性和失败恢复。
- 搜索：覆盖指向、聚焦、移动触摸、首次直接打开、快捷键、失败后的正常打开、重复触发与当前语言索引；确认结果和跳转一致。
- 图片：核对 11 张图无损像素、尺寸、PNG 回退、部署 base 和网页实际显示；PDF 继续使用原始 PNG。
- C++：全量 183 份通过，错误源码仍失败，诊断按源码顺序汇总；覆盖并发限制、PCH 关闭、生成失败与不兼容回退，以及临时目录清理。
- CI：检查独立 job 的依赖与部署门禁；本地验证不能代替真实远端运行，未执行的部分明确说明。
- 按实际改动运行项目检查：`pnpm typecheck`、`pnpm test`、`pnpm check:code`、`pnpm prebuild:pdf`、`pnpm check:pdf`、`pnpm build`、`pnpm smoke`。无需为纯交接文档重跑构建。
- 最后统一条件复测，报告实际结果、未验证内容与原因，清理本次无后续用途的临时文件。手工编辑使用 `apply_patch`，不擅自更新记忆或执行远端动作。

## 8. 可用于新窗口的指令

```text
请阅读 /home/l1ngg/dev/ohmyxcpc/docs/handoff-performance-optimization.md，接续性能优化工作。
8 项方案均已确认，目前仅完成调查与探针，尚未实施。按交接文档完整实施并验证，不重新确认已定方案；保留 VitePress 默认预取，不提交、不推送、不触发远端部署。
```
