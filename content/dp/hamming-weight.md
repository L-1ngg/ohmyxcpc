---
title: 汉明权重
order: 6
---

# 汉明权重

```cpp
for (int i = 0; (1<<i)-1 <= n; i++) {
    for (int x = (1<<i)-1, t; x <= n; t = x+(x&-x), x = x ? (t|((((t&-t)/(x&-x))>>1)-1)) : (n+1)) {
        // todo
    }
}
```

> [!WARNING]
> 待补充：本节仅有代码框架（循环体内为作者遗留的 todo），缺少讲解与用法说明。
