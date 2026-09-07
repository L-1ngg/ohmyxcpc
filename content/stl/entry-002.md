---
title: "bit 库与位运算函数__builtin__"
order: 20
---

# bit 库与位运算函数 \_\_builtin\_\_ {#s-016239c59353}

  GCC/Clang 内建，比手写循环快。`x=0` 时 `clz/ctz` 未定义。`long long` 后缀 `ll`。

```cpp
__builtin_popcount(x)  // 返回x二进制下含1的数量，例如x=15=(1111)时答案为4
__builtin_ffs(x) // 返回x右数第一个1的位置(1-idx)，1(1) 返回 1，8(1000) 返回 4，26(11010) 返回 2
__builtin_ctz(x) // 返回x二进制下后导0的个数，1(1) 返回 0，8(1000) 返回 3
__builtin_clz(x) // 返回x二进制下前导0的个数，8(1000) 返回 28；x为0时未定义
bit_width(x)  // 返回x二进制下的位数，9(1001) 返回 4，26(11010) 返回 5
```

注：以上函数为 GCC/Clang 内建，`long long` 版本只需在函数名后加 `ll`（如 `__builtin_popcountll(x)`），`unsigned long long` 加 `ull`；`bit_width` 为 C++20 标准库函数。
