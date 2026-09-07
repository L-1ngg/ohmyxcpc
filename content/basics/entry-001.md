---
title: "常用函数"
order: 10
---

# 常用函数 {#s-760ce10e6ec0}

  赛场常写的几件：二进制快速幂、整数平方根纠偏、先除后乘的 lcm、整数 $\text{log}_{2}$、向 $\pm \infty$ 取整的除法。C++ 除法向零取整，负数区间二分必须用这里的 `floor`/`ceil`。

<<< @/snippets/code/基础算法/快速幂与常用函数.cpp

> `mypow` 的参数与累乘器是 `i64`：模数 $p \le 3 \times 10^{9}$ 时 `n * n` 不溢出；更大的模数改用 `__int128` 或数论章的防爆模乘。

<<< @/snippets/code/基础算法/log2floor.cpp

<<< @/snippets/code/基础算法/sign-取整除法.cpp
