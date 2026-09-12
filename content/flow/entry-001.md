---
title: "最大流"
order: 10
---

# 最大流 {#s-b8d45f37633a}

求容量网络中从源点到汇点的最大流量，每条正向边配反向边以允许退流。`add(u, v, c)` 自动建立反向边；一般图可选 Dinic，较大网络可比较 HLPP 的实际表现。

## Dinic 解 {#s-b3a1bbc0f81a}

理论最坏 $\mathcal{O} ( N^{2} M )$，例题范围 $N = 1200 , \quad m = 5 \times 10^{3}$。BFS 分层，当前弧 DFS 一次找完该层所有增广。`work(s, t)` 返回最大流。

<<< @/snippets/code/网络流/Dinic-解.cpp

## 预流推进 HLPP {#s-385c5258675e}

预流推进（HLPP，最高标号预流推进）是实际运行速度最快的最大流实现之一，适合大数据量、边较多的场合；理论最坏复杂度为 $\mathcal{O} ( N^{2} \sqrt{M} )$ ，例题范围：$N = 1200 , \quad m = 1.2 \times 10^{5}$ 。用法与 Dinic 相同：`PushRelabel<long long> pr(n);`（模板参数须能容纳 `INF = 0x3f3f3f3f3f3f3f3f3f`）→ 反复 `addedge(u, v, w)` → `pr.work(s, t)`。实现要点：`init` 从汇点反向 BFS 赋高度标签（`f` 控制是否入 gap 桶），`PushPoint` 对虚流做推流/重贴标签，`gobalcnt` 累计入桶次数、超过 $10 n$ 时重新 `init` 防退化。注意 `work` 开头 `ex[s] = INF` 只是哨兵，结尾 `ex[s] -= INF` 扣回，`maxflow` 也由此而来；**同一对象不能重复 `work`**（残留的虚流会污染结果），多组询问请每次新建对象。

**状态：** `ex[u]` 保存节点的超额流，容量类型 `T` 需容纳累积流量。

<<< @/snippets/code/网络流/预流推进-HLPP.cpp
