# 自定义指南

本项目从站点外观到 PDF 排版均可定制。按改动位置分为五个层面。

## 1. 站点信息

| 改什么 | 在哪改 | 说明 |
|---|---|---|
| 站点标题 | `.vitepress/config.ts` → `title` | 浏览器标签页 + 导航栏左侧文字 |
| 站点描述 | `.vitepress/config.ts` → `description` | SEO meta description |
| 导航栏 | `.vitepress/config.ts` → `themeConfig.nav` | 顶部链接数组，按需增删 |
| 导航 logo | `content/public/logo.png` 替换文件即可 | 路径在 `themeConfig.logo`，支持 png/svg/webp |
| 社交链接 | `.vitepress/config.ts` → `themeConfig.socialLinks` | 导航栏右侧图标（GitHub 等） |
| 部署子路径 | `.github/workflows/deploy.yml` → `VITEPRESS_BASE` | 项目页用 `/<repo>/`，自定义域名改为 `/` |

## 2. 首页（Landing）

编辑 `content/index.md`，结构完全由 frontmatter 驱动：

```yaml
---
layout: home
hero:
  name: OhMyXCPC          # 大标题
  text: XCPC 算法模板库    # 副标题
  tagline: 丢进文件夹，自动成站  # 标语
  image:
    src: /logo.png         # hero 右侧大图
    alt: OhMyXCPC
  actions:                 # 按钮组，theme: brand（主色）| alt（灰色）
    - theme: brand
      text: 浏览模板
      link: /basics/

features:                  # 特性卡片，icon 支持 emoji 或 { src, width, height }
  - icon: 📝
    title: 专注内容
    details: 只需编写 Markdown……
---
```

VitePress 还支持 `hero.image` 的光晕、渐变标题等效果，通过 CSS 变量控制（见下节）。

## 3. 样式

编辑 `.vitepress/theme/custom.css`。

**常用 CSS 变量**（VitePress 默认主题预留）：

```css
:root {
  /* 品牌色（按钮、链接、高亮） */
  --vp-c-brand-1: #3a7ccc;
  --vp-c-brand-2: #2f6bb3;
  --vp-c-brand-3: #265a99;

  /* 代码块行高 */
  --vp-code-line-height: 1.55;

  /* 首页 hero 标题渐变 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  /* 首页 hero 图片光晕 */
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

/* 暗色模式单独覆盖 */
:root.dark {
  --vp-c-brand-1: #5a9cf8;
}
```

**hero 图片变换**（倾斜/缩放等）：

```css
/* 保留默认居中的 translate，追加自己的变换 */
.VPHero .VPImage.image-src {
  transform: translate(-50%, -50%) rotate(-6deg);
}
```

> 完整变量列表见 [VitePress 默认主题 CSS 变量](https://vitepress.dev/reference/default-theme-config)。

## 4. PDF 模板

PDF 统一采用 Templates-XCPC 的版式，只提供整本和按章节导出。

- `scripts/pdf/theme.typ`：字体、页边距、章节标题、页眉、代码块、表格和图片样式。
- `scripts/pdf/template.typ`：书名、作者元数据、双栏目录与正文页码的组装入口。整本导出传入 `cover=1`。
- `scripts/pdf/assets/`：代码配色和额外语言定义。
- `scripts/fonts.json`：字体下载来源、许可证名称与 SHA-256。运行 `pnpm setup:fonts` 后放在 `.cache/fonts/`，本地与 CI 共用。

日常正文与公式编辑在 Markdown 中完成，代码文件被网页和 PDF 共同引用。`scripts/pdf/.build/` 中的 Typst 是生成文件，不手工修改。章节顺序在章节首页的 frontmatter 中维护，条目顺序由各条目的 `order` 决定。

运行 `pnpm export:pdf string` 检查单章，运行 `pnpm prebuild:pdf` 生成整本与全部章节。代码页、复杂公式、宽表格、目录链接和跨页内容都需要检查；书名、页眉和署名在模板中调整，前言与致谢在 `content/preface.md` 中维护。

**Typst 版本**：锁定在 `.github/workflows/deploy.yml` 的 typst 缓存 key 和下载 URL 中，升级时两处同步修改。

## 5. 代码风格

遵循 [代码维护规则](../.agents/skills/xcpc-template-ingest/references/code-style.md)，保留来源实现的接口、类型和依赖。调整站点外观或 PDF 样式不应改变算法代码。

## 不需要改的

以下行为由构建管线自动处理，**不需要手动配置**：

- 侧边栏生成与排序（扫描 `content/` 目录 + frontmatter `order`）
- 下载中心的整本与章节列表（共享章节扫描结果 + PDF 清单）
- 章节内条目页的 PDF 下载卡片（自动注入）
- 搜索索引（构建时自动生成）
- 部署子路径适配（CI 注入 `VITEPRESS_BASE`，站内链接自动处理）
