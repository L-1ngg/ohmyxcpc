---
title: "Linear-Recurrence 算法"
order: 50
---

# Linear-Recurrence 算法 {#s-9d0056672f02}

  已知线性递推，求第 $n$ 项（$0$-index）。`q` 为特征多项式，$p$ 由初值决定。Bostan-Mori，$\mathcal{O} ( M^{2} \text{log} n )$ 或配 NTT 更快。$n$ 用 `i64`。

<<< @/snippets/inline/polynomial/entry-005-60.cpp
