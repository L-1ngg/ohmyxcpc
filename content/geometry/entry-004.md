---
title: "平面角度与弧度"
order: 40
---

# 平面角度与弧度 {#s-83d6c7ac0354}

C++ 三角函数吃弧度。$\pi$ 用 `acos(-1)`。

## 弧度角度相互转换 {#s-917955b200c4}

$\text{deg} = \text{rad} \cdot 180 / \pi$。

**接口：** `toDeg` 将弧度转为角度，`toArc` 将角度转为弧度。

<<< @/snippets/code/二维几何/弧度角度相互转换.cpp

## 正弦定理 {#s-e7741b1a7b5d}

$\frac{a}{\text{sin} A} = \frac{b}{\text{sin} B} = \frac{c}{\text{sin} C} = 2 R$ ，其中 $R$ 为三角形外接圆半径；

## 余弦定理（已知三角形三边，求角） {#s-309072a913dd}

$\text{cos} C = \frac{a^{2} + b^{2} - c^{2}}{2 a b} , \text{cos} B = \frac{a^{2} + c^{2} - b^{2}}{2 a c} , \text{cos} A = \frac{b^{2} + c^{2} - a^{2}}{2 b c}$。可以借此推导出三角形面积公式 $S_{\triangle A B C} = \frac{a b \cdot \text{sin} C}{2} = \frac{b c \cdot \text{sin} A}{2} = \frac{a c \cdot \text{sin} B}{2}$。

注意，计算格式是：由 $b , c , a$ 三边求 $\angle A$；由 $a , c , b$ 三边求 $\angle B$；由 $a , b , c$ 三边求 $\angle C$。

**边界：** 用余弦定理求夹角弧度，要求 `a`、`b` 为正且三边构成三角形；浮点误差可能使 `acos` 参数越出 `[-1, 1]`。

```cpp
ld angle(ld a, ld b, ld c) {
    ld val = acos((a * a + b * b - c * c) / (2.0 * a * b));
    return val;
}
```

## 求两向量的夹角 {#s-e0293c968ed4}

能够计算 $[ 0^{\circ} , 180^{\circ} ]$ 区间的角度。

```cpp
ld angle(Point<ld> a, Point<ld> b) {
    ld val = abs(cross(a, b));
    return abs(atan2(val, a.x * b.x + a.y * b.y));
}
```

## 向量旋转任意角度 {#s-122616a5a497}

逆时针旋转，转换公式：$\begin{cases} x \prime = x \text{cos} \theta - y \text{sin} \theta \\ y \prime = x \text{sin} \theta + y \text{cos} \theta\end{cases}$

```cpp
Point<ld> rotate(Point<ld> p, ld rad) {
    return {p.x * cos(rad) - p.y * sin(rad), p.x * sin(rad) + p.y * cos(rad)};
}
```

## 点绕点旋转任意角度 {#s-e52a9c688d74}

点 $a$ 绕点 $b$ 逆时针转 `rad` 弧度。转换公式：$\begin{cases} x \prime = ( x_{0} - x_{1} ) \text{cos} \theta - ( y_{0} - y_{1} ) \text{sin} \theta + x_{1} \\ y \prime = ( x_{0} - x_{1} ) \text{sin} \theta + ( y_{0} - y_{1} ) \text{cos} \theta + y_{1}\end{cases}$

<<< @/snippets/code/二维几何/点绕点旋转任意角度.cpp
