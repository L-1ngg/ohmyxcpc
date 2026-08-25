---
title: 单源最短路径（SSSP）
order: 3
---

# 单源最短路径（SSSP 问题）

## （正权稀疏图）动态数组存图+Djikstra 算法

使用优先队列优化，以 $\mathcal O(M\log N)$ 的复杂度计算。

```cpp
// ver[x] = {y, w} 邻接表存图
std::vector<i64> dis(n + 1, INF);
auto dijkstra = [&](int s = 1) -> void {
    using PII = std::pair<int, int>;
    std::priority_queue<PII, std::vector<PII>, std::greater<PII>> q;
    q.emplace(0, s);
    dis[s] = 0;
    std::vector<int> vis(n + 1);
    while (!q.empty()) {
        int x = q.top().second;
        q.pop();
        if (vis[x]) continue;
        vis[x] = 1;
        for (auto [y, w] : ver[x]) {
            if (dis[y] > dis[x] + w) {
                dis[y] = dis[x] + w;
                q.emplace(dis[y], y);
            }
        }
    }
};
```

## （负权图）Bellman ford 算法

使用结构体存边（该算法无需存图），以 $\mathcal{O} (NM)$ 的复杂度计算，注意，当所求点的路径上存在负环时，所求点的答案无法得到，但是会比 INF 小（因为负环之后到所求点之间的边权会将 `d[end]` 的值更新），该性质可以用于判断路径上是否存在负环：在 $N-1$ 轮后仍无法得到答案（一般与 ${\tt INF} / 2$ 进行比较）的点，到达其的路径上存在负环。

下方代码例题：求解从 $1$ 到 $n$ 号节点的、最多经过 $k$ 条边的最短距离。

```cpp
const int LIM = 550, M = 1e5 + 7;
int n, m, k;
struct node { int x, y, w; } ver[M];
int d[LIM], backup[LIM];

void bf()
{
    std::memset(d, 0x3f, sizeof d); d[1] = 0;
    for (int i = 1; i <= k; ++ i) {
        std::memcpy(backup, d, sizeof d);
        for (int j = 1; j <= m; ++ j) {
            int x = ver[j].x, y = ver[j].y, w = ver[j].w;
            d[y] = std::min(d[y], backup[x] + w);
        }
    }
}
signed main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(0);
    std::cin >> n >> m >> k;
    for (int i = 1; i <= m; ++ i) {
        int x, y, w; std::cin >> x >> y >> w;
        ver[i] = {x, y, w};
    }
    bf();
    for (int i = 1; i <= n; ++ i) {
        if (d[i] > 0x3f3f3f3f / 2) std::cout << "N" << '\n';
        else std::cout << d[n] << '\n';
    }
}
```

## （负权图）SPFA 算法

以 $\mathcal{O}(KM)$ 的复杂度计算，其中 $K$ 虽然为常数，但是可以通过特殊的构造退化成接近 $N$ ，需要注意被卡。

```cpp
const int LIM = 1e5 + 7, M = 1e6 + 7;
int n, m;
int ver[M], ne[M], h[LIM], edge[M], tot;
int d[LIM], v[LIM];

void add(int x, int y, int w)
{
    ver[++ tot] = y, ne[tot] = h[x], h[x] = tot;
    edge[tot] = w;
}
void spfa()
{
    std::memset(d, 0x3f, sizeof d); d[1] = 0;
    std::queue<int> q; q.push(1);
    v[1] = 1;
    while(!q.empty()) {
        int x = q.front(); q.pop(); v[x] = 0;
        for (int i = h[x]; i; i = ne[i]) {
            int y = ver[i];
            if(d[y] > d[x] + edge[i]) {
                d[y] = d[x] + edge[i];
                if(v[y] == 0) q.push(y), v[y] = 1;
            }
        }
    }
}
signed main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(0);
    std::cin >> n >> m;
    for (int i = 1; i <= m; ++ i) {
        int x, y, w; std::cin >> x >> y >> w;
        add(x, y, w);
    }
    spfa();
    for (int i = 1; i <= n; ++ i) {
        if (d[i] == 0x3f3f3f3f) std::cout << "N" << '\n';
        else std::cout << d[n] << '\n';
    }
}
```

## （正权稠密图）邻接矩阵存图+Djikstra 算法

很少使用，以 $\mathcal O(N^2)$ 的复杂度计算。

```cpp
const int LIM = 3010;
int n, m, a[LIM][LIM];
int d[LIM], v[LIM];

void dij()
{
    std::memset(d, 0x3f, sizeof d); d[1] = 0;
    for (int i = 1; i <= n; ++ i) {
        int x = 0;
        for (int j = 1; j <= n; ++ j) {
            if(v[j]) continue;
            if(x == 0 || d[x] > d[j]) x = j;
        }
        v[x] = 1;
        for (int j = 1; j <= n; ++ j) d[j] = std::min(d[j], d[x] + a[x][j]);
    }
}
signed main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(0);
    std::cin >> n >> m;
    std::memset(a, 0x3f, sizeof a);
    for (int i = 1; i <= m; ++ i) {
        int x, y, w; std::cin >> x >> y >> w;
        a[x][y] = std::min(a[x][y], w); //注意需要考虑重边问题
        a[y][x] = std::min(a[x][y], w); //无向图建双向边
    }
    dij();
    for (int i = 1; i <= n; ++ i) {
        if (d[i] == 0x3f3f3f3f) std::cout << "N" << '\n';
        else std::cout << d[n] << '\n';
    }
}
```
