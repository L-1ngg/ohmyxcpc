# 项目初期规划与探索结论

> 配套文档：[需求文档](./requirements.md)

## 1. 技术探索（POC）结论

本次探索已在仓库内完成最小可行验证，代码可直接运行：

```bash
pnpm install        # 安装依赖
pnpm dev            # 本地开发预览（http://localhost:5173）
pnpm build          # 构建到 .vitepress/dist
pnpm export:pdf     # 整站导出 PDF 到 pdf/（需先 build）
pnpm export:pdf graph        # 单章节
pnpm export:pdf graph/dinic  # 单页面
```

| 验证项 | 方法 | 结果 |
|---|---|---|
| 目录扫描自动生成 sidebar | 放入 `content/graph/dinic.md` 后构建 | ✔ sidebar 自动出现「图论 → Dinic 最大流」，零配置 |
| 代码片段同源导入 | `<<< @/snippets/dinic.cpp` | ✔ 高亮+行号渲染 |
| 数学公式 | `markdown.math: true` + mathjax3 | ✔ 行内/块级公式渲染 |
| PDF 管线 A（已弃用） | playwright-core + headless Chromium 聚合打印 | ✔ 可行，但因模板化/精排能力不足弃用 |
| **PDF 管线 B（已采用）** | 自研 md→typst 转换层 + `typst compile` | ✔ 单栏/双栏两套模板编译成功；中文（文泉驿）、LaTeX 公式（mitex）、代码高亮、页眉+页码全部正常；单章节 PDF 仅约 60–80KB（字体子集化） |

关键实现说明：

- **动态 sidebar**（`.vitepress/config.ts` 中 `buildSidebar()`）：构建时扫描 `content/` 一级子目录生成章节，读取 frontmatter `title` / 首个 H1 作为显示名；`_`/`.` 开头目录与 `snippets/` 被排除。VitePress 配置本身就是 Node 代码，因此无需预生成脚本或第三方 sidebar 插件。
- **PDF 导出**（`scripts/export-pdf.mjs` + `scripts/pdf/`）：扫描 `content/` 解析目标（整站/章节/单页）→ `md2typst.mjs` 转换（frontmatter 剥离、`<<<` 片段内联、`:::` 容器去标记、公式包为 mitex 调用）→ 拼接 `scripts/pdf/templates/<模板>/template.typ` → `typst compile --input chapter=<章节名>` 产出 PDF + 首页 PNG 预览。

### PDF 导出的关键决策（v0.2）

1. 网页端高保真导出 = **构建时预生成**（整站+章节+页面 × 模板 全量矩阵），网页按钮只做预览与下载；
2. 所有导出必须含页眉/页码，**不设浏览器打印降级路径**（Chrome 不支持 CSS 页码边距盒）；
3. 内置模板 = `standard`（单栏阅读版）+ `double`（双栏赛用紧凑版）；
4. 排版引擎 = **Typst**，模板即 `.typ` 文件；浏览器内 WASM Typst 因 CJK 字体打包成本过高而不采用。

## 2. 里程碑规划

### M0 脚手架与技术验证 —— ✅ 已完成

- [x] pnpm 工程、VitePress 1.6、构建/预览脚本
- [x] 动态 sidebar 扫描
- [x] 数学公式、代码片段导入
- [x] PDF 导出 POC（Typst 管线：standard/double 模板 × 整站/章节/单页，含预览图）
- 验证标准：`pnpm build` 成功；`pnpm export:pdf` 产出可读的 `pdf/all.standard.pdf` / `all.double.pdf`。**均已通过。**

### M1 内容管线与收录 Skill —— ✅ 已完成

- [x] frontmatter 规范落地：`order` 排序字段（章节与条目均生效）
- [x] 扫描逻辑收敛为共享模块 `scripts/lib/content.mjs`（sidebar 与 PDF 导出共用，顺序已验证一致）
- [x] `content/_inbox/` 收件箱约定（`_` 前缀 + `srcExclude`，不收录不构建）
- [x] 收录 Skill：`.agents/skills/xcpc-template-ingest/SKILL.md`
- [x] `.gitignore`（dist、pdf、node_modules 等）
- 验证：E2E 模拟——将无 frontmatter、代码块无语言标注的 `_inbox/odt-草稿.md` 按 Skill 流程收录为新章节「数据结构」下的 `odt.md`，`pnpm build` 与 `pnpm export:pdf data-structure standard` 均通过。

