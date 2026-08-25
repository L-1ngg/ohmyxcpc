---
title: 主席树（可持久化线段树）
order: 9
---

# 主席树（可持久化线段树）

以 $\mathcal O(N\log N)$ 的时间复杂度建树、查询、修改。

```cpp
struct PreesidentTree {
    static constexpr int N = 2e5 + 10;
    int cntNodes, root[N];

    struct node {
        int l, r;
        int cnt;
    }tr[4 * N + 17 * N];

    //u 是新节点，v 是旧节点
    void modify(int& u, int v, int l, int r, int x) {
        u = ++cntNodes;
        tr[u] = tr[v];
        tr[u].cnt++;
        if (l == r) return;
        int mid = (l + r) / 2;
        if (x <= mid) modify(tr[u].l, tr[v].l, l, mid, x);
        else modify(tr[u].r, tr[v].r, mid + 1, r, x);
    }

    //u 是新节点，v 是旧节点
    int kth(int u, int v, int l, int r, int k) {
        if (l == r) return l;
        int res = tr[tr[u].l].cnt - tr[tr[v].l].cnt;
        int mid = (l + r) / 2;
        if (k <= res) return kth(tr[u].l, tr[v].l, l, mid, k);
        else return kth(tr[u].r, tr[v].r, mid + 1, r, k - res);
    }
};
```
