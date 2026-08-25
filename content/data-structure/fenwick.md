---
title: 树状数组（Fenwick Tree）
order: 4
---

# 树状数组（Fenwick Tree）

```cpp
template<typename T> struct BIT {
    int n;
    vector<T> w;
    BIT(int n, auto &in) : n(n), w(n + 1) { // 预处理填值
        for (int i = 1; i <= n; i++) {
            add(i, in[i]);
        }
    }
    void add(int x, T v) {
        for (; x <= n; x += x & -x) {
            w[x] += v;
        }
    }
    T ask(int x) { // 前缀和查询
        T ans = 0;
        for (; x; x -= x & -x) {
            ans += w[x];
        }
        return ans;
    }
    T ask(int l, int r) { // 差分实现区间和查询
        return ask(r) - ask(l - 1);
    }
};
```

## 逆序对扩展

```cpp
struct BIT {
    int n;
    vector<int> w, chk; // chk 为传入的待处理数组
    BIT(int n, auto &in) : n(n), w(n + 1), chk(in) {}
    /* 需要全部常规封装 */
    int get() {
        vector<array<int, 2>> alls;
        for (int i = 1; i <= n; i++) {
            alls.push_back({chk[i], i});
        }
        sort(alls.begin(), alls.end());
        int ans = 0;
        for (auto [val, idx] : alls) {
            ans += ask(idx + 1, n);
            add(idx, 1);
        }
        return ans;
    }
};
```

## 前驱后继扩展（常规+第 k 小值查询+元素排名查询+元素前驱后继查询）

注意，被查询的值都应该小于等于 $N$ ，否则会越界；如果离散化不可使用，则需要使用平衡树替代。

```cpp
struct BIT {
    int n;
    vector<int> w;
    BIT(int n) : n(n), w(n + 1) {}
    void add(int x, int v) {
        for (; x <= n; x += x & -x) {
            w[x] += v;
        }
    }
    int kth(int x) { // 查找第 k 小的值
        int ans = 0;
        for (int i = __lg(n); i >= 0; i--) {
            int val = ans + (1 << i);
            if (val < n && w[val] < x) {
                x -= w[val];
                ans = val;
            }
        }
        return ans + 1;
    }
    int get(int x) { // 查找 x 的排名
        int ans = 1;
        for (x--; x; x -= x & -x) {
            ans += w[x];
        }
        return ans;
    }
    int pre(int x) { return kth(get(x) - 1); } // 查找 x 的前驱
    int suf(int x) { return kth(get(x + 1)); } // 查找 x 的后继
};
const int N = 10000000; // 可以用于在线处理平衡二叉树的全部要求
signed main() {
    BIT bit(N + 1); // 在线处理不能够离散化，一定要开到比最大值更大
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int op, x;
        cin >> op >> x;
        if (op == 1) bit.add(x, 1); // 插入 x
        else if (op == 2) bit.add(x, -1); // 删除任意一个 x
        else if (op == 3) cout << bit.get(x) << "\n"; // 查询 x 的排名
        else if (op == 4) cout << bit.kth(x) << "\n"; // 查询排名为 x 的数
        else if (op == 5) cout << bit.pre(x) << "\n"; // 求小于 x 的最大值（前驱）
        else if (op == 6) cout << bit.suf(x) << "\n"; // 求大于 x 的最小值（后继）
    }
}
```

## 最值查询扩展（常规+区间最值查询+单点赋值）

以 $\mathcal O(\log \log N)$ 的复杂度运行，但是即便如此依然略优于线段树（后者常数较大）。

```cpp
template<typename T> struct BIT {
    int n;
    vector<T> w, base;
    #define low(x) (x & -x)
    BIT(int n, auto &in) : n(n), w(n + 1), base(n + 1) {
        for (int i = 1; i <= n; i++) {
            update(i, in[i]);
        }
    } /* 可以增加并使用常规封装中的几个函数 */
    void update(int x, int v) { // 单点赋值
        base[x] = max(base[x], v);
        for (; x <= n; x += low(x)) {
            w[x] = max(w[x], v);
        }
    }
    T getMax(int l, int r) { // 最值查询
        T ans = T();
        while (r >= l) {
            ans = max(base[r], ans);
            for (r--; r - low(r) >= l; r -= low(r)) {
                ans = max(w[r], ans);
            }
        }
        return ans;
    }
};
```
