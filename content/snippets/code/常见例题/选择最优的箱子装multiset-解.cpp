#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

int a[M];
int c;
int n;

// @book-begin
void solve() {
    cin >> n >> c;
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    multiset<int> s;
    for (int i = 1; i <= n; i++) {
        auto it = s.lower_bound(a[i]);
        if (it == s.end())
            s.insert(c - a[i]);
        else {
            int x = *it;

            s.erase(it);
            s.insert(x - a[i]);
        }
    }
    cout << s.size() << "\n";
}
// @book-end

int main() {
    return 0;
}
