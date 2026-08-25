---
title: 库实数类实现（双精度）
order: 2
---

# 库实数类实现（双精度）

```cpp
using Real = int;
using Point = complex<Real>;

Real cross(const Point &a, const Point &b) {
    return (conj(a) * b).imag();
}
Real dot(const Point &a, const Point &b) {
    return (conj(a) * b).real();
}

Real cross(const Point &a, const Point &b) {
    return a.x * b.y - a.y * b.x;
}
Real dot(const Point &a, const Point &b) {
    return a.x * b.x + a.y * b.y;
}
```
