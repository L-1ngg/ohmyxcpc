---
title: 防爆模乘
order: 6
---

# 防爆模乘

## 借助浮点数实现

以 $\mathcal O(1)$ 计算 $a\cdot b\bmod p$ ，由于不取模，常数比 int128 法小很多。其中 $1 \le n, k, p \le 10^{18}$ 。

```cpp
int mul(int a, int b, int m) {
    int r = a * b - m * (int)(1.L / m * a * b);
    return r - m * (r >= m) + m * (r < 0);
}
```

## 借助 int128 实现

```cpp
int mul(int a, int b, int m) {
    return (__int128)a * b % m;
}
```
