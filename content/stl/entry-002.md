---
title: "bit 库与位运算函数__builtin__"
order: 20
---

# bit 库与位运算函数 \_\_builtin\_\_ {#s-016239c59353}

GCC/Clang 内建，比手写循环快。`x=0` 时 `clz/ctz` 未定义。`long long` 后缀 `ll`。

**接口：** `__builtin_popcount` 返回 1 的数量；`__builtin_ffs` 返回最低位 1 的位置（从 `1` 开始，零返回 `0`）；`__builtin_ctz` / `__builtin_clz` 返回后导 / 前导零数，输入不能为零。C++20 的 `bit_width` 接收无符号整数，零返回 `0`。64 位 GNU 内建函数使用名字带 `ll` 后缀的版本。

```cpp
unsigned int x = 8;
cout << __builtin_popcount(x) << '\n';
cout << __builtin_ffs(x) << '\n';
cout << __builtin_ctz(x) << '\n';
cout << __builtin_clz(x) << '\n';
cout << bit_width(x) << '\n';
```

注：以上函数为 GCC/Clang 内建，`long long` 版本只需在函数名后加 `ll`（如 `__builtin_popcountll(x)`），`unsigned long long` 加 `ull`；`bit_width` 为 C++20 标准库函数。
