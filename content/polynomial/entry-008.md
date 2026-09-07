---
title: "拉格朗日插值"
order: 80
---

# 拉格朗日插值 {#s-def5bb8b2bb4}

  $n + 1$ 个点唯一确定最高 $n$ 次多项式。普通情况：$f ( k ) = \sum_{i = 1}^{n + 1} y_{i} \prod_{i \ne j} \frac{k - x [ j ]}{x [ i ] - x [ j ]}$ 。下面这块是连续点 $1 \cdots n + 2$ 上对 $i^{n}$ 前缀和插值（自然数方幂和），不是任意点；依赖 `Z`。

$n + 1$ 个点可以唯一确定一个最高为 $n$ 次的多项式。普通情况：$f ( k ) = \sum_{i = 1}^{n + 1} y_{i} \prod_{i \ne j} \frac{k - x [ j ]}{x [ i ] - x [ j ]}$ 。

<<< @/snippets/inline/polynomial/entry-008-62.cpp
