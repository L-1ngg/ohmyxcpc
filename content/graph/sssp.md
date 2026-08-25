---
title: 单源最短路径（SSSP）
order: 3
---

# 单源最短路径（SSSP 问题）

## （正权稀疏图）动态数组存图+Djikstra 算法

使用优先队列优化，以 $\mathcal O(M\log N)$ 的复杂度计算。

## （负权图）Bellman ford 算法

使用结构体存边（该算法无需存图），以 $\mathcal{O} (NM)$ 的复杂度计算，注意，当所求点的路径上存在负环时，所求点的答案无法得到，但是会比 INF 小（因为负环之后到所求点之间的边权会将 `d[end]` 的值更新），该性质可以用于判断路径上是否存在负环：在 $N-1$ 轮后仍无法得到答案（一般与 ${\tt INF} / 2$ 进行比较）的点，到达其的路径上存在负环。

下方代码例题：求解从 $1$ 到 $n$ 号节点的、最多经过 $k$ 条边的最短距离。

```cpp
const int N = 550, M = 1e5 + 7;
int n, m, k;
struct node { int x, y, w; } ver[M];
int d[N], backup[N];

void bf() {
    memset(d, 0x3f, sizeof d); d[1] = 0;
    for (int i = 1; i <= k; ++ i) {
        memcpy(backup, d, sizeof d);
        for (int j = 1; j <= m; ++ j) {
            int x = ver[j].x, y = ver[j].y, w = ver[j].w;
            d[y] = min(d[y], backup[x] + w);
        }
    }
}
int main() {
    cin >> n >> m >> k;
    for (int i = 1; i <= m; ++ i) {
        int x, y, w; cin >> x >> y >> w;
        ver[i] = {x, y, w};
    }
    bf();
    for (int i = 1; i <= n; ++ i) {
        if (d[i] > INF / 2) cout << "N" << endl;
        else cout << d[n] << endl;
    }
}
```

## （负权图）SPFA 算法

以 $\mathcal{O}(KM)$ 的复杂度计算，其中 $K$ 虽然为常数，但是可以通过特殊的构造退化成接近 $N$ ，需要注意被卡。

```cpp
const int N = 1e5 + 7, M = 1e6 + 7;
int n, m;
int ver[M], ne[M], h[N], edge[M], tot;
int d[N], v[N];

void add(int x, int y, int w) {
    ver[++ tot] = y, ne[tot] = h[x], h[x] = tot;
    edge[tot] = w;
}
void spfa() {
    ms(d, 0x3f); d[1] = 0;
    queue<int> q; q.push(1);
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
int main() {
    cin >> n >> m;
    for (int i = 1; i <= m; ++ i) {
        int x, y, w; cin >> x >> y >> w;
        add(x, y, w);
    }
    spfa();
    for (int i = 1; i <= n; ++ i) {
        if (d[i] == INF) cout << "N" << endl;
        else cout << d[n] << endl;
    }
}
```

> [!WARNING]
> 待补充：「（正权稀疏图）动态数组存图+Djikstra 算法」小节原文仅有文字说明，未附代码实现。
