using i64 = long long;
int T, n, m, len, a[20];
i64 l, r, dp[20][15];
i64 dfs(int pos, int pre, int limit) {

    if (pos > len) return 1;
    if (dp[pos][pre] != -1 && !limit) return dp[pos][pre];
    i64 ret = 0;
    int res = limit ? a[len - pos + 1] : 9;
    for (int i = 0; i <= res; i++)
        if (!(i == 4 || (pre == 6 && i == 2))) ret += dfs(pos + 1, i, i == res && limit);
    if (!limit) dp[pos][pre] = ret;
    return ret;
}
i64 part(i64 x) {
    len = 0;
    while (x)
        a[++len] = x % 10, x /= 10;
    memset(dp, -1, sizeof dp);
    return dfs(1, 0, 1);
}
int main() {
    cin >> n;
    while (n--) {
        cin >> l >> r;
        if (l == 0 && r == 0) break;
        if (l)
            printf("%lld\n", part(r) - part(l - 1));
        else
            printf("%lld\n", part(r) - part(l));
    }
}
