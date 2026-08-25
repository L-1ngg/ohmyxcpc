---
title: 树上启发式合并 DSU on tree
order: 140
---

# 树上启发式合并 DSU on tree

$\mathcal O(N\log N)$ 。

```cpp
struct HLD {
    std::vector<std::vector<int>> e;
    std::vector<int> siz, son;
    std::vector<i64> ans;
    int hson;
    i64 res;
    HLD(int n) {
        e.resize(n + 1);
        siz.resize(n + 1);
        son.resize(n + 1);
        ans.resize(n + 1);
        hson = 0;
        res = 0;
    }
    void add(int u, int v) {
        e[u].push_back(v);
        e[v].push_back(u);
    }
    void dfs1(int u, int fa) {
        siz[u] = 1;
        for (auto v : e[u]) {
            if (v == fa) continue;
            dfs1(v, u);
            siz[u] += siz[v];
            if (siz[v] > siz[son[u]]) son[u] = v;
        }
    }
    void add(int c) {
    }
    void del(int c) {
    }
    void calc(int u, int fa, int f) {
        if (f == 1) add();
        else del();
        for (auto v : e[u]) {
            if (v == fa || v == hson) continue;
            calc(v, u, f);
        }
    }
    void dfs2(int u, int fa, int opt) {
        for (auto v : e[u]) {
            if (v == fa || v == son[u]) continue;
            dfs2(v, u, 0);
        }
        if (son[u]) {
            dfs2(son[u], u, 1);
            hson = son[u];
        }
        calc(u, fa, 1);
        hson = 0;
        ans[u] = res;
        if (!opt)   calc(u, fa, -1);
    }
    void work() {
        dfs1(1, 0);
        dfs2(1, 0, 0);
    }
};
```
