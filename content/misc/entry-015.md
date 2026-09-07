---
title: "int128 输入输出流控制"
order: 150
---

# int128 输入输出流控制 {#s-d97d5ce6be75}

  int128 只在 Linux 下可用。约 $38$ 位十进制。下面 `>>` **没有处理负号**（原文写支持负数），负数要自己加。`<<` 也不写负号。

<<< @/snippets/inline/misc/entry-015-88.cpp
