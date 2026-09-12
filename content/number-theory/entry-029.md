---
title: "矩阵加速"
order: 290
---

# 矩阵加速 {#s-317560a1739e}

矩阵快速幂优化线性递推的示例：递推式 $f ( n ) = f ( n - 1 ) + f ( n - 3 )$（初值 $f ( 1 ) = f ( 2 ) = f ( 3 ) = 1$）。转移矩阵为

$$
\begin{pmatrix}1 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0\end{pmatrix} , \quad \begin{pmatrix}f ( n ) \\ f ( n - 1 ) \\ f ( n - 2 )\end{pmatrix} = \begin{pmatrix}1 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0\end{pmatrix}^{n - 3} \begin{pmatrix}1 \\ 1 \\ 1\end{pmatrix}
$$

复杂度 $\mathcal{O} ( k^{3} \text{log} n )$，$k$ 为状态数（此处 3）。

<<< @/snippets/code/数论/矩阵加速.cpp
