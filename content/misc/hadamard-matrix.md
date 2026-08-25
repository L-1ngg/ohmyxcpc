---
title: 阿达马矩阵
order: 6
---

# 阿达马矩阵

构造题用，其有一些性质：将 $0$ 看作 $-1$；$1$ 看作 $+1$，整个矩阵可以构成一个 $2^k$ 维向量组，任意两个行、列向量的点积均为 $0$ [See](https://codeforces.com/contest/610/problem/C)。例如，在 $k=2$ 时行向量 $\vec{2}$ 和行向量 $\vec{3}$ 的点积为 $1\cdot1+(-1)\cdot1+1\cdot(-1)+(-1)\cdot(-1)=0$ 。

![image.png](https://s2.loli.net/2023/10/02/hZu2aCfNcivB6jw.png)

```cpp
int n;
cin >> n;
int N = pow(2, n);
vector ans(N, vector<int>(N));
ans[0][0] = 1;
for (int t = 0; t < n; t++) {
    int m = pow(2, t);
    for (int i = 0; i < m; i++) {
        for (int j = m; j < 2 * m; j++) {
            ans[i][j] = ans[i][j - m];
        }
    }
    for (int i = m; i < 2 * m; i++) {
        for (int j = 0; j < m; j++) {
            ans[i][j] = ans[i - m][j];
        }
    }
    for (int i = m; i < 2 * m; i++) {
        for (int j = m; j < 2 * m; j++) {
            ans[i][j] = 1 - ans[i - m][j - m];
        }
    }
}
```
