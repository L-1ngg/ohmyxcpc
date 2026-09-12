#include "../contest.hpp"
int n, m;

// @book-begin
int main() {
    for (int i : {1, 2}) {}

    auto cc = [&](int x) { x++; };
    cc(2);

    tuple<string, int, int> V;
    array<int, 3> C;

    auto dfs = [&](auto self, int x) -> void {
        if (x > 10) return;
        self(self, x + 1);
    };
    dfs(dfs, 1);

    vector in(1, vector<int>(1));

    map<int, int> dic;
    for (auto [u, v] : dic) {}
    dic.contains(12);

    constexpr double Pi = numbers::pi;
}
// @book-end
