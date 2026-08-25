---
title: 物品装箱
order: 107
---

# 物品装箱

有 $N$ 个物品，第 $i$ 个物品为 $a[i]$ ，有无限个容量为 $C$ 的空箱子。两种装箱方式，输出需要多少个箱子才能装完所有物品。

## 从前往后装（线段树解）

```cpp
const int N = 1e6 + 10;
int T, n, a[N], c, tr[N << 2];
void pushup(int u){
    tr[u] = max(tr[u << 1], tr[u << 1 | 1]);
}
void build(int u, int l, int r){
    if (l == r) tr[u] = c;
    else {
        int mid = l + r >> 1;
        build(u << 1, l, mid);
        build(u << 1 | 1, mid + 1, r);
        pushup(u);
    }
}
void update(int u, int l, int r, int p, int k){
    if (l > p || r < p) return;
    if (l == r) tr[u] -= k;
    else {
        int mid = l + r >> 1;
        update(u << 1, l, mid, p, k);
        update(u << 1 | 1, mid + 1, r, p, k);
        pushup(u);
    }
}
int query(int u, int l, int r, int k){
    if (l == r){
        if (tr[u] >= k) return l;
        return n + 1;
    }
    int mid = l + r >> 1;
    if (tr[u << 1] >= k) return query(u << 1, l, mid, k);
    else return query(u << 1 | 1, mid + 1, r, k);
}
int main() {
    cin >> n >> c;
    for (int i = 1; i <= n; i++) cin >> a[i];
    build(1, 1, n);
    for (int i = 1; i <= n; i++)
        update(1, 1, n, query(1, 1, n, a[i]), a[i]);
    cout << query(1, 1, n, c) - 1 << " ";
}
```

## 选择最优的箱子装（multiset 解）

选择能放下物品且剩余容量最小的箱子放物品

```cpp
void solve(){
    cin >> n >> c;
    for (int i = 1; i <= n; i++) cin >> a[i];
    multiset <int> s;
    for (int i = 1; i <= n; i++){
        auto it = s.lower_bound(a[i]);
        if (it == s.end()) s.insert(c - a[i]);
        else {
            int x = *it;
            // multiset 可以存放重复数据，如果是删除某个值的话，会去掉多个箱子
            // 导致答案错误，所以直接删除对应位置的元素
            s.erase(it);
            s.insert(x - a[i]);
        }
    }
    cout << s.size() << "\n";
}
```
