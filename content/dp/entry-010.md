---
title: "数位 DP"
order: 100
---

# 数位 DP {#s-cf71e4d2a6a3}

  从高位往低位填。`limit` 表示是否还贴着上界，`zero` 表示是否仍是前导零。无限制且无前导零才能记记忆化。区间 $[ l , r ]$ 用 $f ( r ) - f ( l - 1 )$。

下方第一个板子统计 $[ 0 , x ]$ 中数字 $d$ 出现的次数（`solve(r, d) - solve(l - 1, d)` 即区间计数）。第二个板子统计 $\le n$ 的数中”数位和能整除该数”的个数：枚举可能的数位和 `mod`（$\le 9 \cdot l e n$），每趟记录 `(余数, 当前数位和)` 两维。

<<< @/snippets/code/动态规划/数位-DP.cpp

<<< @/snippets/inline/dp/entry-010-42.cpp
