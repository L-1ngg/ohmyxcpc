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

template <typename T> int log2floor(T n) {
    assert(n > 0);
    for (T i = 0, chk = 1;; i++, chk *= 2) {
        if (chk <= n && n < chk * 2) {
            return i;
        }
    }
}
template <typename T> int log2ceil(T n) {
    assert(n > 0);
    for (T i = 0, chk = 1;; i++, chk *= 2) {
        if (n <= chk) {
            return i;
        }
    }
}

int log2floor(int x) {
    return 31 - __builtin_clz(x);
}
int log2ceil(int x) {
    return log2floor(x) + (__builtin_popcount(x) != 1);
}
// @book-end

int main() {
    return 0;
}
