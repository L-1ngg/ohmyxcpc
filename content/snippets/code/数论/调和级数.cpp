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
    const int N = 1E5;
    vector<vector<int>> dic(N + 1);
    for (int i = 1; i <= N; i++) {
        for (int j = i; j <= N; j += i) {
            dic[j].push_back(i);
        }
    }
}
// @book-end
