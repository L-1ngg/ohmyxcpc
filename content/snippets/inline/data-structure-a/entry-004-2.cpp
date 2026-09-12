struct BIT {
    int n;
    vector<int> w, chk;
    BIT(int n, auto &in) : n(n), w(n + 1), chk(in) {}

    int get() {
        vector<array<int, 2>> alls;
        for (int i = 1; i <= n; i++) {
            alls.push_back({chk[i], i});
        }
        sort(alls.begin(), alls.end());
        int ans = 0;
        for (auto [val, idx] : alls) {
            ans += ask(idx + 1, n);
            add(idx, 1);
        }
        return ans;
    }
};
