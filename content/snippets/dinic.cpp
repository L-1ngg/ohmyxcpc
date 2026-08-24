#include <bits/stdc++.h>
using namespace std;

struct Dinic {
    struct Edge { int to; long long cap; int rev; };
    vector<vector<Edge>> g;
    vector<int> level, it;
    Dinic(int n) : g(n), level(n), it(n) {}
    void addEdge(int u, int v, long long cap) {
        g[u].push_back({v, cap, (int)g[v].size()});
        g[v].push_back({u, 0, (int)g[u].size() - 1});
    }
    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q; level[s] = 0; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto &e : g[u])
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[u] + 1; q.push(e.to);
                }
        }
        return level[t] >= 0;
    }
    long long dfs(int u, int t, long long f) {
        if (u == t) return f;
        for (int &i = it[u]; i < (int)g[u].size(); i++) {
            auto &e = g[u][i];
            if (e.cap > 0 && level[e.to] == level[u] + 1) {
                long long d = dfs(e.to, t, min(f, e.cap));
                if (d > 0) {
                    e.cap -= d; g[e.to][e.rev].cap += d;
                    return d;
                }
            }
        }
        return 0;
    }
    long long maxFlow(int s, int t) {
        long long flow = 0;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            long long f;
            while ((f = dfs(s, t, LLONG_MAX)) > 0) flow += f;
        }
        return flow;
    }
};
