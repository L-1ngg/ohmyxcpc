---
title: "平面几何必要初始化"
order: 30
---

# 平面几何必要初始化 {#s-d9f16a5b956f}

浮点比较用 `eps`（约 $1 e - 8$～$1 e - 12$）。`sign` 把差压成 $- 1 / 0 / 1$。下面点线圆都靠叉积/点积。

## 字符串读入浮点数 {#s-91c58f97a837}

去掉小数点后按 $k$ 位补零，当成整数用。`Knum` 按题目小数位数改；位数多时 `stoi` 会溢出，改 `stoll`。

**约定：** `Knum` 是统一保留的小数位数；输入小数位数应不超过该值，删除小数点后补零，得到按 $10^{Knum}$ 放大的整数。

<<< @/snippets/code/二维几何/字符串读入浮点数.cpp

## 预置函数 {#s-f4fce88c217f}

全章浮点比较都走 `EPS` / `sign` / `equal`，不要直接 `==`。`EPS` 按坐标范围改。

**精度：** 当前 `EPS = 1e-7`，应结合坐标量级和误差要求选择；SMU_inch 版本使用 `1e-9`。`fgcd` 是基于误差阈值的实数辗转运算。

<<< @/snippets/code/二维几何/预置函数.cpp

## 点线封装 {#s-27ed499db464}

点当向量用。加减缩放、`dot` 点积、`cross` 叉积。直线用点+方向，或一般式 $a x + b y + c = 0$。

**接口与依赖：** `Point` 的 `operator*` 为点积，`operator^` 为叉积，类型转换保留坐标含义。后续简写 `Pt` / `Lt` 对应 `Point<T>` / `Line<T>`；浮点版 `Pd` / `Ld` 按相同方式定义。当前按 GNU++20 使用聚合初始化，较旧编译器需检查 `emplace_back` 的构造方式。

<<< @/snippets/code/二维几何/点线封装.cpp

## 叉乘 {#s-b38d3ede85f6}

定义公式 $a \times b = \vert a \vert \vert b \vert \text{sin} \theta$。

**接口：** 两参数 `cross` 求向量叉积，三参数版本以 `p0` 为原点，计算 `(p1 - p0) × (p2 - p0)`。

```cpp
template <typename T> T cross(Point<T> a, Point<T> b) {
    return a.x * b.y - a.y * b.x;
}
template <typename T> T cross(Point<T> p1, Point<T> p2, Point<T> p0) {
    return cross(p1 - p0, p2 - p0);
}
```

## 点乘 {#s-5c6cc1ddf703}

定义公式 $a \cdot b = \vert a \vert \vert b \vert \text{cos} \theta$。

**接口：** 两参数 `dot` 求向量点积，三参数版本计算 `(p1 - p0) · (p2 - p0)`。

```cpp
template <typename T> T dot(Point<T> a, Point<T> b) {
    return a.x * b.x + a.y * b.y;
}
template <typename T> T dot(Point<T> p1, Point<T> p2, Point<T> p0) {
    return dot(p1 - p0, p2 - p0);
}
```

## 欧几里得距离公式 {#s-2994e58db022}

最常用的距离公式。**需要注意**，开根号会丢失精度，如无强制要求，先不要开根号，留到最后一步一起开。

**接口：** `disEx(a, b)` 返回距离的平方，可用于比较距离并避免开方；平方和须在坐标类型范围内。

<<< @/snippets/code/二维几何/欧几里得距离公式.cpp

## 曼哈顿距离公式 {#s-03386a9de609}

$\vert x_{1} - x_{2} \vert + \vert y_{1} - y_{2} \vert$。转坐标 $( x + y , x - y )$ 后变切比雪夫。

```cpp
template <typename T> T dis1(Point<T> p1, Point<T> p2) {
    return abs(p1.x - p2.x) + abs(p1.y - p2.y);
}
```

## 将向量转换为单位向量 {#s-8696c039f3c3}

除以模长。零向量不要除。

**边界：** 单位化前向量长度须非零。

```cpp
Point<ld> standardize(Point<ld> vec) {
    return vec / sqrt(vec.x * vec.x + vec.y * vec.y);
}
```

## 向量旋转 {#s-70db7d0637ce}

将当前向量移动至原点后顺时针旋转 $90^{\circ}$ ，即获取垂直于当前向量的、起点为原点的向量。在计算垂线时非常有用。例如，要想获取点 $a$ 绕点 $o$ 顺时针旋转 $90^{\circ}$ 后的点，可以这样书写代码：`auto ans = o + rotate(o, a);` ；如果是逆时针旋转，那么只需更改符号即可：`auto ans = o - rotate(o, a);` 。参数顺序是 `(原点, 被旋转点)`。

```cpp
template <typename T> Point<T> rotate(Point<T> p1, Point<T> p2) {
    Point<T> vec = p1 - p2;
    return {-vec.y, vec.x};
}
```
