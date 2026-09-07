---
title: "累加 accumulate"
order: 90
---

# 累加 accumulate {#s-721e6c879bb0}

  `accumulate(l, r, init)` 从 `init` 起累加（或传入二元运算）。初值类型决定结果类型，求和用 `0LL`。

```cpp
//将a数组[start,end)区间的元素进行累加，并输出累加和+x的值
cout << accumulate(a + start, a + end, x);
```
