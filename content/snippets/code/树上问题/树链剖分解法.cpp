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

struct Tree {
    int n;
    vector<vector<int>> ver;
    Tree(int n) {
        this->n = n;
        ver.resize(n + 1);
    }
    void add(int x, int y) {
        ver[x].push_back(y);
        ver[y].push_back(x);
    }
    int getlen(int root) {
        map<int, int> dep;
        function<void(int, int)> dfs = [&](int x, int fa) -> void {
            for (auto y : ver[x]) {
                if (y == fa) continue;
                dep[y] = dep[x] + 1;
                dfs(y, x);
            }
            if (dep[x] > dep[root]) {
                root = x;
            }
        };
        dfs(root, 0);
        int st = root;

        dep.clear();
        dfs(root, 0);
        int ed = root;

        return dep[root];
    }
};

// @book-begin
struct HLD {
    int n, idx;
    vector<vector<int>> ver;
    vector<int> siz, dep;
    vector<int> top, son, parent;

    HLD(int n) {
        this->n = n;
        ver.resize(n + 1);
        siz.resize(n + 1);
        dep.resize(n + 1);

        top.resize(n + 1);
        son.resize(n + 1);
        parent.resize(n + 1);
    }
    void add(int x, int y) {
        ver[x].push_back(y);
        ver[y].push_back(x);
    }
    void dfs1(int x) {
        siz[x] = 1;
        dep[x] = dep[parent[x]] + 1;
        for (auto y : ver[x]) {
            if (y == parent[x]) continue;
            parent[y] = x;
            dfs1(y);
            siz[x] += siz[y];
            if (siz[y] > siz[son[x]]) {
                son[x] = y;
            }
        }
    }
    void dfs2(int x, int up) {
        top[x] = up;
        if (son[x]) dfs2(son[x], up);
        for (auto y : ver[x]) {
            if (y == parent[x] || y == son[x]) continue;
            dfs2(y, y);
        }
    }
    int lca(int x, int y) {
        while (top[x] != top[y]) {
            if (dep[top[x]] > dep[top[y]]) {
                x = parent[top[x]];
            } else {
                y = parent[top[y]];
            }
        }
        return dep[x] < dep[y] ? x : y;
    }
    int clac(int x, int y) { return dep[x] + dep[y] - 2 * dep[lca(x, y)]; }
    void work(int root = 1) {
        dfs1(root);
        dfs2(root, root);
    }
};
// @book-end

int main() {
    return 0;
}
