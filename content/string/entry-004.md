---
title: "最长公共子序列 LCS"
order: 40
---

# 最长公共子序列 LCS {#s-1685c6c7cf0e}

求两序列最长公共子序列的长度，字符不要求连续。一般情形用 $O(nm)$ 的二维 DP；两个序列都是元素互异的排列时，可映射位置后转为 $O(n\log n)$ 的 LIS。

## 小数据解 {#s-04cd59c34839}

$n , m \le 10^{3}$，$\mathcal{O} ( n m )$。

<<< @/snippets/inline/string/entry-004-36.cpp

## 大数据解 {#s-966cf6255ff1}

针对 $10^{5}$ 以内的数据。**要求两个序列都是排列**（元素互不相同），否则 `p[a[i]] = i` 的映射会互相覆盖。把第二个序列映射到第一个序列中的位置后跑 LIS，复杂度 $\mathcal{O} ( N \text{log} N )$。`maxn` 需自行定义。

<<< @/snippets/inline/string/entry-004-37.cpp
