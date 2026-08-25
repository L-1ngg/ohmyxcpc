---
title: 三分
order: 5
---

# 三分

## 整数域三分

```cpp
while (l < r) {
    int mid = (l + r) / 2;
    if (check(mid) <= check(mid + 1)) r = mid;
    else l = mid + 1;
}
std::cout << check(l) << '\n';
```

## 实数域三分

限制次数实现。

```cpp
double l = -1E9, r = 1E9;
for (int t = 1; t <= 100; t++) {
    double mid1 = (l * 2 + r) / 3;
    double mid2 = (l + r * 2) / 3;
    if (judge(mid1) < judge(mid2)) {
        r = mid2;
    } else {
        l = mid1;
    }
}
std::cout << l << '\n';
```
