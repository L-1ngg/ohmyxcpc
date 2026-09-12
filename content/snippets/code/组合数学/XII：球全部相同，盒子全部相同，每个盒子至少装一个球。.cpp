#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

// @book-begin
#include <algorithm>
#include <cstdio>
int n, m, fac[400010], minv[400010];
int const mod = 998244353, g = 3, gi = (mod + 1) / g;
int C(int x, int y) {
    if (x < 0 || y < 0 || x < y)
        return 0;
    else
        return 1ll * fac[x] * minv[y] % mod * minv[x - y] % mod;
}
int pow(int x, int y) {
    int res = 1;
    while (y) {
        if (y & 1) res = 1ll * res * x % mod;
        x = 1ll * x * x % mod;
        y >>= 1;
    }
    return res;
}
struct NTT {
    int r[800010], lim;
    NTT() : r(), lim() {}
    void getr(int lm) {
        lim = lm;
        for (int i = 0; i < lim; i++)
            r[i] = (r[i >> 1] >> 1) | ((i & 1) * (lim >> 1));
    }
    void operator()(int *a, int type) {
        for (int i = 0; i < lim; i++)
            if (i < r[i]) std::swap(a[i], a[r[i]]);
        for (int mid = 1; mid < lim; mid <<= 1) {
            int rt = pow(type == 1 ? g : gi, (mod - 1) / (mid << 1));
            for (int j = 0, r = mid << 1; j < lim; j += r) {
                int p = 1;
                for (int k = 0; k < mid; k++, p = 1ll * p * rt % mod) {
                    int x = a[j + k], y = 1ll * a[j + mid + k] * p % mod;
                    a[j + k] = (x + y) % mod, a[j + mid + k] = (x - y + mod) % mod;
                }
            }
        }
        if (type == -1)
            for (int i = 0, p = pow(lim, mod - 2); i < lim; i++)
                a[i] = 1ll * a[i] * p % mod;
    }
} ntt;
void inv(int const *a, int *ans, int n) {
    static int tmp[800010];
    for (int i = 0; i < n << 1; i++)
        tmp[i] = ans[i] = 0;
    ans[0] = pow(a[0], mod - 2);
    for (int m = 2; m <= n; m <<= 1) {
        int lim = m << 1;
        ntt.getr(lim);
        for (int i = 0; i < m; i++)
            tmp[i] = a[i];
        ntt(tmp, 1), ntt(ans, 1);
        for (int i = 0; i < lim; i++)
            ans[i] = ans[i] * (2 - 1ll * ans[i] * tmp[i] % mod + mod) % mod, tmp[i] = 0;
        ntt(ans, -1);
        for (int i = m; i < lim; i++)
            ans[i] = 0;
    }
}
void inte(int const *a, int *ans, int n) {
    for (int i = n - 1; i; i--)
        ans[i] = 1ll * a[i - 1] * pow(i, mod - 2) % mod;
    ans[0] = 0;
}
void der(int const *a, int *ans, int n) {
    for (int i = 1; i < n; i++)
        ans[i - 1] = 1ll * i * a[i] % mod;
    ans[n - 1] = 0;
}
void ln(int const *a, int *ans, int n) {
    static int b[800010];
    for (int i = 0; i < n << 1; i++)
        ans[i] = b[i] = 0;
    inv(a, ans, n);
    der(a, b, n);
    int lim = n << 1;
    ntt.getr(lim);
    ntt(b, 1), ntt(ans, 1);
    for (int i = 0; i < lim; i++)
        b[i] = 1ll * ans[i] * b[i] % mod, ans[i] = 0;
    ntt(b, -1);
    for (int i = n; i < lim; i++)
        b[i] = 0;
    inte(b, ans, n);
}
void exp(int const *a, int *ans, int n) {
    static int f[800010];
    for (int i = 0; i < n << 1; i++)
        ans[i] = f[i] = 0;
    ans[0] = 1;
    for (int m = 2; m <= n; m <<= 1) {
        int lim = m << 1;
        ln(ans, f, m);
        f[0] = (a[0] + 1 - f[0] + mod) % mod;
        for (int i = 1; i < m; i++)
            f[i] = (a[i] - f[i] + mod) % mod;
        ntt.getr(lim);
        ntt(f, 1), ntt(ans, 1);
        for (int i = 0; i < lim; i++)
            ans[i] = 1ll * ans[i] * f[i] % mod, f[i] = 0;
        ntt(ans, -1);
        for (int i = m; i < lim; i++)
            ans[i] = 0;
    }
}
void solve1() {
    printf("%d\n", pow(m, n));
}
void solve2() {
    if (m < n)
        puts("0");
    else
        printf("%lld\n", 1ll * fac[m] * minv[m - n] % mod);
}
void solve3() {
    if (n < m) return puts("0"), void();
    int ans = 0;
    for (int i = 0; i <= m; i++)
        ans = (ans + 1ll * pow(mod - 1, i) * C(m, i) % mod * pow(m - i, n)) % mod;
    printf("%d\n", ans);
}
int s[800010];
void solve4() {
    static int tmp[800010];
    for (int i = 0; i <= n; i++)
        tmp[i] = (i & 1 ? mod - 1ll : 1ll) * minv[i] % mod, s[i] = 1ll * pow(i, n) * minv[i] % mod;
    int lim = 1;
    for (lim = 1; lim <= n + n; lim <<= 1)
        ;
    ntt.getr(lim);
    ntt(tmp, 1), ntt(s, 1);
    for (int i = 0; i < lim; i++)
        s[i] = 1ll * s[i] * tmp[i] % mod;
    ntt(s, -1);
    for (int i = n + 1; i < lim; i++)
        s[i] = 0;
    int ans = 0;
    for (int i = 0; i <= m; i++)
        ans = (ans + s[i]) % mod;
    printf("%d\n", ans);
}
void solve5() {
    printf("%d\n", int(m >= n));
}
void solve6() {
    printf("%d\n", s[m]);
}
void solve7() {
    printf("%d\n", C(n + m - 1, m - 1));
}
void solve8() {
    printf("%d\n", C(m, n));
}
void solve9() {
    printf("%d\n", C(n - 1, m - 1));
}
int ans[800010];
void solve10() {
    static int tmp[800010];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j * i <= n; j++)
            ans[i * j] = (ans[i * j] - 1ll * minv[j] * fac[j - 1] % mod + mod) % mod;
    int lim = 1;
    for (; lim <= n; lim <<= 1)
        ;

    exp(ans, tmp, lim);
    for (int i = 0; i < lim; i++)
        ans[i] = 0;
    inv(tmp, ans, lim);
    printf("%d\n", ans[n]);
}
void solve11() {
    printf("%d\n", int(m >= n));
}
void solve12() {
    printf("%d\n", n - m >= 0 ? ans[n - m] : 0);
}
int main() {
    scanf("%d%d", &n, &m);
    fac[0] = 1;
    for (int i = 1; i <= n + m; i++)
        fac[i] = 1ll * fac[i - 1] * i % mod;
    minv[n + m] = pow(fac[n + m], mod - 2);
    for (int i = n + m; i; i--)
        minv[i - 1] = 1ll * minv[i] * i % mod;
    solve1();
    solve2();
    solve3();
    solve4();
    solve5();
    solve6();
    solve7();
    solve8();
    solve9();
    solve10();
    solve11();
    solve12();
    return 0;
}
// @book-end
