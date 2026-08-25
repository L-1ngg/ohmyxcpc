# VitePress 语法参考（收录整理用）

摘自 vitepress.dev 中文文档（guide/markdown、guide/asset-handling、guide/frontmatter），已按本站 `.vitepress/config.ts` 的实际配置裁剪：`srcDir: ./content`、`markdown.math: true`、`markdown.lineNumbers: true`、`cleanUrls: true`、`srcExclude: ['_inbox/**', 'snippets/**']`。

本文件未覆盖的语法，在线查官方文档源码（官网是 SPA，直接抓 HTML 页面拿不到正文）：
`https://raw.githubusercontent.com/vuejs/vitepress/main/docs/zh/guide/<markdown|asset-handling|frontmatter>.md`

## frontmatter

- 必须位于文件最顶部（任何元素之前），`---` 之间为合法 YAML
- 本站条目的 frontmatter 只使用 `title` / `order`（由 `scripts/lib/content.mjs` 消费）；不要添加 `layout` 等主题级字段
- 页面内可用 `{{ $frontmatter.title }}` 引用字段值

## 代码块

- 围栏代码块必须标注语言（Shiki 高亮，C++ 用 ` ```cpp `）
- 行高亮：` ```cpp{4} `、`{5-8}`、`{4,7-13,16}`
- 行内注释标记：`// [!code highlight]`、`focus`、`--`、`++`、`warning`、`error`
- 本站已全局开启行号；单个代码块可用 `:no-line-numbers` 关闭，或 `:line-numbers=N` 指定起始行号
- 导入代码片段：`<<< @/snippets/<文件名>`（`@` 指向 srcDir 即 `content/`）；可附加 `{2}` 行高亮、`{cpp}` 显式指定语言、`#region` 选取 VS Code region
- 代码组：`::: code-group` 包裹多个带 `[文件名]` 标题的代码块，组内也可用 `<<<` 导入

## 提示块

- GitHub 风格警报（本站"待补充"标记即用此语法）：
  `> [!NOTE]` / `[!TIP]` / `[!IMPORTANT]` / `[!WARNING]` / `[!CAUTION]`
- 自定义容器：`::: info|tip|warning|danger|details`，类型后可附自定义标题

## 公式

本站已启用 `markdown.math`：行内 `$...$`，块级 `$$...$$`。

## 资源与链接

- 图片放在条目同目录（或章节目录），用**相对路径**引用：`![](./xxx.png)`；被引用的资源构建时自动处理
- 未被 Markdown 引用的静态文件（如供下载的 PDF）必须放 `content/public/`，并用根绝对路径引用（`/xxx.pdf`）；`base` 变化时无需改引用
- 条目间内部链接用相对路径，可省略 `.md` 后缀
- 标题锚点自动生成；需要稳定锚点时用 `## 标题 {#custom-anchor}`

## 注意

- `<!--@include: ./xxx.md-->`（markdown 文件包含）在目标文件不存在时**不报错、静默失效**，收录时不要使用；代码复用一律走 `<<< @/snippets/`
