---
title: 回文自动机（PAM）
order: 10
---

# 回文自动机（PAM）

也称回文树。

```cpp
struct PalindromeAutomaton {
    constexpr static int N = 5e5 + 10;
    int tr[N][26], fail[N], len[N];
    int cntNodes, last;
    int dep[N]; //记录深度
    int cnt[N]; //记录出现次数
    std::string s;
    PalindromeAutomaton(std::string s) {
        memset(tr, 0, sizeof tr);
        memset(fail, 0, sizeof fail);
        memset(dep, 0, sizeof dep);
        memset(cnt, 0, sizeof cnt);
        len[0] = 0, fail[0] = 1;
        len[1] = -1, fail[1] = 0;
        cntNodes = 1;
        last = 0;
        this->s = s;
    }
    void insert(char c, int i) {
        int u = get_fail(last, i);
        if (!tr[u][c - 'a']) {
            int v = ++cntNodes;
            fail[v] = tr[get_fail(fail[u], i)][c - 'a'];
            tr[u][c - 'a'] = v;
            len[v] = len[u] + 2;
            dep[v] = dep[fail[v]] + 1;
        }
        last = tr[u][c - 'a'];
        cnt[last] += 1;
    }
    void countAll() {
        for (int i = cntNodes;i >= 0;i--)
            cnt[fail[i]] += cnt[i];
    }
    int get_fail(int u, int i) {
        while (i - len[u] - 1 <= -1 || s[i - len[u] - 1] != s[i]) {
            u = fail[u];
        }
        return u;
    }
};
```

```cpp
const int TL = 10;
const char BC = '0';
struct PAM {
    struct node
    {
        int len, link, cnt;
        std::array<int, TL> next;
    };
    std::vector<node> nodes;
    int last;
    std::string s;
    int n;
    PAM(std::string& s) {
        n = s.length();
        nodes.reserve(n);
        this->s = s;
        nodes.assign(2, node());
        last = 0;
        nodes[0].len = 0;
        nodes[0].link = 1;
        nodes[1].len = -1;
        nodes[1].link = 0;
        for (int i = 0;i < n;++i) {
            extend(s[i], i);
        }
    }
    void extend(char ch, int p) {
        int u = get_fail(last, p);
        int c = ch - BC;
        if (!nodes[u].next[c]) {
            int v = nodes.size();
            nodes.emplace_back();
            nodes[v].link = nodes[get_fail(nodes[u].link, p)].next[c];
            nodes[u].next[c] = v;
            nodes[v].len = nodes[u].len + 2;
        }
        last = nodes[u].next[c];
        nodes[last].cnt++;
    }
    int get_fail(int u, int i) {
        while (i - nodes[u].len - 1 < 0 || s[i - nodes[u].len - 1] != s[i]) {
            u = nodes[u].link;
        }
        return u;
    }
    void debug() {
        for (auto node : nodes) {
            std::cerr << node.cnt << ' ';
            std::cerr << node.len << ' ';
            std::cerr << node.link << '\n';
        }
    }
};
```
