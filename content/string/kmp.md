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

以最坏 $\mathcal O(N+M)$ 的时间计算 $t$ 在 $s$ 中出现的全部位置。

```cpp
std::vector<int> get_next(std::string& t) {
    std::vector<int> next(t.size());
    next[0] = -1;
    for (int i = 0, j = -1; i < (int)t.size();) {
        if (j == -1 || t[i] == t[j]) {
            ++i, ++j;
            next[i] = j;
        }
        else
            j = next[j];
    }
    return next;
}
```

```cpp
bool kmp(std::string& s, std::string& t) {
    if (t.length() > s.length())return false;
    auto next = get_next(t);

    for (int i = 0, j = 0; i < (int)s.size() && j < (int)t.size();) {
        if (j == -1 || s[i] == t[j]) {
            ++i, ++j;
        }
        else
            j = next[j];
        if (j == (int)t.size())return true;
    }
    return false;
}
```
