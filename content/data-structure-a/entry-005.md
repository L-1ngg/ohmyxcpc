---
title: "二维树状数组"
order: 50
---

# 二维树状数组 {#s-d693c6cfe272}

   **封装一：该版本不能同时进行区间修改+区间查询。** 无离散化版本的空间占用为 $\mathcal{O} ( N M )$ 、建树复杂度为 $\mathcal{O} ( N M )$ 、单次查询复杂度为 $\mathcal{O} ( \text{log} N \cdot \text{log} M )$ 。

<<< @/snippets/code/数据结构A/二维树状数组.cpp

 **封装二：该版本支持全部操作。** 但是时空复杂度均比上一个版本多 $4$ 倍。

<<< @/snippets/inline/data-structure-a/entry-005-5.cpp
