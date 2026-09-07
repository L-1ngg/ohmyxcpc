---
title: "高精度快速幂"
order: 130
---

# 高精度快速幂 {#s-e3714087e884}

  求解 $n^{k} \operatorname{mod} p$，其中 $0 \le n , k \le 10^{1000000} , \quad 1 \le p \le 10^{9}$。容易发现 $n$ 可以直接取模，瓶颈在于 $k$ [See](https://codeforces.com/contest/17/problem/D)。

## 魔改十进制快速幂（暴力计算） {#s-25bd47f7c7b2}

  该算法复杂度 $\mathcal{O} ( \text{len} ( k ) )$。

<<< @/snippets/code/杂项/魔改十进制快速幂暴力计算.cpp

## 扩展欧拉定理（欧拉降幂公式） {#s-7bf651e2f636}

$$
n^{k} \equiv \{ n^{k \operatorname{mod} \varphi ( p )} \& \text{gcd} ( n , p ) = 1 \\ n^{k \operatorname{mod} \varphi ( p ) + \varphi ( p )} \& \text{gcd} ( n , p ) \ne 1 \land k \ge \varphi ( p ) \\ n^{k} \& \text{gcd} ( n , p ) \ne 1 \land k < \varphi ( p )
$$

最终我们可以将幂降到 $\varphi ( p )$ 的级别，使得能够直接使用快速幂解题，复杂度瓶颈在求解欧拉函数 $\mathcal{O} ( \sqrt{p} )$ 。

<<< @/snippets/inline/misc/entry-013-87.cpp
