---
title: SG 博弈
order: 3
---

# SG 博弈

## SG 游戏（有向图游戏）

我们使用以下几条规则来定义暴力求解的过程：

- 使用数字来表示输赢情况，$0$ 代表局面必败，非 $0$ 代表**存在必胜可能**，我们称这个数字为这个局面的 SG 值；
- 找到最终态，根据题意人为定义最终态的输赢情况；
- 对于非最终态的某个节点，其 SG 值为所有子节点的 SG 值取 $\tt{}mex$ ；
- 单个游戏的输赢态即对应根节点的 SG 值是否为 $0$ ，为 $0$ 代表先手必败，非 $0$ 代表先手必胜；
- 多个游戏的总 SG 值为单个游戏 SG 值的异或和。

使用哈希表，以 $\mathcal{O} (N + M)$ 的复杂度计算。

```cpp
int n, m, a[N], num[N];
int sg(int x) {
    if (num[x] != -1) return num[x];

    unordered_set<int> S;
    for (int i = 1; i <= m; ++ i)
        if(x >= a[i])
            S.insert(sg(x - a[i]));

    for (int i = 0; ; ++ i)
        if (S.count(i) == 0)
            return num[x] = i;
}
void Solve() {
    cin >> m;
    for (int i = 1; i <= m; ++ i) cin >> a[i];
    cin >> n;

    int ans = 0; memset(num, -1, sizeof num);
    for (int i = 1; i <= n; ++ i) {
        int x; cin >> x;
        ans ^= sg(x);
    }

    if (ans == 0) no;
    else yes;
}
```

## Anti-SG 游戏（反 SG 游戏）

SG 游戏中最先不能行动的一方获胜。

**以下局面先手必胜：**

- **单局游戏的 SG 值均不超过** $\pmb 1$ **，且总 SG 值为** $\pmb 0$；
- **至少有一局单局游戏的 SG 值大于** $\pmb 1$ **，且总 SG 值不为** $\pmb 0$ 。

在本质上，这与 Anti-Nim 游戏的结论一致。

## Lasker's-Nim 游戏（Multi-SG 游戏）

> 有 $N$ 堆石子，给出每一堆的石子数量，两名玩家轮流行动，每人每次任选以下规定的一种操作石子：
>
> - 任选一堆，取走正整数颗石子；
> - 任选数量大于 $2$ 的一堆，分成两堆非空石子。
>
> 拿到最后一颗石子的一方获胜。双方均采用最优策略，询问谁会获胜。

**本题使用 SG 函数求解，SG 值定义为：**

$$
\pmb{ SG(x) =
\begin{cases}
x-1 & \text{ , } x\mod 4= 0\\
x & \text{ , } x \mod 4 = 1\\
x & \text{ , } x \mod 4 = 2\\
x+1 & \text{ , } x \mod 4 = 3
\end{cases}}
$$

## Every-SG 游戏

> 给出一个有向无环图，其中 $K$ 个顶点上放置了石子，两名玩家轮流行动，按以下规则操作石子：
>
> 移动图上所有还能够移动的石子；
>
> 无法移动石子的一方出局。双方均采用最优策略，询问谁会获胜。

定义 $step$ 为某一局游戏至多需要经过的回合数。

**以下局面先手必胜：**$\pmb{step}$ **为奇数** 。
