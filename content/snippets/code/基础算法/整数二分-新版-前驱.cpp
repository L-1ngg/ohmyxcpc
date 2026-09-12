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
template <class... A> int judge(A &&...);

// @book-begin
int main() {
    int l = 0, r = 1E8, ans = l;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (judge(mid)) {
            l = mid + 1;
            ans = mid;
        } else {
            r = mid - 1;
        }
    }
    return ans;
}
// @book-end
