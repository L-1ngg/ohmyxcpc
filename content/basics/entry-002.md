---
title: "最大公约数gcd"
order: 20
---

# 最大公约数 `gcd` {#s-100ae77cf93e}

求两个整数的最大公约数，通常直接使用 `std::gcd`。辗转相除利用 $\gcd(a,b)=\gcd(b,a\bmod b)$，时间为 $O(\log\max(|a|,|b|))$；手写版本对负数的处理须看具体实现。

## 欧几里得算法 {#s-a7ef732a1a3d}

按非负整数输入使用，返回最大公约数；至少一个输入非零时结果为正。若允许负输入，优先用 `std::gcd`，并保证绝对值在类型范围内。

```cpp
inline int mygcd(int a, int b) {
    return b ? mygcd(b, a % b) : a;
}
```

## 位运算优化 {#s-244181d85ceb}

Stein：提出公共的 $2$，奇数相减代替取模。**略快于内置，卡常用。** `tz` 是后导零个数。

<<< @/snippets/code/基础算法/gcd-位运算.cpp
