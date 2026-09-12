#include <bits/stdc++.h>
using namespace std;

using i64 = long long;
using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

// @book-begin
using i64 = long long;
i64 a[N], tmp[N], n, ans = 0;
void mergeSort(i64 l, i64 r) {
    if (l >= r) return;
    i64 mid = (l + r) >> 1, i = l, j = mid + 1, cnt = 0;
    mergeSort(l, mid);
    mergeSort(mid + 1, r);
    while (i <= mid || j <= r)
        if (j > r || (i <= mid && a[i] <= a[j]))
            tmp[cnt++] = a[i++];
        else
            tmp[cnt++] = a[j++], ans += mid - i + 1;
    for (i64 k = 0; k < r - l + 1; k++)
        a[l + k] = tmp[k];
}
int main() {
    cin >> n;
    for (int i = 1; i <= n; i++)
        scanf("%lld", &a[i]);
    mergeSort(1, n);
    cout << ans << "\n";
    return 0;
}
// @book-end
