---
title: "平面多边形"
order: 10
---

# 平面多边形 {#s-4861de6d63ad}

  顶点按序给出。面积用叉积求和（鞋带）；点在形内用绕数或射线。逆时针面积为正。

## 两向量构成的平面四边形有向面积 {#s-18496c77e850}

  以 $p_{1}$ 为公共顶点，$\overrightarrow{p_{1} p_{2}} \times \overrightarrow{p_{1} p_{3}}$，是平行四边形有向面积（三角形的两倍）。

```cpp
template<typename T> T areaEx(Point<T> p1, Point<T> p2, Point<T> p3) {
    return cross(p2, p3, p1);  // 原来写 cross(b,c,a)，参数名对不上，无法编译
}
```

## 判断四个点能否组成矩形/正方形 {#s-296dc4f4dec2}

  可以处理浮点数、共点的情况。返回分为三种情况：$2$ 代表构成正方形；$1$ 代表构成矩形；$0$ 代表其他情况。`Pt` / `Lt` 见二维章。先按坐标排序再两两对边。

```cpp
template<typename T> int isSquare(vector<Pt> x) {
    sort(x.begin(), x.end());
    if (equal(dis(x[0], x[1]), dis(x[2], x[3])) && sign(dis(x[0], x[1])) &&
        equal(dis(x[0], x[2]), dis(x[1], x[3])) && sign(dis(x[0], x[2])) &&
        lineParallel(Lt{x[0], x[1]}, Lt{x[2], x[3]}) &&
        lineParallel(Lt{x[0], x[2]}, Lt{x[1], x[3]}) &&
        lineVertical(Lt{x[0], x[1]}, Lt{x[0], x[2]})) {
        return equal(dis(x[0], x[1]), dis(x[0], x[2])) ? 2 : 1;
    }
    return 0;
}
```

## 点是否在任意多边形内 {#s-334b7f3ecea3}

  射线法判定，$t$ 为穿越次数，当其为奇数时即代表点在多边形内部；返回 $2$ 代表点在多边形边界上，返回 $1$ 在内、$0$ 在外。复杂度 $\mathcal{O} ( n )$。不要求凸。

<<< @/snippets/inline/polygon/entry-001-69.cpp

## 线段是否在任意多边形内部 {#s-2d99039a0013}

  两端点都在多边形内（含边界），且与边的相交不是“穿出去”。凹多边形要处理顶点处的局部拐向，分支较多。

<<< @/snippets/inline/polygon/entry-001-70.cpp

## 任意多边形的面积 {#s-941d17faa293}

  鞋带公式。逆时针为正；要绝对值就包一层 `abs`。与二维章三角形 `area` 同名。

```cpp
template<typename T> ld area(vector<Point<T>> P) {
    int n = P.size();
    ld ans = 0;
    for (int i = 0; i < n; i++) {
        ans += cross(P[i], P[(i + 1) % n]);
    }
    return ans / 2.0;
}
```

## 皮克定理 {#s-b6e88d4dd9af}

  绘制在方格纸上的多边形面积公式可以表示为 $S = n + \frac{s}{2} - 1$ ，其中 $n$ 表示多边形内部的点数、$s$ 表示多边形边界上的点数。一条线段上的点数为 $\text{gcd} ( \vert x_{1} - x_{2} \vert , \vert y_{1} - y_{2} \vert ) + 1$。

## 任意多边形上/内的网格点个数（仅能处理整数） {#s-8436493cb6b3}

  皮克定理用。边上点数每条边计 $\text{gcd} ( \Delta x , \Delta y )$（每顶点恰好计一次）。内部 $I = A - B / 2 + 1$。

<<< @/snippets/inline/polygon/entry-001-71.cpp
