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
namespace std {
template <> struct hash<vector<int>> {
    size_t operator()(const vector<int> &p) const {
        size_t seed = 0;
        for (int i : p) {
            seed ^= hash<int>()(i) + 0x9e3779b9 + (seed << 6) + (seed >> 2);
        }
        return seed;
    }
};
}
unordered_set<vector<int>> S;
// @book-end

int main() {
    return 0;
}
