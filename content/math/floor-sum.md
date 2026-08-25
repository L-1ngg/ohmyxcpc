---
title: 类欧几里得
order: 11
---

# 类欧几里得

$$
euclidean(a,b,c,n)=\sum_{i=0}^n\left\lfloor \frac{ai+b}{c} \right\rfloor
$$

```cpp
i64 euclidean(i64 a, i64 b, i64 c, i64 n) {
    // sum{0, n}(floor((a * i + b) / c))
    i64 n2 = n * (n + 1) / 2;
    if (a >= c || b >= c)
        return euclidean(a % c, b % c, c, n) + (a / c) * n2 + (b / c) * (n + 1);
    i64 m = (a * n + b) / c;
    if (!m) return 0;
    return m * n - euclidean(c, c - b - 1, a, m - 1);
}
```
