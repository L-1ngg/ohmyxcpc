# 性能优化实施与验证

实施范围来自[已确认的交接方案](./handoff-performance-optimization.md)。保留 VitePress 默认页面预取，Markdown 与独立 C++ 仍为网页和 PDF 的共享来源。实施及本地验证阶段没有提交、推送或触发远端部署。后续按用户授权提交并推送，使用 `[skip ci]` 保留不触发远端部署的约束。

## 已接入行为

| 项目 | 实现 |
| --- | --- |
| PDF 按需预览 | 普通进入下载中心只加载清单，选择章节也不自动请求 PDF；点击“预览 PDF”才创建 iframe。“预览本章”链接使用 `?target=<chapter>&preview=1` 自动预览。清单读取、失败提示、重试和部署 base 保持原合同。 |
| 公式与高亮缓存 | `scripts/lib/markdown-cache.mjs` 为当前 Markdown 渲染器安装独立 Map。公式区分行内和块级；高亮键包含完整调用参数，包括语言与高亮行属性。新渲染器和配置重新创建缓存，不写磁盘。 |
| PDF 增量导出 | `.cache/pdf/` 保存 20 份产物与指纹，复用前验证文件头、普通文件、大小和 SHA-256。全部目标仍进入完整暂存集合，经原发布模块校验后整批替换；发布成功后更新缓存。继续串行编译。 |
| 搜索预热 | 指向、聚焦、移动触摸按下搜索按钮时并行下载原生组件与当前语言索引。资源 URL 由 Rollup 生成，兼容 hash 与部署 base。成功任务共享，失败任务可重试；不打开搜索、不抢焦点。 |
| 无损 WebP | Vite 构建自动用 `sharp` 从 11 张 PNG 派生无损 WebP；Markdown 输出 `<picture>` 和 PNG 回退。派生文件不入 Git，PDF 仍读取原始 PNG。 |
| C++ 受限并发 | 默认最多 4 个 GCC，按 `availableParallelism()` 收紧；所有 183 份独立源码仍使用 `-std=gnu++20 -fsyntax-only`。进度按完成数量输出，错误按清单源码顺序汇总，失败退出非零。 |
| 临时 PCH | 当前编译器每次生成标准库 PCH，在现有 include 处复用，保留 `#include_next` 文本回退头。生成失败或宏不兼容时普通解析，不强制补 include，结束清理临时目录。 |
| CI 并行 | `check-code` 只用 checkout、Node 和 runner GCC，直接运行 Node 脚本，与 `build` 并行；部署要求 `[build, check-code]` 成功。PDF 缓存由 Actions 恢复与保存。Smoke 仍为可选检查。 |

搜索预热只下载资源字节，正常打开仍使用 VitePress 原生组件和索引加载器。直接 `import()` 的预热失败会污染浏览器模块缓存，故这里使用 `fetch()` 和正常 HTTP 缓存；避免影响随后正常搜索。HTTP 服务若禁用资源缓存，预热收益会缩小，但正常打开和重试仍可工作。

## PDF 指纹与发布边界

公共指纹覆盖章节目录与顺序、前言、PDF 模板和转换/导出/发布脚本、共享内容与代码导入脚本、字体文件与字体清单、依赖锁文件、迁入清单，以及 Typst/Node 版本和平台。每个目标再覆盖 Markdown 全文、引用的完整代码文件、实际图片原件和转换后的 Typst 正文。因此网页样式/交互改动不重新编译 PDF；单章正文或代码改动只编译该章与整本；公共依赖改动全量重建。

缓存缺失、旧 schema、JSON 损坏、产物缺失或哈希不匹配时重新编译。成功复用的 PDF 字节保持不变。缓存不是正式发布目录，也不能替代[整批发布与恢复合同](./pdf-publication-contract.md)。两次目录交换之间仍可能短暂无正式目录，不声称对持续读者完全原子可见；崩溃、断电和并发发布仍不在现行合同范围内。

## 操作与复测

沿用 Node 24、pnpm 10.22.0、Typst 0.14.2 和现有测试体系：

```bash
pnpm typecheck
pnpm test
pnpm check:code
pnpm check:code --jobs=2
pnpm check:code --jobs=1 --no-pch
CHECK_CODE_PCH=0 CHECK_CODE_JOBS=4 pnpm check:code
pnpm prebuild:pdf
pnpm check:pdf
pnpm build
pnpm smoke
VITEPRESS_BASE=/ohmyxcpc/ pnpm build
VITEPRESS_BASE=/ohmyxcpc/ pnpm smoke
```

`CHECK_CODE_JOBS` / `--jobs` 为正整数，最终限制在 4 和可用 CPU 以内；`CHECK_CODE_PCH=0` 或 `--no-pch` 关闭 PCH。`CXX` 可指定兼容 GCC 的编译器可执行文件。

三个复测脚本均在退出时关闭浏览器/服务器或清理隔离工作目录，不修改正文与代码源：

```bash
node scripts/benchmark-rendering.mjs  # 251 页两遍，比较 502 份完整 HTML SHA-256
node scripts/benchmark-pdfs.mjs      # 真实 20 份冷构建、全命中、网页改动、单章正文/代码、公共依赖变化
node scripts/benchmark-browser.mjs   # 1.6 Mbps、120 ms、CPU 4 倍下，三种搜索预热条件各三次
```

