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
int ans[M];
int n;
int ql;
int qr;

// @book-begin
int cal(auto x) {
    return 0;
}

void solve(int ql, int qr, int l, int r) {

    if (ql > qr) return;
    if (l > r) return;
    if (l == r) {
        for (int q = ql; q <= qr; ++q)
            ans[q] = l;
        return;
    }
    int mid = l + r + 1 >> 1;
    int cnt = cal(mid);
    solve(std::max(ql, cnt + 1), qr, l, mid - 1);
    solve(ql, std::min(qr, cnt), mid, r);
}

void solve() {

    solve(ql, qr, 0, n);
}
// @book-end

int main() {
    return 0;
}
