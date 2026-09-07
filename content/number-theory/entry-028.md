---
title: "矩阵快速幂"
order: 280
---

# 矩阵快速幂 {#s-f68cf7d823da}

  把转移写成矩阵乘法，指数倍增。`MatPow(A,b)` 得 $A^{b}$；`N` 为阶、`mod` 按题改，下标从 $1$。复杂度 $\mathcal{O} ( N^{3} \text{log} M )$。线性递推见下一节矩阵加速。

<<< @/snippets/code/数论/矩阵快速幂.cpp
