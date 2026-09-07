---
title: "2-Sat"
order: 190
---

# 2-Sat {#s-f0225f25dcf3}

  每个布尔变量拆成 $x$ 与 $\neg x$ 两个点。条款 $( a \lor b )$ 连边 $\neg a \to b$、$\neg b \to a$。同一 SCC 里同时出现 $x$ 与 $\neg x$ 则无解；否则拓扑序靠后的那个取值。

## 基础封装 {#s-a0d0d5c31d96}

  基于 tarjan 缩点，$\mathcal{O} ( N + M )$。下标从 $0$ 开始。`work()` 返回是否有解，`answer()` 给**一组**可行解：`id[2i] > id[2i+1]` 时 `ans[i] = true`。**不一定字典序最小**（最小需按变量顺序逐一 DFS）。`add(u, f, v, g)` 表示 $( u$ 取 $f ) \Rightarrow ( v$ 取 $g )$（`true` 编号 `2u+1`，`false` 编号 `2u`）。

<<< @/snippets/code/图论/基础封装.cpp

## 答案不唯一时不输出 {#s-d41e3f1006be}

  在运行后针对每一个点进行一次 dfs，时间复杂度为 $\mathcal{O} ( N^{2} )$​ ，当且仅当答案唯一时才输出，否则输出 `?` 替代。

2-Sat 方案计数为 NPC 问题。

<<< @/snippets/inline/graph/entry-019-18.cpp
