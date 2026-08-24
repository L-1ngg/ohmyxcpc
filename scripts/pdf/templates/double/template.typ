// OhMyXCPC PDF 模板 · double —— 双栏赛用紧凑版
// 变量（typst compile --input key=value）：
//   chapter: 章节名（页眉右侧）
//   date:    生成日期（封面）
//   cover=1: 启用封面与目录页（整站导出）
#import "@preview/mitex:0.2.5": mi, mitex
#import "@preview/codly:1.3.0": *

#show: codly-init.with()

#let serif = ("Libertinus Serif", "Noto Serif CJK SC", "WenQuanYi Zen Hei")
#let sans = ("Liberation Sans", "Noto Sans CJK SC", "WenQuanYi Zen Hei")
#let mono = ("Liberation Mono", "Noto Sans CJK SC", "WenQuanYi Zen Hei Mono")

#set text(size: 8pt, lang: "zh", font: serif)
#set par(justify: true, leading: 0.45em, spacing: 0.65em)
#set list(indent: 0.8em, body-indent: 0.4em, spacing: 0.5em)

// 标题多级编号：1 章节 → 1.1 条目 → 1.1.1 小节
#set heading(numbering: "1.1.1")
#show heading: it => { set text(font: sans); block(above: 0.9em, below: 0.5em, it) }
#show heading.where(level: 1): it => { set text(size: 11pt, font: sans); block(above: 0.4em, below: 0.5em, it) }
#show heading.where(level: 2): it => { set text(size: 9.5pt, font: sans); block(above: 0.7em, below: 0.4em, it) }
#show heading.where(level: 3): it => { set text(size: 8.5pt, font: sans); block(above: 0.6em, below: 0.3em, it) }

// 代码块：白底、细边框、圆角、左侧行号（codly）
#codly(
  display-name: false,
  display-icon: false,
  zebra-fill: none,
  fill: white,
  stroke: 0.5pt + luma(215),
  radius: 3pt,
)
#show raw.where(block: true): set text(size: 6.5pt, font: mono)
#show raw.where(block: false): it => {
  set text(size: 0.9em, font: mono)
  box(fill: luma(240), outset: (x: 1.5pt, y: 2pt), radius: 2pt, it)
}

// 前置部分（封面/目录）：单栏、无页眉页码
#set page(
  paper: "a4",
  margin: (x: 10mm, top: 14mm, bottom: 12mm),
  header: none,
  footer: none,
)

#if sys.inputs.at("cover", default: "") == "1" [
  #v(1fr)
  #align(center)[
    #text(size: 22pt, weight: "bold", font: sans)[OhMyXCPC 模板库]
    #v(1em)
    #text(size: 10pt)[XCPC 算法模板参考手册]
    #v(1.5em)
    #text(size: 9pt, fill: luma(120))[生成日期：#sys.inputs.at("date", default: "")]
  ]
  #v(2fr)
  #pagebreak()
  #outline(title: [目 录], depth: 2, indent: auto)
  #counter(page).update(0) // 下一页（正文第一页）起页码为 1；页眉在页面流之前求值，故需在上页末尾重置
  #pagebreak()
]

// 正文部分：双栏、页眉含页码，页码从 1 起算（columns 变化自带换页）
#set page(
  columns: 2,
  header: context {
    set text(size: 7.5pt, fill: luma(120))
    grid(
      columns: (1fr, auto),
      [OhMyXCPC 模板库],
      [
        #sys.inputs.at("chapter", default: "")
        #h(0.6em)·#h(0.6em)
        第 #counter(page).display() / #counter(page).final().at(0) 页
      ],
    )
  },
)

// ===== 以下内容由导出脚本追加 =====
