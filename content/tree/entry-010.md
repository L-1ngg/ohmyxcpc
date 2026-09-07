---
title: "轻重链剖分/树链剖分"
order: 100
---

# 轻重链剖分/树链剖分 {#s-10dcbd770e64}

  将线段树处理的部分分离，方便修改。支持链上查询/修改、子树查询/修改，建树时间复杂度 $\mathcal{O} ( N \text{log} N )$ ，单次查询时间复杂度 $\mathcal{O} ( \text{log}^{2} N )$ 。

<<< @/snippets/inline/tree/entry-010-34.cpp
