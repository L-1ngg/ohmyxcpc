#import "/scripts/pdf/theme.typ": theme
#import "@preview/mitex:0.2.5": mi, mitex
#show: theme
#set document(title: "OhMyXCPC", author: "L-1ngg")

#if sys.inputs.at("cover", default: "") == "1" [
  #set page(footer: none)
  #text(17pt, weight: "bold")[OhMyXCPC]
  #v(1.2em)
  #text(13pt, weight: "bold")[目录]
  #v(0.6em)
  #columns(2, gutter: 18pt)[
    #outline(title: none, depth: 2, indent: 1em)
  ]
  #pagebreak()
]
#counter(page).update(1)
#set page(footer: context {
  let n = counter(page).get().first()
  if n >= 1 { align(center, text(8.5pt)[#n]) }
})
