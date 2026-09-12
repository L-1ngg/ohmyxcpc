map<pair<int, int>, int> id;
namespace G {
vector<pair<int, int>> ver[N];
map<pair<int, int>, int> edge;
int v[N], d[N], pre[N], vis[N];
int ans = 0;

void add(int x, int y, int w) {
    ver[x].push_back({y, w});
    edge[{x, y}] = edge[{y, x}] = w;
}
void djikstra(int s) {
    priority_queue<PII, vector<PII>, greater<PII>> q;
    q.push({0, s});
    memset(d, 0x3f, sizeof d);
    d[s] = 0;
    while (!q.empty()) {
        int x = q.top().second;
        q.pop();
        if (v[x]) continue;
        v[x] = 1;
        for (auto [y, w] : ver[x]) {
            if (d[y] >= d[x] + w) {
                d[y] = d[x] + w;
                pre[y] = x;
                q.push({d[y], y});
            }
        }
    }
}
void dfs(int x) {
    vis[x] = 1;
    for (auto [y, w] : ver[x]) {
        if (vis[y]) continue;
        if (pre[y] == x) {
            cout << id[{x, y}] << " ";
            ans += edge[{x, y}];
            dfs(y);
        }
    }
}
void solve(int n) {
    djikstra(1);
    dfs(1);
    cout << endl << ans;
}
}
bool Solve() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= m; ++i) {
        int x, y, w;
        cin >> x >> y >> w;
        G::add(x, y, w), G::add(y, x, w);
        id[{x, y}] = id[{y, x}] = i;
    }
    G::solve(n);
    return 0;
}
