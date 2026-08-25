---
title: 斐波那契博弈
order: 5
---

# 斐波那契博弈

> 有一堆石子，数量为 $N$ ，两名玩家轮流行动，按以下规则取石子：
>
> 先手第 1 次可以取任意多颗，但不能全部取完，此后每人取的石子数不能超过上个人的两倍，拿到最后一颗石子的一方获胜。
>
> 双方均采用最优策略，询问谁会获胜。

当且仅当 $N$ 为斐波那契数时先手必败。

```cpp
int fib[100] = {1, 2};
map<int, bool> mp;
void Force() {
  for (int i = 2; i <= 86; ++ i) fib[i] = fib[i - 1] + fib[i - 2];
    for (int i = 0; i <= 86; ++ i) mp[fib[i]] = 1;
}
void Solve() {
    int n; cin >> n;
    if (mp[n] == 1) cout << "lose\n";
    else cout << "win\n";
}
```
