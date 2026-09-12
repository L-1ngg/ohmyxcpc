---
title: "约瑟夫问题"
order: 360
---

# 约瑟夫问题 {#s-7d305518fe23}

求约瑟夫环最后存活者，输入 `n >= 1`、`k >= 1`，返回从 `0` 开始的编号。第一版逐步递推、时间 $O(n)$；批量跳跃版本适合较小 `k`，具体速度取决于 `n` 与 `k` 的关系。

**编号：** 返回从 `0` 开始的存活者编号，题目从 `1` 编号时加 `1`。

```cpp
int jos(int n, int k) {
    int res = 0;
    repeat(i, 1, n + 1) res = (res + k) % i;
    return res;
}
```

$\mathcal{O} ( K \text{log} N )$ ，适用于 $K$ 较小的情况。

**编号与边界：** `jos(n, k)` 使用从 `0` 开始的编号，要求 `n >= 1`、`k >= 1`；`k > n` 时退化为线性递归。

<<< @/snippets/code/数论/约瑟夫问题.cpp

$\mathcal{O} ( \sqrt{N} )$

<<< @/snippets/code/数论/约瑟夫问题-2.cpp
