---
title: "线性基"
order: 10
---

# 线性基 {#s-8a6ebe0c8e81}

  下面这段求的是能异或出的**最大值**。若问“异或和为 $k$ 的方案数”：插不进 $k$ 则为 $0$，否则为 $2^{n - m}$（$m$ 为基中非零个数）。证明：不在基里的每个子集，都能在基中找到唯一补丁使异或和为 $k$。

<<< @/snippets/code/线性代数/线性基.cpp

## 高斯消元法 {#s-bc7badb329de}

  线性基封装。设位长为 `BASE`（一般取 $63$，循环用到 $0 \cdots 62$），插入 $M$ 个数复杂度 $\mathcal{O} ( M \cdot \text{BASE} )$。`insert` 失败则能异或出 $0$（`flag=1`）。`kthquery` 前必须先 `rebuild()`。

<<< @/snippets/code/线性代数/高斯消元法.cpp
