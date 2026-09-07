---
title: "最长公共子序列 LCS"
order: 40
---

# 最长公共子序列 LCS {#s-1685c6c7cf0e}

  两串公共子序列的最长长度（可不连续）。$f [ i ] [ j ] = \text{max} ( f [ i - 1 ] [ j ] , f [ i ] [ j - 1 ] , f [ i - 1 ] [ j - 1 ] + [ s_{i} = t_{j} ] )$。$n \le 10^{3}$ 用二维 DP；$n$ 更大把一串 LIS 化（转成另一串出现位置）。

## 小数据解 {#s-04cd59c34839}

  $n , m \le 10^{3}$，$\mathcal{O} ( n m )$。

<<< @/snippets/inline/string/entry-004-36.cpp

## 大数据解 {#s-966cf6255ff1}

  针对 $10^{5}$ 以内的数据。**要求两个序列都是排列**（元素互不相同），否则 `p[a[i]] = i` 的映射会互相覆盖。把第二个序列映射到第一个序列中的位置后跑 LIS，复杂度 $\mathcal{O} ( N \text{log} N )$。`maxn` 需自行定义。

<<< @/snippets/inline/string/entry-004-37.cpp
