---
title: 求解连续按位异或
order: 18
---

# 求解连续按位异或

以 $\mathcal O(1)$ 复杂度计算 $0\oplus1\oplus\dots\oplus n$ 。

```cpp
unsigned xor_n(unsigned n) {
    unsigned t = n & 3;
    if (t & 1) return t / 2u ^ 1;
    return t / 2u ^ n;
}
```

```cpp
i64 xor_n(i64 n) {
    if (n % 4 == 1) return 1;
    else if (n % 4 == 2) return n + 1;
    else if (n % 4 == 3) return 0;
    else return n;
}
```
