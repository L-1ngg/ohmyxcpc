---
title: 快速数论变换 NTT
order: 206
---

# 快速数论变换 NTT

$\mathcal O(N\log N)$ 。

```cpp
struct Polynomial {
    vector<Z> z;
    vector<int> r;
    Polynomial(vector<int> &a) {
        int n = a.size();
        z.resize(n);
        r.resize(n);
        for (int i = 0; i < n; i++) {
            z[i] = a[i];
            r[i] = (i & 1) * (n / 2) + r[i / 2] / 2;
        }
        ntt(z, n, 1);
    }
    LL power(LL a, int b) {
        LL res = 1;
        for (; b; b /= 2, a = a * a % mod) {
            if (b % 2) {
                res = res * a % mod;
            }
        }
        return res;
    }
    void ntt(vector<Z> &a, int n, int opt) {
        for (int i = 0; i < n; i++) {
            if (r[i] < i) {
                swap(a[i], a[r[i]]);
            }
        }
        for (int k = 2; k <= n; k *= 2) {
            Z gn = power(3, (mod - 1) / k);
            for (int i = 0; i < n; i += k) {
                Z g = 1;
                for (int j = 0; j < k / 2; j++, g *= gn) {
                    Z t = a[i + j + k / 2] * g;
                    a[i + j + k / 2] = a[i + j] - t;
                    a[i + j] = a[i + j] + t;
                }
            }
        }
        if (opt == -1) {
            reverse(a.begin() + 1, a.end());
            Z inv = power(n, mod - 2);
            for (int i = 0; i < n; i++) {
                a[i] *= inv;
            }
        }
    }
};
```

需要注意的是，最后答案要除以做 DFT/IDFT 的长度，而且做 DFT/IDFT 的长度要一样且是 2 的整数次幂。还有就是做高精度乘法的时候要记得把数组反向。如果 TLE 了可以考虑一些常数优化。

```cpp
constexpr i64 mod = 998244353, g = 3;
i64 qpow(i64 a, i64 b) {
    i64 r = 1;
    for (; b; b >>= 1, a = a * a % mod) {
        if (b & 1) r = r * a % mod;
    }
    return r;
}
std::vector<i64> mul(std::vector<i64> a, std::vector<i64> b) {
    int M = a.size() + b.size() - 1u, N = 1;
    while (N < M) N <<= 1;
    std::vector<int> r(N);
    for(int i = 1;i <= N;i++)
        r[i] = r[i / 2] / 2 | (i % 2 ? N / 2 : 0);

    auto ntt = [&](std::vector<i64> &a, bool inv) -> void {
        a.resize(N);
        for(int i = 0;i < N;i++) if (i < r[i]) std::swap(a[i], a[r[i]]);
        for (int sz = 1; sz < N; sz <<= 1) {
            i64 wm = qpow(inv ? g : qpow(g, mod - 2), (mod - 1) / sz / 2);
            for (int i = 0; i < N; i += sz * 2) {
                for (int k = 0, w = 1; k < sz; ++k, w = w * wm % mod) {
                    i64 &x = a[i + k + sz], &y = a[i + k], t = w * x % mod;
                    std::tie(x, y) = pair((y + mod - t) % mod, (y + t) % mod);
                }
            }
        }
        if (i64 in = qpow(N, mod - 2); inv) for(int i = 0;i < N;i++) a[i] = a[i] * in % mod;
    };

    ntt(a, 0);
    ntt(b, 0);
    for(int i = 0;i < N;i++) a[i] = a[i] * b[i] % mod;
    ntt(a, 1);
    a.resize(M);
    return a;
}
```
