template <typename T> struct BIT {
    int n;
    vector<T> w, base;
#define low(x) (x & -x)
    BIT(int n, auto &in) : n(n), w(n + 1), base(n + 1) {
        for (int i = 1; i <= n; i++) {
            update(i, in[i]);
        }
    }
    void update(int x, int v) {
        base[x] = max(base[x], v);
        for (; x <= n; x += low(x)) {
            w[x] = max(w[x], v);
        }
    }
    T getMax(int l, int r) {
        T ans = T();
        while (r >= l) {
            ans = max(base[r], ans);
            for (r--; r - low(r) >= l; r -= low(r)) {
                ans = max(w[r], ans);
            }
        }
        return ans;
    }
};
