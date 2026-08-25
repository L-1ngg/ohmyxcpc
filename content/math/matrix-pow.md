---
title: 矩阵快速幂
order: 22
---

# 矩阵快速幂

以 $\mathcal O(N^3\log M)$ 的复杂度计算。

```cpp
const int N = 40;
using mat = std::array<std::array<i64, N + 1>, N + 1>;
mat operator*(const mat& a, const mat& b) {
    mat ans{};
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            for (int k = 1; k <= N; k++)
                ans[i][j] = (ans[i][j] + a[i][k] * b[k][j]) % mod;
        }
    }
    return ans;
}

mat MatPow(mat a, i64 b) {
    mat ans{};
    for (int i = 1;i <= N;i++) ans[i][i] = 1;
    while (b) {
        if (b & 1) ans = ans * a;
        b >>= 1;
        a = a * a;
    }
    return ans;
}
```
