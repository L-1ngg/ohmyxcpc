---
title: "平面直线方程转换"
order: 80
---

# 平面直线方程转换 {#s-f44ed5ef1434}

  两点式、点向式、一般式 $a x + b y + c = 0$ 互转。一般式不唯一，可约掉公约数。

## 浮点数计算直线的斜率 {#s-fcca4f7410cd}

  一般很少使用到这个函数，因为斜率的取值不可控（例如接近平行于 $x , y$ 轴时）。**需要注意**，当直线平行于 $y$ 轴时斜率为 `inf` 。

```cpp
template<typename T> ld slope(Pt p1, Pt p2) {  // 斜率，注意 inf 的情况
    return (p1.y - p2.y) / (p1.x - p2.x);
}
template<typename T> ld slope(Lt l) {
    return slope(l.a, l.b);
}
```

## 分数精确计算直线的斜率 {#s-c257308916b8}

  调用分数四则运算精确计算斜率，返回最简分数，只适用于整数计算。

```cpp
template<typename T> Frac<T> slopeEx(Pt p1, Pt p2) {
    Frac<T> U = p1.y - p2.y;
    Frac<T> V = p1.x - p2.x;
    return U / V;  // 调用分数精确计算
}
```

## 两点式转一般式 {#s-d9a93e0c93c5}

  返回由三个整数构成的方程，在输入较大时可能找不到较小的满足题意的一组整数解。可以处理平行于 $x , y$ 轴、两点共点的情况。

<<< @/snippets/inline/geometry/entry-008-67.cpp

## 一般式转两点式 {#s-143ef3d1f8b5}

  由于整数点可能很大或者不存在，故直接采用浮点数；如果与 $x , y$ 轴有交点则取交点。可以处理平行于 $x , y$ 轴的情况。

<<< @/snippets/code/二维几何/一般式转两点式.cpp

## 抛物线与 x 轴是否相交及交点 {#s-b7f4ec4f2774}

  $0$ 代表没有交点；$1$ 代表相切；$2$ 代表有两个交点。

<<< @/snippets/code/二维几何/抛物线与-x-轴是否相交及交点.cpp
