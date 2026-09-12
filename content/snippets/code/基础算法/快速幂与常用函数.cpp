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
int mypow(i64 n, i64 k, int p = MOD) {
    i64 r = 1;
    for (; k; k >>= 1, n = n * n % p) {
        if (k & 1) r = r * n % p;
    }
    return r;
}
i64 mysqrt(i64 n) {
    i64 ans = sqrt(n);
    while ((ans + 1) * (ans + 1) <= n)
        ans++;
    while (ans * ans > n)
        ans--;
    return ans;
}
int mylcm(int x, int y) {
    return x / gcd(x, y) * y;
}
// @book-end

int main() {
    return 0;
}
