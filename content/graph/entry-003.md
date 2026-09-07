---
title: "单源最短路径(SSSP 问题)"
order: 30
---

# 单源最短路径 (SSSP 问题) {#s-48cc742ad530}

  固定源点到其余点的最短路。边权非负用 Dijkstra；有负权无负环用 Bellman-Ford / SPFA；路上有负环则该点无最短路。全源用 Floyd。

## （正权稀疏图）动态数组存图+Dijkstra 算法 {#s-4c1fd532ac0f}

  堆优化 $\mathcal{O} ( M \text{log} N )$。每次弹出当前距离最小的未确定点，用它松弛邻边；正权保证弹出即为最终答案。`d` 初值 INF。

## （负权图）Bellman ford 算法 {#s-2e151000aef5}

  使用结构体存边（该算法无需存图），以 $\mathcal{O} ( N M )$ 的复杂度计算，注意，当所求点的路径上存在负环时，所求点的答案无法得到，但是会比 INF 小（因为负环之后到所求点之间的边权会将 `d[end]` 的值更新），该性质可以用于判断路径上是否存在负环：在 $N - 1$ 轮后仍无法得到答案（一般与 `INF / 2` 进行比较）的点，到达其的路径上存在负环。

下方代码例题：求解从 $1$ 到 $n$ 号节点的、最多经过 $k$ 条边的最短距离。

<<< @/snippets/code/图论/负权图Bellman-ford-算法.cpp

## （负权图）SPFA 算法 {#s-c2532eff709f}

  以 $\mathcal{O} ( K M )$ 的复杂度计算，最坏 $\mathcal{O} ( N M )$，且可以被特殊构造卡掉，无负权时优先用堆优化 Dijkstra。

<<< @/snippets/code/图论/负权图SPFA-算法.cpp
