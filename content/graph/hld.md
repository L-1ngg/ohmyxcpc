---
title: 树链剖分 HLD
order: 160
---

# 树链剖分 HLD

## 重链剖分

```cpp
struct HPD_tree
{
    int tree_size;
    bool is_hpd_init = false;
    std::vector<std::vector<std::pair<int, i64>>> adj;
    std::vector<int> Fa, size, hson, top, rank, dfn, depth;
    HPD_tree(int n = 0) {
        tree_size = n;
        adj.resize(tree_size + 1);
    }
    void add_edge(int u, int v, i64 w = 1) {
        adj[u].push_back({ v,w });
        adj[v].push_back({ u,w });
    }
    void HPD_init() {
        is_hpd_init = true;
        Fa.assign(tree_size + 1, 0);
        size.assign(tree_size + 1, 0);
        hson.assign(tree_size + 1, 0);
        top.assign(tree_size + 1, 0);
        rank.assign(tree_size + 1, 0);
        dfn.assign(tree_size + 1, 0);
        depth.assign(tree_size + 1, 0);
        std::function<void(int, int, int)> dfs1 = [&](int u, int p, int d)->void {
            hson[u] = 0;
            size[hson[u]] = 0;
            size[u] = 1;
            depth[u] = d;
            for (auto [v, w] : adj[u])if (v != p) {
                dfs1(v, u, d + 1);
                size[u] += size[v];
                Fa[v] = u;
                if (size[v] > size[hson[u]]) {
                    hson[u] = v;
                }
            }
            };
        dfs1(1, 0, 0);
        int tot = 0;
        std::function<void(int, int, int)> dfs2 = [&](int u, int p, int t)->void {
            top[u] = t;
            dfn[u] = ++tot;
            rank[tot] = u;
            if (hson[u]) {
                dfs2(hson[u], u, t);
                for (auto [v, w] : adj[u])if (v != p && v != hson[u]) {
                    dfs2(v, u, v);
                }
            }
            };
        dfs2(1, 0, 1);
    }
    int lca(int u, int v) {
        if (!is_hpd_init)HPD_init();
        while (top[u] != top[v]) {
            if (depth[top[u]] > depth[top[v]])
                u = Fa[top[u]];
            else
                v = Fa[top[v]];
        }
        return depth[u] > depth[v] ? v : u;
    }
    i64 dist(int u, int v) {
        int w = lca(u, v);
        return depth[u] - depth[w] + depth[v] - depth[w] + 1;
    }
    a3 get_diam() {
        i64 cur; int pos;
        std::function<void(int, int, i64)> dfs = [&](int u, int p, i64 d) {
            if (d > cur) {
                cur = d;
                pos = u;
            }
            for (auto [v, dis] : adj[u])if (v != p) {
                dfs(v, u, d + dis);
            }
            };
        cur = 0, pos = 1;
        dfs(pos, 0, cur);
        int u = pos;
        cur = 0;
        dfs(pos, 0, cur);
        int v = pos;
        return { u,v,cur };
    }
};
```

## 轻重链剖分 / 树链剖分

将线段树处理的部分分离，方便修改。支持链上查询/修改、子树查询/修改，建树时间复杂度 $\mathcal O(N\log N)$ ，单次查询时间复杂度 $\mathcal O(\log ^2 N)$ 。

