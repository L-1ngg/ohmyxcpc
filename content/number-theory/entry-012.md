---
title: "防爆模乘"
order: 120
---

# 防爆模乘 {#s-92cbf43b5011}

计算大整数范围的 `a * b % m`，避免在取模前溢出。目标平台支持时优先用 `__int128` 保存中间乘积；倍增法按位累加，浮点估商法则依赖 `long double` 的实际精度。要求模数为正，并按版本约定归一化输入。

- x86 上 `long double` 为 80 位，`mul` 对 $< 10^{18}$ 正确；

- ARM / MSVC 上 `long double` 退化为 64 位 double，**会出错**，此时只能用 int128 版。

## 借助浮点数实现 {#s-eb903ce85ad3}

$\mathcal{O} ( 1 )$ 计算 $a \cdot b \operatorname{mod} m$，常数比 int128 法小很多。其中 $1 \le a , b , m \le 10^{18}$。

```cpp
using i64 = long long;
i64 mul(i64 a, i64 b, i64 m) {
    i64 r = a * b - m * (i64)(1.L / m * a * b);
    return r - m * (r >= m) + m * (r < 0);
}
```

## 借助 int128 实现 {#s-d5e76bacc1c6}

`(__int128)a * b % m`，语义就是普通模乘。Linux / gcc 有 `__int128`，MSVC 没有。优先用这个。

```cpp
using i64 = long long;
i64 mul(i64 a, i64 b, i64 m) {
    return (i64)((__int128)a * b % m);
}
```
