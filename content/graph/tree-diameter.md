---
title: 树的直径
order: 100
---

# 树的直径

```cpp
struct Tree {
    int n;
    vector<vector<int>> ver;
    Tree(int n) {
        this->n = n;
        ver.resize(n + 1);
    }
    void add(int x, int y) {
        ver[x].push_back(y);
        ver[y].push_back(x);
    }
    int getlen(int root) { // 获取x所在树的直径
        map<int, int> dep; // map用于优化输入为森林时的深度计算，亦可用vector
        function<void(int, int)> dfs = [&](int x, int fa) -> void {
            for (auto y : ver[x]) {
                if (y == fa) continue;
                dep[y] = dep[x] + 1;
                dfs(y, x);
            }
            if (dep[x] > dep[root]) {
                root = x;
            }
        };
        dfs(root, 0);
        int st = root; // 记录直径端点

        dep.clear();
        dfs(root, 0);
        int ed = root; // 记录直径另一端点

        return dep[root];
    }
};
```

## 树论大封装（直径 + 重心 + 中心）

```cpp
struct Tree {
    int n;
    vector<vector<pair<int, int>>> e;
    vector<int> dep, parent, maxdep, d1, d2, s1, s2, up;
    Tree(int n) {
        this->n = n;
        e.resize(n + 1);
        dep.resize(n + 1);
        parent.resize(n + 1);
        maxdep.resize(n + 1);
        d1.resize(n + 1);
        d2.resize(n + 1);
        s1.resize(n + 1);
        s2.resize(n + 1);
        up.resize(n + 1);
    }
    void add(int u, int v, int w) {
        e[u].push_back({w, v});
        e[v].push_back({w, u});
    }
    void dfs(int u, int fa) {
        maxdep[u] = dep[u];
        for (auto [w, v] : e[u]) {
            if (v == fa) continue;
            dep[v] = dep[u] + 1;
            parent[v] = u;
            dfs(v, u);
            maxdep[u] = max(maxdep[u], maxdep[v]);
        }
    }

    void dfs1(int u, int fa) {
        for (auto [w, v] : e[u]) {
            if (v == fa) continue;
            dfs1(v, u);
            int x = d1[v] + w;
            if (x > d1[u]) {
                d2[u] = d1[u], s2[u] = s1[u];
                d1[u] = x, s1[u] = v;
            } else if (x > d2[u]) {
                d2[u] = x, s2[u] = v;
            }
        }
    }
    void dfs2(int u, int fa) {
        for (auto [w, v] : e[u]) {
            if (v == fa) continue;
            if (s1[u] == v) {
                up[v] = max(up[u], d2[u]) + w;
            } else {
                up[v] = max(up[u], d1[u]) + w;
            }
            dfs2(v, u);
        }
    }

    int radius, center, diam;
    void getCenter() {
        center = 1; //中心
        for (int i = 1; i <= n; i++) {
            if (max(d1[i], up[i]) < max(d1[center], up[center])) {
                center = i;
            }
        }
        radius = max(d1[center], up[center]); //距离最远点的距离的最小值
        diam = d1[center] + up[center] + 1; //直径
    }

    int rem; //删除重心后剩余连通块体积的最小值
    int cog; //重心
    vector<bool> vis;
    void getCog() {
        vis.resize(n);
        rem = INT_MAX;
        cog = 1;
        dfsCog(1);
    }
    int dfsCog(int u) {
        vis[u] = true;
        int s = 1, res = 0;
        for (auto [w, v] : e[u]) {
            if (vis[v]) continue;
            int t = dfsCog(v);
            res = max(res, t);
            s += t;
        }
        res = max(res, n - s);
        if (res < rem) {
            rem = res;
            cog = u;
        }
        return s;
    }
};
```
