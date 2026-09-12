---
title: "Lasker’s-Nim 游戏(Multi-SG 游戏)"
order: 100
---

# Lasker’s-Nim 游戏 (Multi-SG 游戏) {#s-9413d9cc73c1}

可拆堆的 Nim，每堆套下面公式求 SG 再异或，不必再搜。

> 有 $N$ 堆石子，给出每一堆的石子数量，两名玩家轮流行动，每人每次任选以下规定的一种操作石子：
>
>
> - 任选一堆，取走正整数颗石子；
>
> - 任选数量大于 $2$ 的一堆，分成两堆非空石子。
>
>
> 拿到最后一颗石子的一方获胜。双方均采用最优策略，询问谁会获胜。

**本题使用 SG 函数求解，SG 值定义为：**

$$
\mathbf{S G ( x ) = \begin{cases}x - 1 & \quad x \operatorname{mod} 4 = 0 \\ x & \quad x \operatorname{mod} 4 = 1 \\ x & \quad x \operatorname{mod} 4 = 2 \\ x + 1 & \quad x \operatorname{mod} 4 = 3\end{cases}}
$$
