---
title: 数位 DP
order: 2
---

# 数位 DP

```cpp
/* pos 表示当前枚举到第几位
sum 表示 d 出现的次数
limit 为 1 表示枚举的数字有限制
zero 为 1 表示有前导 0
d 表示要计算出现次数的数 */
const int N = 15;
LL dp[N][N];
int num[N];
LL dfs(int pos, LL sum, int limit, int zero, int d) {
    if (pos == 0) return sum;
    if (!limit && !zero && dp[pos][sum] != -1) return dp[pos][sum];
    LL ans = 0;
    int up = (limit ? num[pos] : 9);
    for (int i = 0; i <= up; i++) {
        ans += dfs(pos - 1, sum + ((!zero || i) && (i == d)), limit && (i == num[pos]),
                   zero && (i == 0), d);
    }
    if (!limit && !zero) dp[pos][sum] = ans;
    return ans;
}
LL solve(LL x, int d) {
    memset(dp, -1, sizeof dp);
    int len = 0;
    while (x) {
        num[++len] = x % 10;
        x /= 10;
    }
    return dfs(len, 0, 1, 1, d);
}
```

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
constexpr int MAXN = 24 + 10;
int a[MAXN], mod, f[MAXN][MAXN * 10][MAXN * 10];

int dfs(int pos, int sum, int cur, bool lead0, bool lim) {
    if (!pos)return !lead0 && sum == mod && cur == 0;
    int& now = f[pos][cur][sum];
    if (!lead0 && !lim && ~now)return now;
    int up = lim ? a[pos] : 9, res = 0;
    for (int i = 0;i <= up;++i)
        res += dfs(pos - 1, sum + i, (cur * 10 + i) % mod, lead0 && !i, lim && i == up);
    if (!lead0 && !lim)now = res;
    return res;
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(0), cout.tie(0);
    int n;cin >> n;
    int len = 0;
    while (n)a[++len] = n % 10, n /= 10;
    int res = 0;
    for (int i = 1;i <= len * 9;++i) {
        mod = i;memset(f, -1, sizeof f);
        res += dfs(len, 0, 0, 1, 1);
    }
    cout << res;
    return 0;
}
```

> [!WARNING]
> 待补充：本节仅有代码模板，缺少思路讲解与复杂度说明。
