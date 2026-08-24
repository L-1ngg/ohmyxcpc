---
title: 字典树 Trie
order: 5
---

# 字典树 Trie

时间复杂度 $O(|s|)$ 每次操作。

```cpp
const int N = 1e6 + 10;
int ch[N][26], cnt[N], tot = 0;

void insert(const string& s) {
    int u = 0;
    for (char c : s) {
        int& v = ch[u][c - 'a'];
        if (!v) v = ++tot;
        u = v;
    }
    cnt[u]++;
}

int query(const string& s) {
    int u = 0;
    for (char c : s) {
        u = ch[u][c - 'a'];
        if (!u) return 0;
    }
    return cnt[u];
}
```
