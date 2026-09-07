---
title: "后缀数组 SA"
order: 80
---

# 后缀数组 SA {#s-f78269672f72}

  倍增法建后缀数组，复杂度为 $\mathcal{O} ( N \text{log} N )$（原标注 $\mathcal{O} ( N )$ 有误，线性需 SA-IS）。`sa[i]` 为排名 $i$ 的后缀起点，`rk[i]` 为后缀 $i$ 的排名，`lc[rk[i]-1]` 为后缀 $i$ 与排名前一后缀的 LCP（即 height 数组）。常用结论：任意两后缀的 LCP 为对应区间 height 的 RMQ。

<<< @/snippets/code/串/后缀数组-SA.cpp
