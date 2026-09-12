#include <bits/stdc++.h>
using namespace std;

using i64 = long long;
using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

// @book-begin
using i64 = long long;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    i64 n, m;
    cin >> n >> m;
    vector<i64> p(m);
    for (int i = 0; i < m; i++)
        cin >> p[i];
    i64 ans = 0;
    function<void(i64, i64, i64)> dfs = [&](i64 x, i64 s, i64 odd) {
        if (x == m) {
            if (s == 1) return;
            ans += odd * (n / s);
            return;
        }
        dfs(x + 1, s, odd);
        if (s <= n / p[x]) dfs(x + 1, s * p[x], -odd);
    };
    dfs(0, 1, -1);
    cout << ans << "\n";
    return 0;
}
// @book-end
