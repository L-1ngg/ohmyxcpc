---
title: "费用流"
order: 50
---

# 费用流 {#s-2bbdc8542a4b}

  给定一个带费用的网络，规定 $( u , v )$ 间的费用为 $f ( u , v ) \times w ( u , v )$ ，求解该网络中总花费最小的最大流称之为**最小费用最大流**。用法：`MinCostFlow mcf(n);` → 反复 `mcf.add(u, v, 流量, 费用)`（负费用的处理见 `add` 的注释）→ `mcf.flow(s, t)` 返回 `{最大流, 最小费用}`。下方实现用 **Dijkstra + 势能**（`h` 数组，Johnson 重赋权保证边权非负）代替 SPFA 找增广路，单次增广 $\mathcal{O} ( M \text{log} N )$，总复杂度 $\mathcal{O} ( f \cdot M \text{log} N )$（$f$ 为最大流的值）。

<<< @/snippets/code/网络流/费用流.cpp
