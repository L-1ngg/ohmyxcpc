---
title: Dinic 最大流
---

# Dinic 最大流

时间复杂度 $O(V^2E)$，单位网络上为 $O(E\sqrt{V})$。

$$
\sum_{(u,v)\in E} f(u,v) = |f|
$$

## 代码

实现位于 `content/snippets/dinic.cpp`：

<<< @/snippets/dinic.cpp

::: tip 使用场景
最大流建模常见于：
- 二分图匹配
  - 最小点覆盖
  - 最大独立集
- 网络流可行性判定
:::
