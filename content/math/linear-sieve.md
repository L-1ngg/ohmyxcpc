---
title: 欧拉筛（线性筛）
order: 5
---

# 欧拉筛（线性筛）

时间复杂度为 $\mathcal{O}(N\log\log N)$ 。

```cpp
vector<int> prime; // 这里储存筛出来的全部质数
auto euler_Prime = [&](int n) -> void {
    vector<int> v(n + 1);
    for (int i = 2; i <= n; ++i) {
        if (!v[i]) {
            v[i] = i;
            prime.push_back(i);
        }
        for (int j = 0; j < prime.size(); ++j) {
            if (prime[j] > v[i] || prime[j] > n / i) break;
            v[i * prime[j]] = prime[j];
        }
    }
};
```

## 最小质因数

```cpp
std::vector<int> minp, primes;

void sieve(int n) {
    minp.assign(n + 1, 0);
    primes.clear();

    for (int i = 2; i <= n; i++) {
        if (minp[i] == 0) {
            minp[i] = i;
            primes.push_back(i);
        }

        for (auto p : primes) {
            if (i * p > n) {
                break;
            }
            minp[i * p] = p;
            if (p == minp[i]) {
                break;
            }
        }
    }
}
```
