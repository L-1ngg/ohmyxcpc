---
title: 常用组合数公式
order: 101
---

# 常用组合数公式

- $k *C^k_n=n*C^{k-1}_{n-1}$ ；
- $C_k^n*C_m^k=C_m^n*C_{m-n}^{m-k}$ ；
- $C_n^k+C_n^{k+1}=C_{n+1}^{k+1}$ ；
- $\sum_{i=0}^n C_n^i=2^n$ ；
- $\sum_{k=0}^n(-1)^k*C_n^k=0$ 。
- 二项式反演：$\left\{\begin{matrix} \displaystyle f_n=\sum_{i=0}^n{n\choose i}g_i\Leftrightarrow g_n=\sum_{i=0}^n(-1)^{n-i}{n\choose i}f_i \\
  \displaystyle f_k=\sum_{i=k}^n{i\choose k}g_i\Leftrightarrow g_k=\sum_{i=k}^n(-1)^{i-k}{i\choose k}f_i \end{matrix}\right. $ ；
- $\displaystyle \sum_{i=1}^{n}i{n\choose i}=n * 2^{n-1}$ ；
- $\displaystyle \sum_{i=1}^{n}i^2{n\choose i}=n*(n+1)*2^{n-2}$ ；
- $\displaystyle \sum_{i=1}^{n}\dfrac{1}{i}{n\choose i}=\sum_{i=1}^{n}\dfrac{1}{i}$ ；
- $\displaystyle \sum_{i=0}^{n}{n\choose i}^2={2n\choose n}$ ；
- 拉格朗日恒等式：$\displaystyle \sum_{i=1}^{n}\sum_{j=i+1}^{n}(a_ib_j-a_jb_i)^2=(\sum_{i=1}^{n}a_i)^2(\sum_{i=1}^{n}b_i)^2-(\sum_{i=1}^{n}a_ib_i)^2$ 。

## 范德蒙德卷积公式

在数量为 $n+m$ 的堆中选 $k$ 个元素，和分别在数量为 $n、m$ 的堆中选 $i、k-i$ 个元素的方案数是相同的，即$\displaystyle{\sum_{i=0}^k\binom{n}{i}\binom{m}{k-i}=\binom{n+m}{k}}$ ；

变体：

- $\sum_{i=0}^k C_{i+n}^{i}=C_{k+n+1}^{k}$ ；
- $\sum_{i=0}^k C_{n}^{i}*C_m^i=\sum_{i=0}^k C_{n}^{i}*C_m^{m-i}=C_{n+m}^{n}$ 。

### 推论 1 及证明

$$
\sum_{i=-r}^{s}\binom{n}{r+i}\binom{m}{s-i}=\binom{n+m}{r+s}
$$

### 推论 2 及证明

$$
\sum_{i=1}^n\binom{n}{i}\binom{n}{i-1}=\sum_{i=0}^{n-1}\binom{n}{i+1}\binom{n}{i}=\sum_{i=0}^{n-1}\binom{n}{n-1-i}\binom{n}{i}=\binom{2n}{n-1}
$$

### 推论 3 及证明

$$
\sum_{i=0}^n\binom{n}{i}^2=\sum_{i=0}^n\binom{n}{i}\binom{n}{n-i}=\binom{2n}{n}
$$

### 推论 4 及证明

$$
\sum_{i=0}^m\binom{n}{i}\binom{m}{i}=\sum_{i=0}^m\binom{n}{i}\binom{m}{m-i}=\binom{n+m}{m}
$$

其中 $\binom{n+m}{m}$ 是我们较为熟悉的网格图路径计数的方案数。所以我们可以考虑其组合意义的证明。

在一张网格图中，从 $(0,0)$ 走到 $(n,m)$ 共走 $n+m$ 步。规定 $(0,0)$ 位于网格图左上角，其中向下走了 $n$ 步，向右走了 $m$ 步，方案数为 $\binom{n+m}{m}$。

换个视角，我们将 $n+m$ 步拆成两部分走，先走 $n$ 步，再走 $m$ 步，那么 $n$ 步中若有 $i$ 步向右，则 $m$ 步中就有 $m-i$ 步向右，故得证。
