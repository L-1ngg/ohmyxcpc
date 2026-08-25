# OhMyXCPC

XCPC 算法模板库 —— 丢进文件夹，自动成站。

[![Build & Deploy](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml/badge.svg)](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml)

**在线访问**：https://l-1ngg.github.io/ohmyxcpc/

## 特性

- **目录即站点**：`content/` 下的一级子目录 = 章节，目录内 `.md` = 条目，构建时自动扫描生成侧边栏，无需手动配置路由
- **PDF 导出**：内置 Typst 排版管线，支持按章节/整站、单栏/双栏导出 PDF，下载中心可视化选择
- **代码与文档同源**：完整代码文件放 `content/snippets/`，条目内用 `<<< @/snippets/<文件名>` 引用，单点维护
- **全文搜索**：本地搜索（minisearch），离线可用
- **数学公式**：LaTeX 行内 `$...$` / 块级 `$$...$$`（markdown-it-mathjax3）
- **一键部署**：推送 `main` 分支即触发 CI，自动构建并发布到 GitHub Pages

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # 输出到 .vitepress/dist/
pnpm preview    # 预览构建产物
```

## 内容组织

```
content/
├── <章节>/           # 一级子目录 = 章节
│   ├── index.md      # 章节首页（frontmatter: title, order）
│   └── <条目>.md     # 条目（frontmatter: title, order）
├── snippets/         # 完整代码文件（被 <<< @/snippets/ 引用）
└── _inbox/           # 未整理的草稿（不参与构建）
```

### 条目 frontmatter

```yaml
---
title: 显示名        # 必填
order: 数值          # 可选，升序排列，缺省排最后
---
```

### 收录新模板

把原始 `.md` / 代码文件丢进 `content/_inbox/`，然后让 AI 助手加载 `xcpc-template-ingest` skill 自动完成规范化、归类与校验。

## PDF 导出

```bash
pnpm export:pdf <章节> <模板>   # 导出单个章节，模板：standard | double
pnpm export:pdf all standard    # 导出整站
pnpm prebuild:pdf               # 预生成全部 PDF（构建前自动调用）
```

需要系统安装 [Typst](https://github.com/typst/typst)（当前锁定 v0.14.2）。中文字体依赖 Noto CJK。

## CI/CD

推送 `main` 分支自动触发 GitHub Actions：

1. 安装 pnpm / Node 24 / Typst / 中文字体
2. 预生成全部 PDF
3. 构建站点
4. 冒烟测试（Playwright 验证下载中心与章节卡片）
5. 部署到 GitHub Pages

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成
- [Typst](https://typst.app/) — PDF 排版
- [markdown-it-mathjax3](https://github.com/tani/markdown-it-mathjax3) — 数学公式
- [Playwright](https://playwright.dev/) — 冒烟测试

## License

ISC
