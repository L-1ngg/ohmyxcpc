---
title: "线段树"
order: 60
---

# 线段树 {#s-945be4a63a10}

  把区间递归对半切开，每个节点管一段。区间修改打懒标记，下推时才传给儿子；查询把路过的节点合并起来。比树状数组慢，能做的运算更宽（最值、取模、可判谓词）。本板区间均为 $[ l , r )$。

## LazyInfoTag 线段树 {#s-5fc1ec22f4b8}

  用法约定：区间**左闭右开 $[ l , r )$**；`Info` 需提供 `operator+`（合并）与 `apply(Tag)`（打懒标记），`Tag` 需提供复合自身的 `apply(Tag)`；`modify(p, v)` 单点赋值，`rangeQuery(l,r)` / `rangeApply(l,r,tag)` 区间查询/区间标记，`findFirst/findLast(l, r, pred)` 在区间内找第一个/最后一个使 `pred` 为真的位置（返回 `-1` 表示不存在，要求 `pred` 具有区间可判性）。下方 `Info/Tag` 为空白壳，按题目自行填写（如区间加：`Tag.x` 为增量，`Info::apply` 累加长度倍增量）。

<<< @/snippets/inline/data-structure-a/entry-006-6.cpp

## 快速线段树（单点修改+区间最值） {#s-ca221e4eb300}

  zkw 式非递归线段树，单点修改/区间最值均为 $\mathcal{O} ( \text{log} N )$，常数极小；区间为**左闭右开 $[ l , r )$**，初值 `-2E9` 按题目改成对应下界（最小时用 `2E9`）。

<<< @/snippets/code/数据结构A/快速线段树单点修改+区间最值.cpp

## 区间取模 {#s-aa720df211ba}

  原题需要进行“单点赋值+区间取模+区间求和” [See](https://codeforces.com/contest/438/problem/D) 。该操作不需要懒标记。

需要额外维护一个区间最大值，当模数大于区间最大值时剪枝，否则进行单点取模。由于单点 $\mathrm{\text{MOD}} < x$ 时 $x \operatorname{mod} \mathrm{\text{MOD}} < \frac{x}{2}$ ，故单点取模至 $0$ 最劣只需要 $\text{log} x$ 次 。

## 拆位运算 {#s-75d8dbd0ae70}

  原题同上。每一位一棵线段树（或 bitset），区间异或变成该位的区间翻转。位之间独立，答案再拼回去。
