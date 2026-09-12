---
title: "zfunction"
order: 30
---

# zfunction {#s-f83c26df1257}

在线性时间内求每个后缀与原串的最长公共前缀长度 `z[i]`。维护已匹配窗口，窗口内复用既有结果，越过右边界时再扩展。匹配模式 `t` 可对 `t + 分隔符 + s` 求 Z，分隔符须不在输入字符集中。

<<< @/snippets/code/串/zfunction.cpp
