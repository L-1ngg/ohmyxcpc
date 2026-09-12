---
title: "求解连续按位异或"
order: 240
---

# 求解连续按位异或 {#s-12d01ac4260d}

两段等价：$0 \oplus 1 \oplus \ldots \oplus n$ 按 $n \operatorname{mod} 4$ 分类取 $n , 1 , n + 1 , 0$。复杂度 $\mathcal{O} ( 1 )$。第一版用位运算技巧，第二版直观。

```cpp
unsigned xor_n(unsigned n) {
    unsigned t = n & 3;
    if (t & 1) return t / 2u ^ 1;
    return t / 2u ^ n;
}
```

<<< @/snippets/code/数论/求解连续按位异或.cpp
