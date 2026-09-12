#include <bits/stdc++.h>
using namespace std;

// @book-begin
long long fib[100] = {1, 2};
map<long long, bool> mp;
void Force() {
    for (int i = 2; i <= 86; ++i)
        fib[i] = fib[i - 1] + fib[i - 2];
    for (int i = 0; i <= 86; ++i)
        mp[fib[i]] = 1;
}
void Solve() {
    int n;
    cin >> n;
    if (mp[n] == 1)
        cout << "lose\n";
    else
        cout << "win\n";
}
// @book-end

int main() {
    Force();
    Solve();
    return 0;
}
