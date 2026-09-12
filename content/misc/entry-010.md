---
title: "读取一行数字，个数未知"
order: 100
---

# 读取一行数字，个数未知 {#s-e70290b6c1f9}

先 `getline` 再 `stringstream`。前面如果刚 `cin >>` 过，先 `cin.ignore` 吃掉行尾。

<<< @/snippets/code/杂项/读取一行数字，个数未知.cpp
