#include "../contest.hpp"
int n, m;

// @book-begin

mt19937 rnd(chrono::steady_clock::now().time_since_epoch().count());
int r(int a, int b) {
    return rnd() % (b - a + 1) + a;
}

void graph(int n, int root = -1, int m = -1) {
    vector<pair<int, int>> t;
    for (int i = 1; i < n; i++) {
        t.emplace_back(i, r(0, i - 1));
    }

    vector<pair<int, int>> edge;
    set<pair<int, int>> uni;
    if (root == -1) root = r(0, n - 1);
    for (auto [x, y] : t) {
        x = (x + root) % n + 1;
        y = (y + root) % n + 1;
        edge.emplace_back(x, y);
        uni.emplace(x, y);
    }

    if (m != -1) {
        for (int i = n; i <= m; i++) {
            while (true) {
                int x = r(1, n), y = r(1, n);
                if (x == y) continue;
                if (uni.count({x, y})) continue;
                edge.emplace_back(x, y);
                uni.emplace(x, y);
            }
        }
    }

    random_shuffle(edge.begin(), edge.end());
    for (auto [x, y] : edge) {
        cout << x << " " << y << endl;
    }
}
// @book-end

int main() {
    return 0;
}
