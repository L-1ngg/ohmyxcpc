---
title: "累加 accumulate"
order: 90
---

# 累加 accumulate {#s-721e6c879bb0}

`accumulate(l, r, init)` 从 `init` 起累加（或传入二元运算）。初值类型决定结果类型，64 位求和用 `i64{0}`。

**结果：** 示例返回 `x` 加上数组半开区间 `[start, end)` 的元素和；累计类型由 `x` 决定，64 位求和可使用 `i64{0}` 作为初值。

```cpp
cout << accumulate(a + start, a + end, x);
```
