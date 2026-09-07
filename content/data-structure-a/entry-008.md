---
title: "小波矩阵树：高效静态区间第 K 大查询"
order: 80
---

# 小波矩阵树：高效静态区间第 K 大查询 {#s-de2b374eef2f}

  手写 `bitset` 压位，以 $\mathcal{O} ( N \text{log} N )$ 的时间复杂度和 $\mathcal{O} ( N + \frac{N \text{log} N}{64} )$ 的空间建树后，实现单次 $\mathcal{O} ( \text{log} N )$ 复杂度的区间第 $k$ 大值询问。建议使用 $\mathtt{\text{0-idx}}$ 计数法，但是经测试 $\mathtt{\text{1-idx}}$ 也有效，但需要更多的检验。使用前定义 `using u64 = unsigned long long;`。

<<< @/snippets/code/数据结构A/小波矩阵树：高效静态区间第-K-大查询.cpp
