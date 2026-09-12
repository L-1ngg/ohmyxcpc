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

// @book-begin

template <typename T> T sign(const T &a) {
    return a == 0 ? 0 : (a < 0 ? -1 : 1);
}
template <typename T> T floor(const T &a, const T &b) {

    T A = abs(a), B = abs(b);
    assert(B != 0);
    return sign(a) * sign(b) > 0 ? A / B : -(A + B - 1) / B;
}
template <typename T> T ceil(const T &a, const T &b) {
    T A = abs(a), B = abs(b);
    assert(b != 0);
    return sign(a) * sign(b) > 0 ? (A + B - 1) / B : -A / B;
}
// @book-end

int main() {
    return 0;
}
