---
title: "对顶堆"
order: 130
---

# 对顶堆 {#s-66fc72862688}

  用两个 `multiset` 维护**动态中位数**（支持插入/删除），哨兵 `±kInf` 避免边界判断：`less` 保存较小的一半（含中位数），`greater` 保存较大的一半，`adjust()` 保持两者大小差 $\le 1$。插入按与 `*greater.begin()` 比较分流，删除在两个集合内查找；当前中位数为 `*less.rbegin()`（奇数个元素时正中间）。若改为严格对顶”堆”，把 `multiset` 换成 `priority_queue` 并在删除时惰性弹出（配合标记）可更快。

<<< @/snippets/code/数据结构A/对顶堆.cpp
