void solve(){
    int n, m;    
    std::cin >> n >> m;
    std::vector<int> a(n + 1);
    for (int i = 1;i <= n;i++)   std::cin >> a[i];

    std::vector<a4> q{ {} };        // {左区间, 右区间, 累计修改次数, 下标}
    std::vector<a2> upd{ {} };      // {修改位置，修改的值}
    for (int i = 1;i <= m;i++) {
        char op;    std::cin >> op;
        if (op == 'Q') {
            int l, r;   std::cin >> l >> r;
            q.push_back(a4{ l,r,(int)upd.size() - 1 ,(int)q.size() });
        }
        else {
            int idx, val;   std::cin >> idx >> val;
            upd.push_back({ idx,val });
        }
    }

    int block = max(1, (int)pow(n, 2.0 / 3));  // n ^ (2 / 3)，原写死 2610 须按 n 改
    std::vector<int> b(n + 1);
    for (int i = 1;i <= n;i++) b[i] = (i - 1) / block + 1;
    std::sort(q.begin() + 1, q.end(), [&](auto x, auto y) {
        if (b[x[0]] != b[y[0]]) return x[0] < y[0];
        if (b[x[1]] != b[y[1]]) return x[1] < y[1];
        return x[3] < y[3];
        });

    n = q.size() - 1;
    int l = 1, r = 0, t = 0, val = 0;
    std::vector<int> ans(n + 1);
    for (int i = 1;i <= n;i++) {
        auto [ql, qr, qt, id] = q[i];

        auto add = [&](int x) {};
        auto del = [&](int x) {};
        auto time = [&](int t, int l, int r) {
            int pos = upd[t][0];
            int& val = upd[t][1];
            if (pos >= l && pos <= r) {
                del(a[pos]);
                add(val);
            }
            std::swap(a[pos], val);
            };

        while (l > ql) add(a[--l]);
        while (r < qr) add(a[++r]);
        while (l < ql) del(a[l++]);
        while (r > qr) del(a[r--]);
        while (t < qt) time(++t, ql, qr);
        while (t > qt) time(t--, ql, qr);

        ans[id] = val;  // 原来写成 cnt（未定义变量）
    }
    for (int i = 1;i <= n;i++)    std::cout << ans[i] << '\n';
}
