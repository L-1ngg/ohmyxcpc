---
title: "莫比乌斯函数/反演"
order: 300
---

# 莫比乌斯函数/反演 {#s-d5514b06ccba}

Möbius 反演把“对约数求和”的关系逆转，常用于互质计数。代码先筛出 Möbius 函数及前缀和，再配合整除分块加速求和。

莫比乌斯函数定义：$\mu ( n ) = \begin{cases}1 & n = 1 \\ ( - 1 )^{k} & n \mathrm{\text{ 为 }} k \mathrm{\text{ 个互异素数之积}} \\ 0 & \mathrm{\text{else}}\end{cases}$ 。

> 莫比乌斯函数性质：对于任意正整数 $n$ 满足 $\sum_{d \vert n} \mu ( d ) = \begin{cases}1 & n = 1 \\ 0 & n \ne 1\end{cases}$ ；$\sum_{d \vert n} \frac{\mu ( d )}{d} = \frac{\varphi ( n )}{n}$ 。

莫比乌斯反演定义：$F ( n )$ 和 $f ( n )$ 是定义在非负整数集合上的两个函数，并且满足 $F ( n ) = \sum_{d \vert n} f ( d )$ ，可得 $f ( n ) = \sum_{d \vert n} \mu ( d ) F ( \lfloor \frac{n}{d} \rfloor )$ 。用于”已知 $F$ 求 $f$“的莫反类题；也可以理解为 $F = f * 1 \Leftrightarrow f = F * \mu$。

**预处理：** `getMu()` 线性筛出 Möbius 函数并计算前缀和，时间与空间均为 $O(N)$；筛表上限须覆盖查询用到的最大商。

<<< @/snippets/inline/number-theory/entry-030-55.cpp
