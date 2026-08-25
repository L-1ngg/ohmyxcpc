---
title: AC 自动机
order: 9
---

# AC 自动机

定义 $|s_i|$ 是模板串的长度，$|S|$ 是文本串的长度，$|\Sigma|$ 是字符集的大小（常数，一般为 $26$），时间复杂度为 $\mathcal O(\sum|s_i|+|S|)$ 。

本条目提供两个版本：

- **数组版**：静态数组，速度最快；`query` 沿 fail 链累加计数并将访问过的状态置 -1 去重，直接返回文本串命中各模式串的**总次数**（注意该过程会修改自动机状态，同一自动机只能用一次查询）。
- **动态开点版**：`vector` 按需分配；`work()` 先让文本串在自动机上跑一遍记录各状态命中次数，再在 fail 树上 DFS 汇总，返回**每个状态的计数数组**——配合 `add()` 记录的模式串结尾节点，可得到每个模式串各自的出现次数；附 `next`/`link`/`len`/`size` 访问接口。

## 数组版

```cpp
// Trie+Kmp，多模式串匹配
struct ACAutomaton {
    static constexpr int N = 1e6 + 10;
    int ch[N][26], fail[N], cntNodes;
    int cnt[N];
    ACAutomaton()
    {
        cntNodes = 1;
    }
    void insert(std::string s)
    {
        int u = 1;
        for (auto c : s) {
            int &v = ch[u][c - 'a'];
            if (!v) v = ++cntNodes;
            u = v;
        }
        cnt[u]++;
    }
    void build()
    {
        std::fill(ch[0], ch[0] + 26, 1);
        std::queue<int> q;
        q.push(1);
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            for (int i = 0; i < 26; i++) {
                int &v = ch[u][i];
                if (!v)
                    v = ch[fail[u]][i];
                else {
                    fail[v] = ch[fail[u]][i];
                    q.push(v);
                }
            }
        }
    }
    i64 query(std::string t)
    {
        i64 ans = 0;
        int u = 1;
        for (auto c : t) {
            u = ch[u][c - 'a'];
            for (int v = u; v && ~cnt[v]; v = fail[v]) {
                ans += cnt[v];
                cnt[v] = -1;
            }
        }
        return ans;
    }
};
```

## 动态开点版

```cpp
struct AhoCorasick {
    static constexpr int ALPHABET = 26;
    struct Node {
        int len;
        int link;
        std::array<int, ALPHABET> next;
        Node() : len{ 0 }, link{ 0 }, next{} {}
    };

    std::vector<Node> t;

    AhoCorasick()
    {
        init();
    }

    void init()
    {
        t.assign(2, Node());
        t[0].next.fill(1);
        t[0].len = -1;
    }

    int newNode()
    {
        t.emplace_back();
        return t.size() - 1;
    }

    int add(const std::string& a)
    {
        int p = 1;
        for (auto c : a) {
            int x = c - 'a';
            if (t[p].next[x] == 0) {
                t[p].next[x] = newNode();
                t[t[p].next[x]].len = t[p].len + 1;
            }
            p = t[p].next[x];
        }
        return p;
    }

    void get_fail()
    {
        std::queue<int> q;
        q.push(1);

        while (!q.empty()) {
            int x = q.front();
            q.pop();

            for (int i = 0; i < ALPHABET; i++) {
                if (t[x].next[i] == 0) {
                    t[x].next[i] = t[t[x].link].next[i];
                }
                else {
                    t[t[x].next[i]].link = t[t[x].link].next[i];
                    q.push(t[x].next[i]);
                }
            }
        }
    }

    std::vector<int> work(std::string s)
    {
        get_fail();
        int p = 1;
        std::vector<int> f(t.size());
        for (auto c : s) {
            p = next(p, c - 'a');
            f[p]++;
        }

        std::vector<std::vector<int>> adj(t.size());
        for (int i = 2; i < t.size(); i++) {
            adj[link(i)].push_back(i);
        }

        std::function<void(int)> dfs = [&](int x) -> void {
            for (auto y : adj[x]) {
                dfs(y);
                f[x] += f[y];
            }
        };
        dfs(1);
        return f;
    }

    int next(int p, int x)
    {
        return t[p].next[x];
    }

    int link(int p)
    {
        return t[p].link;
    }

    int len(int p)
    {
        return t[p].len;
    }

    int size()
    {
        return t.size();
    }
};
```
