---
title: "二维几何"
order: 150
---

# 二维几何 {#s-e86d3e9212e9}

  本章默认 `ld = long double`，`EPS = 1e-7`（文末 SMU\_inch 板子改用 `double` + `1e-9`，两套不要混）。`T` 用 `int` / `i64` 做整点，用 `ld` 做浮点。`Pd` / `Ld` 为 `Point<ld>` / `Line<ld>`，`Pi` 为 `Point<int>`；模板里的 `Pt` / `Lt` 约定为 `Point<T>` / `Line<T>`，用前自行 `using`。`sign` 返回 $- 1 / 0 / 1$。
