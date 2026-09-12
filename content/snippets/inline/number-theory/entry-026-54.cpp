using i64 = long long;
namespace min25 {
const int N = 1000000 + 10;
int prime[N], id1[N], id2[N], flag[N], ncnt, m;
i64 g[N], sum[N], a[N], T;
i64 n;
i64 mod;
inline i64 ps(i64 n, i64 k) {
    i64 r = 1;
    for (; k; k >>= 1) {
        if (k & 1) r = r * n % mod;
        n = n * n % mod;
    }
    return r;
}
void finit() {
    memset(g, 0, sizeof(g));
    memset(a, 0, sizeof(a));
    memset(sum, 0, sizeof(sum));
    memset(prime, 0, sizeof(prime));
    memset(id1, 0, sizeof(id1));
    memset(id2, 0, sizeof(id2));
    memset(flag, 0, sizeof(flag));
    ncnt = m = 0;
}
int ID(i64 x) {
    return x <= T ? id1[x] : id2[n / x];
}

i64 calc(i64 x) {
    return x * (x + 1) / 2 - 1;
}

i64 init(i64 x) {
    T = sqrt(x + 0.5);
    for (int i = 2; i <= T; i++) {
        if (!flag[i]) prime[++ncnt] = i, sum[ncnt] = sum[ncnt - 1] + i;
        for (int j = 1; j <= ncnt && i * prime[j] <= T; j++) {
            flag[i * prime[j]] = 1;
            if (i % prime[j] == 0) break;
        }
    }
    for (i64 l = 1; l <= x; l = x / (x / l) + 1) {
        a[++m] = x / l;
        if (a[m] <= T)
            id1[a[m]] = m;
        else
            id2[x / a[m]] = m;
        g[m] = calc(a[m]);
    }
    for (int i = 1; i <= ncnt; i++)
        for (int j = 1; j <= m && (i64)prime[i] * prime[i] <= a[j]; j++)
            g[j] = g[j] - (i64)prime[i] * (g[ID(a[j] / prime[i])] - sum[i - 1]);
}
i64 solve(i64 x) {
    if (x <= 1) return x;
    return n = x, init(n), g[ID(n)];
}
}

using namespace min25;

int main() {

    int tt;
    scanf("%d", &tt);
    while (tt--) {
        finit();
        scanf("%lld%lld", &n, &mod);
        i64 ans = (n + 3) % mod * n % mod * ps(2, mod - 2) % mod + solve(n + 1) - 4;

        ans = (ans + mod) % mod;
        printf("%lld\n", ans);
    }
}
