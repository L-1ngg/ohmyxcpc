#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

// @book-begin

struct hash_pair {
    template <typename T1, typename T2> size_t operator()(const pair<T1, T2> &p) const {

        return (hash<T1>()(p.first) << 1) ^ hash<T2>()(p.second);
    }
};
unordered_set<pair<int, int>, hash_pair> S;

struct hash_tuple {
    template <typename... Ts> size_t operator()(const tuple<Ts...> &t) const {
        return apply([](const Ts &...xs) { return (hash<Ts>()(xs) ^ ...); }, t);
    }
};
unordered_map<tuple<int, int, int>, int, hash_tuple> M;
// @book-end

int main() {
    return 0;
}
