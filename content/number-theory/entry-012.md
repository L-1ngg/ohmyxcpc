---
title: "防爆模乘"
order: 120
---

# 防爆模乘 {#s-92cbf43b5011}

  $10^{18}$ 量级的 `a * b % m` 直接乘会溢出，用二分拆开或 128 位中转。**首选 int128 版**（简单、可移植）；浮点版不依赖 `__int128` 且常数小，但依赖平台 `long double` 的精度：

- x86 上 `long double` 为 80 位，`mul` 对 $< 10^{18}$ 正确；

- ARM / MSVC 上 `long double` 退化为 64 位 double，**会出错**，此时只能用 int128 版。

## 借助浮点数实现 {#s-eb903ce85ad3}

  $\mathcal{O} ( 1 )$ 计算 $a \cdot b \operatorname{mod} m$，常数比 int128 法小很多。其中 $1 \le a , b , m \le 10^{18}$。

```cpp
LL mul(LL a, LL b, LL m) {
    LL r = a * b - m * (LL)(1.L / m * a * b);
    return r - m * (r >= m) + m * (r < 0);
}
```

## 借助 int128 实现 {#s-d5e76bacc1c6}

  `(__int128)a * b % m`，语义就是普通模乘。Linux / gcc 有 `__int128`，MSVC 没有。优先用这个。

```cpp
LL mul(LL a, LL b, LL m) {
    return (LL)((__int128)a * b % m);
}
```
