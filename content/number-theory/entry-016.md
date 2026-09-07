---
title: "扩展欧几里得 exgcd"
order: 160
---

# 扩展欧几里得 exgcd {#s-8218faee6685}

  与欧几里得同一递归，回溯时 $x \prime = y , y \prime = x - ( a / b ) y$ 还原系数。返回 $\text{gcd}$；$a x + b y = c$ 有解当且仅当 $\text{gcd} \mid c$，通解 $x \pm b / d$、$y \mp a / d$。

<<< @/snippets/code/数论/扩展欧几里得-exgcd.cpp

例题：求解二元一次不定方程 $A \cdot x + B \cdot y = C$ 的正整数解个数。

<<< @/snippets/code/数论/扩展欧几里得-exgcd-2.cpp
