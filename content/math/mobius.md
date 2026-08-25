---
title: 莫比乌斯反演
order: 24
---

# 莫比乌斯反演

莫比乌斯函数定义：$\displaystyle {\mu(n) = \begin{cases} 1 &n = 1 \\ (-1)^k &n = \prod_{i = 1}^k p_i \text{ 且 } p_i \text{ 互质 } \\ 0 &else \end{cases}}$ 。

> 莫比乌斯函数性质：对于任意正整数 $n$ 满足 $\displaystyle {\sum_{d|n}\mu(d) = \begin{cases} 1 & n = 1 \\ 0 & n \neq 1\end{cases}}$ ；$\displaystyle {\sum_{d|n} \frac{\mu(d)}{d} = \frac{\varphi(n)}{n}}$ 。

莫比乌斯反演定义：定义：$F(n)$ 和 $f(n)$ 是定义在非负整数集合上的两个函数，并且满足 $\displaystyle F(n) = \sum_{d|n}f(d)$ ，可得 $\displaystyle f(n) = \sum_{d|n}\mu(d)F(\left \lfloor \frac{n}{d} \right \rfloor)$ 。

```cpp
const int N = 5e4 + 10;
bool st[N];
int mu[N], prime[N], cnt, sum[N];
void getMu() {
    mu[1] = 1;
    for (int i = 2; i <= N - 10; i++) {
        if (!st[i]) {
            prime[++cnt] = i;
            mu[i] = -1;
        }
        for (int j = 1; j <= cnt && i * prime[j] <= N - 10; j++) {
            st[i * prime[j]] = true;
            if (i % prime[j] == 0) {
                mu[i * prime[j]] = 0;
                break;
            }
            mu[i * prime[j]] = -mu[i];
        }
    }
    for (int i = 1; i <= N - 10; i++) {
        sum[i] = sum[i - 1] + mu[i];
    }
}
void solve() {
    int n, m, k; cin >> n >> m >> k;
    n = n / k, m = m / k;
    if (n < m) swap(n, m);
    LL ans = 0;
    for (int i = 1, j = 0; i <= m; i = j + 1) {
        j = min(n / (n / i), m / (m / i));
        ans += (LL)(sum[j] - sum[i - 1]) * (n / i) * (m / i);
    }
    cout << ans << "\n";
}
int main() {
    getMu();
    int T; cin >> T;
    while (T--) solve();
}
```