```cpp
struct Segt {
    struct node {
        int l, r, w, lazy;
    };
    vector<int> w;
    vector<node> t;

    Segt() {}
    #define GL (k << 1)
    #define GR (k << 1 | 1)

    void init(vector<int> in) {
        int n = in.size() - 1;
        w.resize(n + 1);
        for (int i = 1; i <= n; i++) {
            w[i] = in[i];
        }
        t.resize(n * 4 + 1);
        auto build = [&](auto self, int l, int r, int k = 1) {
            if (l == r) {
                t[k] = {l, r, w[l], 0}; // 如果有赋值为 0 的操作，则懒标记必须要 -1
                return;
            }
            t[k] = {l, r};
            int mid = (l + r) / 2;
            self(self, l, mid, GL);
            self(self, mid + 1, r, GR);
            pushup(k);
        };
        build(build, 1, n);
    }
    void pushdown(node &p, int lazy) { /* 【在此更新下递函数】 */
        p.w += (p.r - p.l + 1) * lazy;
        p.lazy += lazy;
    }
    void pushdown(int k) { // 不需要动
        if (t[k].lazy == 0) return;
        pushdown(t[GL], t[k].lazy);
        pushdown(t[GR], t[k].lazy);
        t[k].lazy = 0;
    }
    void pushup(int k) { // 不需要动
        auto pushup = [&](node &p, node &l, node &r) { /* 【在此更新上传函数】 */
            p.w = l.w + r.w;
        };
        pushup(t[k], t[GL], t[GR]);
    }
    void modify(int l, int r, int val, int k = 1) {
        if (l <= t[k].l && t[k].r <= r) {
            pushdown(t[k], val);
            return;
        }
        pushdown(k);
        int mid = (t[k].l + t[k].r) / 2;
        if (l <= mid) modify(l, r, val, GL);
        if (mid < r) modify(l, r, val, GR);
        pushup(k);
    }
    int ask(int l, int r, int k = 1) {
        if (l <= t[k].l && t[k].r <= r) {
            return t[k].w;
        }
        pushdown(k);
        int mid = (t[k].l + t[k].r) / 2;
        int ans = 0;
        if (l <= mid) ans += ask(l, r, GL);
        if (mid < r) ans += ask(l, r, GR);
        return ans;
    }
};

struct HLD {
    int n, idx;
    vector<vector<int>> ver;
    vector<int> siz, dep;
    vector<int> top, son, parent;
    vector<int> in, id, val;
    Segt segt;

    HLD(int n) {
        this->n = n;
        ver.resize(n + 1);
        siz.resize(n + 1);
        dep.resize(n + 1);

        top.resize(n + 1);
        son.resize(n + 1);
        parent.resize(n + 1);

        idx = 0;
        in.resize(n + 1);
        id.resize(n + 1);
        val.resize(n + 1);
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
        id[x] = ++idx;
        val[idx] = in[x]; // 建立编号
        top[x] = up;
        if (son[x]) dfs2(son[x], up);
        for (auto y : ver[x]) {
            if (y == parent[x] || y == son[x]) continue;
            dfs2(y, y);
        }
    }
    void modify(int l, int r, int val) { // 链上修改
        while (top[l] != top[r]) {
            if (dep[top[l]] < dep[top[r]]) {
                swap(l, r);
            }
            segt.modify(id[top[l]], id[l], val);
            l = parent[top[l]];
        }
        if (dep[l] > dep[r]) {
            swap(l, r);
        }
        segt.modify(id[l], id[r], val);
    }
    void modify(int root, int val) { // 子树修改
        segt.modify(id[root], id[root] + siz[root] - 1, val);
    }
    int ask(int l, int r) { // 链上查询
        int ans = 0;
        while (top[l] != top[r]) {
            if (dep[top[l]] < dep[top[r]]) {
                swap(l, r);
            }
            ans += segt.ask(id[top[l]], id[l]);
            l = parent[top[l]];
        }
        if (dep[l] > dep[r]) {
            swap(l, r);
        }
        return ans + segt.ask(id[l], id[r]);
    }
    int ask(int root) { // 子树查询
        return segt.ask(id[root], id[root] + siz[root] - 1);
    }
    void work(auto in, int root = 1) { // 在此初始化
        assert(in.size() == n + 1);
        this->in = in;
        dfs1(root);
        dfs2(root, root);
        segt.init(val); // 建立线段树
    }
    void work(int root = 1) { // 在此初始化
        dfs1(root);
        dfs2(root, root);
        segt.init(val); // 建立线段树
    }
};
```
