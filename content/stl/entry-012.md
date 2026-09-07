---
title: "其他函数"
order: 120
---

# 其他函数 {#s-4c82d31ce6d8}

  `exp2(x)` ：返回 $2^{x}$

`log2(x)` ：返回 $\text{log}_{2} ( x )$

`gcd(x, y) / lcm(x, y)` ：C++17 标准库函数，$\mathcal{O} ( \text{log} \text{min} ( \vert x \vert , \vert y \vert ) )$ 返回 $\text{gcd} ( \vert x \vert , \vert y \vert )$ 与 $\mathrm{\text{lcm}} ( \vert x \vert , \vert y \vert )$，返回值恒为正。注意 `lcm` 先除后乘不会溢出。
