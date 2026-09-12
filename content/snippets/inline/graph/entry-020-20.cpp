using i64 = long long;
i64 n, point[N];
i64 ver[N], head[N], nex[N], tot;
bool v[N];
map<pair<i64, i64>, i64> edge;

void dfs(i64 x) {
    for (i64 i = head[x]; i; i = nex[i]) {
        i64 y = ver[i];
        if (v[y]) continue;
        v[y] = true;
        dfs(y);
        v[y] = false;
    }
    for (i64 i = head[x]; i; i = nex[i]) {
        i64 y = ver[i];
        if (v[y]) continue;
        point[x] += max(point[y] + edge[{x, y}], 0LL);
    }
}
void Solve() {
    cin >> n;
    FOR(i, 1, n) cin >> point[i];
    FOR(i, 2, n) {
        i64 x, y, w;
        cin >> x >> y >> w;
        edge[{x, y}] = edge[{y, x}] = w;
        add(x, y), add(y, x);
    }
    v[1] = true;
    dfs(1);
    i64 ans = -MAX18;
    FOR(i, 1, n) ans = max(ans, point[i]);
    cout << ans << endl;
}
