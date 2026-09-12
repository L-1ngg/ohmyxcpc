#include <bits/stdc++.h>
using namespace std;

const int N = 1005;
vector<int> ver[N];

int main() {
    // @book-begin
    auto dfs = [&](auto self, int x, int fa) -> int {
        int res = 0;
        for (auto y : ver[x]) {
            if (y == fa) continue;
            res ^= self(self, y, x);
        }
        return res + 1;
    };
    cout << (dfs(dfs, 1, 0) == 1 ? "Bob\n" : "Alice\n");
    // @book-end
    return 0;
}
