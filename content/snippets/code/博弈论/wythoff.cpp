#include <bits/stdc++.h>
using namespace std;

// @book-begin
const double lorry = (sqrt(5.0) + 1.0) / 2.0;

void Solve() {
    int n, m;
    cin >> n >> m;
    if (n < m) swap(n, m);
    double x = n - m;
    if ((int)(lorry * x) == m)
        cout << "lose\n";
    else
        cout << "win\n";
}
// @book-end

int main() {
    Solve();
    return 0;
}
