---
title: 空间多边形
order: 103
---

# 空间多边形

## 正 N 棱锥体积公式

棱锥通用体积公式 $V=\dfrac{1}{3}Sh$ ，当其恰好是棱长为 $l$ 的正 $n$ 棱锥时，有公式 $\displaystyle V=\frac{l^3\cdot n}{12\tan \frac{\pi}{n}}\cdot\sqrt{1-\frac{1}{4\cdot \sin^2\frac{\pi}{n}}}$。

```cpp
ld V(ld l, int n) { // 正n棱锥体积公式
    return l * l * l * n / (12 * tan(PI / n)) * sqrt(1 - 1 / (4 * sin(PI / n) * sin(PI / n)));
}
```

## 四面体体积

```cpp
ld V(P3 a, P3 b, P3 c, P3 d) {
    return abs(dot(d - a, crossEx(b - a, c - a))) / 6;
}
```

## 点是否在空间三角形上

点位于边界上时返回 $false$ 。

```cpp
bool pointOnTriangle(P3 p, P3 p1, P3 p2, P3 p3) {
    return pointOnSegmentSide(p, p1, {p2, p3}) && pointOnSegmentSide(p, p2, {p1, p3}) &&
           pointOnSegmentSide(p, p3, {p1, p2});
}
```

## 线段是否与空间三角形相交及交点

只有交点在空间三角形内部时才视作相交。

```cpp
pair<bool, P3> segmentOnTriangle(P3 l, P3 r, P3 p1, P3 p2, P3 p3) {
    P3 x = crossEx(p2 - p1, p3 - p1);
    if (sign(dot(x, r - l)) == 0) {
        return {0, {}};
    }
    ld t = dot(x, p1 - l) / dot(x, r - l);
    if (t < 0 || t - 1 > 0) { // 不在线段上
        return {0, {}};
    }
    bool type = pointOnTriangle(l + (r - l) * t, p1, p2, p3);
    if (type) {
        return {1, l + (r - l) * t};
    } else {
        return {0, {}};
    }
}
```

## 空间三角形是否相交

相交线段在空间三角形内部时才视作相交。

```cpp
bool triangleIntersection(vector<P3> a, vector<P3> b) {
    for (int i = 0; i < 3; i++) {
        if (segmentOnTriangle(b[i], b[(i + 1) % 3], a[0], a[1], a[2]).first) {
            return 1;
        }
        if (segmentOnTriangle(a[i], a[(i + 1) % 3], b[0], b[1], b[2]).first) {
            return 1;
        }
    }
    return 0;
}
```
