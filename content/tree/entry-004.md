---
title: "最近公共祖先 LCA"
order: 40
---

# 最近公共祖先 LCA {#s-a67ef2e0643d}

  树上两点路径的最高点。任意路径 $u \to v$ 拆成 $u \to \text{lca}$ 与 $v \to \text{lca}$。剖分 $\mathcal{O} ( \text{log} N )$、倍增 $\mathcal{O} ( \text{log} N )$、欧拉序+ST $\mathcal{O} ( 1 )$。先 `work(root)` 再查。

## 树链剖分解法 {#s-8e21296594c3}

  预处理 $\mathcal{O} ( N )$，单次 $\mathcal{O} ( \text{log} N )$，常数较小。沿重链跳 `top`，深度大的那条先跳，直到两点顶在同一条链上再比深度。

<<< @/snippets/code/树上问题/树链剖分解法.cpp

## 树上倍增解法 {#s-e15494edb864}

  预处理时间复杂度 $\mathcal{O} ( N \text{log} N )$ ；单次查询 $\mathcal{O} ( \text{log} N )$ ，但是常数比树链剖分解法更大。

**封装一：基础封装，针对无权图。**

<<< @/snippets/inline/tree/entry-004-30.cpp

**封装二：扩展封装，针对有权图，支持“倍增查询两点路径上的最大边权”功能**。

<<< @/snippets/inline/tree/entry-004-31.cpp

## st表预处理解法 {#s-b032b8b04a70}

  欧拉序 + ST 表预处理 $\mathcal{O} ( N \text{log} N )$，$O ( 1 )$ 查询 LCA（不维护其他信息时最快，且静态）；`id` 为欧拉序，`l[u]/r[u]` 为子树区间（可顺带做子树操作）。

<<< @/snippets/code/树上问题/st表预处理解法.cpp
