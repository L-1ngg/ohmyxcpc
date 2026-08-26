# OhMyXCPC

[![Build & Deploy](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml/badge.svg)](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml)

**XCPC 算法模板库** —— 把 Markdown 丢进文件夹，自动成站、自动出 PDF。

**在线访问** → https://l-1ngg.github.io/ohmyxcpc/

## 特性

- 📁 目录即站点：`content/` 下一级子目录 = 章节，`.md` = 条目，侧边栏自动扫描生成
- 📄 PDF 导出：Typst 排版，按章节/整站、单栏/双栏导出，下载中心可视化选择
- 🔗 代码同源：代码放 `content/snippets/`，条目用 `<<< @/snippets/<文件>` 引用
- 🔍 全文搜索：本地搜索（minisearch），离线可用
- 📐 数学公式：LaTeX 行内 `$...$` / 块级 `$$...$$`
- 🚀 一键部署：推送 `main` 即触发 CI，构建 + 冒烟测试 + 部署到 GitHub Pages

## 快速开始

```bash
git clone https://github.com/L-1ngg/ohmyxcpc.git
cd ohmyxcpc
pnpm install
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

ISC
