---
title: "快速数论变换 NTT"
order: 70
---

# 快速数论变换 NTT {#s-9010bed3a01d}

模意义卷积，$\mathcal{O} ( N \text{log} N )$。模数须为 NTT 模（$998244353$ 原根 $3$）。长度补到 $2$ 的幂。下面第一段构造时就做了 DFT，只是变换器；第二段 `mul` 才是完整乘法。

$\mathcal{O} ( N \text{log} N )$ 。

<<< @/snippets/inline/polynomial/entry-007-61.cpp

需要注意的是，最后答案要除以做 DFT/IDFT 的长度，而且做 DFT/IDFT 的长度要一样且是 2 的整数次幂。还有就是做高精度乘法的时候要记得把数组反向。如果 TLE 了可以考虑一些常数优化。

<<< @/snippets/code/多项式/快速数论变换-NTT-2.cpp
