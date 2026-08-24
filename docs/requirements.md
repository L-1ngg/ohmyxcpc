# OhMyXCPC 开发需求文档

> 版本：v0.1（草案）  状态：已完成技术验证（POC），待评审

## 1. 项目背景与目标

XCPC（ICPC/CCPC 等程序设计竞赛）选手通常维护个人/队伍的算法模板库。传统做法是本地 Markdown 或打印版 PDF（team reference document），查阅与分享不便。

本项目目标：基于 **VitePress** 构建一个静态网站，用于在线呈现 XCPC 模板库，并支持按章节/整体导出 PDF（赛时打印场景）。

### 目标

1. 站点响应快、页面清晰，代码与数学公式渲染质量高。
2. 支持导出单个章节或整站为 PDF，可预览，PDF 样式由预定义模板控制。
3. 内容维护成本极低：把 Markdown 文件放进约定目录即自动收录成站；并提供 Skill 让 AI 辅助整理、归类、入库。

### 非目标（本期不做）

- 用户系统、评论、在线编辑。
- 多语言（仅中文）。
- 在线运行代码（judge 集成）。

## 2. 用户角色与使用场景

| 角色 | 场景 |
|---|---|
| 模板维护者 | 将写好的模板（`.md` 或原始代码）放入约定目录，构建后自动出现在站点上 |
| 查阅者 | 赛前浏览/搜索模板；移动端可查阅 |
| 参赛队员 | 赛前将整站或若干章节导出为 PDF 打印，带入赛场 |

## 3. 功能需求

### F1 内容渲染站点

- F1.1 基于 VitePress 默认主题，左侧章节目录树、右侧页内大纲。
- F1.2 C++ 代码高亮（Shiki）、行号、行高亮、代码组（code-group）。
- F1.3 数学公式（LaTeX 语法，`markdown.math`，MathJax 渲染）——模板复杂度说明必需。
- F1.4 支持从外部代码文件导入片段（`<<< @/snippets/xxx.cpp`），保证"站点展示的代码"与"实际使用的代码"同源。
- F1.5 全站本地搜索（VitePress 内置 minisearch，无需外部服务）。
- F1.6 响应式布局 + 深色模式（默认主题自带）。

### F2 内容自动收录（约定优于配置）

- F2.1 内容根目录 `content/`；其**一级子目录 = 章节**，目录内 `.md` 文件 = 条目。
- F2.2 构建时由 `.vitepress/config.ts` 扫描文件系统动态生成 sidebar，**无需手工登记**：新增/删除/重命名文件后重新构建即可。
- F2.3 排除规则：`_` 或 `.` 开头的目录、`content/snippets/`（代码片段库）不参与收录。
- F2.4 条目显示名取 frontmatter `title`，其次首个一级标题，最后文件名。
- F2.5 章节显示名取该章 `index.md` 的标题；排序使用 frontmatter `order` 字段（数值升序，缺省排最后，其次按标题），章节与条目均适用；扫描逻辑由 `scripts/lib/content.mjs` 统一实现，sidebar 与 PDF 导出共用。

### F3 PDF 导出与预览（v0.3，已实现）

技术路线：**Typst 排版管线**。Markdown 经自研转换层（`scripts/pdf/md2typst.mjs`，基于 markdown-it 解析，LaTeX 公式经 mitex 包渲染，VitePress 容器映射为提示卡片）转为 Typst 源码，套用 `.typ` 模板后由 `typst` CLI 编译为 PDF。字体自动子集化嵌入，产物体积小（单章节约 60–80KB）；**所有导出均含页眉/页码，不设浏览器打印降级路径**。

- F3.1 CLI 导出：
  - `pnpm export:pdf` —— 整站；`pnpm export:pdf <章节>`；`pnpm export:pdf <章节>/<页面>`；
  - 第二参数指定模板（如 `pnpm export:pdf graph double`），缺省导出全部模板；
  - 依赖 PATH 中的 `typst`（或用 `TYPST_PATH` 环境变量指定）。
