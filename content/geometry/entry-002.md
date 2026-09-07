---
title: "库实数类实现(双精度)"
order: 20
---

# 库实数类实现 (双精度) {#s-fbd8633729cd}

  上半用 `std::complex`，`Real = int` 只适于整点（叉积会溢出就改 `long long`）。下半按 `.x/.y` 写，与 `complex` 不是同一种类型，**两套 `cross/dot` 不能同时编译**（重定义），按题目留一套。

<<< @/snippets/inline/geometry/entry-002-63.cpp
