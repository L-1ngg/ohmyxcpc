---
title: "空间多边形"
order: 40
---

# 空间多边形 {#s-9a810e17de14}

  顶点须共面。面积把边叉积累加再取模的一半。

## 正 N 棱锥体积公式 {#s-b5fe4db7eaba}

  棱锥通用体积公式 $V = \frac{1}{3} S h$ ，当其恰好是棱长为 $l$ 的正 $n$ 棱锥时，有公式 $V = \frac{l^{3} \cdot n}{12 \operatorname{tan} \frac{\pi}{n}} \cdot \sqrt{1 - \frac{1}{4 \cdot \text{sin}^{2} \frac{\pi}{n}}}$。

```cpp
ld V(ld l, int n) {  // 正n棱锥体积公式
    return l * l * l * n / (12 * tan(PI / n)) * sqrt(1 - 1 / (4 * sin(PI / n) * sin(PI / n)));
}
```

## 四面体体积 {#s-bf90db683c48}

  标量三重积除以 $6$。与上面正棱锥的 `V(l,n)` 同名，不要同时编译。

```cpp
ld V(P3 a, P3 b, P3 c, P3 d) {
    return abs(dot(d - a, crossEx(b - a, c - a))) / 6;
}
```

## 点是否在空间三角形上 {#s-58664d559ed6}

  点位于边界上时返回 $\text{false}$ 。

```cpp
bool pointOnTriangle(P3 p, P3 p1, P3 p2, P3 p3) {
    return pointOnSegmentSide(p, p1, {p2, p3}) && pointOnSegmentSide(p, p2, {p1, p3}) &&
           pointOnSegmentSide(p, p3, {p1, p2});
}
```

## 线段是否与空间三角形相交及交点 {#s-827b5d11852f}

  只有交点在空间三角形内部时才视作相交。

<<< @/snippets/code/三维几何及常见例题/线段是否与空间三角形相交及交点.cpp

## 空间三角形是否相交 {#s-ef9383baf99b}

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
