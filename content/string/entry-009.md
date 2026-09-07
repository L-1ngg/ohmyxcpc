---
title: "AC 自动机"
order: 90
---

# AC 自动机 {#s-c8c9d4be3ca2}

  多模式串同时在文本里匹配。先 `insert` 每个模式，`build()` 求 fail（失配跳到当前后缀里最长的已有前缀），再 `query(文本)`。fail 把 Trie 连成 KMP 自动机，匹配沿边走即可。第二份 `add` 返回模式终点，`work(文本)` 在 fail 树上汇总出现次数。复杂度 $\mathcal{O} ( \sum \vert s_{i} \vert + \vert S \vert )$，字符集默认 $26$。

<<< @/snippets/code/串/AC-自动机.cpp

<<< @/snippets/code/串/AC-自动机-2.cpp
