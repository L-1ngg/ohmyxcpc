---
title: "vector 模拟实现平衡二叉树"
order: 40
---

# vector 模拟实现平衡二叉树 {#s-a9be3dbd4806}

  用 `lower_bound` 定位后在中间插入/删除，单次操作 $\mathcal{O} ( N )$、总复杂度 $\mathcal{O} ( N^{2} )$，**只适合小数据或暴力骗分**；需要 $\mathcal{O} ( \text{log} N )$ 维护有序序列请用 pbds `tree`。

<<< @/snippets/code/数据结构B/vector-模拟实现平衡二叉树.cpp
