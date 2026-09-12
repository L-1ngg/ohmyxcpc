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

std::vector<i64> get_linear_basis(std::vector<i64> &nums, int N = 63) {
    std::vector<i64> p(N + 1);
    auto insert = [&](i64 x) {
        for (int s = N; s >= 0; --s)
            if (x >> s & 1) {
                if (!p[s]) {
                    p[s] = x;
                    break;
                }
                x ^= p[s];
            }
    };
    for (auto &x : nums)
        insert(x);
    return p;
}

signed main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(0), std::cout.tie(0);
    int n;
    std::cin >> n;
    std::vector<i64> nums(n);
    for (auto &x : nums)
        std::cin >> x;
    const int N = 63;
    auto p = get_linear_basis(nums, N);
    i64 ans = 0;
    for (int s = N; s >= 0; --s)
        ans = std::max(ans, ans ^ p[s]);
    std::cout << ans;
    return 0;
}
// @book-end
