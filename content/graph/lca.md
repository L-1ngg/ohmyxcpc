---
title: 最近公共祖先 LCA
order: 120
---

# 最近公共祖先 LCA

## 树链剖分解法

预处理时间复杂度 $\mathcal O(N)$ ；单次查询 $\mathcal O(\log N)$ ，常数较小。

```cpp
struct HLD {
    int n, idx;
    vector<vector<int>> ver;
    vector<int> siz, dep;
    vector<int> top, son, parent;

    HLD(int n) {
        this->n = n;
        ver.resize(n + 1);
        siz.resize(n + 1);
        dep.resize(n + 1);

        top.resize(n + 1);
        son.resize(n + 1);
        parent.resize(n + 1);
    }
    void add(int x, int y) { // 建立双向边
        ver[x].push_back(y);
        ver[y].push_back(x);
    }
    void dfs1(int x) {
        siz[x] = 1;
        dep[x] = dep[parent[x]] + 1;
        for (auto y : ver[x]) {
            if (y == parent[x]) continue;
            parent[y] = x;
            dfs1(y);
            siz[x] += siz[y];
            if (siz[y] > siz[son[x]]) {
                son[x] = y;
            }
        }
    }
    void dfs2(int x, int up) {
        top[x] = up;
        if (son[x]) dfs2(son[x], up);
        for (auto y : ver[x]) {
            if (y == parent[x] || y == son[x]) continue;
            dfs2(y, y);
        }
    }
    int lca(int x, int y) {
        while (top[x] != top[y]) {
            if (dep[top[x]] > dep[top[y]]) {
                x = parent[top[x]];
            } else {
                y = parent[top[y]];
            }
        }
        return dep[x] < dep[y] ? x : y;
    }
    int clac(int x, int y) { // 查询两点间距离
        return dep[x] + dep[y] - 2 * dep[lca(x, y)];
    }
    void work(int root = 1) { // 在此初始化
        dfs1(root);
        dfs2(root, root);
    }
};
```

## 树上倍增解法

预处理时间复杂度 $\mathcal O(N\log N)$ ；单次查询 $\mathcal O(\log N)$ ，但是常数比树链剖分解法更大。

**封装一：基础封装，针对无权图。**

```cpp
struct Tree {
    int n;
    vector<vector<int>> ver, val;
    vector<int> lg, dep;
    Tree(int n) {
        this->n = n;
        ver.resize(n + 1);
        val.resize(n + 1, vector<int>(30));
        lg.resize(n + 1);
        dep.resize(n + 1);
        for (int i = 1; i <= n; i++) { //预处理 log
            lg[i] = lg[i - 1] + (1 << lg[i - 1] == i);
        }
    }
    void add(int x, int y) { // 建立双向边
        ver[x].push_back(y);
        ver[y].push_back(x);
    }
    void dfs(int x, int fa) {
        val[x][0] = fa; // 储存 x 的父节点
        dep[x] = dep[fa] + 1;
        for (int i = 1; i <= lg[dep[x]]; i++) {
            val[x][i] = val[val[x][i - 1]][i - 1];
        }
        for (auto y : ver[x]) {
            if (y == fa) continue;
            dfs(y, x);
        }
    }
    int lca(int x, int y) {
        if (dep[x] < dep[y]) swap(x, y);
        while (dep[x] > dep[y]) {
            x = val[x][lg[dep[x] - dep[y]] - 1];
        }
        if (x == y) return x;
        for (int k = lg[dep[x]] - 1; k >= 0; k--) {
            if (val[x][k] == val[y][k]) continue;
            x = val[x][k];
            y = val[y][k];
        }
        return val[x][0];
    }
    int clac(int x, int y) { // 倍增查询两点间距离
        return dep[x] + dep[y] - 2 * dep[lca(x, y)];
    }
    void work(int root = 1) { // 在此初始化
        dfs(root, 0);
    }
};
```

**封装二：扩展封装，针对有权图，支持“倍增查询两点路径上的最大边权”功能**。

