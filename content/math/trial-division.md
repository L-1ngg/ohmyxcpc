---
title: 试除法判定质数
order: 16
---

# 试除法判定质数

## 标准解

$\mathcal O(\sqrt N)$ 。

```cpp
bool is_prime(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= n / i; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

## 常数优化法

常数优化，达到 $\mathcal O(\frac {\sqrt N}{3})$ 。

```cpp
bool is_prime(int n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 6 != 1 && n % 6 != 5) return false;
    for (int i = 5, j = n / i; i <= j; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}
```
