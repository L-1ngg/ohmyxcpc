---
title: KMP 字符串匹配
order: 10
---

# KMP 字符串匹配

时间复杂度 $O(n + m)$。

```cpp
vector<int> kmp(const string& s, const string& p) {
    int n = s.size(), m = p.size();
    vector<int> nxt(m, 0), res;
    for (int i = 1, j = 0; i < m; i++) {
        while (j && p[i] != p[j]) j = nxt[j - 1];
        if (p[i] == p[j]) j++;
        nxt[i] = j;
    }
    for (int i = 0, j = 0; i < n; i++) {
        while (j && s[i] != p[j]) j = nxt[j - 1];
        if (s[i] == p[j]) j++;
        if (j == m) res.push_back(i - m + 1), j = nxt[j - 1];
    }
    return res;
}
```
