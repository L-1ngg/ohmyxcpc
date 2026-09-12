---
title: "约瑟夫问题"
order: 110
---

# 约瑟夫问题 {#s-a53af0d36d5d}

$n$ 个人编号 $0 , 1 , 2 \ldots , n - 1$ ，每次数到 $k$ 出局，求最后剩下的人的编号。

$\mathcal{O} ( N )$ 。`repeat` 为赛场宏，没有就写成 `for (int i = 1; i <= n; i++)`。

**编号：** 返回最后存活者从 `0` 开始的编号；题目从 `1` 编号时输出结果加 `1`。

```cpp
int jos(int n, int k) {
    int res = 0;
    repeat(i, 1, n + 1) res = (res + k) % i;
    return res;
}
```

$\mathcal{O} ( K \text{log} N )$ ，适用于 $K$ 较小的情况。

**编号：** `jos(n, k)` 返回从 `0` 开始的编号，要求 `n >= 1`、`k >= 1`。`k > n` 分支退化为逐个删除的线性递归，较大规模需考虑递归深度。

<<< @/snippets/code/杂项/约瑟夫问题.cpp

$\mathcal{O} ( \sqrt{N} )$

<<< @/snippets/code/杂项/约瑟夫问题-2.cpp
