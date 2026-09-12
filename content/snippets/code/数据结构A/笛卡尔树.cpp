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

int ls[M];
int n;
int nums[M];
int rs[M];
int stk[M];
int top;

// @book-begin
int main() {
    cin >> n;
    for (int i = 0; i < n; ++i)
        cin >> nums[i];
    for (int i = 0; i < n; ++i)
        rs[i] = -1;
    for (int i = 0; i < n; ++i)
        ls[i] = -1;
    top = 0;
    for (int i = 0; i < n; i++) {
        int k = top;
        while (k > 0 && nums[stk[k - 1]] > nums[i])
            k--;
        if (k) rs[stk[k - 1]] = i;
        if (k < top) ls[i] = stk[k];
        stk[k++] = i;
        top = k;
    }
}
// @book-end
