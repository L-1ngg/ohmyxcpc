---
title: "最长路(topsort+DP 算法)"
order: 140
---

# 最长路 (topsort+DP 算法) {#s-96659e7e93c6}

DAG 上按拓扑序松弛：入度 $0$ 入队，`dis[y]=\max(\mathrm{dis}[y],\mathrm{dis}[x]+w)`。有环先 Tarjan 缩点。`topsort(s,t)` 返回 $s$ 到 $t$，不可达为 $- 10^{18}$。复杂度 $\mathcal{O} ( N + M )$。

<<< @/snippets/code/图论/最长路-topsort+DP-算法.cpp
