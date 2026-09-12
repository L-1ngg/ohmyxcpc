#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;

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

// @book-begin
using ld = long double;
const ld PI = acos(-1);
const ld EPS = 1e-7;
const ld INF = numeric_limits<ld>::max();
#define cc(x) cout << fixed << setprecision(x);

ld fgcd(ld x, ld y) {
    return abs(y) < EPS ? abs(x) : fgcd(y, fmod(x, y));
}
template <typename T, typename S> bool equal(T x, S y) {
    return -EPS < x - y && x - y < EPS;
}
template <typename T> int sign(T x) {
    if (-EPS < x && x < EPS) return 0;
    return x < 0 ? -1 : 1;
}
// @book-end

int main() {
    return 0;
}
