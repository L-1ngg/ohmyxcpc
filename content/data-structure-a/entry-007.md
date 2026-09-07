---
title: "树套树"
order: 70
---

# 树套树 {#s-40d1284ef2b7}

  外层按位置分区间，内层按值排序。一次操作拆成 $\text{log} N$ 个外节点，每个再 $\text{log} N$，故 $\mathcal{O} ( \text{log}^{2} N )$。用来做动态区间第 $k$ 小、排名、前驱后继。

## 线段树套平衡树 {#s-5fd11935d3b8}

  线段树每个节点放一棵 pbds `tree`（存 `{值, 下标}` 去重键），单次 $\mathcal{O} ( \text{log}^{2} N )$ 支持区间排名/前驱/后继：外区间拆成 $\text{log} N$ 个节点，内层 `order_of_key` 等为 $\mathcal{O} ( \text{log} N )$。`build(a)` 按位置建树并启发式合并，`update(pos, old_val, new_val)` 单点修改，查询区间半开 $[ x , y )$；前驱/后继不存在时返回 `±inf`。需要包含 pbds 头文件。

<<< @/snippets/inline/data-structure-a/entry-007-7.cpp
