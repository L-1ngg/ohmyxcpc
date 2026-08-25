---
title: 最长公共子序列（LCS）
order: 4
---

# 最长公共子序列（LCS）

求解两个串的最长公共子序列的长度。

## 小数据解

针对 $10^3$ 以内的数据。

```cpp
const int LIM = 1e3 + 10;
char a[LIM], b[LIM];
int n, m, f[LIM][LIM];
void solve()
{
    std::cin >> n >> m >> a + 1 >> b + 1;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            f[i][j] = std::max(f[i - 1][j], f[i][j - 1]);
            if (a[i] == b[j]) f[i][j] = std::max(f[i][j], f[i - 1][j - 1] + 1);
        }
    std::cout << f[n][m] << '\n';
}
signed main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(0);
    solve();
    return 0;
}
```

## 大数据解

针对 $10^5$ 以内的数据。

```cpp
int n, a[MAXN], b[MAXN], f[MAXN], p[MAXN];
signed main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(0);
    std::cin >> n;
    for (int i = 1; i <= n; i++) {
        scanf("%d", &a[i]);
        p[a[i]] = i;  //将第二个序列中的元素映射到第一个中
    }
    for (int i = 1; i <= n; i++) {
        scanf("%d", &b[i]);
        f[i] = inf;
    }
    int len = 0;
    f[0] = 0;
    for (int i = 1; i <= n; i++) {
        if (p[b[i]] > f[len]) f[++len] = p[b[i]];
        else {
            int l = 0, r = len;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (f[mid] > p[b[i]]) r = mid;
                else l = mid + 1;
            }
            f[l] = std::min(f[l], p[b[i]]);
        }
    }
    std::cout << len << '\n';
    return 0;
}
```
