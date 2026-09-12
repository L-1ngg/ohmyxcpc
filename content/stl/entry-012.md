---
title: "其他函数"
order: 120
---

# 其他函数 {#s-4c82d31ce6d8}

常用标准函数：`exp2(x)` 返回 $2^x$，`log2(x)` 返回以 2 为底的对数；`gcd` / `lcm` 从 C++17 提供。后两者返回非负结果，含零输入按标准约定处理；最小公倍数和取绝对值的结果必须能由返回类型表示。

`log2(x)` ：返回 $\text{log}_{2} ( x )$

`gcd(x, y) / lcm(x, y)` ：C++17 标准库函数，$\mathcal{O} ( \text{log} \text{min} ( \vert x \vert , \vert y \vert ) )$ 返回 $\text{gcd} ( \vert x \vert , \vert y \vert )$ 与 $\mathrm{\text{lcm}} ( \vert x \vert , \vert y \vert )$，返回值恒为正。注意 `lcm` 先除后乘不会溢出。