浏览器脚本与最近一次构建使用相同的 `VITEPRESS_BASE`。例如子路径产物使用 `VITEPRESS_BASE=/ohmyxcpc/ node scripts/benchmark-browser.mjs`。

## 本次实测

日期：2026-10-01。本机 Node 24.14.1、pnpm 10.22.0、Typst 0.14.2、GCC 14.2.0，可用 8 CPU；浏览器为 Playwright Chromium 1243。计时任务逐个运行，未并行叠加编译或其他性能测试；样本规模与计时口径如下。

| 场景 | 本次结果 |
| --- | --- |
| 网站完整构建 | 改动前 VitePress 报告 73.70 秒；最终根路径构建 41.29 秒。单次测量，不视为长期统计。 |
| 完整 Markdown 渲染 | 相同 251 页各渲染两遍：无缓存 32.25 秒，有缓存 14.71 秒；502 份完整 HTML 的 SHA-256 全部相同。 |
| 渲染计算与缓存量 | 公式调用 4888 次，实际计算 1307 次；高亮调用 748 次，实际计算 371 次。缓存字符串 UTF-8 字节 13,520,384，未计键、Map 与 V8 开销。 |
| 生产搜索索引 | 与本次改动前构建的索引比较，541 个文档的路由、保存字段、字段长度、词项和各文档词频全部一致。构建并发导致内部数字 ID/序列化次序不同，比较时按文档路由规范化。 |
| PDF 冷构建 | 真实 20 份编译，36.90 秒。以下 PDF 场景使用同一个隔离工作目录的真实完整内容，均校验完整正式集合和清单大小。 |
| PDF 全命中 | 编译 0 份，复用 20 份，0.80 秒；与冷构建的 20 份 PDF 逐字节一致。 |
| 仅改网页样式 | 编译 0 份，复用 20 份，0.81 秒；PDF 字节不变。 |
| 单章正文变化 | 编译整本与该章 2 份，复用其余 18 份，13.79 秒；其余章节字节不变。 |
| 单章代码变化 | 编译整本与该章 2 份，复用其余 18 份，13.85 秒；其余章节字节不变。 |
| 公共模板变化 | 全量编译 20 份，36.66 秒。 |
| 搜索首次结果 | 页面加载后，统一 1.6 Mbps、120 ms 延迟、CPU 4 倍降速，资源使用 gzip 和 HTTP 缓存；每组 3 次。冷开中位数 2.35 秒，提前 250 ms 预热 1.59 秒，完全预热 0.74 秒；9 次全部结果及顺序相同。 |
| 搜索资源 | 原生组件 gzip 22,146 bytes，当前语言索引 gzip 159,719 bytes。预热只在意图事件后发生。 |
| 普通进入下载中心 | PDF 请求 0 次，PDF 传输 0 bytes，没有 iframe；点击预览后创建，章节直达自动创建。 |
| 11 张无损插图 | PNG 合计 567,210 bytes，带原有元数据的 WebP 合计 270,134 bytes，减少约 52.4%；全部尺寸和解码 RGBA 相同。浏览器对 `img-09` 的 Canvas 像素检查相同。 |
| 图片布局对照 | 图论 `entry-020` 的 4 张图在 1440 和 390 宽视口下，对比 `<picture>` 与直接 PNG 的图片位置/尺寸和全部标题位置，几何信息完全相同。 |
| C++ 全量对照 | 相同 183 份、相同四并发：关闭 PCH 117.47 秒，开启 PCH 44.65 秒（包含生成）；两者均 183/183 通过。 |

回归与浏览器检查覆盖缓存损坏/缺失重建、混合复用后编译失败保留旧正式产物及缓存、原发布模块的提交/恢复故障、清单网络错误与旧结构重试、桌面和移动布局、PNG 回退、预热事件/首次直接打开/快捷键/组件或索引失败后的正常打开，以及 PCH 生成失败、宏不兼容、重复 include、缺失 include、真实语法错误、错误退出码、诊断顺序、并发上限和临时目录清理。

最终执行结果：`pnpm typecheck` 通过；`pnpm test` 56/56 通过；`pnpm check:code` 和四并发关闭 PCH 的对照均 183/183；`pnpm prebuild:pdf` 在当前源码下完成 20 份冷生成与 20 份全命中；`pnpm check:pdf` 检查 20 份、471 页，零失败；`pnpm build` / `pnpm smoke` 的根路径与 `/ohmyxcpc/` 子路径均通过。完整 Chromium 截图确认内嵌 PDF 实际显示，验收截图保留于 `pdf/verification/`。

搜索预热依赖 VitePress 1.6 的原生组件入口、虚拟索引以及 Rollup 的 chunk URL API。升级 VitePress 时应运行完整构建与浏览器检查，验证这些入口及索引生成时序。

静态 YAML 解析检查已确认两个必需 job 独立、部署同时依赖它们、PDF 缓存恢复/保存步骤存在，且 smoke 仍为 `continue-on-error: true`。按用户要求没有运行远端 CI 或部署，GitHub runner 的实际并行耗时和缓存恢复效果未测量。各项测量条件不同，提速比例不能相加。
