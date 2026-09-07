---
title: "回文自动机 PAM(回文树)"
order: 100
---

# 回文自动机 PAM (回文树) {#s-78bd7bdbb0b7}

  $\mathcal{O} ( N )$ 在线维护所有**本质不同**的回文子串，节点数 $\le n + 2$（两个根长度 $0$ 与 $- 1$）。`len[v]` 为该节点回文长度，`fail[v]` 指向最长回文真后缀，`dep[v]` 为回文后缀链深度（即不同回文后缀个数），`cnt[v]` 需在建完后 `countAll()` 从大到小向 `fail` 累加才成为真实出现次数。插入按字符逐个 `insert(c, i)`。

<<< @/snippets/code/串/回文自动机-PAM-回文树.cpp

<<< @/snippets/code/串/回文自动机-PAM-回文树-2.cpp
