---
title: "后缀自动机 SAM"
order: 110
---

# 后缀自动机 SAM {#s-4a24f3139234}

用状态压缩字符串的全部子串，同一状态中的子串具有相同的 endpos 集合。`len` 为状态对应的最大长度，`link` 指向后缀状态；逐字符调用 `last = extend(last, c)` 构造。

**应用：** 本质不同子串数为 $\sum_{v\ne root}(len[v]-len[link[v]])$。当前使用有序映射保存转移，时间为 $O(n\log|\Sigma|)$；多个字符串的构造需使用明确支持广义插入的接口。

<<< @/snippets/code/串/后缀自动机-SAM.cpp

第二个 SAM 封装：`endpos` 为该状态最短出现位置记录（按需使用），`size` 为出现次数——按 `len` 排序后降序遍历（不能直接用节点编号倒序代替）把 `size` 累加到 `link` 上即可；以 `link` 为父边构成的后缀链接树可当后缀树用。复杂度 $\mathcal{O} ( N \text{log} \vert \Sigma \vert )$（`next` 用 `std::map`）。

<<< @/snippets/code/串/后缀自动机-SAM-2.cpp
