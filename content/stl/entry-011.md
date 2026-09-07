---
title: "特殊函数next和prev详解："
order: 110
---

# 特殊函数 `next` 和 `prev` 详解： {#s-543f25d7e68c}

  不修改原迭代器，返回前进/后退 $n$ 步的副本。`list` 等没有 `+`，用这两个。

```cpp
auto it = s.find(x);  // 建立一个迭代器
prev(it); // 返回迭代器it的前一个迭代器
next(it); // 返回迭代器it的后一个迭代器
prev(it, 2); // 可选参数k：返回it前k个的迭代器
next(it, 2); // 返回it后k个的迭代器

/* 以下是一些应用 */
auto pre = prev(s.lower_bound(x));  // 返回第一个<x的迭代器
int ed = *prev(S.end(), 1);  // 返回最后一个元素
```