- F3.2 模板体系：`scripts/pdf/templates/<模板名>/` 下 `template.typ`（样式定义）+ `meta.json`（名称/描述，供下载中心展示）。内置两个模板，视觉风格统一（参考 `docs/assets/pdf-template-ref.png`）：多级编号标题（1 章节 → 1.1 条目 → 1.1.1 小节）、白底细边框圆角代码块（左侧行号，codly）、行内代码浅灰底块：
  - `standard` **单栏阅读版**：A4 单栏、11pt、页眉（站点名+章节名）、页脚页码；
  - `double` **双栏赛用紧凑版**：A4 双栏、8pt/6.5pt、页眉含页码。
  - 新增模板 = 新增一个模板目录，CLI 与网页端自动可用。
- F3.3 网页端导出（预生成路线，已实现）：`pnpm prebuild:pdf` 生成全量矩阵（整站 + 每章节 + 每页面 × 全部模板）与 `manifest.json` 到 `content/public/pdfs/`，随站点构建一同部署。交互入口：
  - **下载中心页** `/export`：独立页面直接呈现 PDF 预览——左侧目标树（整站置顶 → 章节 → 条目），右侧大面积内嵌预览，模板分段切换，下载按钮；支持 URL 参数直达（`/export?target=graph&tpl=double`）；
  - **章节卡片**：每个章节页面右侧大纲栏底部固定显示「本章 PDF」卡片（两个模板下载链接 + 跳转下载中心预览）；
  - **整站入口**：导航栏「下载中心」链接 + 首页 hero「下载整站 PDF」动作 + 下载中心整站置顶。
- F3.4 CLI 预览：每次导出同时产出首页 PNG 预览（`pdf/<名>.<模板>-preview.png`）供快速核对。
- F3.5 整站导出含封面页与两级目录页；**封面与目录无页眉页码，正文页码从 1 起算、总页数仅计正文**（实现要点：`counter(page).update(0)` 须放在目录页末尾而非正文开头——页眉在页面流之前求值）；目录页码、PDF 书签与正文标题编号（1 / 1.1 / 1.1.1）一致联动。
- F3.6 CI：GitHub Actions 预装 typst 与中文字体（Noto CJK），执行 `prebuild:pdf → build` 并部署 Pages；模板字体栈按 Noto → 文泉驿 回退，保证 CI 与本地均有可用字体。

### F4 内容收录 Skill（AI 辅助）

- F4.1 在项目内提供 Skill（`.agents/skills/xcpc-template-ingest/SKILL.md`，pi 项目级 Skill 目录），供 AI 编码助手加载。
- F4.2 Skill 职责：
  1. 读取收件箱目录 `content/_inbox/` 中的原始 Markdown / 代码文件；
  2. 规范化：补齐 frontmatter（`title` 等）、统一标题层级与代码块语言标注；
  3. 归类：按内容判断所属章节，移动至 `content/<章节>/`；原始代码移入 `content/snippets/` 并在条目中用 `<<<` 引用；
  4. 校验：执行 `pnpm build` 确认无构建错误后汇报变更清单。
- F4.3 Skill 只负责"整理与落位"，收录本身由 F2 的文件系统扫描完成，二者解耦。

## 4. 非功能需求

- N1 性能：静态站点，首屏为预渲染 HTML；百页级内容构建时间 < 30s（当前 POC 约 4s）。
- N2 可用性：内容入库"零登记"——放文件即收录；常用操作均有 npm script。
- N3 可移植性：全量依赖经 lockfile 锁定；PDF 导出在无显示器的 CI 环境可用（headless Chromium）。
- N4 可部署性：产物为纯静态文件，可部署至 GitHub Pages / Cloudflare Pages / Vercel / 任意静态服务器。
- N5 可维护性：约定（目录结构、frontmatter）文档化；模板与内容分离。

## 5. 技术选型

| 领域 | 选型 | 理由 |
|---|---|---|
| 站点框架 | **VitePress 1.6** | Vue 系静态站点生成器；构建快；默认主题清晰；内置搜索、深色模式、代码高亮、数学公式开关 |
| 自动收录 | **配置层动态扫描**（自研 ~40 行） | VitePress 配置即 Node 代码，扫描 `content/` 生成 sidebar；无额外构建步骤、无第三方插件依赖 |
| PDF 导出 | **Typst 管线**：自研 md→typst 转换层（markdown-it + mitex）+ `typst compile` | 排版质量专业（双栏/页眉页脚/页码/目录）；模板即 `.typ` 文件；编译毫秒级；字体自动子集化；本机与 CI 均为单二进制依赖 |
| PDF 备选（未采用） | Chromium 打印管线（POC 已验证后弃用） | 所见即所得，但模板化与精排能力不及 Typst；依赖 headless 浏览器体积大 |
| 搜索 | VitePress 内置 local search（minisearch） | 零外部服务，离线可用 |
| 包管理 | pnpm | 环境已具备，速度快 |

