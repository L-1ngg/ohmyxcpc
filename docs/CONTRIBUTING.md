# 写作指南

如何写一篇符合站点规范的条目。

## 基本结构

每个条目是一个 `.md` 文件，放在所属章节目录下：

```
content/
├── basics/              # 章节目录
│   ├── index.md         # 章节首页
│   └── gcd.md           # ← 一个条目
├── graph/
│   ├── index.md
│   └── dijkstra.md      # ← 另一个条目
```

- 条目文件名：小写英文短横线（如 `binary-search.md`、`ac-automaton.md`）
- 章节目录：小写英文短横线（如 `data-structure/`、`game-theory/`）
- `_` 或 `.` 开头的目录不参与收录；`snippets/` 存放完整代码文件

## frontmatter

每个条目文件**必须**以 YAML frontmatter 开头：

```yaml
---
title: 最大公约数 GCD    # 必填，显示在侧边栏和页面标题
order: 2                 # 可选，数值越小排越前，缺省排最后
---
```

`order` 参考同章节现有条目递增，条目间留间隔（如 10、20、30）方便后续插入。

## 标题层级

正文从单个 `#` 开始，逐级递进，不跳级：

```markdown
# 条目标题（与 frontmatter title 一致）

## 小节

### 子小节
```

## 代码块

### 行内代码

用反引号包裹：`std::sort`、`O(n log n)`。

### 代码段

围栏代码块**必须标注语言**：

````markdown
```cpp
int mygcd(int a, int b)
{
    return b ? std::gcd(b, a % b) : a;
}
```
````

代码风格遵循 [code-style.md](../.agents/skills/xcpc-template-ingest/references/code-style.md)：保留迁入实现的接口、类型、依赖与作者注释，不按旧模板头批量改写。

### 引用完整代码文件

完整代码文件放 `content/snippets/`，条目内用 `<<<` 引用（单点维护，改一处全站同步）：

```markdown
<<< @/snippets/dinic.cpp
```

网页和 PDF 都展开同一引用。来源代码含 `// @book-begin` 与 `// @book-end` 时，只展示两个标记之间的区域，并移除公共前导空格；标记外保留独立编译脚手架。未带标记的代码文件展示全文。缺失文件或不成对的标记会使构建失败。

说明、公式和短示例只写在 Markdown 中，生成的 Typst 正文不手动修改。一级目录沿用来源章节，`index.md` 的 `order` 与条目的 `order` 共同决定网站和 PDF 顺序。标题可使用 `{#stable-anchor}` 定义稳定锚点；内部链接写为 `/章节/条目#stable-anchor`。单章 PDF 中指向其他章节的链接会指向对应网页。

### 行高亮与聚焦

````markdown
```cpp{2,4-6}
int a = 1;
int b = 2;  // 高亮
int c = 3;
int d = 4;  // 高亮
int e = 5;  // 高亮
```
````

也可用行内注释标记：`// [!code highlight]`、`// [!code warning]`、`// [!code error]`。

## 公式

行内用 `$...$`，块级用 `$$...$$`：

```markdown
时间复杂度 $\mathcal O(N \log N)$。

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$
```

## 提示块

```markdown
> [!NOTE] 备注信息
> [!TIP] 实用技巧
> [!IMPORTANT] 关键信息
> [!WARNING] 注意事项
> [!CAUTION] 潜在风险
```

## 表格

支持 GitHub 风格表格：

```markdown
| 算法 | 复杂度 | 适用场景 |
|------|--------|----------|
| 快排 | O(n log n) | 通用 |
```

## 图片

图片放在条目同目录或章节目录，用**相对路径**引用：

```markdown
![示意图](./assets/dinic-flow.png)
```

未被 Markdown 引用的静态文件（如供下载的附件）放 `content/public/`，用根绝对路径引用（`/xxx.pdf`）。

## 收录流程

1. 把原始 `.md` / 代码文件丢进 `content/_inbox/`
2. 让 AI 助手加载 `xcpc-template-ingest` skill 完成规范化、归类与校验
3. 或手动按本指南整理后直接放入目标章节目录

## 校验

提交前确保：

```bash
pnpm build                          # 构建无错误
pnpm export:pdf <章节>              # 统一版式，导出本章并生成首页预览
```

## 更多语法

VitePress Markdown 扩展的完整语法参考见 [.agents/skills/xcpc-template-ingest/references/vitepress.md](../.agents/skills/xcpc-template-ingest/references/vitepress.md)。
