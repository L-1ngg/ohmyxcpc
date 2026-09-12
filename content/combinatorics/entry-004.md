---
title: "范德蒙德卷积公式"
order: 40
---

# 范德蒙德卷积公式 {#s-055dfcd471cd}

两堆分别选再合并，等于从并集里直接选；网格路径计数也常用。

在数量为 $n + m$ 的堆中选 $k$ 个元素，和分别在数量为 $n \text{、} m$ 的堆中选 $i \text{、} k - i$ 个元素的方案数是相同的，即$\sum_{i = 0}^{k} \binom{n}{i} \binom{m}{k - i} = \binom{n + m}{k}$ ；

变体：

- $\sum_{i = 0}^{k} C_{i + n}^{i} = C_{k + n + 1}^{k}$ ；

- $\sum_{i = 0}^{k} C_{n}^{i} * C_{m}^{i} = \sum_{i = 0}^{k} C_{n}^{i} * C_{m}^{m - i} = C_{n + m}^{n}$ 。

### 推论 1 及证明 {#s-5fc13c283316}

$$
\sum_{i = - r}^{s} \binom{n}{r + i} \binom{m}{s - i} = \binom{n + m}{r + s}
$$

### 推论 2 及证明 {#s-3c504593b831}

$$
\sum_{i = 1}^{n} \binom{n}{i} \binom{n}{i - 1} = \sum_{i = 0}^{n - 1} \binom{n}{i + 1} \binom{n}{i} = \sum_{i = 0}^{n - 1} \binom{n}{n - 1 - i} \binom{n}{i} = \binom{2 n}{n - 1}
$$

### 推论 3 及证明 {#s-a4b4a5290c6a}

$$
\sum_{i = 0}^{n} \binom{n}{i}^{2} = \sum_{i = 0}^{n} \binom{n}{i} \binom{n}{n - i} = \binom{2 n}{n}
$$

### 推论 4 及证明 {#s-b5733ae23122}

$$
\sum_{i = 0}^{m} \binom{n}{i} \binom{m}{i} = \sum_{i = 0}^{m} \binom{n}{i} \binom{m}{m - i} = \binom{n + m}{m}
$$

其中 $\binom{n + m}{m}$ 是我们较为熟悉的网格图路径计数的方案数。所以我们可以考虑其组合意义的证明。

在一张网格图中，从 $( 0 , 0 )$ 走到 $( n , m )$ 共走 $n + m$ 步。规定 $( 0 , 0 )$ 位于网格图左上角，其中向下走了 $n$ 步，向右走了 $m$ 步，方案数为 $\binom{n + m}{m}$。

换个视角，我们将 $n + m$ 步拆成两部分走，先走 $n$ 步，再走 $m$ 步，那么 $n$ 步中若有 $i$ 步向右，则 $m$ 步中就有 $m - i$ 步向右，故得证。
