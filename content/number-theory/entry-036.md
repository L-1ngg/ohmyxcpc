---
title: "约瑟夫问题"
order: 360
---

# 约瑟夫问题 {#s-7d305518fe23}

  $n$ 个人编号 $0 , 1 , 2 \ldots , n - 1$ ，每次数到 $k$ 出局，求最后剩下的人的编号。三段分别适用：线性 $\mathcal{O} ( N )$ 任意 $k$；$\mathcal{O} ( K \text{log} N )$ 适合 $K$ 小；$\mathcal{O} ( \sqrt{N} )$ 适合单次大询问。`repeat(i,a,b)` 是 i 从 a 到 b-1 的宏，可等价写成 `for (int i = a; i < b; ++i)`。

```cpp
int jos(int n,int k){
    int res=0;
    repeat(i,1,n+1)res=(res+k)%i;
    return res;  // res+1，如果编号从1开始
}
```

$\mathcal{O} ( K \text{log} N )$ ，适用于 $K$ 较小的情况。

<<< @/snippets/code/数论/约瑟夫问题.cpp

$\mathcal{O} ( \sqrt{N} )$

<<< @/snippets/code/数论/约瑟夫问题-2.cpp
