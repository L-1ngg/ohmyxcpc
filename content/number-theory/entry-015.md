---
title: "逆元"
order: 150
---

# 逆元 {#s-255be8061d66}

满足 $a x \equiv 1 ( \operatorname{mod} m )$ 的 $x$，用来把除法变乘法。存在当且仅当 $\text{gcd} ( a , m ) = 1$。模质数用费马 $a^{p - 2}$；一般模用 exgcd；要 $1 \cdots n$ 全部逆元用线性递推。

## 费马小定理解（借助快速幂） {#s-7b87f1ee8f8e}

若 $p$ 为素数，$\text{gcd} ( a , p ) = 1$，则 $a^{p - 1} \equiv 1 ( \operatorname{mod} p )$。

另一个形式：对于任意整数 $a$，有 $a^{p} \equiv a ( \operatorname{mod} p )$。

单次计算的复杂度即为快速幂的复杂度 $\mathcal{O} ( \text{log} X )$ 。限制：$\text{MOD}$ 必须是质数，且需要满足 $x$ 与 $\text{MOD}$ 互质。

```cpp
using i64 = long long;
i64 inv(i64 x) {
    return mypow(x, mod - 2, mod);
}
```

## 扩展欧几里得解 {#s-f8aa32ecefb0}

此方法的 $\text{MOD}$ 没有限制，复杂度为 $\mathcal{O} ( \text{log} X )$ ，但是比快速幂法常数大一些。

**接口：** `exgcd(a, b, x, y)` 求最大公约数及 Bézout 系数；`getInv(a, mod)` 返回模逆元，不存在时返回 `-1`。

<<< @/snippets/inline/number-theory/entry-015-48.cpp

## 离线求解：线性递推解 {#s-15e8a2ea9c3d}

以 $\mathcal{O} ( N )$ 的复杂度完成 $1 - N$ 中全部逆元的计算。 **仅当 $p$ 为素数时成立。** 由 $p = \lfloor p / i \rfloor \cdot i + ( p \operatorname{mod} i ) \equiv 0 ( \operatorname{mod} p )$ 解出 $\text{inv} [ i ] = - \lfloor p / i \rfloor \cdot \text{inv} [ p \operatorname{mod} i ]$，代码里的 $p - p / i$ 是保持非负的等价写法。

```cpp
inv[1] = 1;
for (int i = 2; i <= n; i++)
    inv[i] = (p - p / i) * inv[p % i] % p;
```
