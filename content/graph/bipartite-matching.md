---
title: 二分图最大匹配
order: 11
---

# 二分图最大匹配

> 二分图：一个图能被分为左右两部分，任何一条边的两个端点都不在同一部分中。
>
> 匹配（独立边集）：一个边的集合，这些边没有公共顶点。
>
> 二分图最大匹配即找到边的数量最多的那个匹配。
>
> 一般我们规定，左半部包含 $n_1$ 个点（编号 $1 - n_1$），右半部包含 $n_2$ 个点（编号 $1-n_2$ ），保证任意一条边的两个端点都不可能在同一部分中。

## 匈牙利算法（KM 算法）解

$\mathcal O (NM)$ 。

```cpp
signed main() {
    int n1, n2, m;
    cin >> n1 >> n2 >> m;

    vector<vector<int>> ver(n1 + 1);
    for (int i = 1; i <= m; ++i) {
        int x, y;
        cin >> x >> y;
        ver[x].push_back(y); //只需要建立单向边
    }

    int ans = 0;
    vector<int> match(n2 + 1);
    for (int i = 1; i <= n1; ++i) {
        vector<int> vis(n2 + 1);
        auto dfs = [&](auto self, int x) -> bool {
            for (auto y : ver[x]) {
                if (vis[y]) continue;
                vis[y] = 1;
                if (!match[y] || self(self, match[y])) {
                    match[y] = x;
                    return true;
                }
            }
            return false;
        };
        if (dfs(dfs, i)) {
            ans++;
        }
    }
    cout << ans << endl;
}
```

## HopcroftKarp 算法（基于最大流）解

该算法基于最大流，常数极小，且引入随机化，几乎卡不掉。最坏时间复杂度为 $\mathcal O(\sqrt NM)$ ，经[测试](https://judge.yosupo.jp/problem/bipartitematching)，在 $N,M$ 均为 $2 \times 10^5$ 的情况下能在 $\sf 60ms$ 内跑完。

```cpp
struct HopcroftKarp {
    int n, m;
    vector<array<int, 2>> ver;
    vector<int> l, r;

    HopcroftKarp(int n, int m) : n(n), m(m) { // 左右半部
        l.assign(n, -1);
        r.assign(m, -1);
    }
    void add(int x, int y) {
        x--, y--; // 这个板子是 0-idx 的
        ver.push_back({x, y});
    }
    int work() {
        vector<int> adj(ver.size());

        mt19937 rgen(chrono::steady_clock::now().time_since_epoch().count());
        shuffle(ver.begin(), ver.end(), rgen); // 随机化防卡

        vector<int> deg(n + 1);
        for (auto &[u, v] : ver) {
            deg[u]++;
        }
        for (int i = 1; i <= n; i++) {
            deg[i] += deg[i - 1];
        }
        for (auto &[u, v] : ver) {
            adj[--deg[u]] = v;
        }

        int ans = 0;
        vector<int> a, p, q(n);
        while (true) {
            a.assign(n, -1), p.assign(n, -1);

            int t = 0;
            for (int i = 0; i < n; i++) {
                if (l[i] == -1) {
                    q[t++] = a[i] = p[i] = i;
                }
            }

            bool match = false;
            for (int i = 0; i < t; i++) {
                int x = q[i];
                if (~l[a[x]]) continue;

                for (int j = deg[x]; j < deg[x + 1]; j++) {
                    int y = adj[j];
                    if (r[y] == -1) {
                        while (~y) {
                            r[y] = x;
                            swap(l[x], y);
                            x = p[x];
                        }
                        match = true;
                        ++ans;
                        break;
                    }
                    if (p[r[y]] == -1) {
                        q[t++] = y = r[y];
                        p[y] = x;
                        a[y] = a[x];
                    }
                }
            }
            if (!match) break;
        }
        return ans;
    }
    vector<array<int, 2>> answer() {
        vector<array<int, 2>> ans;
        for (int i = 0; i < n; i++) {
            if (~l[i]) {
                ans.push_back({i, l[i]});
            }
        }
        return ans;
    }
};

signed main() {
    int n1, n2, m;
    cin >> n1 >> n2 >> m;
    HopcroftKarp flow(n1, n2);
    while (m--) {
        int x, y;
        cin >> x >> y;
        flow.add(x, y);
    }

    cout << flow.work() << "\n";

    auto match = flow.answer();
    for (auto [u, v] : match) {
        cout << u << " " << v << "\n";
    }
}
```

