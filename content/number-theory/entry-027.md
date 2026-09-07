---
title: "矩阵四则运算"
order: 270
---

# 矩阵四则运算 {#s-d4aaf81ae793}

  [封装来自](https://ac.nowcoder.com/acm/contest/view-submission?submissionId=48594258) 。矩阵乘法复杂度 $\mathcal{O} ( N^{3} )$ 。**`SIZE` 按题目改**；`getinv` 用高斯-约当法在素模数下求逆（依赖 `mod` 为素数），失败时置全局 `ok = 0`。

<<< @/snippets/code/数论/矩阵四则运算.cpp
