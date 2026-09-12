#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

template <class... A> int ms(A &&...);

// @book-begin
const int N = 550, INF = 0x3f3f3f3f;
int n, m, g[N][N];
int d[N], v[N];
int prim() {
    ms(d, 0x3f);
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        int t = -1;
        for (int j = 1; j <= n; ++j)
            if (v[j] == 0 && (t == -1 || d[j] < d[t])) t = j;
        v[t] = 1;
        if (i && d[t] == INF) return INF;
        if (i) ans += d[t];
        for (int j = 1; j <= n; ++j)
            d[j] = min(d[j], g[t][j]);
    }
    return ans;
}
int main() {
    ms(g, 0x3f);
    cin >> n >> m;
    while (m--) {
        int x, y, w;
        cin >> x >> y >> w;
        g[x][y] = g[y][x] = min(g[x][y], w);
    }
    int t = prim();
    if (t == INF)
        cout << "impossible" << endl;
    else
        cout << t << endl;
}
// @book-end
