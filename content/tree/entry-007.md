---
title: "树上启发式合并(DSU on tree)"
order: 70
---

# 树上启发式合并 (DSU on tree) {#s-9baa09185536}

  $\mathcal{O} ( N \text{log} N )$ 。思路：先轻儿子、再重儿子（重儿子贡献保留，`hson` 标记跳过），`calc` 暴力统计轻儿子子树；`add(c)/del(c)` 为待填钩子，`res` 为当前答案。`add()` 与顶部加边的 `add(u, v)` 靠参数个数区分。

<<< @/snippets/inline/tree/entry-007-32.cpp
