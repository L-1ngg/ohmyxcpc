---
title: 约瑟夫问题
order: 30
---

# 约瑟夫问题

$n$ 个人编号 $0,1,2…,n-1$ ，每次数到 $k$ 出局，求最后剩下的人的编号。

$\mathcal O(N)$ 。

```cpp
int jos(int n,int k){
    int res=0;
    repeat(i,1,n+1)res=(res+k)%i;
    return res; // res+1，如果编号从1开始
}
```

$\mathcal O(K\log N)$ ，适用于 $K$ 较小的情况。

```cpp
int jos(int n,int k){
    if(n==1 || k==1)return n-1;
    if(k>n)return (jos(n-1,k)+k)%n; // 线性算法
    int res=jos(n-n/k,k)-n%k;
    if(res<0)res+=n; // mod n
    else res+=res/(k-1); // 还原位置
    return res; // res+1，如果编号从1开始
}
```

$\mathcal O(\sqrt N)$

```cpp
void jos(){
 int64_t n, k, a{}, b{ 1 }; cin >> n >> k; --k;
    while (b < n) {
        auto s = a / k + 1, u = b / k + 1, v = min(k - a / s, (min(u * k, n) - b + u - 1) / u);
        a += s * v, b += u * v;
    }
    cout << a + 1 << '\n';
}
```