### M2 PDF 导出正式化 —— ✅ 已完成

- [x] Typst 管线 spike：md→typst 转换器、standard/double 模板、CLI 三种粒度导出
- [x] 转换层完善：VitePress 容器 → typst 提示卡片（7 种类型配色）、嵌套列表修复、表格
- [x] 预生成管线：`pnpm prebuild:pdf` 全量矩阵（8 目标 × 2 模板）+ `manifest.json` → `content/public/pdfs/`
- [x] 网页导出界面 v2（独立页面式）：下载中心页 `/export`（目标树 + 大预览 + 模板切换 + URL 参数直达）、章节页面右侧常驻「本章 PDF」卡片、整站入口（导航链接 + 首页 hero）；冒烟测试 `pnpm smoke` 9 项断言全部通过
- [x] 整站版封面 + 两级目录页（条目 heading 自动降级）+ PDF 书签；**页码自正文起算**（封面/目录不计页码）
- [x] 模板重设计（对齐参考样式）：多级编号标题（1 → 1.1 → 1.1.1）、codly 行号代码块（白底细边框）、行内代码灰底块；修复页眉在页面流之前求值导致的页码重置时序问题（update(0) 置于目录页末尾）
- [x] CI：`.github/workflows/deploy.yml`（typst + Noto CJK 字体 + pnpm release + Pages 部署；`VITEPRESS_BASE` 注入）
- 验证标准：需求 A2/A3/A6 均已通过（目检封面/目录/双栏预览图 + 面板冒烟测试）。

已知问题：含数学公式的页面存在 hydration mismatch 告警（mathjax3 上游问题，功能无影响）。

### M3 站点打磨与部署

- [ ] 首页与品牌（logo、配色）、页脚、GitHub 链接
- [ ] 深色模式下打印仍强制浅色（打印 CSS 兜底）
- [ ] 部署到静态托管（GitHub Pages / CF Pages），配置 `base`
- 验证标准：需求 A5；Lighthouse 性能 ≥ 90。

### M4 内容充实与维护

- [ ] 迁移既有模板内容（借助 M1 的 Skill 批量入库）
- [ ] 贡献指南（内容规范速查）
- [ ] 构建冒烟测试（CI 中跑 `pnpm build`）
- 验证标准：真实模板库全量上线；新人按指南 5 分钟内完成一次收录。

## 3. 风险与对策

| 风险 | 等级 | 对策 |
|---|---|---|
| CI/部署机缺少中文字体导致 PDF 乱码 | 中 | 文档化字体依赖（Noto Sans CJK / 文泉驿）；CI 镜像预装字体 |
| md→typst 转换层覆盖不全 | 低 | 已覆盖表格/图片/容器/嵌套列表；`pnpm smoke` + 模板库充实时人工抽查 |
| 内容增多后构建/搜索变慢 | 低 | 百页级 POC 构建 4s，余量充足；必要时开启 minisearch 索引分片或改 Algolia |
| 预生成矩阵膨胀（页面数 × 模板数） | 低 | Typst 编译毫秒级、PDF 体积小；若页面数百级可裁剪为「章节+整站」粒度预生成 |
| typst 版本漂移导致模板语法失效 | 低 | CI 固定 typst 版本；脚本支持 `TYPST_PATH` 环境变量 |
| 条目跨级嵌套需求（章节下再分小节） | 低 | 当前约定一级章节；若出现需求，扫描逻辑扩展一层即可 |

## 4. 下一步建议

进入 **M3 站点打磨与部署**：首页与品牌定制、真实部署验证（GitHub Pages / CF Pages）、Lighthouse 性能核查；随后 M4 借助收录 Skill 批量迁移既有模板内容。
