#include <bits/stdc++.h>
using namespace std;
bool large_enough = false;
inline int read(int MOD = 1e9 + 7) {
    int ans = 0;
    char c = getchar();
    while (!isdigit(c))
        c = getchar();
    while (isdigit(c)) {
        ans = ans * 10 + c - '0';
        if (ans >= MOD) {
            ans %= MOD;
            large_enough = true;
        }
        c = getchar();
    }
    return ans;
}
int phi(int n) {
    int res = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) res = res / i * (i - 1);
        while (n % i == 0)
            n /= i;
    }
    if (n > 1) res = res / n * (n - 1);
    return res;
}
int qpow(int a, int n, int MOD) {
    int ans = 1;
    while (n) {
        if (n & 1) ans = 1LL * ans * a % MOD;
        n >>= 1;
        a = 1LL * a * a % MOD;
    }
    return ans;
}
int main() {
    int a = read(), m = read(), phiM = phi(m), b = read(phiM);
    cout << qpow(a, b + (large_enough ? phiM : 0), m);
    return 0;
}
