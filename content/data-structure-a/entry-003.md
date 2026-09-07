---
title: "ST 表"
order: 30
---

# ST 表 {#s-45eed8c90c0b}

  用于解决区间可重复贡献问题，需要满足 $x \mathrm{\text{ 运算符 }} x = x$ （如区间最大值：$\text{max} ( x , x ) = x$ 、区间 $\text{gcd}$：$\text{gcd} ( x , x ) = x$ 等），但是不支持修改操作。$\mathcal{O} ( N \text{log} N )$ 预处理，$\mathcal{O} ( 1 )$ 查询。下方 `vt` 的第二维硬编码为 `30`（支持 $n \le 2^{30}$），按 $n$ 改为 `__lg(n)+1` 即可；合并运算由 `Info::operator+` 表达。

<<< @/snippets/code/数据结构A/ST-表.cpp
