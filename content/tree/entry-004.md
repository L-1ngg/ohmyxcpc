---
title: "最近公共祖先 LCA"
order: 40
---

# 最近公共祖先 LCA {#s-a67ef2e0643d}

查询有根树中两点的最近公共祖先，可将路径拆为两条向祖先的链。重链剖分和倍增的单次查询为 $O(\log n)$，DFS 序配 ST 表可做到 $O(1)$；按预处理和附加路径信息需求选版本。

## 树链剖分解法 {#s-8e21296594c3}

预处理 $\mathcal{O} ( N )$，单次 $\mathcal{O} ( \text{log} N )$，常数较小。沿重链跳 `top`，深度大的那条先跳，直到两点顶在同一条链上再比深度。

**调用：** `add(x, y)` 自动加入双向边，全部加边后调用 `work(root)`；`clac(x, y)` 查询两点的边距离。

<<< @/snippets/code/树上问题/树链剖分解法.cpp

## 树上倍增解法 {#s-e15494edb864}

预处理时间复杂度 $\mathcal{O} ( N \text{log} N )$ ；单次查询 $\mathcal{O} ( \text{log} N )$ ，但是常数比树链剖分解法更大。

**封装一：基础封装，针对无权图。**

**调用：** `add(x, y)` 加双向边，`work(root)` 预处理父节点倍增表；`clac(x, y)` 查询无权树的边距离。

<<< @/snippets/inline/tree/entry-004-30.cpp

**封装二：扩展封装，针对有权图，支持“倍增查询两点路径上的最大边权”功能**。

**调用：** `add(x, y, w)` 加双向带权边，`work(root)` 预处理；`clac` 返回边数距离，`query` 返回路径最大边权，二者含义不同。

<<< @/snippets/inline/tree/entry-004-31.cpp

## st表预处理解法 {#s-b032b8b04a70}

欧拉序 + ST 表预处理 $\mathcal{O} ( N \text{log} N )$，$O ( 1 )$ 查询 LCA（不维护其他信息时最快，且静态）；`id` 为欧拉序，`l[u]/r[u]` 为子树区间（可顺带做子树操作）。

**构造：** 传入节点数、从 `1` 开始编号的邻接表和根；构造时生成 DFS 序及 ST 表，之后查询 LCA。

<<< @/snippets/code/树上问题/st表预处理解法.cpp
