---
title: 子序列自动机
order: 12
---

# 子序列自动机

对于给定的长度为 $n$ 的主串 $s$ ，以 $\mathcal O(n)$ 的时间复杂度预处理、$\mathcal O(m + \log \textrm{size:}s)$ 的复杂度判定长度为 $m$ 的询问串是否是主串的子序列。

相比于后缀自动机（SAM）和回文自动机（PAM），子序列自动机（Subsequence Automaton）在结构上要简单得多，但它同样是处理特定字符串问题的有效工具。它的主要应用领域集中在与**子序列**相关的匹配和统计问题上。

## 什么是子序列自动机？

对于一个给定的字符串 S（长度为 n），它的子序列自动机是一个能够识别 S 所有子序列的自动机。其构造非常直观和简单：

它通常被实现为一个二维数组 `next[i][c]`，表示在字符串的第 `i` 个位置之后（不包括 `i`），字符 `c` 第一次出现的位置。这个数组可以在 O(n×∣Σ∣) 的时间内预处理出来，其中 ∣Σ∣ 是字符集的大小（例如，对于小写字母是 26）。

举例：

对于字符串 S = "banana"

next[0]['b'] 是 1 (第一个 'b' 的位置)

next[1]['n'] 是 3 (位置 1 'a' 之后，下一个 'n' 在位置 3)

next[3]['n'] 是 5 (位置 3 'n' 之后，下一个 'n' 在位置 5)

## 主要用途

子序列自动机的主要用途可以归结为以下几点：

1. **判断一个字符串是否为子序列（子序列匹配）**：
   - 这是最核心和最常见的用途。给定一个模式串 T，要判断它是否是主串 S 的子序列，只需利用预处理好的 `next` 数组进行贪心匹配。从位置 0 开始，依次为 T 的每个字符在 S 中寻找下一个最近的匹配位置。这个过程的效率极高，时间复杂度为 O(∣T∣)。
2. **解决“公共子序列”相关问题**：
   - 虽然寻找“最长公共子序列”（LCS）通常使用动态规划，但在某些特定场景下，子序列自动机可以提供不同的解题思路。
   - 例如，在多个字符串上构建各自的子序列自动机，然后通过在这些自动机上同步转移（类似 DP），可以用来寻找多个字符串的“最短的公共超序列”（Shortest Common Supersequence）或解决其他相关的公共子序列变种问题。
3. **计算不同子序列的数量**：
   - 可以通过在子序列自动机上进行动态规划（DP）来计算一个字符串本质不同的子序列有多少个。DP 状态通常定义为 `dp[i]` 表示从位置 `i` 开始的子序列个数。
4. **寻找字典序第 k 小子序列**：
   - 与计算数量类似，通过在自动机上进行 DP，预先计算出从每个位置出发能产生多少不同的子序列，然后就可以按位确定第 k 小的子序列应该选择哪个字符作为开头，并跳转到相应的位置。

- **结构简单**：相比 SAM 和 PAM，它的概念和实现都非常简单，就是一个`next`数组。
- **构建快速**：预处理速度很快，尤其适用于字符集较小的情况。
- **匹配高效**：对于子序列匹配问题，查询效率是线性的，与主串长度无关。

**子序列自动机是专门用于高效处理字符串“子序列”相关问题的简单数据结构。当题目需要反复、快速地判断一个或多个字符串是否为某个主串的子序列，或者需要对子序列进行统计和计数时，它就是非常有用的工具。**

## 自动离散化、自动类型匹配封装

```cpp
template<typename T> struct SequenceAutomaton {
    vector<T> alls;
    vector<vector<int>> ver;

    SequenceAutomaton(auto in) {
        for (auto &i : in) {
            alls.push_back(i);
        }
        sort(alls.begin(), alls.end());
        alls.erase(unique(alls.begin(), alls.end()), alls.end());

        ver.resize(alls.size() + 1);
        for (int i = 0; i < in.size(); i++) {
            ver[get(in[i])].push_back(i + 1);
        }
    }
    bool count(T x) {
        return binary_search(alls.begin(), alls.end(), x);
    }
    int get(T x) {
        return lower_bound(alls.begin(), alls.end(), x) - alls.begin();
    }
    bool contains(auto in) {
        int at = 0;
        for (auto &i : in) {
            if (!count(i)) {
                return false;
            }

            auto j = get(i);
            auto it = lower_bound(ver[j].begin(), ver[j].end(), at + 1);
            if (it == ver[j].end()) {
                return false;
            }
            at = *it;
        }
        return true;
    }
};
```

## 朴素封装

原时间复杂度中的 $\textrm{size:}s$ 需要手动设置。类型需要手动设置。

```cpp
struct SequenceAutomaton {
    vector<vector<int>> ver;

    SequenceAutomaton(vector<int> &in, int size) : ver(size + 1) {
        for (int i = 0; i < in.size(); i++) {
            ver[in[i]].push_back(i + 1);
        }
    }
    bool contains(vector<int> &in) {
        int at = 0;
        for (auto &i : in) {
            auto it = lower_bound(ver[i].begin(), ver[i].end(), at + 1);
            if (it == ver[i].end()) {
                return false;
            }
            at = *it;
        }
        return true;
    }
};
```
