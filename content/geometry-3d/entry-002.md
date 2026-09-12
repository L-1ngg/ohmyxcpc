---
title: "三维点线面相关"
order: 20
---

# 三维点线面相关 {#s-e7ed4990c5c6}

四点共面：混积 $[ A B , A C , A D ] = 0$。线面平行：方向点法向为 $0$。两线最近距离：公垂线方向是两方向叉积。

## 空间三点是否共线 {#s-c3d9fcdb9e83}

叉积模长为 $0$ 则共线。其中第二个函数是专门用来判断给定的三个点能否构成平面的，因为不共线的三点才能构成平面。

<<< @/snippets/code/三维几何及常见例题/空间三点是否共线.cpp

## 四点是否共面 {#s-245003dc480d}

混积 $[ A B , A C , A D ] = 0$。

```cpp
bool onPlane(P3 p1, P3 p2, P3 p3, P3 p4) {
    ld val = dot(getVec({p1, p2, p3}), p4 - p1);
    return sign(val) == 0;
}
```

## 空间点是否在线段上 {#s-52cccc0a7ad0}

共线（叉积为零）且夹在两端点之间。

**接口：** `pointOnSegment` 包含端点，`pointOnSegmentEx` 排除端点。

<<< @/snippets/code/三维几何及常见例题/空间点是否在线段上.cpp

## 空间两点是否在线段同侧 {#s-3478ffe48fc7}

当给定的两点与线段不共面、点在线段上时返回 $\text{false}$ 。

**前提：** 同侧关系限定在两点与直线共面的情形，代码先排除不共面输入。

<<< @/snippets/code/三维几何及常见例题/空间两点是否在线段同侧.cpp

## 两点是否在平面同侧 {#s-7a21f7e74d06}

点在平面上时返回 $\text{false}$ 。

```cpp
bool pointOnPlaneSide(P3 p1, P3 p2, Plane s) {
    ld val = dot(getVec(s), p1 - s.u) * dot(getVec(s), p2 - s.u);
    return sign(val) == 1;
}
```

## 空间两直线是否平行/垂直 {#s-ed2fd8cc9c92}

方向平行（叉积为零）/ 垂直（点积为零）。平行不必共面。

<<< @/snippets/code/三维几何及常见例题/空间两直线是否平行垂直.cpp

## 两平面是否平行/垂直 {#s-a15e32635896}

法向平行则平面平行；法向垂直则平面垂直。

<<< @/snippets/code/三维几何及常见例题/两平面是否平行垂直.cpp

## 空间两直线是否是同一条 {#s-7e67cb07ec45}

平行且一点在另一线上。

```cpp
bool same(L3 l1, L3 l2) {
    return lineParallel(l1, l2) && lineParallel({l1.a, l2.b}, {l1.b, l2.a});
}
```

## 两平面是否是同一个 {#s-7981eb3f8b76}

法向平行且一点在另一面上。

```cpp
bool same(Plane s1, Plane s2) {
    return onPlane(s1.u, s2.u, s2.v, s2.w) && onPlane(s1.v, s2.u, s2.v, s2.w) &&
           onPlane(s1.w, s2.u, s2.v, s2.w);
}
```

## 直线是否与平面平行 {#s-b2ee34496773}

方向点法向为 $0$。再看一点是否在面上，区分含于平面。

```cpp
bool linePlaneParallel(L3 l, Plane s) {
    ld val = dot(l.a - l.b, getVec(s));
    return sign(val) == 0;
}
```

## 空间两线段是否相交 {#s-adf177feb821}

先求两直线交点（须共面），再判交点落在两段内。

**接口：** `segmentIntersection` 包含重叠和端点接触；`segmentIntersection1` 只接受严格相交。两线段不共面时直接判不相交。

<<< @/snippets/code/三维几何及常见例题/空间两线段是否相交.cpp

## 空间两直线是否相交及交点 {#s-ba6818509e04}

当两直线不共面、两直线平行时返回 $\text{false}$ 。

<<< @/snippets/inline/geometry-3d/entry-002-77.cpp

## 直线与平面是否相交及交点 {#s-d26a19e3520c}

当直线与平面平行、给定的点构不成平面时返回 $\text{false}$ 。

**计算：** `vec * (...)` 是分量乘法，随后对三个分量求和得到点积。分母为零表示直线与平面平行或位于平面内，须先区分再求唯一交点。

<<< @/snippets/code/三维几何及常见例题/直线与平面是否相交及交点.cpp

## 两平面是否相交及交线 {#s-9769d20c4bf6}

当两平面平行、两平面为同一个时返回 $\text{false}$ 。

```cpp
pair<bool, L3> planeIntersection(Plane s1, Plane s2) {
    if (planeParallel(s1, s2) || same(s1, s2)) {
        return {0, {}};
    }
    P3 U = linePlaneParallel({s2.u, s2.v}, s1) ? linePlaneCross({s2.v, s2.w}, s1).second
                                               : linePlaneCross({s2.u, s2.v}, s1).second;
    P3 V = linePlaneParallel({s2.w, s2.u}, s1) ? linePlaneCross({s2.v, s2.w}, s1).second
                                               : linePlaneCross({s2.w, s2.u}, s1).second;
    return {1, {U, V}};
}
```

## 点到直线的最近点与最近距离 {#s-13d8818a993a}

面积除以底边得距离。直线方向用 `l.a-l.b`，与后面单位化一致。

**边界：** 直线两端点必须不同，否则距离公式分母为零。

```cpp
pair<ld, P3> pointToLine(P3 p, L3 l) {
    ld val = cross(p - l.a, l.a - l.b) / dis(l.a, l.b);
    ld val1 = dot(p - l.a, l.a - l.b) / dis(l.a, l.b);
    return {val, l.a + val1 * standardize(l.a - l.b)};
}
```

## 点到平面的最近点与最近距离 {#s-08f22d83b390}

距离取绝对值；垂足必须用**有向**距离，否则法向另一侧会走到平面反方向。

**结果：** 返回非负距离和投影点。构造投影时使用有向距离，才能正确处理法向量两侧的点；平面法向量须非零。

<<< @/snippets/code/三维几何及常见例题/点到平面的最近点与最近距离.cpp

## 空间两直线的最近距离与最近点对 {#s-d8be98e94243}

公垂线方向为两方向叉积；平行时 `vec` 为零，不要调用。返回 `{距离, l1 上最近点, l2 上最近点}`。

**边界：** 两直线方向叉积为共同法向量；平行时叉积为零，应转为点到直线距离处理。

<<< @/snippets/code/三维几何及常见例题/空间两直线的最近距离与最近点对.cpp
