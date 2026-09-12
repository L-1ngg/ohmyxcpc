---
title: "欧拉函数"
order: 190
---

# 欧拉函数 {#s-66c11f2e7838}

$\varphi ( n )$：$1 \cdots n$ 中与 $n$ 互质的个数。

- $n = \prod p_{i}^{k_{i}}$ 则 $\varphi ( n ) = n \prod ( 1 - 1 / p_{i} )$。
- 欧拉定理：$a^{\varphi ( n )} \equiv 1 ( \operatorname{mod} n )$（$\text{gcd} ( a , n ) = 1$），用来降幂。

## 直接求解单个数的欧拉函数 {#s-ad42a8263f78}

分解质因数后套公式，$\mathcal{O} ( \sqrt{n} )$。

<<< @/snippets/code/数论/直接求解单个数的欧拉函数.cpp

## 求解 1 到 N 所有数的欧拉函数 {#s-82fdbfb10733}

利用上述性质，我们可以快速递推出 $2 - N$ 中每个数的欧拉函数，复杂度 $\mathcal{O} ( N )$ ，而该算法**即是线性筛的算法**。

$$
\varphi ( n ) = ( 1 - 1 / p_{1} ) ( 1 - 1 / p_{2} ) ( 1 - 1 / p_{3} ) ( 1 - 1 / p_{4} ) \cdots ( 1 - 1 / p_{n} ) ;
$$

**初始化：** `v` 存最小质因子，`prime` 存质数列表；筛前清空表和质数计数。转移区分当前质数是否整除 `i`。

<<< @/snippets/inline/number-theory/entry-019-49.cpp

<<< @/snippets/inline/number-theory/entry-019-50.cpp

## 使用莫比乌斯反演求解欧拉函数 {#s-bcd1f7a8b009}

由恒等式 $\sum_{d \mid n} \varphi ( d ) = n$ 对 $n$ 容斥递推：$\varphi ( n ) = n - \sum_{d \mid n , d < n} \varphi ( d )$。先用倍数法预处理每个数的约数，再 $O ( N \text{log} N )$ 递推。

<<< @/snippets/inline/number-theory/entry-019-51.cpp
