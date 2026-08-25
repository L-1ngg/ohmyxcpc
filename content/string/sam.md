---
title: 后缀自动机（SAM）
order: 11
---

# 后缀自动机（SAM）

定义 $|\Sigma|$ 是字符集的大小，复杂度为 $\mathcal O(N\log |\Sigma|)$ 。

后缀自动机（Suffix Automaton, SAM）虽然也能用于匹配，但它的强大之处在于对**单个字符串**的**所有子串**进行深度分析。除去 AC 自动机也能做的简单子串匹配外，后缀自动机还能高效完成以下任务：

1. **统计不同子串的数量**：
   - 后缀自动机可以在线性时间内计算出一个字符串中本质不同的子串有多少个。这是 AC 自动机完全无法做到的。
2. **计算最长公共子串（LCS）**：
   - 通过构建两个或多个字符串的广义后缀自动机，可以高效地找到它们的最长公共子串。这虽然也涉及多字符串，但其解决问题的角度和 AC 自动机完全不同。
3. **查找字典序第 k 小子串**：
   - 后缀自动机的图结构天然支持按字典序遍历，因此可以高效地找出所有不同子串中，按字典序排序后的第 k 个。
4. **计算任意子串的出现次数**：
   - 对于给定的字符串 S 的任意一个子串 P，后缀自动机可以快速计算出 P 在 S 中出现了多少次。而 AC 自动机只能计算“词典中”的串的出现次数。
5. **寻找最小循环移位**：
   - 这是一个经典应用，可以利用后缀自动机在线性时间内找到一个字符串的最小字典序循环移位。

如果把 AC 自动机看作是“**在一篇文章里找特定的几个关键词**”的专家，那么后缀自动机就是“**给你一篇文章，然后问关于这篇文章任何片段（子串）的任何刁钻问题**”的全能专家。它的应用深度和广度远超多模式匹配。

```cpp
// 有向无环图
struct SuffixAutomaton {
    static constexpr int N = 1e6;
    struct node {
        int len, link, nxt[26];
        int siz;
    } t[N << 1];
    int cntNodes;
    SuffixAutomaton() {
        cntNodes = 1;
        fill(t[0].nxt, t[0].nxt + 26, 1);
        t[0].len = -1;
    }
    int extend(int p, int c) {
        if (t[p].nxt[c]) {
            int q = t[p].nxt[c];
            if (t[q].len == t[p].len + 1) {
                return q;
            }
            int r = ++cntNodes;
            t[r].siz = 0;
            t[r].len = t[p].len + 1;
            t[r].link = t[q].link;
            copy(t[q].nxt, t[q].nxt + 26, t[r].nxt);
            t[q].link = r;
            while (t[p].nxt[c] == q) {
                t[p].nxt[c] = r;
                p = t[p].link;
            }
            return r;
        }
        int cur = ++cntNodes;
        t[cur].len = t[p].len + 1;
        t[cur].siz = 1;
        while (!t[p].nxt[c]) {
            t[p].nxt[c] = cur;
            p = t[p].link;
        }
        t[cur].link = extend(p, c);
        return cur;
    }
};
```

endpos, size 按需
link 构造后缀树

```cpp
struct SAM {
    struct node {
        int len, link, endpos, size;
        std::map<char, int> next;
        node() {
            len = link = endpos = -1;
            size = 0;
            next = std::map<char, int>();
        }
    };
    std::vector<node> nodes;
    int last;
    int n;

    SAM(std::string& s) {
        n = s.length();
        nodes.reserve(2 * n);
        nodes.assign(1, node());
        nodes[0].len = 0;
        nodes[0].link = -1;
        last = 0;
        for (int i = 0;i < n;++i) {
            extend(s[i], i + 1);
        }
    }

    void extend(char c, int pos) {
        int cur = nodes.size();
        nodes.emplace_back();
        nodes[cur].len = nodes[last].len + 1;
        int p = last;
        while (p != -1 && !nodes[p].next.count(c)) {
            nodes[p].next[c] = cur;
            p = nodes[p].link;
        }
        if (p == -1) {
            nodes[cur].link = 0;
        }
        else {
            int q = nodes[p].next[c];
            if (nodes[p].len + 1 == nodes[q].len) {
                nodes[cur].link = q;
            }
            else {
                int clone = nodes.size();
                nodes.emplace_back();
                nodes[clone].len = nodes[p].len + 1;
                nodes[clone].link = nodes[q].link;
                nodes[clone].next = nodes[q].next;
                while (p != -1 && nodes[p].next[c] == q) {
                    nodes[p].next[c] = clone;
                    p = nodes[p].link;
                }
                nodes[q].link = nodes[cur].link = clone;
            }
        }
        nodes[cur].endpos = pos;
        nodes[cur].size = 1;
        last = cur;
    }

    void debug() {
        for (auto x : nodes) {
            std::cerr << x.len << ' ';
            std::cerr << x.link << ' ';
            std::cerr << x.endpos << ' ';
            std::cerr << x.size << ' ';
            std::cerr << '\n';
        }
    }
};
```
