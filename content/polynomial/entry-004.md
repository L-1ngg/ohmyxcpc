---
title: "Berlekamp-Massey 算法"
order: 40
---

# Berlekamp-Massey 算法 {#s-1d39aa31b8b1}

从给定序列前缀恢复最短线性递推关系，返回对应系数多项式。时间为 $O(NL)$，其中 `N` 是样本数、`L` 是恢复的递推阶数；样本前缀吻合不保证未知后续项一定服从同一递推。

<<< @/snippets/inline/polynomial/entry-004-59.cpp
