---
title: "容斥原理"
order: 90
---

# 容斥原理 {#s-76cf8ab18921}

  下面例题用二进制或 dfs 枚举质因子子集。乘积可能爆 `long long`，板子里用 `t > n` / `s <= n / p[x]` 提前剪枝。

> 定义：$\vert S_{1} \cup S_{2} \cup S_{3} \cup \ldots \cup S_{n} \vert = \sum_{i = 1}^{N} \vert S_{i} \vert - \sum_{i , j = 1}^{N} \vert S_{i} \cap S_{j} \vert + \sum_{i , j , k = 1}^{N} \vert S_{i} \cap S_{j} \cap S_{k} \vert - \ldots$

例题：给定一个整数 $n$ 和 $m$ 个不同的质数 $p_{1} , p_{2} , \cdots , p_{m}$，请你求出 1 ∼ $n$ 中能被 $p_{1} , p_{2} , \cdots , p_{m}$ 中的至少一个数整除的整数有多少个。

## 二进制枚举解 {#s-813a2fe506da}

  $\mathcal{O} ( 2^{m} \cdot m )$。`LL` 为 `long long`。子集积超过 $n$ 对答案无贡献，用 `t > n` 剪掉以免溢出。

<<< @/snippets/code/组合数学/二进制枚举解.cpp

## dfs 解 {#s-b041f131de10}

  与二进制版等价，用 `s <= n / p[x]` 判断再乘是否溢出。入口 `odd=-1` 是因为空集先被跳过，选第一个质数时翻成 $+ 1$。

<<< @/snippets/code/组合数学/dfs-解.cpp
