---
title: "常用结论"
order: 100
---

# 常用结论 {#s-a7aed82ae940}

  生成函数与单位根的速查。OGF 管组合计数，EGF 管有标号；卷积对应乘法。用前对一下下标从 $0$ 还是 $1$。

## 杂 {#s-f6b43f0dcbbe}

- 求 $B_{i} = \sum_{k = i}^{n} C_{k}^{i} A_{k}$，即 $B_{i} = \frac{1}{i !} \sum_{k = i}^{n} \frac{1}{( k - i ) !} \cdot k ! A_{k}$，反转后卷积。

- NTT 中，$\omega_{n} =$ `qpow(G,(mod-1)/n))`。

- 遇到 $\sum_{i = 0}^{n} [ i \% k = 0 ] f ( i )$ 可以转换为 $\sum_{i = 0}^{n} \frac{1}{k} \sum_{j = 0}^{k - 1} ( \omega_{k}^{i} )^{j} f ( i )$ 。（单位根卷积）

- 广义二项式定理 $( 1 + x )^{\alpha} = \sum_{i = 0}^{\infty} \binom{\alpha}{i} x^{i}$ 。

## 普通生成函数 / OGF {#s-ce84f1ad40f4}

- 普通生成函数：$A ( x ) = a_{0} + a_{1} x + a_{2} x^{2} + \cdots = \langle a_{0} , a_{1} , a_{2} , \cdots \rangle$ ；

- $1 + x^{k} + x^{2 k} + \cdots = \frac{1}{1 - x^{k}}$ ；

- 取对数后 $= - \text{ln} ( 1 - x^{k} ) = \sum_{i = 1}^{\infty} \frac{1}{i} x^{k i}$ 即 $\sum_{i = 1}^{\infty} \frac{1}{i} x^{i} \odot x^{k}$（polymul\_special）；

- $x + \frac{x^{2}}{2} + \frac{x^{3}}{3} + \cdots = - \text{ln} ( 1 - x )$ ；

- $1 + x + x^{2} + \cdots + x^{m - 1} = \frac{1 - x^{m}}{1 - x}$ ；

- $1 + 2 x + 3 x^{2} + \cdots = \frac{1}{( 1 - x )^{2}}$（借用导数，$n x^{n - 1} = ( x^{n} ) \prime$）；

- $C_{m}^{0} + C_{m}^{1} x + C_{m}^{2} x^{2} + \cdots + C_{m}^{m} x^{m} = ( 1 + x )^{m}$（二项式定理）；

- $C_{m}^{0} + C_{m + 1}^{1} x^{1} + C_{m + 2}^{2} x^{2} + \cdots = \frac{1}{( 1 - x )^{m + 1}}$（归纳法证明）；

- $\sum_{n = 0}^{\infty} F_{n} x^{n} = \frac{( F_{1} - F_{0} ) x + F_{0}}{1 - x - x^{2}}$（F 为斐波那契数列，列方程 $G ( x ) = x G ( x ) + x^{2} G ( x ) + ( F_{1} - F_{0} ) x + F_{0}$）；

- $\sum_{n = 0}^{\infty} H_{n} x^{n} = \frac{1 - \sqrt{1 - 4 x}}{2 x}$（H 为卡特兰数；原来写成 $\sqrt{n - 4 x}$）；

- 前缀和 $\sum_{n = 0}^{\infty} s_{n} x^{n} = \frac{1}{1 - x} f ( x )$ ；

- 五边形数定理：$\prod_{i = 1}^{\infty} ( 1 - x^{i} ) = \sum_{k = 0}^{\infty} ( - 1 )^{k} x^{\frac{1}{2} k ( 3 k \pm 1 )}$ 。

## 指数生成函数 / EGF {#s-fc6356be03c4}

- 指数生成函数：$A ( x ) = a_{0} + a_{1} x + a_{2} \frac{x^{2}}{2 !} + a_{3} \frac{x^{3}}{3 !} + \cdots = \langle a_{0} , a_{1} , a_{2} , a_{3} , \cdots \rangle$ ；

- 普通生成函数转换为指数生成函数：系数乘以 $n !$ ；

- $1 + x + \frac{x^{2}}{2 !} + \frac{x^{3}}{3 !} + \cdots = \text{exp} x$ ；

- 长度为 $n$ 的循环置换数为 $P ( x ) = - \text{ln} ( 1 - x )$，长度为 n 的置换数为 $\text{exp} P ( x ) = \frac{1}{1 - x}$（注意是**指数**生成函数） 
   - $n$ 个点的生成树个数是 $P ( x ) = \sum_{n = 1}^{\infty} n^{n - 2} \frac{x^{n}}{n !}$，n 个点的生成森林个数是 $\text{exp} P ( x )$ ；

   - $n$ 个点的无向连通图个数是 $P ( x )$，n 个点的无向图个数是 $\text{exp} P ( x ) = \sum_{n = 0}^{\infty} 2^{\frac{1}{2} n ( n - 1 )} \frac{x^{n}}{n !}$ ；

   - 长度为 $n ( n \ge 2 )$ 的循环置换数是 $P ( x ) = - \text{ln} ( 1 - x ) - x$，长度为 n 的错排数是 $\text{exp} P ( x )$ 。
