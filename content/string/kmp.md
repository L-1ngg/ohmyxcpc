---
title: KMP
order: 2
---

# KMP

> 应用：
>
> 1. 在字符串中查找子串；
> 2. 最小周期：字符串长度-整个字符串的 $\tt border$ ；
> 3. 最小循环节：区别于周期，当字符串长度 $n \bmod (n - nxt[n]) = 0$ 时，等于最小周期，否则为 $n$ 。

以最坏 $\mathcal O(N+M)$ 的时间计算 $t$ 在 $s$ 中出现的全部位置。以下实现为 1-indexed（开头填充 `'-'` 占位）。

```cpp
auto KMP = [&](std::string s, std::string t) -> void {
    int n = s.size(), m = t.size();
    std::vector<int> nxt(m + 1);
    s = '-' + s;
    t = '-' + t;
    for (int i = 2, j = 0; i <= m; i++) {
        while (j && t[i] != t[j + 1]) j = nxt[j];
        if (t[i] == t[j + 1]) j++;
        nxt[i] = j;
    }
    for (int i = 1, j = 0; i <= n; i++) {
        while (j && s[i] != t[j + 1]) j = nxt[j];
        if (s[i] == t[j + 1]) j++;
        if (j == m) {
            std::cout << i - m + 1 << '\n'; // t 在 s 中出现的位置
            j = nxt[j];
        }
    }
};
```
