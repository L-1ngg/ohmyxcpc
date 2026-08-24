---
title: 珂朵莉树 ODT
order: 10
---

# 珂朵莉树 ODT

珂朵莉树（ODT），数据随机时配合平推操作能到近似 $O(n \log n)$。

```cpp
struct node {
    int l, r;
    mutable long long v;
    bool operator<(const node& o) const { return l < o.l; }
};
set<node> s;

auto split(int pos) {
    auto it = s.lower_bound({pos, 0, 0});
    if (it != s.end() && it->l == pos) return it;
    --it;
    int l = it->l, r = it->r;
    long long v = it->v;
    s.erase(it);
    s.insert({l, pos - 1, v});
    return s.insert({pos, r, v}).first;
}

void assign(int l, int r, long long v) {
    auto itr = split(r + 1), itl = split(l);
    s.erase(itl, itr);
    s.insert({l, r, v});
}
```
