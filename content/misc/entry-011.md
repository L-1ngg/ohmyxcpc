---
title: "约瑟夫问题"
order: 110
---

# 约瑟夫问题 {#s-a53af0d36d5d}

  $n$ 个人编号 $0 , 1 , 2 \ldots , n - 1$ ，每次数到 $k$ 出局，求最后剩下的人的编号。

$\mathcal{O} ( N )$ 。`repeat` 为赛场宏，没有就写成 `for (int i = 1; i <= n; i++)`。

```cpp
int jos(int n,int k){
    int res=0;
    repeat(i,1,n+1)res=(res+k)%i;
    return res;  // res+1，如果编号从1开始
}
```

$\mathcal{O} ( K \text{log} N )$ ，适用于 $K$ 较小的情况。

<<< @/snippets/code/杂项/约瑟夫问题.cpp

$\mathcal{O} ( \sqrt{N} )$

<<< @/snippets/code/杂项/约瑟夫问题-2.cpp
