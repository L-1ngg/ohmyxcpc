---
title: 整除分块
order: 25
---

# 整除分块

$\displaystyle \left\lfloor \frac{n}{l} \right\rfloor = \left\lfloor \frac{n}{l + 1} \right\rfloor = ... = \left\lfloor \frac{n}{r} \right\rfloor \iff \left\lfloor \frac{n}{l} \right\rfloor \le \frac{n}{r} < \left\lfloor \frac{n}{l} \right\rfloor + 1$ ，根据不等式左侧，得到 $\displaystyle r \le \left\lfloor \frac{n}{\lfloor \frac{n}{l} \rfloor} \right\rfloor$ 。

```cpp
void solve() {
    LL n; cin >> n;
    LL ans = 0;
    for (LL i = 1, j; i <= n; i = j + 1) {
        j = n / (n / i);
        ans += (LL)(j - i + 1) * (n / i);
    }
    cout << ans << "\n";
}
int main() {
    int T; cin >> T;
    while (T--) solve();
}
```
