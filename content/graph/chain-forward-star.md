---
title: 链式前向星建图与搜索
order: 8
---

# 链式前向星建图与搜索

很少使用这种建图法。$\tt dfs$ ：标准复杂度为 $\mathcal O(N+M)$。节点子节点的数量包含它自己（至少为 $1$），深度从 $0$ 开始（根节点深度为 $0$）。$\tt bfs$ ：深度从 $1$ 开始（根节点深度为 $1$）。$\tt topsort$ ：有向无环图（包括非联通）才拥有完整的拓扑序列（故该算法也可用于判断图中是否存在环）。每次找到入度为 $0$ 的点并将其放入待查找队列。

```cpp
namespace Graph {
    const int N = 1e5 + 7;
    const int M = 1e6 + 7;
    int tot, h[N], ver[M], ne[M];
    int deg[N], vis[M];

    void clear(int n) {
        tot = 0; //多组样例清空
        for (int i = 1; i <= n; ++i) {
            h[i] = 0;
            deg[i] = vis[i] = 0;
        }
    }
    void add(int x, int y) {
        ver[++tot] = y, ne[tot] = h[x], h[x] = tot;
        ++deg[y];
    }
    void dfs(int x) {
        a.push_back(x); // DFS序
        siz[x] = vis[x] = 1;
        for (int i = h[x]; i; i = ne[i]) {
            int y = ver[i];
            if (vis[y]) continue;
            dis[y] = dis[x] + 1;
            dfs(y);
            siz[x] += siz[y];
        }
        a.push_back(x);
    }
    void bfs(int s) {
        queue<int> q;
        q.push(s);
        dis[s] = 1;
        while (!q.empty()) {
            int x = q.front();
            q.pop();
            for (int i = h[x]; i; i = ne[i]) {
                int y = ver[i];
                if (dis[y]) continue;
                d[y] = d[x] + 1;
                q.push(y);
            }
        }
    }
    bool topsort() {
        queue<int> q;
        vector<int> ans;
        for (int i = 1; i <= n; ++i)
            if (deg[i] == 0) q.push(i);
        while (!q.empty()) {
            int x = q.front();
            q.pop();
            ans.push_back(x);
            for (int i = h[x]; i; i = ne[i]) {
                int y = ver[i];
                --deg[y];
                if (deg[y] == 0) q.push(y);
            }
        }
        return ans.size() == n; //判断是否存在拓扑排序
    }
} // namespace Graph
```

