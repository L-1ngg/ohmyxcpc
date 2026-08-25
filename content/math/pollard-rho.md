---
title: Pollard-Rho 因式分解
order: 27
---

# Pollard-Rho 因式分解

以单个因子 $\mathcal O (\log X)$ 的复杂度输出数字 $X$ 的全部质因数，由于需要结合素数测试，总复杂度会略高一些。如果遇到超时的情况，可能需要考虑进一步优化，例如检查题目是否强制要求枚举全部质因数等等。此外，还有一个[较长的模板](https://www.luogu.com.cn/record/114757731)可供参考，比这里记录的版本常数小约五倍。

```cpp
int PR(int n) {
    for (int p : B) {
        if (n % p == 0) return p;
    }
    auto f = [&](int x) -> int {
        x = mul(x, x, n) + 1;
        return x >= n ? x - n : x;
    };
    int x = 0, y = 0, tot = 0, p = 1, q, g;
    for (int i = 0; (i & 255) || (g = gcd(p, n)) == 1; i++, x = f(x), y = f(f(y))) {
        if (x == y) {
            x = tot++;
            y = f(x);
        }
        q = mul(p, abs(x - y), n);
        if (q) p = q;
    }
    return g;
}
vector<int> fac(int n) {
    #define pb emplace_back
    if (n == 1) return {};
    if (MR(n)) return {n};
    int d = PR(n);
    auto v1 = fac(d), v2 = fac(n / d);
    auto i1 = v1.begin(), i2 = v2.begin();
    vector<int> ans;
    while (i1 != v1.end() || i2 != v2.end()) {
        if (i1 == v1.end()) {
            ans.pb(*i2++);
        } else if (i2 == v2.end()) {
            ans.pb(*i1++);
        } else {
            if (*i1 < *i2) {
                ans.pb(*i1++);
            } else {
                ans.pb(*i2++);
            }
        }
    }
    return ans;
}
```

> [!NOTE]
> 代码中的 `mul`、`MR`、`B` 见 [Miller-Rabin 素数测试](./miller-rabin.md)。
