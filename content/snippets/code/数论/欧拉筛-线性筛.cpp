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
int main() {
    vector<int> prime;
    auto euler_Prime = [&](int n) -> void {
        vector<int> v(n + 1);
        for (int i = 2; i <= n; ++i) {
            if (!v[i]) {
                v[i] = i;
                prime.push_back(i);
            }
            for (int j = 0; j < prime.size(); ++j) {
                if (prime[j] > v[i] || prime[j] > n / i) break;
                v[i * prime[j]] = prime[j];
            }
        }
    };
}
// @book-end
