#include <bits/stdc++.h>
using namespace std;

using i64 = long long;
using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

template <typename T, typename Cmp = less<T>> struct RMQ {
    const Cmp cmp = Cmp();
    static constexpr unsigned B = 64;
    using u64 = unsigned long long;
    int n;
    vector<vector<T>> a;
    vector<T> pre, suf, ini;
    vector<u64> stk;
    RMQ() {}
    RMQ(const vector<T> &v) { init(v); }
    void init(const vector<T> &v) {
        n = v.size();
        pre = suf = ini = v;
        stk.resize(n);
        if (!n) {
            return;
        }
        const int M = (n - 1) / B + 1;
        const int lg = __lg(M);
        a.assign(lg + 1, vector<T>(M));
        for (int i = 0; i < M; i++) {
            a[0][i] = v[i * B];
            for (int j = 1; j < B && i * B + j < n; j++) {
                a[0][i] = min(a[0][i], v[i * B + j], cmp);
            }
        }
        for (int i = 1; i < n; i++) {
            if (i % B) {
                pre[i] = min(pre[i], pre[i - 1], cmp);
            }
        }
        for (int i = n - 2; i >= 0; i--) {
            if (i % B != B - 1) {
                suf[i] = min(suf[i], suf[i + 1], cmp);
            }
        }
        for (int j = 0; j < lg; j++) {
            for (int i = 0; i + (2 << j) <= M; i++) {
                a[j + 1][i] = min(a[j][i], a[j][i + (1 << j)], cmp);
            }
        }
        for (int i = 0; i < M; i++) {
            const int l = i * B;
            const int r = min(1U * n, l + B);
            u64 s = 0;
            for (int j = l; j < r; j++) {
                while (s && cmp(v[j], v[__lg(s) + l])) {
                    s ^= 1ULL << __lg(s);
                }
                s |= 1ULL << (j - l);
                stk[j] = s;
            }
        }
    }
    T operator()(int l, int r) {
        if (l / B != (r - 1) / B) {
            T ans = min(suf[l], pre[r - 1], cmp);
            l = l / B + 1;
            r = r / B;
            if (l < r) {
                int k = __lg(r - l);
                ans = min({ans, a[k][l], a[k][r - (1 << k)]}, cmp);
            }
            return ans;
        } else {
            int x = B * (l / B);
            return ini[__builtin_ctzll(stk[r - 1] >> (l - x)) + l];
        }
    }
};
struct ODT {
    struct node {
        int l, r;
        mutable i64 v;
        node(int l, int r = -1, i64 v = 0) : l(l), r(r), v(v) {}
        bool operator<(const node &o) const { return l < o.l; }
    };
    set<node> s;
    ODT() { s.clear(); }
    auto split(int pos) {
        auto it = s.lower_bound(node(pos));
        if (it != s.end() && it->l == pos) return it;
        it--;
        int l = it->l, r = it->r;
        i64 v = it->v;
        s.erase(it);
        s.insert(node(l, pos - 1, v));
        return s.insert(node(pos, r, v)).first;
    }
    void assign(int l, int r, i64 x) {
        auto itr = split(r + 1), itl = split(l);
        s.erase(itl, itr);
        s.insert(node(l, r, x));
    }
    void add(int l, int r, i64 x) {
        auto itr = split(r + 1), itl = split(l);
        for (auto it = itl; it != itr; it++) {
            it->v += x;
        }
    }
    i64 kth(int l, int r, int k) {
        vector<pair<i64, int>> a;
        auto itr = split(r + 1), itl = split(l);
        for (auto it = itl; it != itr; it++) {
            a.push_back(pair<i64, int>(it->v, it->r - it->l + 1));
        }
        sort(a.begin(), a.end());
        for (auto [val, len] : a) {
            k -= len;
            if (k <= 0) return val;
        }
    }
    i64 power(i64 a, int b, int mod) {
        a %= mod;
        i64 res = 1;
        for (; b; b /= 2, a = a * a % mod) {
            if (b % 2) {
                res = res * a % mod;
            }
        }
        return res;
    }
    i64 powersum(int l, int r, int x, int mod) {
        auto itr = split(r + 1), itl = split(l);
        i64 ans = 0;
        for (auto it = itl; it != itr; it++) {
            ans = (ans + power(it->v, x, mod) * (it->r - it->l + 1) % mod) % mod;
        }
        return ans;
    }
};

// @book-begin
const int N = 1e6 + 7;
signed main() {
    int n, q;
    cin >> n >> q;
    vector<int> w(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> w[i];
    }

    vector<array<int, 4>> query = {{}};
    vector<array<int, 2>> modify = {{}};
    for (int i = 1; i <= q; i++) {
        char op;
        cin >> op;
        if (op == 'Q') {
            int l, r;
            cin >> l >> r;
            query.push_back({l, r, (int)modify.size() - 1, (int)query.size()});
        } else {
            int idx, w;
            cin >> idx >> w;
            modify.push_back({w, idx});
        }
    }

    int Knum = max(1, (int)pow(n, 2.0 / 3));
    vector<int> K(n + 1);
    for (int i = 1; i <= n; i++) {
        K[i] = (i - 1) / Knum + 1;
    }
    sort(query.begin() + 1, query.end(), [&](auto x, auto y) {
        if (K[x[0]] != K[y[0]]) return x[0] < y[0];
        if (K[x[1]] != K[y[1]]) return x[1] < y[1];
        return x[3] < y[3];
    });

    int l = 1, r = 0, val = 0;
    int t = 0;
    vector<int> ans(query.size()), cnt(N);
    for (int i = 1; i < query.size(); i++) {
        auto [ql, qr, qt, id] = query[i];
        auto add = [&](int x) -> void {
            if (cnt[x] == 0) ++val;
            ++cnt[x];
        };
        auto del = [&](int x) -> void {
            --cnt[x];
            if (cnt[x] == 0) --val;
        };
        auto time = [&](int x, int l, int r) -> void {
            if (l <= modify[x][1] && modify[x][1] <= r) {
                del(w[modify[x][1]]);
                add(modify[x][0]);
            }

            swap(w[modify[x][1]], modify[x][0]);
        };
        while (l > ql)
            add(w[--l]);
        while (r < qr)
            add(w[++r]);
        while (l < ql)
            del(w[l++]);
        while (r > qr)
            del(w[r--]);
        while (t < qt)
            time(++t, ql, qr);
        while (t > qt)
            time(t--, ql, qr);
        ans[id] = val;
    }
    for (int i = 1; i < ans.size(); i++) {
        cout << ans[i] << endl;
    }
}
// @book-end
