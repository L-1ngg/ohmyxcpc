---
title: 字典树（Trie）
order: 7
---

# 字典树（Trie）

## 基础封装

```cpp
struct Trie {
    int ch[N][63], cnt[N], idx = 0;
    std::map<char, int> mp;
    void init()
    {
        i64 id = 0;
        for (char c = 'a'; c <= 'z'; c++) mp[c] = ++id;
        for (char c = 'A'; c <= 'Z'; c++) mp[c] = ++id;
        for (char c = '0'; c <= '9'; c++) mp[c] = ++id;
    }
    void insert(std::string s)
    {
        int u = 0;
        for (int i = 0; i < s.size(); i++) {
            int v = mp[s[i]];
            if (!ch[u][v]) ch[u][v] = ++idx;
            u = ch[u][v];
            cnt[u]++;
        }
    }
    i64 query(std::string s)
    {
        int u = 0;
        for (int i = 0; i < s.size(); i++) {
            int v = mp[s[i]];
            if (!ch[u][v]) return 0;
            u = ch[u][v];
        }
        return cnt[u];
    }
    void Clear()
    {
        for (int i = 0; i <= idx; i++) {
            cnt[i] = 0;
            for (int j = 0; j <= 62; j++) {
                ch[i][j] = 0;
            }
        }
        idx = 0;
    }
} trie;
```

## 01 字典树

```cpp
struct Trie {
    int n, idx;
    std::vector<std::vector<int>> ch;
    Trie(int n)
    {
        this->n = n;
        idx = 0;
        ch.resize(30 * (n + 1), std::vector<int>(2));
    }
    void insert(int x)
    {
        int u = 0;
        for (int i = 30; ~i; i--) {
            int &v = ch[u][x >> i & 1];
            if (!v) v = ++idx;
            u = v;
        }
    }
    int query(int x)
    {
        int u = 0, res = 0;
        for (int i = 30; ~i; i--) {
            int v = x >> i & 1;
            if (ch[u][!v]) {
                res += (1 << i);
                u = ch[u][!v];
            } else {
                u = ch[u][v];
            }
        }
        return res;
    }
};
```
