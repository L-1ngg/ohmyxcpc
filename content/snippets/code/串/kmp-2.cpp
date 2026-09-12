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

std::vector<int> get_next(std::string &t) {
    std::vector<int> next(t.size() + 1);
    next[0] = -1;
    for (int i = 0, j = -1; i < (int)t.size();) {
        if (j == -1 || t[i] == t[j]) {
            ++i, ++j;
            next[i] = j;
        } else
            j = next[j];
    }
    return next;
}

// @book-begin
bool kmp(std::string &s, std::string &t) {
    if (t.length() > s.length()) return false;
    auto next = get_next(t);

    for (int i = 0, j = 0; i < (int)s.size() && j < (int)t.size();) {
        if (j == -1 || s[i] == t[j]) {
            ++i, ++j;
        } else
            j = next[j];
        if (j == (int)t.size()) return true;
    }
    return false;
}
// @book-end

int main() {
    return 0;
}
