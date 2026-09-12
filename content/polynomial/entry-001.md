---
title: "线性凸包"
order: 10
---

# 线性凸包 {#s-7d9d1c4c1d38}

斜率优化 / 下凸壳维护直线 $y = a x + b$，查询 $\text{min}_{i} a x + b$。构造时按斜率排序并弹出不优直线；`min(x)` 二分交点。`i64`，除法向 $- \infty$ 取整。不是几何凸包。

<<< @/snippets/code/多项式/线性凸包.cpp
