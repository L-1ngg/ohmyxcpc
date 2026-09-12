---
title: "阿达马矩阵(Hadamard matrix)"
order: 60
---

# 阿达马矩阵 (Hadamard matrix) {#s-1b4e25fee7d6}

构造题用，其有一些性质：将 $0$ 看作 $- 1$；$1$ 看作 $+ 1$，整个矩阵可以构成一个 $2^{k}$ 维向量组，任意两个行、列向量的点积均为 $0$ [See](https://codeforces.com/contest/610/problem/C)。例如，在 $k = 2$ 时行向量 $\overrightarrow{2}$ 和行向量 $\overrightarrow{3}$ 的点积为 $1 \cdot 1 + ( - 1 ) \cdot 1 + 1 \cdot ( - 1 ) + ( - 1 ) \cdot ( - 1 ) = 0$ 。

$k = 1$ 时行为 `11`、`10`；$k = 2$ 时行为 `1111`、`1010`、`1100`、`1001`。

<<< @/snippets/code/杂项/阿达马矩阵-Hadamard-matrix.cpp
