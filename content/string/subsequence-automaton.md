---
title: 子序列自动机
order: 12
---

# 子序列自动机

对于给定的长度为 $n$ 的主串 $s$，预处理后以 $\mathcal O(m \log n)$ 的复杂度判定长度为 $m$ 的询问串是否是 $s$ 的子序列。

## 原理

核心是转移表 `next[i][c]`：主串第 `i` 个位置**之后**，字符 `c` 第一次出现的位置。匹配时从位置 $0$ 开始，贪心地让询问串的每个字符跳到最近的下一个出现位置，全部找到即为子序列。

例如 $s =$ "banana"：`next[0]['b'] = 1`，`next[1]['n'] = 3`（位置 1 的 `a` 之后，下一个 `n` 在位置 3），`next[3]['n'] = 5`。

## 主要用途

1. **子序列匹配**：反复判断多个询问串是否为主串的子序列（核心用途）
2. **不同子序列计数**：在自动机上 DP，`dp[i]` 表示从位置 $i$ 出发能构成的不同子序列个数
3. **字典序第 k 小子序列**：DP 预处理出各位置能产生的子序列数量后，逐位确定第 $k$ 小的子序列

特点：结构简单（就是一个 next 表）、构建快、查询高效，尤其适用于字符集较小的场景。

## 自动离散化、自动类型匹配封装

元素类型与值域自动推导。查询基于位置列表二分，单次 $\mathcal O(m \log n)$；若预处理完整的 next 转移表（$\mathcal O(n \cdot |\Sigma|)$），查询可降至 $\mathcal O(m)$。

```cpp
template<typename T> struct SequenceAutomaton {
    std::vector<T> alls;
    std::vector<std::vector<int>> ver;

    SequenceAutomaton(auto in)
    {
        for (auto &i : in) {
            alls.push_back(i);
        }
        std::sort(alls.begin(), alls.end());
        alls.erase(std::unique(alls.begin(), alls.end()), alls.end());

        ver.resize(alls.size() + 1);
        for (int i = 0; i < in.size(); i++) {
            ver[get(in[i])].push_back(i + 1);
        }
    }
    bool count(T x)
    {
        return std::binary_search(alls.begin(), alls.end(), x);
    }
    int get(T x)
    {
        return std::lower_bound(alls.begin(), alls.end(), x) - alls.begin();
    }
    bool contains(auto in)
    {
        int at = 0;
        for (auto &i : in) {
            if (!count(i)) {
                return false;
            }

            auto j = get(i);
            auto it = std::lower_bound(ver[j].begin(), ver[j].end(), at + 1);
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

值域大小（$|\Sigma|$）与元素类型（int）需手动指定。

```cpp
struct SequenceAutomaton {
    std::vector<std::vector<int>> ver;

    SequenceAutomaton(std::vector<int> &in, int size) : ver(size + 1)
    {
        for (int i = 0; i < in.size(); i++) {
            ver[in[i]].push_back(i + 1);
        }
    }
    bool contains(std::vector<int> &in)
    {
        int at = 0;
        for (auto &i : in) {
            auto it = std::lower_bound(ver[i].begin(), ver[i].end(), at + 1);
            if (it == ver[i].end()) {
                return false;
            }
            at = *it;
        }
        return true;
    }
};
```
