---
title: 生成函数常用结论
order: 208
---

# 生成函数常用结论

## 普通生成函数与指数生成函数

1. 序列 $a$ 的**普通生成函数**: $F(x) = \sum{a_nx^n}$
2. 序列 $a$ 的**指数生成函数**: $F(x) = \sum{a_n \frac{x^n}{n!}}$

## 泰勒展开式

1. $\frac{1}{1-x}=1+x+x^2+x^3+\dots=\sum_{n=0}^{\infty}{x^n}$
2. $\frac{1}{1-x^2}=1+x^2+x^4+\dotsb$
3. $\frac{1}{1-x^3}=1+x^3+x^6+\dotsb$
4. $\frac{1}{(1-x)^2}=1+2x+3x^2+\dotsb$
5. $e^x=1+\frac{x^1}{1!}+\frac{x^2}{2!}+\frac{x^3}{3!}+\dotsb=\sum_{n=0}^{\infty}\frac{x^n}{n!}$
6. $e^{-x}=1-\frac{x^1}{1!}+\frac{x^2}{2!}-\frac{x^3}{3!}+\dotsb$
7. $\frac{e^x+e^{-x}}{2}=1+\frac{x^2}{2!}+\frac{x^4}{4!}+\dotsb$
8. $\frac{e^x-e^{-x}}{2}=x+\frac{x^3}{3!}+\frac{x^5}{5!}+\dotsb$

## 有穷序列的生成函数

1. $1+x+x^2=\frac{1-x^3}{1-x}$
2. $1+x+x^2+x^3=\frac{1-x^4}{1-x}$

## 广义二项式定理

$$\frac{1}{(1-x)^n}=\sum_{i=0}^{\infty}\binom{n+i-1}{i}x^i$$

**证明：**

1. 扩展域
   $(1+x)^n=\sum_{i=0}^{n}\binom{n}{i}x^i$，因 $i>n,\binom{n}{i}=0$。

2. 扩展指数为负数
   $\binom{-n}{i}=\frac{(-n)(-n-1)\dotsb(-n-i+1)}{i!}=(-1)^i\times\frac{n(n+1)\dotsb(n+i-1)}{i!}=(-1)^i\binom{n+i-1}{i}$

3. 括号内的加号变减号
   $(1-x)^{-n}=\sum_{i=0}^{\infty}(-1)^i\binom{n+i-1}{i}(-x)^i=\sum_{i=0}^{\infty}\binom{n+i-1}{i}x^i$

## 杂项

- 求 $\displaystyle B_i = \sum_{k=i}^n C_k^iA_k$，即 $\displaystyle B_i=\dfrac{1}{i!}\sum_{k=i}^n\dfrac{1}{(k-i)!}\cdot k!A_k$，反转后卷积。
- NTT 中，$\omega_n=$ `qpow(G,(mod-1)/n))`。
- 遇到 $\displaystyle \sum_{i=0}^n[i\%k=0]f(i)$ 可以转换为 $\displaystyle \sum_{i=0}^n\dfrac 1 k\sum_{j=0}^{k-1}(\omega_k^i)^jf(i)$ 。（单位根卷积）
- 广义二项式定理 $\displaystyle (1+x)^{\alpha}=\sum_{i=0}^{\infty}{n\choose \alpha}x^i$ 。

## 普通生成函数 / OGF

- 普通生成函数：$A(x)=a_0+a_1x+a_2x^2+...=\langle a_0,a_1,a_2,...\rangle$ ；
- $1+x^k+x^{2k}+...=\dfrac{1}{1-x^k}$ ；
- 取对数后 $\displaystyle=-\ln(1-x^k)=\sum_{i=1}^{\infty}\dfrac{1}{i}x^{ki}$ 即 $\displaystyle\sum_{i=1}^{\infty}\dfrac{1}{i}x^i\otimes x^k$（polymul_special）；
- $x+\dfrac{x^2}{2}+\dfrac{x^3}{3}+...=-\ln(1-x)$ ；
- $1+x+x^2+...+x^{m-1}=\dfrac{1-x^m}{1-x}$ ；
- $1+2x+3x^2+...=\dfrac{1}{(1-x)^2}$（借用导数，$nx^{n-1}=(x^n)'$）；
- $C_m^0+C_m^1x+C_m^2x^2+...+C_m^mx^m=(1+x)^m$（二项式定理）；
- $C_m^0+C_{m+1}^1x^1+C_{m+2}^2x^2+...=\dfrac{1}{(1-x)^{m+1}}$（归纳法证明）；
- $\displaystyle\sum_{n=0}^{\infty}F_nx^n=\dfrac{(F_1-F_0)x+F_0}{1-x-x^2}$（F 为斐波那契数列，列方程 $G(x)=xG(x)+x^2G(x)+(F_1-F_0)x+F_0$）；
- $\displaystyle\sum_{n=0}^{\infty} H_nx^n=\dfrac{1-\sqrt{n-4x}}{2x}$（H 为卡特兰数）；
- 前缀和 $\displaystyle \sum_{n=0}^{\infty}s_nx^n=\dfrac{1}{1-x}f(x)$ ；
- 五边形数定理：$\displaystyle \prod_{i=1}^{\infty}(1-x^i)=\sum_{k=0}^{\infty}(-1)^kx^{\frac 1 2k(3k\pm 1)}$ 。

## 指数生成函数 / EGF

- 指数生成函数：$A(x)=a_0+a_1x+a_2\dfrac{x^2}{2!}+a_3\dfrac{x^3}{3!}+...=\langle a_0,a_1,a_2,a_3,...\rangle$ ；
- 普通生成函数转换为指数生成函数：系数乘以 $n!$ ；
- $1+x+\dfrac{x^2}{2!}+\dfrac{x^3}{3!}+...=\exp x$ ；
- 长度为 $n$ 的循环置换数为 $P(x)=-\ln(1-x)$，长度为 n 的置换数为 $\exp P(x)=\dfrac{1}{1-x}$（注意是**指数**生成函数）
  - $n$ 个点的生成树个数是 $\displaystyle P(x)=\sum_{n=1}^{\infty}n^{n-2}\dfrac{x^n}{n!}$，n 个点的生成森林个数是 $\exp P(x)$ ；
  - $n$ 个点的无向连通图个数是 $P(x)$，n 个点的无向图个数是 $\displaystyle\exp P(x)=\sum_{n=0}^{\infty}2^{\frac 1 2 n(n-1)}\dfrac{x^n}{n!}$ ；
  - 长度为 $n(n\ge 2)$ 的循环置换数是 $P(x)=-\ln(1-x)-x$，长度为 n 的错排数是 $\exp P(x)$ 。
