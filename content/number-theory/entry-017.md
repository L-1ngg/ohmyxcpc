---
title: "类欧几里得"
order: 170
---

# 类欧几里得 {#s-ab874b2bcca7}

  计算 $\sum_{i = 0}^{n} \lfloor \frac{a i + b}{c} \rfloor$（可扩展求 $\sum i^{k} \lfloor \cdot \rfloor$ 的若干变体）。复杂度 $\mathcal{O} ( \text{log} \text{max} ( a , c ) )$。

$$
e u c l i d e a n ( a , b , c , n ) = \sum_{i = 0}^{n} \lfloor \frac{a i + b}{c} \rfloor
$$

<<< @/snippets/code/数论/类欧几里得.cpp
