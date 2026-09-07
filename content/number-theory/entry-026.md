---
title: "Min25 筛"
order: 260
---

# Min25 筛 {#s-d6603c8082b3}

  求 $1 \cdots N$ 的质数和（$N \le 10^{10}$），板子对结果按 `mod` 取模。复杂度 $\mathcal{O} ( N^{3 / 4} / \text{log} N )$，实测 $10^{10}$ 很快；`id1/id2` 是两个 $\mathcal{O} ( \sqrt{N} )$ 数组，把 $\lfloor N / x \rfloor$ 的取值线形编号。`init` 在筛质数后对数论分块的值做 $\mathcal{O} ( \frac{N^{3 / 4}}{\text{log} N} )$ 的质数贡献筛，`solve` 返回 $2 \cdots N$ 质数和。求一般的积性函数前缀和需按题目改写 `calc` 与转移，具体参 oi-wiki 的 Min\_25 筛一节。

<<< @/snippets/inline/number-theory/entry-026-54.cpp
