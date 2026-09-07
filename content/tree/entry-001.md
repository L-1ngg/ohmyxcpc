---
title: "树的直径"
order: 10
---

# 树的直径 {#s-7feea2ee992a}

  两次 DFS 法：从任意点出发找最远点 `st`，再从 `st` 出发找最远点 `ed`，二者距离即直径（**要求边权非负**；负权边需换树形 DP）。`getlen(root)` 返回以 `root` 为起点的连通块直径，`map` 存深度系森林时避免多次初始化。复杂度 $\mathcal{O} ( N )$。

<<< @/snippets/code/树上问题/树的直径.cpp
