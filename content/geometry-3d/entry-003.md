---
title: "三维角度与弧度"
order: 30
---

# 三维角度与弧度 {#s-f043ca111610}

  与二维相同：三角函数用弧度。夹角取点积。

## 空间两直线夹角的 cos 值 {#s-5873d940d147}

  任意位置的空间两直线。

```cpp
ld lineCos(L3 l1, L3 l2) {
    return dot(l1.a - l1.b, l2.a - l2.b) / len(l1.a - l1.b) / len(l2.a - l2.b);
}
```

## 空间两平面夹角的 cos 值 {#s-a96f0ee667f8}

  法向夹角的余弦。注意取锐角还是两面角。

```cpp
ld planeCos(Plane s1, Plane s2) {
    P3 U = getVec(s1), V = getVec(s2);
    return dot(U, V) / len(U) / len(V);
}
```

## 直线与平面夹角的 sin 值 {#s-dc14daa8118c}

  方向与法向夹角的余角。$\text{sin} \theta = \vert d \cdot n \vert / ( \vert d \vert \vert n \vert )$。

```cpp
ld linePlaneSin(L3 l, Plane s) {
    P3 vec = getVec(s);
    return dot(l.a - l.b, vec) / len(l.a - l.b) / len(vec);
}
```
