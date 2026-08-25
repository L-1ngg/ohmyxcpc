---
title: 最小割树 Gomory-Hu Tree
order: 220
---

# 最小割树 Gomory-Hu Tree

无向连通图抽象出的一棵树，满足任意两点间的距离是他们的最小割。一共需要跑 $n$ 轮最小割，总复杂度 $\mathcal O(N^3M)$ ，预处理最小割树上任意两点的距离 $\mathcal O(N^2)$ 。

过程：分治 $n$ 轮，每一轮在图上随机选点，跑一轮最小割后连接树边；这一网络的残留网络会将剩余的点分为两组，根据分组分治。

```cpp
void reset() { // struct需要额外封装退流
    for (int i = 0; i < ver.size(); i += 2) {
        ver[i].w += ver[i ^ 1].w;
        ver[i ^ 1].w = 0;
    }
}

signed main() { // Gomory-Hu Tree
    int n, m;
    cin >> n >> m;

    Flow<int> flow(n);
    for (int i = 1; i <= m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        flow.add(u, v, w);
        flow.add(v, u, w);
    }

    vector<int> vis(n + 1), fa(n + 1);
    vector ans(n + 1, vector<int>(n + 1, 1E9)); // N^2 枚举出全部答案
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 1; i <= n; i++) { // 分治 n 轮
        int s = 0; // 本质是在树上随机选点、跑最小割后连边
        for (; s <= n; s++) {
            if (fa[s] != s) break;
        }
        int t = fa[s];

        int ans = flow.work(s, t); // 残留网络将点集分为两组，分治
        adj[s].push_back({t, ans});
        adj[t].push_back({s, ans});

        vis.assign(n + 1, 0);
        auto dfs = [&](auto dfs, int u) -> void {
            vis[u] = 1;
            for (auto it : flow.h[u]) {
                auto [v, c] = flow.ver[it];
                if (c && !vis[v]) {
                    dfs(dfs, v);
                }
            }
        };
        dfs(dfs, s);
        for (int j = 0; j <= n; j++) {
            if (vis[j] && fa[j] == t) {
                fa[j] = s;
            }
        }
    }

    for (int i = 0; i <= n; i++) {
        auto dfs = [&](auto dfs, int u, int fa, int c) -> void {
            ans[i][u] = c;
            for (auto [v, w] : adj[u]) {
                if (v == fa) continue;
                dfs(dfs, v, u, min(c, w));
            }
        };
        dfs(dfs, i, -1, 1E9);
    }

    int q;
    cin >> q;
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << ans[u][v] << "\n"; // 预处理答数组
    }
}
```

> [!NOTE]
> 示例中的 `Flow` 为 [最大流](./max-flow) 条目中的 Dinic 封装，并按作者注释额外封装了 `reset()` 退流。
