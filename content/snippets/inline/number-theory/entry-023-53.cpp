using i64 = long long;
int n;
i64 ai[maxn], bi[maxn];
inline int mypow(int n, int k, int p) {
    int r = 1;
    for (; k; k >>= 1, n = n * n % p)
        if (k & 1) r = r * n % p;
    return r;
}
i64 exgcd(i64 a, i64 b, i64 &x, i64 &y) {
    if (b == 0) {
        x = 1, y = 0;
        return a;
    }
    i64 gcd = exgcd(b, a % b, x, y), tp = x;
    x = y, y = tp - a / b * y;
    return gcd;
}
i64 excrt() {

    i64 x, y, k;
    i64 M = bi[1], ans = ai[1];
    for (int i = 2; i <= n; ++i) {
        i64 a = M, b = bi[i], c = (ai[i] - ans % b + b) % b;
        i64 gcd = exgcd(a, b, x, y), bg = b / gcd;
        if (c % gcd != 0) return -1;
        x = mul(x, c / gcd, bg);
        ans += x * M;
        M *= bg;
        ans = (ans % M + M) % M;
    }
    return (ans % M + M) % M;
}
int main() {
    cin >> n;
    for (int i = 1; i <= n; ++i)
        cin >> bi[i] >> ai[i];
    cout << excrt() << endl;
    return 0;
}
