---
title: 选数
order: 102
---

# 选数

从 $N$ 个整数中任选 $K$ 个整数相加。

## DFS 解

使用 $\tt{}DFS$ 求解。

```cpp
int n, k; cin >> n >> k;
vector<int> in(n), now(n);
for (auto &it : in) { cin >> it; }
auto dfs = [&](auto self, int k, int bit, int idx) -> void {
    for (int i = idx; i < n; i++) {
        now[bit] = in[i];
        if (bit < k - 1) { self(self, k, bit + 1, i + 1); }
        if (bit == k - 1) {
            int add = 0;
            for (int j = 0; j < k; j++) {
                add += now[j];
            }
            cout << add << endl;
        }
    }
};
dfs(dfs, k, 0, 0);
```

## 位运算状压

```cpp
int n, k; cin >> n >> k;
vector<int> in(n);
for (auto &it : in) { cin >> it; }
int comb = (1 << k) - 1, U = 1 << n;
while (comb < U) {
    int add = 0;
    for (int i = 0; i < n; i++) {
        if (1 << i & comb) {
            add += in[i];
        }
    }
    cout << add << "\n";

    int x = comb & -comb;
    int y = comb + x;
    int z = comb & ~y;
    comb = (z / x >> 1) | y;
}
```
