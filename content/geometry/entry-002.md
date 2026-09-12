---
title: "库实数类实现(双精度)"
order: 20
---

# 库实数类实现 (双精度) {#s-fbd8633729cd}

用 `std::complex` 表示二维点与向量，可通过共轭乘积计算点积和叉积。下方还列出自定义 `Point` 版本，两套类型及运算函数分别使用，整数坐标须考虑乘积范围。

**类型：** 整点实现默认 `Real = int`，叉积等中间结果较大时使用 `i64`。`complex` 与自定义 `Point.x/y` 是不同实现，选择一套配套函数使用。

<<< @/snippets/inline/geometry/entry-002-63.cpp
