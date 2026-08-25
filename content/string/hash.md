---
title: 字符串哈希
order: 5
---

# 字符串哈希

## 双哈希封装

随机质数列表：1111111121、1211111123、1311111119。

```cpp
const int LIM = 1 << 21;
static const int mod1 = 1E9 + 7, base1 = 127;
static const int mod2 = 1E9 + 9, base2 = 131;
using U = Zmod<mod1>;
using V = Zmod<mod2>;
std::vector<U> val1;
std::vector<V> val2;
void init(int n = LIM)
{
    val1.resize(n + 1), val2.resize(n + 2);
    val1[0] = 1, val2[0] = 1;
    for (int i = 1; i <= n; i++) {
        val1[i] = val1[i - 1] * base1;
        val2[i] = val2[i - 1] * base2;
    }
}
struct String {
    std::vector<U> hash1;
    std::vector<V> hash2;
    std::string s;

    String(std::string s_) : s(s_), hash1{1}, hash2{1}
    {
        for (auto it : s) {
            hash1.push_back(hash1.back() * base1 + it);
            hash2.push_back(hash2.back() * base2 + it);
        }
    }
    std::pair<U, V> get() // 输出整串的哈希值
    {
        return {hash1.back(), hash2.back()};
    }
    std::pair<U, V> substring(int l, int r) // 输出子串的哈希值
    {
        if (l > r) std::swap(l, r);
        U ans1 = hash1[r + 1] - hash1[l] * val1[r - l + 1];
        V ans2 = hash2[r + 1] - hash2[l] * val2[r - l + 1];
        return {ans1, ans2};
    }
    std::pair<U, V> modify(int idx, char x) // 修改 idx 位为 x
    {
        int n = s.size() - 1;
        U ans1 = hash1.back() + val1[n - idx] * (x - s[idx]);
        V ans2 = hash2.back() + val2[n - idx] * (x - s[idx]);
        return {ans1, ans2};
    }
};
```

## 前后缀去重

`sample please ease` 去重后得到 `samplease`。

```cpp
std::string compress(std::vector<std::string> in) // 前后缀压缩
{
    std::vector<U> hash1{1};
    std::vector<V> hash2{1};
    std::string ans = "#";
    for (auto s : in) {
        s = "#" + s;
        int st = 0;
        U chk1 = 0;
        V chk2 = 0;
        for (int j = 1; j < s.size() && j < ans.size(); j++) {
            chk1 = chk1 * base1 + s[j];
            chk2 = chk2 * base2 + s[j];
            if ((hash1.back() == hash1[ans.size() - 1 - j] * val1[j] + chk1) &&
                (hash2.back() == hash2[ans.size() - 1 - j] * val2[j] + chk2)) {
                st = j;
            }
        }
        for (int j = st + 1; j < s.size(); j++) {
            ans += s[j];
            hash1.push_back(hash1.back() * base1 + s[j]);
            hash2.push_back(hash2.back() * base2 + s[j]);
        }
    }
    return ans.substr(1);
}
```

> [!WARNING] 待补充：封装依赖 `Zmod` 取模类模板，原文未包含其定义，可参照 [取模类](/misc/modint) 实现。
