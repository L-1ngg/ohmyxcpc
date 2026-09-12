struct BIT {
    int n;
    vector<int> w;
    BIT(int n) : n(n), w(n + 1) {}
    void add(int x, int v) {
        for (; x <= n; x += x & -x) {
            w[x] += v;
        }
    }
    int kth(int k) {
        int ans = 0;
        for (int i = __lg(n); i >= 0; i--) {
            int val = ans + (1 << i);
            if (val <= n && w[val] < k) {
                k -= w[val];
                ans = val;
            }
        }
        return ans + 1;
    }
    int get(int x) {
        int ans = 1;
        for (x--; x; x -= x & -x) {
            ans += w[x];
        }
        return ans;
    }
    int pre(int x) { return kth(get(x) - 1); }
    int suf(int x) { return kth(get(x + 1)); }
};
const int N = 10000000;
signed main() {
    BIT bit(N + 1);
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int op, x;
        cin >> op >> x;
        if (op == 1)
            bit.add(x, 1);
        else if (op == 2)
            bit.add(x, -1);
        else if (op == 3)
            cout << bit.get(x) << "\n";
        else if (op == 4)
            cout << bit.kth(x) << "\n";
        else if (op == 5)
            cout << bit.pre(x) << "\n";
        else if (op == 6)
            cout << bit.suf(x) << "\n";
    }
}
