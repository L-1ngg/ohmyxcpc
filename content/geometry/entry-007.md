---
title: "平面三角形相关(浮点数处理)"
order: 70
---

# 平面三角形相关 (浮点数处理) {#s-84882d1e3f1e}

面积 $\vert A B \times A C \vert / 2$。外心：三边中垂线交点；内心：角平分线，到三边等距；垂心：高线交点。退化（共线）时这些心无定义。

## 三角形面积 {#s-bf638108b45c}

$\vert A B \times A C \vert / 2$。有向面积保留符号。

```cpp
ld area(Point<ld> a, Point<ld> b, Point<ld> c) {
    return abs(cross(b, c, a)) / 2;
}
```

## 三角形外心 {#s-df751ac71bb0}

三角形外接圆的圆心，即三角形三边垂直平分线的交点。

```cpp
template <typename T> Pt center1(Pt p1, Pt p2, Pt p3) {
    return lineIntersection(midSegment({p1, p2}), midSegment({p2, p3}));
}
```

## 三角形内心 {#s-c2037df877a0}

三角形内切圆的圆心，也是三角形三个内角的角平分线的交点。其到三角形三边的距离相等。`#define atan2(p)` 会污染库函数，用完注意作用域。两角平分线夹角可能跨过 $\pm \pi$ 接缝，极端数据优先用边权公式 $I = ( a A + b B + c C ) / ( a + b + c )$。

**约定：** `atan2` 的参数顺序是 `(y, x)`，角平分线使用弧度计算。

<<< @/snippets/code/二维几何/三角形内心.cpp

## 三角形垂心 {#s-503f9b4b584c}

三角形的三条高线所在直线的交点。锐角三角形的垂心在三角形内；直角三角形的垂心在直角顶点上；钝角三角形的垂心在三角形外。

```cpp
Pd center3(Pd p1, Pd p2, Pd p3) {
    Ld U = {p1, p1 + rotate(p2, p3)};
    Ld V = {p2, p2 + rotate(p1, p3)};
    return lineIntersection(U, V);
}
```
