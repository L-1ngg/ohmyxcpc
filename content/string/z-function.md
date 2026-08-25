---
title: Z 函数
order: 3
---

# Z 函数

获取字符串 $s$ 和 $s[i,n-1]$ （即以 $s[i]$ 开头的后缀）的最长公共前缀（LCP）的长度，总复杂度 $\mathcal O(N)$。

```cpp
std::vector<int> z_function(std::string s) {
    int n = (int)s.length();
    std::vector<int> z(n);
    for (int i = 1, l = 0, r = 0; i < n; ++i) {
        if (i <= r && z[i - l] < r - i + 1) {
            z[i] = z[i - l];
        }
        else {
            z[i] = std::max(0, r - i + 1);
            while (i + z[i] < n && s[z[i]] == s[i + z[i]]) ++z[i];
        }
        if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
    }
    return z;
}
```
