#include <bits/stdc++.h>
using namespace std;

using i64 = long long;
using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

// @book-begin
using i64 = long long;
#include <bits/stdc++.h>
using namespace std;

const int mod = 998244353, N = 1e6 + 10;
i64 fact[N];
struct fwt {
    i64 n;
    vector<i64> a;
    fwt(i64 n) : n(n), a(n + 1) {}
    i64 sum(i64 x) {
        i64 res = 0;
        for (; x; x -= x & -x)
            res += a[x];
        return res;
    }
    void add(i64 x, i64 k) {
        for (; x <= n; x += x & -x)
            a[x] += k;
    }
    i64 query(i64 x, i64 y) { return sum(y) - sum(x - 1); }
};
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    i64 n;
    cin >> n;
    fwt a(n);
    fact[0] = 1;
    for (int i = 1; i <= n; i++) {
        fact[i] = fact[i - 1] * i % mod;
        a.add(i, 1);
    }
    i64 ans = 0;
    for (int i = 1; i <= n; i++) {
        i64 x;
        cin >> x;
        ans = (ans + a.query(1, x - 1) * fact[n - i] % mod) % mod;
        a.add(x, -1);
    }
    cout << (ans + 1) % mod << "\n";
    return 0;
}
// @book-end
