#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

int f[M];

// @book-begin
string inv_kangtuo(int ans, int n) {
    vector<int> used(n + 1, 0);
    string s;
    ans--;
    for (int i = 0; i < n; i++) {
        int rk = ans / f[n - i - 1];
        ans %= f[n - i - 1];
        int cnt = 0;
        for (int j = 1; j <= n; j++) {
            if (used[j]) continue;
            if (cnt == rk) {
                used[j] = 1;
                s += char('0' + j);
                break;
            }
            cnt++;
        }
    }
    return s;
}
// @book-end

int main() {
    return 0;
}
