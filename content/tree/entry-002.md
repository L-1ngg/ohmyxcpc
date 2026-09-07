---
title: "树论大封装(直径+重心+中心)"
order: 20
---

# 树论大封装 (直径+重心+中心) {#s-df6f0ce664ed}

  `d1[u]` 为向下最长链、`d2[u]` 为向下次长链（`s1/s2` 记对应儿子），`up[u]` 为向上最长链；`getCenter()` 求”到最远点距离最小”的中心与半径（`radius = min max(d1, up)`）；`getCog()` 求重心（删去后最大连通块最小，`rem` 为该最小值，`cog` 为重心）。

<<< @/snippets/inline/tree/entry-002-28.cpp
