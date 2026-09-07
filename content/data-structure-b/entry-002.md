---
title: "珂朵莉树(OD Tree)"
order: 20
---

# 珂朵莉树 (OD Tree) {#s-16603d58e80e}

  核心是 `split(pos)` 把含 `pos` 的区间拆成两段并返回左端点为 `pos` 的段，`assign(l, r, x)` 把区间推平成一个值——只有大量区间覆盖/推平操作才有收益，**仅在数据随机时复杂度有保证（约 $\mathcal{O} ( N \text{log} \text{log} N )$），否则可被卡回 $\mathcal{O} ( N^{2} )$**。常用：`add(l,r,x)` 区间加，`kth(l,r,k)` 区间第 $k$ 小，`powersum(l,r,x,mod)` 区间元素 $x$ 次方和模 `mod`。

<<< @/snippets/code/数据结构B/珂朵莉树-OD-Tree.cpp
