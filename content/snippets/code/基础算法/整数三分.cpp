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
template <class... A> int check(A &&...);
int l;
int r;

// @book-begin
int main() {
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (check(mid) <= check(mid + 1))
            r = mid;
        else
            l = mid + 1;
    }
    cout << check(l) << endl;
}
// @book-end
