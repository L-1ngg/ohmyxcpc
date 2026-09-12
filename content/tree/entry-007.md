---
title: "树上启发式合并(DSU on tree)"
order: 70
---

# 树上启发式合并 (DSU on tree) {#s-9baa09185536}

按“轻子树先处理、重子树结果保留”的顺序统计子树答案，再加入轻子树贡献。单次加入 / 撤销为常数时总时间通常为 $O(n\log n)$；`add` / `del` 与答案 `res` 需按题目填写。

**接入：** `calc` 中传入的是节点 `u`；统计颜色时应在 `add(u)` / `del(u)` 内读取该节点的颜色，再更新当前答案。

<<< @/snippets/inline/tree/entry-007-32.cpp
