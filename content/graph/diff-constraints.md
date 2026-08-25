---
title: 差分约束
order: 18
---

# 差分约束

给出一组包含 $m$ 个不等式，有 $n$ 个未知数的形如：$\begin{cases} x_{u_1}-x_{v_1}\leq w_1 \\ x_{u_2}-x_{v_2} \leq w_2 \\ \cdots \\ x_{u_m} - x_{v_m} \leq w_m\end{cases}$ 的不等式组，求任意一组满足这个不等式组的解。$\sf SPFA$ 解，$\mathcal O(nm)$ 。[参考](https://www.luogu.com.cn/problem/P5960)

```cpp
signed main() {
    int n, m;
    cin >> n >> m;

    vector<array<int, 3>> e(m + 1);
    for (int i = 1; i <= m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        e[i] = {v, u, w};
    }

    vector<int> d(n + 1, 1E9);
    d[1] = 0;
    for (int i = 1; i < n; i++) {
        for (int j = 1; j <= m; j++) {
            auto [u, v, w] = e[j];
            d[v] = min(d[v], d[u] + w);
        }
    }
    for (int i = 1; i <= m; i++) {
        auto [u, v, w] = e[i];
        if (d[v] > d[u] + w) {
            cout << "NO\n";
            return 0;
        }
    }
    for (int i = 1; i <= n; i++) {
        cout << d[i] << " \n"[i == n];
    }
    return 0;
}
```

