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
const int Knum = 4;
int read(int k = Knum) {
    string s;
    cin >> s;

    int num = 0;
    int it = s.find('.');
    if (it != -1) {
        num = s.size() - it - 1;
        s.erase(s.begin() + it);
    }
    for (int i = 1; i <= k - num; i++) {
        s += '0';
    }
    return stoi(s);
}
// @book-end

int main() {
    return 0;
}
