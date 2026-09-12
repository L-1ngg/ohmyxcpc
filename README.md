# OhMyXCPC

[![Build & Deploy](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml/badge.svg)](https://github.com/L-1ngg/ohmyxcpc/actions/workflows/deploy.yml)
[![C++20](https://img.shields.io/badge/C%2B%2B-20-00599C?logo=cplusplus&logoColor=white)](https://github.com/L-1ngg/ohmyxcpc/tree/main/content/snippets)

**面向 ICPC / CCPC 的现代 C++ 算法模板库。** 简明说明、清晰代码，同一份内容可在线查阅，也可下载为整本或分章 PDF。

[浏览模板](https://l-1ngg.github.io/ohmyxcpc/) · [下载 PDF](https://l-1ngg.github.io/ohmyxcpc/export?target=all) · [反馈问题](https://github.com/L-1ngg/ohmyxcpc/issues)

## 查阅与使用

- **先看说明，再取代码**：正文交代用途、接口、复杂度和边界条件，解释性注释放在代码外，方便阅读与复制。
- **现代竞赛码风**：使用 `using i64 = long long;`，保留 `vector`、STL 和轻量封装，格式由 `.clang-format` 统一。
- **在线搜索**：按章节浏览，或用全文搜索定位算法、性质和例题。
- **网页与 PDF 同源**：同一份 Markdown 和 C++ 片段生成网站及 PDF，支持整本与分章下载，便于打印和离线查阅。

部分片段需要配套类型、初始化或题目回调，使用前请阅读对应条目的接入条件；编译通过不等于算法已覆盖所有输入边界。

## 内容导航

| 方向 | 章节 |
| --- | --- |
| 基础与库函数 | [基础算法](https://l-1ngg.github.io/ohmyxcpc/basics/) · [STL 与库函数](https://l-1ngg.github.io/ohmyxcpc/stl/) |
| 数据结构 | [数据结构 A](https://l-1ngg.github.io/ohmyxcpc/data-structure-a/) · [数据结构 B](https://l-1ngg.github.io/ohmyxcpc/data-structure-b/) |
| 图与树 | [图论](https://l-1ngg.github.io/ohmyxcpc/graph/) · [树上问题](https://l-1ngg.github.io/ohmyxcpc/tree/) · [网络流](https://l-1ngg.github.io/ohmyxcpc/flow/) |
| 字符串与动态规划 | [串](https://l-1ngg.github.io/ohmyxcpc/string/) · [动态规划](https://l-1ngg.github.io/ohmyxcpc/dp/) |
| 数学 | [数论](https://l-1ngg.github.io/ohmyxcpc/number-theory/) · [组合数学](https://l-1ngg.github.io/ohmyxcpc/combinatorics/) · [线性代数](https://l-1ngg.github.io/ohmyxcpc/linear-algebra/) · [多项式](https://l-1ngg.github.io/ohmyxcpc/polynomial/) · [博弈论](https://l-1ngg.github.io/ohmyxcpc/game-theory/) |
| 计算几何 | [二维几何](https://l-1ngg.github.io/ohmyxcpc/geometry/) · [多边形](https://l-1ngg.github.io/ohmyxcpc/polygon/) · [三维几何](https://l-1ngg.github.io/ohmyxcpc/geometry-3d/) |
| 例题与工具 | [常见例题](https://l-1ngg.github.io/ohmyxcpc/examples/) · [杂项](https://l-1ngg.github.io/ohmyxcpc/misc/) |

## 本地运行

使用 Node.js 24 和项目指定的 pnpm 10.22.0：

```bash
git clone https://github.com/L-1ngg/ohmyxcpc.git
cd ohmyxcpc
pnpm install --frozen-lockfile
pnpm dev
```

开发地址以终端输出为准，通常为 `http://localhost:5173`。

生成 PDF 还需要 [Typst 0.14.2](https://github.com/typst/typst/releases/tag/v0.14.2)。首次使用先准备字体：

```bash
pnpm setup:fonts
pnpm export:pdf graph  # 导出图论章节
pnpm release           # 生成整本、全部章节 PDF，并构建网站
```

站点由 [VitePress](https://vitepress.dev/) 构建，数学公式使用 MathJax，PDF 由 [Typst](https://typst.app/) 排版。推送 `main` 后，GitHub Actions 自动执行检查、构建并部署到 GitHub Pages。

## 维护与贡献

发现说明错误、代码问题或缺少使用条件，可提交 Issue，附上条目链接、输入样例与预期结果。补充或修改模板时，请同步维护正文说明与代码。

```text
content/<章节>/          算法说明、性质与例题
content/snippets/        网页与 PDF 共用的 C++ 代码
scripts/                构建、导出与验证脚本
.vitepress/             网站配置与主题
```

- [写作指南](docs/CONTRIBUTING.md)：条目结构、内容要求、代码引用与收录流程。
- [代码维护规则](.agents/skills/xcpc-template-ingest/references/code-style.md)：竞赛码风、注释外移与类型约定。
- [自定义指南](docs/CUSTOMIZING.md)：站点外观、PDF 排版和部署配置。

按改动范围运行检查：

```bash
pnpm typecheck
pnpm test          # 回归测试；需要 Typst 和 uv
pnpm check:code    # 独立 C++ 文件的 GNU++20 语法检查；需要 g++
pnpm release       # 生成最新 PDF 与网站产物
pnpm check:pdf     # PDF 排版、链接与字体检查；需要 uv
pnpm smoke         # 浏览器冒烟；需要 Playwright Chromium 或 CHROMIUM_PATH
```

## 来源与许可

内容以 [EmptyDust/Templates-XCPC](https://github.com/EmptyDust/Templates-XCPC) 的提交 `78423fe362ec0a849ef4b86b0e96d8f8a3dc9584` 为迁入基线，此后由本项目独立整理和维护。感谢原作者及贡献者，完整说明见[前言与致谢](content/preface.md)和[迁移记录](docs/migration/README.md)。

站点工程沿用 ISC 声明。迁入算法、图片和排版设计保留原始出处与授权状态，不因迁入而自动改为 ISC。
