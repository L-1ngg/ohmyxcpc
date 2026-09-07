---
title: "dsu 并查集"
order: 20
---

# dsu 并查集 {#s-9a960860fdd1}

  维护不相交集合：同一块共用一个根。路径压缩把访问链直接接到根上，按秩/按大小合并压树高，均摊约 $\mathcal{O} ( \alpha ( N ) )$。判连通、Kruskal、维护块内点数/边数都用它。下标按各封装是 $0 \cdots n - 1$ 或 $1 \cdots n$。

## 路径优化(普遍) {#s-967bdf0c7a8c}

  只做路径压缩，合并不看大小。最短，均摊仍约 $\mathcal{O} ( \alpha ( N ) )$。下标 $1 \cdots n$。`merge` 成功返回 true。

<<< @/snippets/code/数据结构A/路径优化普遍.cpp

## 根据集合的大小优化 {#s-fb9a057cb8b8}

  数组版并查集：根为正数存集合大小的相反约定——这里根存**正整数大小**，非根存**负的父编号**（`unicnt[x] <= 0` 时 `-unicnt[x]` 为父）；`uni` 按大小合并。均摊约 $\mathcal{O} ( \alpha ( N ) )$。

<<< @/snippets/code/数据结构A/根据集合的大小优化.cpp

## 按秩合并优化 {#s-c1078fb70899}

  按秩（树高下界）合并 + 路径压缩，均摊约 $\mathcal{O} ( \alpha ( N ) )$，且比朴素路径压缩有更严格的最坏界。

<<< @/snippets/code/数据结构A/按秩合并优化.cpp

## 常用操作 {#s-fd4520fd5ec3}

  路径压缩，并维护块内点数 `p`、边数 `e`、是否有自环 `f`。`merge` 把编号小的根挂到大的上。`same` / `size` / `E` / `F` 查询前都会先 `get` 到根。

<<< @/snippets/code/数据结构A/常用操作.cpp
