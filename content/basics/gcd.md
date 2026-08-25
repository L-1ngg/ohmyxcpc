---
title: 最大公约数 GCD
order: 2
---

# 最大公约数 GCD

## 欧几里得算法

**速度不如内置函数！** 以 $\mathcal O(\log(a+b))$ 的复杂度求解最大公约数。与内置函数 `std::gcd` 功能基本相同（支持 $a,b \leq 0$ ）。

```cpp
int mygcd(int a, int b)
{
    return b ? std::gcd(b, a % b) : a;
}
```

## 位运算优化

**略快于内置函数，用于卡常。**

```cpp
i64 gcd(i64 a, i64 b) // 卡常 gcd！！
{
    #define tz __builtin_ctzll
    if (!a || !b) return a | b;
    int t = tz(a | b);
    a >>= tz(a);
    while (b) {
        b >>= tz(b);
        if (a > b) std::swap(a, b);
        b -= a;
    }
    return a << t;
    #undef tz
}
```
