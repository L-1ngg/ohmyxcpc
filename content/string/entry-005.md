---
title: "字符串哈希"
order: 50
---

# 字符串哈希 {#s-13b97cdf23ab}

把串看成 $B$ 进制数对模取余，子串哈希用前缀差：$h [ r + 1 ] - h [ l ] \cdot B^{r - l + 1}$。$\mathcal{O} ( N )$ 预处理，$\mathcal{O} ( 1 )$ 比相等。单模可能被卡，双模或随机底数更稳。

## 双哈希封装 {#s-55ed26c9fae8}

先 `init()` 生成幂表；`Zmod` 见数论章。前导哨兵 `1`（空串哈希为 `1`），`substring(l, r)` 为 $0$ 下标闭区间，`modify(idx, x)` 计算单点替换后的整串哈希（不修改内部字符串和前缀表）。随机质数：1111111121、1211111123、1311111119。

**接口：** `get()` 返回整串双哈希，`substring(l, r)` 返回闭区间子串双哈希。`modify(idx, x)` 返回将该位置替换后的整串哈希，不修改内部字符串和前缀表；多次调用彼此独立。

<<< @/snippets/inline/string/entry-005-38.cpp

## 前后缀去重 {#s-b8dea635994c}

`sample please ease` 去重后得到 `samplease`。

**接口：** `compress(in)` 按输入顺序合并字符串，每次删除当前结果后缀与下一串前缀的重叠部分。

<<< @/snippets/inline/string/entry-005-39.cpp
