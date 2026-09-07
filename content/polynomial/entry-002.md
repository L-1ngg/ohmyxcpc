---
title: "多项式封装"
order: 20
---

# 多项式封装 {#s-33e59ca4bf94}

  依赖本节后面的 `dft` / `idft` 与 mint `MInt<P>`。默认模 $998244353$。乘法长度够大时走 NTT，否则 $O ( n^{2} )$。`inv/log/exp/sqrt` 的 `m` 是要的前 $m$ 项。`eval` 是多点求值。

<<< @/snippets/inline/polynomial/entry-002-57.cpp
