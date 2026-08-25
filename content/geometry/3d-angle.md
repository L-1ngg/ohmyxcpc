---
title: 三维角度与弧度
order: 102
---

# 三维角度与弧度

## 空间两直线夹角的 cos 值

任意位置的空间两直线。

```cpp
ld lineCos(L3 l1, L3 l2) {
    return dot(l1.a - l1.b, l2.a - l2.b) / len(l1.a - l1.b) / len(l2.a - l2.b);
}
```

## 空间两平面夹角的 cos 值

```cpp
ld planeCos(Plane s1, Plane s2) {
    P3 U = getVec(s1), V = getVec(s2);
    return dot(U, V) / len(U) / len(V);
}
```

## 直线与平面夹角的 sin 值

```cpp
ld linePlaneSin(L3 l, Plane s) {
    P3 vec = getVec(s);
    return dot(l.a - l.b, vec) / len(l.a - l.b) / len(vec);
}
```
