#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const double eps = 1e-8;
const double PI = acos(-1.0);

// @book-begin
const int N = 1e5 + 7, M = 1e6 + 7, INF = 0x3f3f3f3f;
int n, m;
int ver[M], ne[M], h[N], edge[M], tot;
int d[N], v[N];

void add(int x, int y, int w) {
    ver[++tot] = y, ne[tot] = h[x], h[x] = tot;
    edge[tot] = w;
}
void spfa() {
    memset(d, 0x3f, sizeof d);
    d[1] = 0;
    queue<int> q;
    q.push(1);
    v[1] = 1;
    while (!q.empty()) {
        int x = q.front();
        q.pop();
        v[x] = 0;
        for (int i = h[x]; i; i = ne[i]) {
            int y = ver[i];
            if (d[y] > d[x] + edge[i]) {
                d[y] = d[x] + edge[i];
                if (v[y] == 0) q.push(y), v[y] = 1;
            }
        }
    }
}
int main() {
    cin >> n >> m;
    for (int i = 1; i <= m; ++i) {
        int x, y, w;
        cin >> x >> y >> w;
        add(x, y, w);
    }
    spfa();
    for (int i = 1; i <= n; ++i) {
        if (d[i] == INF)
            cout << "N" << endl;
        else
            cout << d[i] << endl;
    }
}
// @book-end
