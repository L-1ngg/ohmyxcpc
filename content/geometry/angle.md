---
title: 平面角度与弧度
order: 4
---

# 平面角度与弧度

## 弧度角度相互转换

```cpp
ld toDeg(ld x) { // 弧度转角度
    return x * 180 / PI;
}
ld toArc(ld x) { // 角度转弧度
    return PI / 180 * x;
}
```

## 正弦定理

$\dfrac{a}{\sin A}=\dfrac{b}{\sin B}=\dfrac{c}{\sin C}=2R$ ，其中 $R$ 为三角形外接圆半径；

## 余弦定理（已知三角形三边，求角）

$\cos C=\dfrac{a^2+b^2-c^2}{2ab},\cos B=\dfrac{a^2+c^2-b^2}{2ac},\cos A=\dfrac{b^2+c^2-a^2}{2bc}$。可以借此推导出三角形面积公式 $S_{\triangle ABC}=\dfrac{ab\cdot\sin C}{2}=\dfrac{bc\cdot\sin A}{2}=\dfrac{ac\cdot\sin B}{2}$。

注意，计算格式是：由 $b,c,a$ 三边求 $\angle A$；由 $a, c, b$ 三边求 $\angle B$；由 $a, b, c$ 三边求 $\angle C$。

```cpp
ld angle(ld a, ld b, ld c) { // 余弦定理
    ld val = acos((a * a + b * b - c * c) / (2.0 * a * b)); // 计算弧度
    return val;
}
```

## 求两向量的夹角

能够计算 $[0^{\circ},180^{\circ}]$ 区间的角度。

```cpp
ld angle(Point<ld> a, Point<ld> b) {
    ld val = abs(cross(a, b));
    return abs(atan2(val, a.x * b.x + a.y * b.y));
}
```

## 向量旋转任意角度

逆时针旋转，转换公式：$\left\{\begin{matrix}
x'=x\cos \theta-y\sin \theta \\ 
y'=x\sin \theta+y\cos \theta
\end{matrix}\right.$

```cpp
Point<ld> rotate(Point<ld> p, ld rad) {
    return {p.x * cos(rad) - p.y * sin(rad), p.x * sin(rad) + p.y * cos(rad)};
}
```

## 点绕点旋转任意角度

逆时针旋转，转换公式：$\left\{\begin{matrix}
x'=(x_0-x_1)\cos\theta+(y_0-y_1)\sin\theta+x_1 \\ 
y'=(x_1-x_0)\sin\theta+(y_0-y_1)\cos\theta+y_1
\end{matrix}\right.$

```cpp
// potentially incorrect?
Point<ld> rotate(Point<ld> a, Point<ld> b, ld rad) {
    ld x = (a.x - b.x) * cos(rad) + (a.y - b.y) * sin(rad) + b.x;
    ld y = (b.x - a.x) * sin(rad) + (a.y - b.y) * cos(rad) + b.y;
    return {x, y};
}
```
