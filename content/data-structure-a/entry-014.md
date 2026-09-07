---
title: "KD Tree"
order: 140
---

# KD Tree {#s-ad631548a559}

  第 $k$ 维上的单次查询复杂度最坏为 $\mathcal{O} ( n^{1 - k^{- 1}} )$。数组版（容量 `N = 1e5 + 10`，`K` 维），`insert` 平衡因子 $\alpha = 0.725$ 触发拍平重建；`build` 按**方差最大的维**划分、`nth_element` 取中位数。下方 `query(a)` 统计**所有维都 ≤ a\[i\]** 的点数（`out` 剪枝整块在查询域之外，`all` 整块皆计入，`in` 单点判定）；常见扩展：最近点查询改成带界最值剪枝。

<<< @/snippets/code/数据结构A/KD-Tree.cpp
