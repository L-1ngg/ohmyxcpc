---
title: "基于状压的线性 RMQ 算法"
order: 10
---

# 基于状压的线性 RMQ 算法 {#s-64411a7afe26}

严格 $\mathcal{O} ( N )$ 预处理，$\mathcal{O} ( 1 )$ 查询。查询区间为**左闭右开 $[ l , r )$**，仅支持静态数组；`T` 需可用 `cmp` 比较（默认 `less<T>`，取区间最大改为 `greater<T>`）。

<<< @/snippets/code/数据结构B/基于状压的线性-RMQ-算法.cpp
