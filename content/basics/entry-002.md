---
title: "最大公约数gcd"
order: 20
---

# 最大公约数 `gcd` {#s-100ae77cf93e}

  $\text{gcd} ( a , b ) = \text{gcd} ( b , a \operatorname{mod} b )$，辗转到 $0$。$\mathcal{O} ( \text{log} ( a + b ) )$。日常用 `std::gcd`；卡常用二进制版（先剥公因子 $2$，再减）。

## 欧几里得算法 {#s-a7ef732a1a3d}

  **速度不如内置函数！** 以 $\mathcal{O} ( \text{log} ( a + b ) )$ 的复杂度求解最大公约数。与内置函数 `__gcd` 功能基本相同（支持 $a , b \le 0$ ）。

```cpp
inline int mygcd(int a, int b) {  // 手写欧几里得，与 std::gcd 等价
    return b ? mygcd(b, a % b) : a;
}
```

## 位运算优化 {#s-244181d85ceb}

  Stein：提出公共的 $2$，奇数相减代替取模。**略快于内置，卡常用。** `tz` 是后导零个数。

<<< @/snippets/code/基础算法/gcd-位运算.cpp
