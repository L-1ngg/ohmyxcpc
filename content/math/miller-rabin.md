---
title: Miller-Rabin 素数测试
order: 26
---

# Miller-Rabin 素数测试

以平均 $\mathcal O (4\cdot \log^3X)$ 的复杂度判定数字 $X$ 是否是素数，这里记录的版本复杂度非常优秀，基本可以看作是 $\mathcal O(1)$ 。

```cpp
int mul(int a, int b, int m) {
    int r = a * b - m * (int)(1.L / m * a * b);
    return r - m * (r >= m) + m * (r < 0);
}
int mypow(int a, int b, int m) {
    int res = 1 % m;
    for (; b; b >>= 1, a = mul(a, a, m)) {
        if (b & 1) {
            res = mul(res, a, m);
        }
    }
    return res;
}

int B[] = {2, 3, 5, 7, 11, 13, 17, 19, 23};
bool MR(int n) {
    if (n <= 1) return 0;
    for (int p : B) {
        if (n == p) return 1;
        if (n % p == 0) return 0;
    }
    int m = (n - 1) >> __builtin_ctz(n - 1);
    for (int p : B) {
        int t = m, a = mypow(p, m, n);
        while (t != n - 1 && a != 1 && a != n - 1) {
            a = mul(a, a, n);
            t *= 2;
        }
        if (a != n - 1 && t % 2 == 0) return 0;
    }
    return 1;
}
```
