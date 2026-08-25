---
name: xcpc-template-ingest
description: 将 content/_inbox/ 中的原始 Markdown / 代码文件整理并收录进 OhMyXCPC 站点（规范化 frontmatter、章节归类、代码片段入 snippets、构建与 PDF 校验）。当用户要求入库、收录、整理 _inbox 中的模板，或向站点新增算法模板时使用。
---

# XCPC 模板收录

把 `content/_inbox/` 中的原始文件整理为符合站点规范的条目。收录本身由构建时的目录扫描自动完成（见 `scripts/lib/content.mjs`），本流程只负责"整理与落位"。

## 站点约定（整理依据）

- 内容根目录 `content/`；**一级子目录 = 章节**，目录内 `.md` = 条目；`_`/`.` 开头目录与 `snippets/` 不收录
- 章节首页 = 该目录的 `index.md`，其 frontmatter 决定章节显示名与排序
- 条目 frontmatter：
  - `title`（必填）：显示名
  - `order`（可选，数值）：升序排列，缺省排最后；章节与条目均适用
- **代码与文档同源**：完整代码文件放 `content/snippets/`，条目内用 `<<< @/snippets/<文件名>` 引用；短代码段可直接用围栏代码块，**必须标注语言**（` ```cpp `）
- 公式用 LaTeX：行内 `$...$`，块级 `$$...$$`
- VitePress 语法细节（frontmatter 规则、代码块高亮/导入、提示块、图片与静态资源路径）见 [references/vitepress.md](references/vitepress.md)

## 收录流程

对 `content/_inbox/` 中的每个文件（`_inbox/README.md` 除外）：

1. **判断类型**
   - 含说明文字的 `.md` → 条目候选
   - 纯代码文件（`.cpp` 等）→ 移入 `content/snippets/`，并为其创建/更新对应条目，条目用 `<<< @/snippets/<文件名>` 引用
2. **规范化**（`.md`）
   - 补 frontmatter：`title` 取首个一级标题或文件名；`order` 参考目标章节现有条目递增
   - 标题层级从单个 `#` 开始、逐级递进
   - 代码块补语言标注
   - **不改动代码逻辑、不删除作者注释、不臆造复杂度/用法**；信息不足时在条目末尾加 `> [!WARNING] 待补充：...` 并在汇报中说明
3. **归类**
   - 按主题选择现有章节（如 graph 图论 / string 字符串 / math 数学 / data-structure 数据结构 / geometry 计算几何 / misc 杂项）
   - 无合适章节时新建目录：目录名为小写英文短横线命名，含 `index.md`（frontmatter 写 `title` 与 `order`），并在汇报中说明新建理由
4. **落位**：移动文件到目标目录（条目名用小写英文短横线，如 `dinic.md`），删除 `_inbox/` 中已处理的原文件
5. **校验**（必须全部通过才可汇报完成）
   - `pnpm build` 无错误
   - `pnpm export:pdf <目标章节> standard` 无错误（确认 PDF 管线不受影响）
6. **汇报**：逐文件列出 最终路径、frontmatter 变更、新建章节（如有）、待补充项（如有）

## 禁止事项

- 不修改 `_inbox/` 以外的既有条目，除非用户明确要求
- 不"优化"或重写算法实现
- 校验未通过不得汇报完成
