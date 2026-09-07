---
title: "Fenwick Tree 树状数组"
order: 40
---

# Fenwick Tree 树状数组 {#s-a9d8a72c8366}

  下标从 $1$ 开始。`x & -x` 取出最低位 $1$，沿这条链走到父区间；单点加往上走、前缀和往下走，是同一棵隐式树的对偶。`ask(l, r)` 为 $[ l , r ]$ 区间和。不能直接区间覆盖（改差分）。构造时从 `in`（下标 $1 \cdots n$）逐点加入。

<<< @/snippets/code/数据结构A/Fenwick-Tree-树状数组.cpp

## 逆序对扩展 {#s-a3cab772ff4e}

  把元素按值从小到大排序逐个插入树状数组（位置为 `idx`），`ask(idx + 1, n)` 统计**已插入且位置更靠后**的个数——即当前元素的逆序对贡献（等值元素按位置先小后大排序，不会被误计）。总复杂度 $\mathcal{O} ( N \text{log} N )$。

<<< @/snippets/inline/data-structure-a/entry-004-2.cpp

## 前驱后继扩展（常规+第 k 小值查询+元素排名查询+元素前驱后继查询） {#s-3c35780c4847}

  树状数组上按 $2^{k}$ 步长倍增下落，用前缀和计数定位第 $k$ 小，排名与前驱后继同理。注意，被查询的值都应该小于等于 $N$ ，否则会越界；如果离散化不可使用，则需要使用平衡树替代。

<<< @/snippets/inline/data-structure-a/entry-004-3.cpp

## 最值查询扩展（常规+区间最值查询+单点赋值） {#s-6682f811c48c}

  `update` 单点赋值、`getMax` 区间最值均为 $\mathcal{O} ( \text{log} N )$（原标注 $\text{log} \text{log} N$ 有误）。**注意 `update` 里 `base[x] = max(base[x], v)` 只能把值改大**，若需要改小（如删除/下调）请改用线段树。

<<< @/snippets/inline/data-structure-a/entry-004-4.cpp
