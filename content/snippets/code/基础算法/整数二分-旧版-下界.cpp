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
int l;
int r;
int x;

// @book-begin
int main() {
    while (l < r) {
        int mid = (l + r) / 2;
        if (a[mid] >= x) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return a[l];
}
// @book-end
