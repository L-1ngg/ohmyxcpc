---
title: "zfunction"
order: 30
---

# zfunction {#s-f83c26df1257}

  $z [ i ]$ 为 $s$ 与后缀 $s [ i \cdots ]$ 的 LCP。维护已匹配窗口 $[ l , r ]$，窗口内可 $O ( 1 )$ 抄 $z [ i - l ]$，出界再暴力延。整串 $\mathcal{O} ( N )$。匹配 $t$ 时对 $t + \# + s$ 跑 Z。

<<< @/snippets/code/串/zfunction.cpp
