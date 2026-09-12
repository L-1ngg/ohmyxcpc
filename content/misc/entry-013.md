---
title: "高精度快速幂"
order: 130
---

# 高精度快速幂 {#s-e3714087e884}

求解 $n^{k} \operatorname{mod} p$，其中 $0 \le n , k \le 10^{1000000} , \quad 1 \le p \le 10^{9}$。容易发现 $n$ 可以直接取模，瓶颈在于 $k$ [See](https://codeforces.com/contest/17/problem/D)。

## 魔改十进制快速幂（暴力计算） {#s-25bd47f7c7b2}

该算法复杂度 $\mathcal{O} ( \text{len} ( k ) )$。

**输入：** 底数边读边对 `p` 取模，指数保留十进制数位，逐位计算模幂；要求模数为正并保证乘法不溢出。

<<< @/snippets/code/杂项/魔改十进制快速幂暴力计算.cpp

## 扩展欧拉定理（欧拉降幂公式） {#s-7bf651e2f636}

$$
n^{k} \equiv \{ n^{k \operatorname{mod} \varphi ( p )} \& \text{gcd} ( n , p ) = 1 \\ n^{k \operatorname{mod} \varphi ( p ) + \varphi ( p )} \& \text{gcd} ( n , p ) \ne 1 \land k \ge \varphi ( p ) \\ n^{k} \& \text{gcd} ( n , p ) \ne 1 \land k < \varphi ( p )
$$

最终我们可以将幂降到 $\varphi ( p )$ 的级别，使得能够直接使用快速幂解题，复杂度瓶颈在求解欧拉函数 $\mathcal{O} ( \sqrt{p} )$ 。

**思路：** 指数读入时同时记录对 `phi(p)` 的余数与是否达到 `phi(p)`；达到阈值时给余数补一个 `phi(p)`，以满足扩展欧拉降幂的条件。

<<< @/snippets/inline/misc/entry-013-87.cpp
