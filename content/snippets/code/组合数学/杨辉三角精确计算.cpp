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

int m;
int n;

// @book-begin
int main() {
    vector C(n + 1, vector<long long>(n + 1));
    C[0][0] = 1;
    for (int i = 1; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= n; j++) {
            C[i][j] = C[i - 1][j] + C[i - 1][j - 1];
        }
    }
    cout << C[n][m] << endl;
}
// @book-end
