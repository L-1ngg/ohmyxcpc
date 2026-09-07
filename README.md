# OhMyXCPC

[![Build & Deploy](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml/badge.svg)](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml)

**XCPC 算法模板库** —— 把 Markdown 丢进文件夹，自动成站、自动出 PDF。

**在线访问** → https://l-1ngg.github.io/ohmyxcpc/

## 特性

- 📁 目录即站点：`content/` 下一级子目录 = 章节，`.md` = 条目，侧边栏自动扫描生成
- 📄 PDF 导出：沿用 Templates-XCPC 版式，按章节或整本预生成，下载中心预览与下载
- 🔗 代码同源：代码放 `content/snippets/`，条目用 `<<< @/snippets/<文件>` 引用
- 🔍 全文搜索：本地搜索（minisearch），离线可用
- 📐 数学公式：LaTeX 行内 `$...$` / 块级 `$$...$$`
- 🚀 一键部署：推送 `main` 即触发 CI，构建 + 冒烟测试 + 部署到 GitHub Pages

## 快速开始

```bash
git clone https://github.com/L-1ngg/ohmyxcpc.git
cd ohmyxcpc
pnpm install
pnpm setup:fonts # PDF 字体，下载到项目缓存并校验 SHA-256
pnpm dev        # http://localhost:5173
```

## 文档

| 文档 | 内容 |
|---|---|
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | 如何写一篇符合规范的条目（frontmatter、代码块、公式、图片……） |
| [CUSTOMIZING.md](docs/CUSTOMIZING.md) | 站点外观、PDF 模板、部署等自定义配置 |

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成（Markdown → SPA）
- [Typst](https://typst.app/) — PDF 排版引擎
- [markdown-it-mathjax3](https://github.com/tani/markdown-it-mathjax3) — LaTeX 公式渲染
- [Playwright](https://playwright.dev/) — 冒烟测试

## License

站点工程沿用 ISC 声明。迁入算法、图片和排版设计保留原始出处，不因迁入而自动改为 ISC。

## 内容来源

内容整体迁自 [EmptyDust/Templates-XCPC](https://github.com/EmptyDust/Templates-XCPC)，固定提交 `78423fe362ec0a849ef4b86b0e96d8f8a3dc9584`，随后由本项目独立维护。来源使用原生 Typst，迁入后以 Markdown 和独立代码作为唯一内容源，同时生成网页与 PDF。

前言与已有致谢见 [前言与致谢](content/preface.md)，迁移核对记录见 [迁移记录](docs/migration/README.md)。

## 验证

```bash
pnpm typecheck
pnpm test          # 包含真实 PDF 和隔离站点构建；需要 typst、uv
pnpm check:code    # 独立 C++ 文件语法检查；需要 g++，使用 GNU++20
pnpm release       # 全部 PDF + 网站
pnpm smoke         # 检查构建产物；需要 Playwright Chromium 或 CHROMIUM_PATH
```
