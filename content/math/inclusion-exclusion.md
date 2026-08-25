---
title: 容斥原理
order: 107
---

# 容斥原理

> 定义：$\big|S_1 \cup S_2 \cup S_3 \cup … \cup S_n \big | =\sum_{i=1}^N|S_i|   -   \sum_{i,j=1}^N \big| S_i \cap S_j \big|   +   \sum_{i,j,k=1}^N \big| S_i \cap S_j \cap S_k \big| -…$

例题：给定一个整数 $n$ 和 $m$ 个不同的质数 $p_1, p_2, ..., p_m$，请你求出 1 ∼ $n$ 中能被 $p_1, p_2, ..., p_m$ 中的至少一个数整除的整数有多少个。

## 二进制枚举解

```cpp
int main(){
    ios::sync_with_stdio(false);cin.tie(0);
    LL n, m;
    cin >> n >> m;
    vector <LL> p(m);
    for (int i = 0; i < m; i ++ )
        cin >> p[i];
    LL ans = 0;
    for (int i = 1; i < (1 << m); i ++ ){
        LL t = 1, cnt = 0;
        for (int j = 0; j < m; j ++ ){
            if (i >> j & 1){
                cnt ++ ;
                t *= p[j];
                if (t > n){
                    t = -1;
                    break;
                }
            }
        }
        if (t != -1){
            if (cnt & 1) ans += n / t;
            else ans -= n / t;
        }
    }
    cout << ans << "\n";
    return 0;
}
```

## dfs 解

```cpp
int main(){
    ios::sync_with_stdio(false);cin.tie(0);
    LL n, m;
    cin >> n >> m;
    vector <LL> p(m);
    for (int i = 0; i < m; i ++ )
        cin >> p[i];
    LL ans = 0;
    function<void(LL, LL, LL)> dfs = [&](LL x, LL s, LL odd){
        if (x == m){
            if (s == 1) return;
            ans += odd * (n / s);
            return;
        }
        dfs(x + 1, s, odd);
        if (s <= n / p[x]) dfs(x + 1, s * p[x], -odd);
    };
    dfs(0, 1, -1);
    cout << ans << "\n";
    return 0;
}
```
