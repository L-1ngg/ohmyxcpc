---
title: "kmp"
order: 20
---

# kmp {#s-b8fe31c3713f}

> 应用：
> 
> 
> 1. 在字符串中查找子串；
>  
> 1. 最小周期：字符串长度-整个字符串的 border；
>  
> 1. 最小循环节：区别于周期，当字符串长度 $n \operatorname{mod} ( n - n x t [ n ] ) = 0$ 时，等于最小周期，否则为 $n$ 。

以最坏 $\mathcal{O} ( N + M )$ 的时间计算 $t$ 在 $s$ 中出现的全部位置。

<<< @/snippets/code/串/kmp.cpp

<<< @/snippets/code/串/kmp-2.cpp
