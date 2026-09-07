---
title: "后缀自动机 SAM"
order: 110
---

# 后缀自动机 SAM {#s-4a24f3139234}

  识别一个串的全部子串：每个状态对应 endpos 相同的一类子串。`len` 是该状态最长串的长度，`link` 指向更短的后缀状态。逐字符 `last = extend(last, c)`（第一份从节点 `p` 接字符 `c`，返回新 last；多串时 last 复位为 $0$ 即广义 SAM）。本质不同子串数 $\sum ( \text{len} [ v ] - \text{len} [ \text{link} [ v ] ] )$，复杂度 $\mathcal{O} ( N \text{log} \vert \Sigma \vert )$。

<<< @/snippets/code/串/后缀自动机-SAM.cpp

第二个 SAM 封装：`endpos` 为该状态最短出现位置记录（按需使用），`size` 为出现次数——按 `len` 降序（即节点编号倒序，clones 在前）把 `size` 累加到 `link` 上即可；以 `link` 为父边构成的后缀链接树可当后缀树用。复杂度 $\mathcal{O} ( N \text{log} \vert \Sigma \vert )$（`next` 用 `std::map`）。

<<< @/snippets/code/串/后缀自动机-SAM-2.cpp