```cpp
struct Tree {
    int n;
    vector<vector<int>> val, Max;
    vector<vector<pair<int, int>>> ver;
    vector<int> lg, dep;
    Tree(int n) {
        this->n = n;
        ver.resize(n + 1);
        val.resize(n + 1, vector<int>(30));
        Max.resize(n + 1, vector<int>(30));
        lg.resize(n + 1);
        dep.resize(n + 1);
        for (int i = 1; i <= n; i++) { //预处理 log
            lg[i] = lg[i - 1] + (1 << lg[i - 1] == i);
        }
    }
    void add(int x, int y, int w) { // 建立双向边
        ver[x].push_back({y, w});
        ver[y].push_back({x, w});
    }
    void dfs(int x, int fa) {
        val[x][0] = fa;
        dep[x] = dep[fa] + 1;
        for (int i = 1; i <= lg[dep[x]]; i++) {
            val[x][i] = val[val[x][i - 1]][i - 1];
            Max[x][i] = max(Max[x][i - 1], Max[val[x][i - 1]][i - 1]);
        }
        for (auto [y, w] : ver[x]) {
            if (y == fa) continue;
            Max[y][0] = w;
            dfs(y, x);
        }
    }
    int lca(int x, int y) {
        if (dep[x] < dep[y]) swap(x, y);
        while (dep[x] > dep[y]) {
            x = val[x][lg[dep[x] - dep[y]] - 1];
        }
        if (x == y) return x;
        for (int k = lg[dep[x]] - 1; k >= 0; k--) {
            if (val[x][k] == val[y][k]) continue;
            x = val[x][k];
            y = val[y][k];
        }
        return val[x][0];
    }
    int clac(int x, int y) { // 倍增查询两点间距离
        return dep[x] + dep[y] - 2 * dep[lca(x, y)];
    }
    int query(int x, int y) { // 倍增查询两点路径上的最大边权（带权图）
        auto get = [&](int x, int y) -> int {
            int ans = 0;
            if (x == y) return ans;
            for (int i = lg[dep[x]]; i >= 0; i--) {
                if (dep[val[x][i]] > dep[y]) {
                    ans = max(ans, Max[x][i]);
                    x = val[x][i];
                }
            }
            ans = max(ans, Max[x][0]);
            return ans;
        };
        int fa = lca(x, y);
        return max(get(x, fa), get(y, fa));
    }
    void work(int root = 1) { // 在此初始化
        dfs(root, 0);
    }
};
```

## ST 表预处理解法

```cpp
struct LCA {
    int n, LOG;
    std::vector<int> l, r, id, dep, parent, lg;
    std::vector<std::vector<int>> st;
    const std::vector<std::vector<int>>& adj;
    int tot = 0;

    // 构造函数：传入节点数 n (1-index)、邻接表 adj、根节点 root
    LCA(int _n, const std::vector<std::vector<int>>& _adj, int root)
        : n(_n), adj(_adj)
    {
        LOG = 32 - __builtin_clz(n);  // ⌊log2(n)⌋ 的上界
        l.assign(n + 1, 0);
        r.assign(n + 1, 0);
        id.assign(n + 1, 0);
        dep.assign(n + 1, 0);
        parent.assign(n + 1, 0);
        lg.assign(n + 2, 0);

        // 预处理对数
        for (int i = 2; i <= n; i++)
            lg[i] = lg[i >> 1] + 1;

        // 1) 建立 dfs 序，记录 l[u], r[u], id[]
        dfs(root, 0);

        // 2) 构建 ST 表用于 RMQ
        st.assign(LOG + 1, std::vector<int>(n + 2));
        for (int i = 1; i <= n; i++)
            st[0][i] = id[i];

        for (int j = 1; j <= LOG; j++) {
            for (int i = 1; i + (1 << j) - 1 <= n; i++) {
                int x = st[j - 1][i];
                int y = st[j - 1][i + (1 << (j - 1))];
                st[j][i] = (dep[x] < dep[y] ? x : y);
            }
        }
    }

    // 返回节点 u 在序列中的位置 l[u], 以及构造 parent, dep
    void dfs(int u, int p) {
        parent[u] = p;
        dep[u] = dep[p] + 1;
        l[u] = ++tot;
        id[tot] = u;
        for (int v : adj[u]) {
            if (v == p) continue;
            dfs(v, u);
        }
        r[u] = tot;
    }

    // O(1) 查询 LCA
    int lca(int u, int v) const {
        // 如果 u 是 v 的祖先，直接返回 u；反之同理
        if (l[u] <= l[v] && r[u] >= r[v]) return u;
        if (l[v] <= l[u] && r[v] >= r[u]) return v;

        if (l[u] > l[v]) std::swap(u, v);

        int L = l[u], R = l[v];
        int k = lg[R - L + 1];
        int x1 = st[k][L], x2 = st[k][R - (1 << k) + 1];
        int x = (dep[x1] < dep[x2] ? x1 : x2);

        return parent[x];
    }
};
```
