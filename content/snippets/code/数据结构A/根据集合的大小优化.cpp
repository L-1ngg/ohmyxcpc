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

struct dsu {
    std::vector<int> d;
    dsu(int n) {
        d.resize(n + 1);
        iota(d.begin(), d.end(), 0);
    }
    int get_root(int x) { return d[x] = (x == d[x] ? x : get_root(d[x])); };
    bool merge(int u, int v) {
        if (get_root(u) != get_root(v)) {
            d[get_root(u)] = get_root(v);
            return true;
        } else
            return false;
    }
};

// @book-begin

#define UFLIMIT (2 << 17)
int unicnt[UFLIMIT];
void ufinit(int n) {
    for (int i = 0; i < n; i++)
        unicnt[i] = 1;
}
int ufroot(int x) {
    return unicnt[x] <= 0 ? -(unicnt[x] = -ufroot(-unicnt[x])) : x;
}
int ufsame(int x, int y) {
    return ufroot(x) == ufroot(y);
}
void uni(int x, int y) {
    if ((x = ufroot(x)) == (y = ufroot(y))) return;
    if (unicnt[x] < unicnt[y]) std::swap(x, y);
    unicnt[x] += unicnt[y];
    unicnt[y] = -x;
}
// @book-end

int main() {
    return 0;
}
