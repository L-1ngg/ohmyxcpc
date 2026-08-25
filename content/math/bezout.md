---
title: 裴蜀定理
order: 8
---

# 裴蜀定理

> $ax+by=c\ (x \in \mathbf{Z}^*,y \in \mathbf{Z}^*)$ 成立的充要条件是 $\gcd(a, b) \mid c$（ $\mathbf{Z}^*$ 表示正整数集）。

## 逆定理

设 $a, b$ 是不全为零的整数，若 $d > 0$ 是 $a, b$ 的公因数，且存在整数 $x, y$, 使得 $ax+by=d$，则 $d = \gcd(a, b)$。

特殊地，设 $a, b$ 是不全为零的整数，若存在整数 $x, y$, 使得 $ax+by=1$，则 $a, b$ 互质。

## 多个整数

裴蜀定理可以推广到 $n$ 个整数的情形：设 $a_1, a_2, \dots, a_n$ 是不全为零的整数，则存在整数 $x_1, x_2, \dots, x_n$, 使得 $a_1 x_1 + a_2 x_2 + \cdots + a_n x_n=\gcd(a_1, a_2, \dots, a_n)$。其逆定理也成立：设 $a_1, a_2, \dots, a_n$ 是不全为零的整数，$d > 0$ 是 $a_1, a_2, \dots, a_n$ 的公因数，若存在整数 $x_1, x_2, \dots, x_n$, 使得 $a_1 x_1 + a_2 x_2 + \cdots + a_n x_n=d$，则 $d = \gcd(a_1, a_2, \dots, a_n)$。

例题：给定一个序列 $a$，找到一个序列 $x$，使得 $\sum_{i = 1}^n a_ix_i$ 最小。

```cpp
LL n, a, ans;
LL gcd(LL a, LL b){
    return b ? gcd(b, a % b) : a;
}
int main(){
    cin >> n;
    for (int i = 0; i < n; i ++ ){
        cin >> a;
        if (a < 0) a = -a;
        ans = gcd(ans, a);
    }
    cout << ans << "\n";
    return 0;
}
```
