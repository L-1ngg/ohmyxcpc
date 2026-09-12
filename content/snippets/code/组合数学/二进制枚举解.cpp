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
    for (int i = 1; i < (1 << m); i++) {
        i64 t = 1, cnt = 0;
        for (int j = 0; j < m; j++) {
            if (i >> j & 1) {
                cnt++;
                t *= p[j];
                if (t > n) {
                    t = -1;
                    break;
                }
            }
        }
        if (t != -1) {
            if (cnt & 1)
                ans += n / t;
            else
                ans -= n / t;
        }
    }
    cout << ans << "\n";
    return 0;
}
// @book-end
