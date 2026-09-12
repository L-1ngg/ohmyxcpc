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

std::vector<int> minp, primes;

void sieve(int n) {
    minp.assign(n + 1, 0);
    primes.clear();

    for (int i = 2; i <= n; i++) {
        if (minp[i] == 0) {
            minp[i] = i;
            primes.push_back(i);
        }

        for (auto p : primes) {
            if (i * p > n) {
                break;
            }
            minp[i * p] = p;
            if (p == minp[i]) {
                break;
            }
        }
    }
}
int exgcd(int a, int b, int &x, int &y) {
    if (!b) {
        x = 1, y = 0;
        return a;
    }
    int d = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return d;
}

// @book-begin
int main() {
    auto calc = [&](int a, int b, int c) {
        int u = 1, v = 1;
        if (a < 0) {
            a = -a;
            u = -1;
        }
        if (b < 0) {
            b = -b;
            v = -1;
        }

        int x, y, d = exgcd(a, b, x, y), ans;
        if (c % d != 0) {
            cout << -1 << "\n";
            return;
        }
        a /= d, b /= d, c /= d;
        x *= c, y *= c;

        ans = (x % b + b - 1) % b + 1;
        auto [A, B] = pair{u * ans, v * (c - ans * a) / b};

        ans = (y % a + a - 1) % a + 1;
        auto [C, D] = pair{u * (c - ans * b) / a, v * ans};

        int num = (C - A) / b + 1;
    };
}
// @book-end
