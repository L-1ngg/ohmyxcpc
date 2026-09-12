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
int n, m, p, b[10000005], prime[1000005], t, min_prime[10000005];
void euler_Prime(int n) {
    for (int i = 2; i <= n; i++) {
        if (b[i] == 0) {
            prime[++t] = i;
            min_prime[i] = t;
        }
        for (int j = 1; j <= t && i * prime[j] <= n; j++) {
            b[prime[j] * i] = 1;
            min_prime[prime[j] * i] = j;
            if (i % prime[j] == 0) break;
        }
    }
}
long long c(int n, int m, int p) {
    euler_Prime(n);
    int a[t + 5];
    for (int i = 1; i <= t; i++)
        a[i] = 0;
    for (int i = n; i >= n - m + 1; i--) {
        int x = i;
        while (x != 1) {
            a[min_prime[x]]++;
            x /= prime[min_prime[x]];
        }
    }
    for (int i = 1; i <= m; i++) {
        int x = i;
        while (x != 1) {
            a[min_prime[x]]--;
            x /= prime[min_prime[x]];
        }
    }
    long long ans = 1;
    for (int i = 1; i <= t; i++) {
        while (a[i] > 0) {
            ans = ans * prime[i] % p;
            a[i]--;
        }
    }
    return ans;
}
int main() {
    cin >> n >> m;
    m = min(m, n - m);
    cout << c(n, m, MOD);
}
// @book-end
