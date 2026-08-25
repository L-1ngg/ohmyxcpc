---
title: 幻方
order: 7
---

# 幻方

构造题用，其有一些性质（保证 $N$ 为奇数）：$1$ 到 $N^2$ 每个数字恰好使用一次，且每行、每列及两条对角线上的数字之和都相同，且为奇数 [See](https://codeforces.com/contest/710/problem/C) 。

构造方式：将 $1$ 写在第一行的中间，随后不断向右上角位置填下一个数字，直到填满。

<img src="https://s2.loli.net/2023/10/07/K79vJbTYShMj2GX.png" alt="image.png" style="zoom:70%;" />

```cpp
int n;
cin >> n;
int x = 1, y = (n + 1) / 2;
vector ans(n + 1, vector<int>(n + 1));
for (int i = 1; i <= n * n; i++) {
    ans[x][y] = i;
    if (!ans[(x - 2 + n) % n + 1][y % n + 1]){
        x = (x - 2 + n) % n + 1;
        y = y % n + 1;
    } else {
        x = x % n + 1;
    }
}
```
