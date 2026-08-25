---
title: 树套树
order: 7
---

# 树套树

## 线段树套平衡树

```cpp
#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
using pii = std::pair<int, int>;
const int inf = 2147483647;

tree<pii, null_type, std::less<pii>, rb_tree_tag, tree_order_statistics_node_update> ver;

template<typename Info>
struct SegmentTree {
    int n;
    std::vector<Info> info;

    SegmentTree() : n(0) {}

    void init(int n_) {
        n = n_;
        info.assign(4 << std::__lg(n), Info());
    }

public:
    // --- 初始化与构建 ---
    void build(const std::vector<int>& a) {
        _build(1, 0, n, a);
    }

private:
    void _build(int p, int l, int r, const std::vector<int>& a) {
        // 从叶子节点开始，向上启发式合并来构建整棵树
        if (r - l == 1) {
            if (l < a.size()) info[p].ver.insert({ a[l], l });
            return;
        }
        int m = (l + r) / 2;
        _build(2 * p, l, m, a);
        _build(2 * p + 1, m, r, a);

        // 启发式合并 (小树合并到大树)
        if (info[2 * p].ver.size() > info[2 * p + 1].ver.size()) {
            info[p].ver = info[2 * p].ver;
            for (const auto& item : info[2 * p + 1].ver) info[p].ver.insert(item);
        }
        else {
            info[p].ver = info[2 * p + 1].ver;
            for (const auto& item : info[2 * p].ver) info[p].ver.insert(item);
        }
    }

public:
    // 单点修改
    void update(int pos, int old_val, int new_val) {
        _update(1, 0, n, pos, old_val, new_val);
    }

    // 查询排名 (返回比 k 小的数的个数)
    int query_rank_count(int l, int r, int k) {
        return _query_rank_count(1, 0, n, l, r, k);
    }

    // 查询前驱
    int query_pred(int l, int r, int k) {
        return _query_pred(1, 0, n, l, r, k);
    }

    // 查询后继
    int query_succ(int l, int r, int k) {
        return _query_succ(1, 0, n, l, r, k);
    }

private:
    void _update(int p, int l, int r, int pos, int old_val, int new_val) {
        info[p].ver.erase({ old_val, pos });
        info[p].ver.insert({ new_val, pos });
        if (r - l == 1) return;
        int m = (l + r) / 2;
        if (pos < m) _update(2 * p, l, m, pos, old_val, new_val);
        else _update(2 * p + 1, m, r, pos, old_val, new_val);
    }

    int _query_rank_count(int p, int l, int r, int x, int y, int k) {
        if (l >= y || r <= x) return 0;
        if (l >= x && r <= y) {
            return info[p].ver.order_of_key({ k, -1 });
        }
        int m = (l + r) / 2;
        return _query_rank_count(2 * p, l, m, x, y, k) + _query_rank_count(2 * p + 1, m, r, x, y, k);
    }

    int _query_pred(int p, int l, int r, int x, int y, int k) {
        if (l >= y || r <= x) return -inf;
        if (l >= x && r <= y) {
            auto it = info[p].ver.lower_bound({ k, -1 });
            if (it == info[p].ver.begin()) return -inf;
            return (--it)->first;
        }
        int m = (l + r) / 2;
        return std::max(_query_pred(2 * p, l, m, x, y, k), _query_pred(2 * p + 1, m, r, x, y, k));
    }

    int _query_succ(int p, int l, int r, int x, int y, int k) {
        if (l >= y || r <= x) return inf;
        if (l >= x && r <= y) {
            auto it = info[p].ver.upper_bound({ k, inf });
            if (it == info[p].ver.end()) return inf;
            return it->first;
        }
        int m = (l + r) / 2;
        return std::min(_query_succ(2 * p, l, m, x, y, k), _query_succ(2 * p + 1, m, r, x, y, k));
    }
};

struct Info {
    tree<pii, null_type, std::less<pii>, rb_tree_tag, tree_order_statistics_node_update> ver;
};
```
