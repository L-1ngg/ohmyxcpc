#include <bits/stdc++.h>
using namespace std;

#define N 1005
#define yes cout << "Yes\n"
#define no cout << "No\n"

// @book-begin
int n, m, a[N], num[N];
int sg(int x) {
    if (num[x] != -1) return num[x];
    unordered_set<int> S;
    for (int i = 1; i <= m; ++i)
        if (x >= a[i]) S.insert(sg(x - a[i]));

    for (int i = 0;; ++i)
        if (S.count(i) == 0) return num[x] = i;
}
void Solve() {
    cin >> m;
    for (int i = 1; i <= m; ++i)
        cin >> a[i];
    cin >> n;

    int ans = 0;
    memset(num, -1, sizeof num);
    for (int i = 1; i <= n; ++i) {
        int x;
        cin >> x;
        ans ^= sg(x);
    }

    if (ans == 0)
        no;
    else
        yes;
}
// @book-end

int main() {
    Solve();
    return 0;
}
