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

// @book-begin
int f[20];
void jie_cheng(int n) {
    f[0] = f[1] = 1;
    for (int i = 2; i <= n; i++)
        f[i] = f[i - 1] * i;
}
string str;
int kangtuo() {
    int ans = 1;
    int len = str.length();
    for (int i = 0; i < len; i++) {
        int tmp = 0;

        for (int j = i + 1; j < len; j++)
            if (str[i] > str[j]) tmp++;
        ans += tmp * f[len - i - 1];
    }
    return ans;
}
int main() {
    jie_cheng(10);
    str = "52413";
    cout << kangtuo() << endl;
}
// @book-end
