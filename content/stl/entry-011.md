---
title: "特殊函数next和prev详解："
order: 110
---

# 特殊函数 `next` 和 `prev` 详解： {#s-543f25d7e68c}

不修改原迭代器，返回前进/后退 $n$ 步的副本。`list` 等没有 `+`，用这两个。

**边界：** `prev(it, k)` / `next(it, k)` 返回移动后的副本，默认 `k = 1`；不能越过合法迭代器范围。调用 `prev(lower_bound(x))` 前须保证结果不是 `begin()`，读取最后一个元素前须保证容器非空。

```cpp
auto it = s.find(x);
prev(it);
next(it);
prev(it, 2);
next(it, 2);

auto pre = prev(s.lower_bound(x));
int ed = *prev(S.end(), 1);
```
