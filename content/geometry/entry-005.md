---
title: "平面点线相关"
order: 50
---

# 平面点线相关 {#s-e6e6df66180a}

叉积为 $0$ 则共线/点在直线上；符号判断左右侧。点到直线距离是叉积绝对值除以方向长。投影：沿法向落到直线上。

## 点是否在直线上（三点是否共线） {#s-3b191cad40c2}

叉积为 $0$。浮点用 `sign`。

<<< @/snippets/code/二维几何/点是否在直线上三点是否共线.cpp

## 点是否在向量（直线）左侧 {#s-dbd1f71cfa0f}

**需要注意**，向量的方向会影响答案；点在向量上时不视为在左侧。

```cpp
template <typename T> bool pointOnLineLeft(Pt p, Lt l) {
    return cross(l.b, p, l.a) > 0;
}
```

## 两点是否在直线同侧/异侧 {#s-853d805d57be}

两点对直线叉积同号则同侧，异号则异侧。

```cpp
template <typename T> bool pointOnLineSide(Pt p1, Pt p2, Lt vec) {
    T val = cross(p1, vec.a, vec.b) * cross(p2, vec.a, vec.b);
    return sign(val) == 1;
}
template <typename T> bool pointNotOnLineSide(Pt p1, Pt p2, Lt vec) {
    T val = cross(p1, vec.a, vec.b) * cross(p2, vec.a, vec.b);
    return sign(val) == -1;
}
```

## 两直线相交交点 {#s-8ccd0a743710}

参数方程求交。在使用前需要先判断直线是否平行，否则分母为 $0$。必须用浮点类型。

```cpp
Pd lineIntersection(Ld l1, Ld l2) {
    ld val = cross(l2.b - l2.a, l1.a - l2.a) / cross(l2.b - l2.a, l1.a - l1.b);
    return l1.a + (l1.b - l1.a) * val;
}
```

## 两直线是否平行/垂直/相同 {#s-25c179086b1f}

方向叉积 $0$ 平行；点积 $0$ 垂直；平行再看一点是否在另一线上即相同。

```cpp
template <typename T> bool lineParallel(Lt p1, Lt p2) {
    return sign(cross(p1.a - p1.b, p2.a - p2.b)) == 0;
}
template <typename T> bool lineVertical(Lt p1, Lt p2) {
    return sign(dot(p1.a - p1.b, p2.a - p2.b)) == 0;
}
template <typename T> bool same(Line<T> l1, Line<T> l2) {
    return lineParallel(Line{l1.a, l2.b}, {l1.b, l2.a}) &&
           lineParallel(Line{l1.a, l2.a}, {l1.b, l2.b}) && lineParallel(l1, l2);
}
```

## 点到直线的最近距离与最近点 {#s-760652586d9a}

垂足。距离 $= \vert A B \times A P \vert / \vert A B \vert$。

```cpp
pair<Pd, ld> pointToLine(Pd p, Ld l) {
    Pd ans = lineIntersection({p, p + rotate(l.a, l.b)}, l);
    return {ans, dis(p, ans)};
}
```

如果只需要计算最近距离，下方的写法可以减少书写的代码量，效果一致。

```cpp
template <typename T> ld disPointToLine(Pt p, Lt l) {
    ld ans = cross(p, l.a, l.b);
    return abs(ans) / dis(l.a, l.b);
}
```

## 点是否在线段上 {#s-6d184e878a94}

共线且在两端点包围盒内（点积 $\le 0$ 或坐标夹在中间）。

**接口：** `pointOnSegment` 包含端点，`pointOnSegmentEx` 排除端点。

```cpp
template <typename T> bool pointOnSegment(Pt p, Lt l) {
    return sign(cross(p, l.a, l.b)) == 0 && min(l.a.x, l.b.x) <= p.x && p.x <= max(l.a.x, l.b.x) &&
           min(l.a.y, l.b.y) <= p.y && p.y <= max(l.a.y, l.b.y);
}
template <typename T> bool pointOnSegmentEx(Pt p, Lt l) {
    return pointOnSegment(p, l) && min(l.a.x, l.b.x) < p.x && p.x < max(l.a.x, l.b.x) &&
           min(l.a.y, l.b.y) < p.y && p.y < max(l.a.y, l.b.y);
}
```

## 点到线段的最近距离与最近点 {#s-5322d320acf6}

垂足落在段内用垂足，否则取较近端点。

```cpp
pair<Pd, ld> pointToSegment(Pd p, Ld l) {
    if (sign(dot(p, l.b, l.a)) == -1) {
        return {l.a, dis(p, l.a)};
    } else if (sign(dot(p, l.a, l.b)) == -1) {
        return {l.b, dis(p, l.b)};
    }
    return pointToLine(p, l);
}
```

## 点在直线上的投影点（垂足） {#s-13d695c6a84d}

$A + \text{proj}_{A B} ( A P )$。直线两端无线。

```cpp
Pd project(Pd p, Ld l) {
    Pd vec = l.b - l.a;
    ld r = dot(vec, p - l.a) / (vec.x * vec.x + vec.y * vec.y);
    return l.a + vec * r;
}
```

## 线段的中垂线 {#s-1ef5dfa8e1cd}

中点 + 方向旋转 $90^{\circ}$。外心、垂直平分用。

```cpp
template <typename T> Lt midSegment(Lt l) {
    Pt mid = (l.a + l.b) / 2;
    return {mid, mid + rotate(l.a, l.b)};
}
```

## 两线段是否相交及交点 {#s-7939f177a2a9}

该扩展版可以同时返回相交状态和交点，分为四种情况：$0$ 代表不相交；$1$ 代表普通相交；$2$ 代表重叠（交于两个点）；$3$ 代表相交于端点。**需要注意**，部分运算可能会使用到直线求交点，此时务必保证变量类型为浮点数！

**类型：** 交点一般不是整点，使用浮点坐标类型计算。

<<< @/snippets/inline/geometry/entry-005-64.cpp

如果不需要求交点，那么使用快速排斥+跨立实验即可，其中重叠、相交于端点均视为相交。

<<< @/snippets/inline/geometry/entry-005-65.cpp
