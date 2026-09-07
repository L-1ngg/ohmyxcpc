---
title: "试除法判是否是质数"
order: 220
---

# 试除法判是否是质数 {#s-ad05d835a0e7}

  试到 $\sqrt{n}$ 即可：有因数则必有一个 $\le \sqrt{n}$。$n < 2$ 不是质数。大批量改用筛。

## 标准解 {#s-9be8daadc130}

  $\mathcal{O} ( \sqrt{N} )$。循环写 `i <= n / i` 防溢出。

<<< @/snippets/code/数论/标准解.cpp

## 常数优化法 {#s-a192c2afa9ac}

  常数优化，达到 $\mathcal{O} ( \frac{\sqrt{N}}{3} )$ 。

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
