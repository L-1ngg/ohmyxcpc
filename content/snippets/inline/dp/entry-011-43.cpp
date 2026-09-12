#include <bits/stdc++.h>
using namespace std;

using i64 = long long;
const int N = 15, M = 150, K = 1500;
i64 n, k;
i64 cnt[K];
i64 tot;
i64 st[K];
i64 dp[N][M][K];
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> k;
    for (int s = 0; s < (1 << n); s++) {
        i64 sum = 0, t = s;
        while (t) {
            sum += (t & 1);
            t >>= 1;
        }
        cnt[s] = sum;
        if ((((s << 1) | (s >> 1)) & s) == 0) {
            st[++tot] = s;
        }
    }
    dp[0][0][0] = 1;
    for (int i = 1; i <= n + 1; i++) {
        for (int j1 = 1; j1 <= tot; j1++) {
            i64 s1 = st[j1];
            for (int j2 = 1; j2 <= tot; j2++) {
                i64 s2 = st[j2];
                if (((s2 | (s2 << 1) | (s2 >> 1)) & s1) == 0) {
                    for (int j = 0; j <= k; j++) {
                        if (j - cnt[s1] >= 0) dp[i][j][s1] += dp[i - 1][j - cnt[s1]][s2];
                    }
                }
            }
        }
    }
    cout << dp[n + 1][k][0] << "\n";
    return 0;
}
