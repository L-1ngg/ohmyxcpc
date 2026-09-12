---
title: "轻重链剖分/树链剖分"
order: 100
---

# 轻重链剖分/树链剖分 {#s-10dcbd770e64}

将线段树处理的部分分离，方便修改。支持链上查询/修改、子树查询/修改，建树时间复杂度 $\mathcal{O} ( N \text{log} N )$ ，单次查询时间复杂度 $\mathcal{O} ( \text{log}^{2} N )$ 。

**接入：** 在线段树的 `pushdown(node&, lazy)` 中定义标记作用，在合并函数中定义区间信息；树链封装负责把路径 / 子树映射到线段树区间。`add` 加双向边，`work(in, root)` 建立编号并初始化线段树。

**接口：** 两点版本 `modify(u, v, val)` / `ask(u, v)` 操作路径，单点版本 `modify(root, val)` / `ask(root)` 操作子树。若改为区间赋值，须区分“没有标记”和“赋值为零”，可使用独立布尔标记或不在值域中的哨兵。

<<< @/snippets/inline/tree/entry-010-34.cpp