### POC 已验证结论（详见 roadmap 文档）

- 动态 sidebar：`content/graph/dinic.md` 放入即出现在「图论」章节下 ✔
- 代码片段导入：`<<< @/snippets/dinic.cpp` 正常渲染 ✔
- 数学公式：`markdown.math` 正常渲染 ✔
- PDF：Typst 管线导出 A4 PDF（单栏/双栏两模板，含页眉/页码），中文无乱码、公式与代码渲染正常 ✔（Chromium 打印路线亦验证过，作为弃用备选）

## 6. 目录结构约定

```
ohmyxcpc/
├── content/                  # 站点内容根（VitePress srcDir）
│   ├── index.md              # 首页（hero）
│   ├── <章节>/               # 一级子目录 = 章节，如 graph/ string/ math/
│   │   ├── index.md          # 章节首页（决定章节显示名）
│   │   └── <条目>.md         # 模板条目
│   ├── snippets/             # 原始代码文件（.cpp 等），供 <<< 导入
│   ├── public/pdfs/          # 预生成 PDF 与 manifest.json（脚本生成，gitignore）
│   └── _inbox/               # 收件箱：待 AI Skill 整理的原始文件（不参与收录与构建）
├── .vitepress/
│   ├── config.ts             # 站点配置 + 动态 sidebar 扫描
│   ├── theme/                # 主题扩展：导航栏「导出 PDF」按钮 + 导出面板
│   └── dist/                 # 构建产物（gitignore）
├── scripts/
│   ├── export-pdf.mjs        # PDF 导出 CLI（Typst 管线）
│   └── pdf/
│       ├── md2typst.mjs      # Markdown → Typst 转换层
│       └── templates/        # PDF 模板（standard 单栏 / double 双栏）
├── .agents/skills/
│   └── xcpc-template-ingest/ # 内容收录 Skill（SKILL.md）
├── pdf/                      # 导出产物（gitignore）
└── docs/                     # 项目文档（本站文档，不发布）
```

## 7. 内容规范（条目 Markdown）

```markdown
---
title: Dinic 最大流        # 必填：显示名
# order: 10               # 可选：排序权重（规划）
---

# Dinic 最大流

时间复杂度 $O(V^2E)$……    # 行内/块级 LaTeX 公式

## 代码

<<< @/snippets/dinic.cpp  # 引用 snippets 中的同源代码
```

## 8. 验收标准

- A1：向 `content/<章节>/` 新增一个符合规范的 `.md`，`pnpm build` 后无需改动任何配置即出现在站点对应章节下。
- A2：`pnpm export:pdf <章节> <模板>` 产出的 PDF：中文正常、公式正常、代码带高亮、含页眉（站点名+章节名）与页码；standard 单栏 / double 双栏两模板均可用；首页预览图同步产出。
- A3：整站导出 PDF 按章节目录顺序排列，章节间分页。
- A4：Skill 将 `content/_inbox/` 中的文件整理落位后，`pnpm build` 通过。
- A5：站点可一键部署到静态托管平台并正常访问（含搜索）。
- A6：网页端导出面板可按 范围（本页/本章/整站）× 模板 选择，内嵌预览并下载预生成 PDF，且页眉/页码完整。

## 9. 开放问题

1. ~~排序规则~~（已决策）：frontmatter `order` 字段，数值升序、缺省排最后，章节与条目均适用。
2. ~~VitePress 容器语义的 PDF 呈现~~（已实现）：`::: tip` 等容器映射为 typst 提示卡片（类型配色 + 自定义标题）。
3. **GitHub 编辑链接 / 最近更新时间**：是否开启（需要仓库远程地址与 git 信息）？
4. **多代码语言**：是否会有 Python/Java 模板（影响 snippets 目录组织与代码组展示）？
5. ~~整站版封面与目录页~~（已实现）：封面 + `#outline()` 两级目录 + PDF 书签。
6. **含数学公式页面的 hydration mismatch**：mathjax3 服务端渲染与客户端水合存在已知告警（功能无影响），后续可考虑改为纯客户端渲染消除。
