---
title: "欧拉筛(线性筛)"
order: 110
---

# 欧拉筛 (线性筛) {#s-04d760b16df8}

  每个合数只被它的**最小质因子**筛掉一次，因此复杂度为 $\mathcal{O} ( N )$（埃氏筛是 $\mathcal{O} ( N \text{log} \text{log} N )$，此处原写有误）。下面的写法同时把最小质因子记录在 `v`/`minp` 中，可用于分解质因数。

<<< @/snippets/code/数论/欧拉筛-线性筛.cpp

## 最小质因数 {#s-db99d811f79b}

  线性筛的副产品：`minp[x]` 为 $x$ 的最小质因子。分解 $x$ 只需反复除 `minp[x]`，单次 $\mathcal{O} ( \text{log} x )$。先 `sieve(n)`。

<<< @/snippets/code/数论/最小质因数.cpp
