---
title: 回滚莫队
order: 12
---

# 回滚莫队

```cpp
void solve(){
    std::vector<a3> q(m + 1);
    for (int i = 1;i <= m;i++) {
        int l, r;   std::cin >> l >> r;
        q[i] = { l,r,i };
    }
    int block = n / std::min<int>(n, sqrt(m));
    std::vector<int> b(n + 1);
    for (int i = 1;i <= n;i++) b[i] = (i - 1) / block + 1;
    std::sort(q.begin() + 1, q.end(), [&](auto x, auto y) {
        if (b[x[0]] != b[y[0]]) return x[0] < y[0];
        return x[1] < y[1];
        });

    int l = 1, r = 0, cur_block = 0, tmpl;
    int res = 0;
    std::vector<i64> ans(m + 1);
    for (int i = 1;i <= m;i++) {
        auto [ql, qr, id] = q[i];

        if (b[ql] == b[qr]) {
            //暴力
            for (int j = ql;j <= qr;j++);
            //遍历答案
            for (int j = ql;j <= qr;j++);
            //撤销
            for (int j = ql;j <= qr;j++);
            continue;
        }

        auto add = [&](int x, i64& res) {};
        auto del = [&](int x) {};

        //若当前更新到了一个新的块
        if (b[ql] != cur_block) {
            while (r > b[ql] * block) del(w[r--]);
            while (l < b[ql] * block + 1) del(w[l++]);
            res = 0;
            cur_block = b[ql];
        }
        //先移动右指针
        while (r < qr) add(w[++r], res);
        tmpl = l;
        i64 tmpres = res;
        //查询答案
        while (tmpl > ql) add(w[--tmpl], tmpres);
        ans[id] = tmpres;
        //回滚
        while (tmpl < l) del(w[tmpl++]);
    }

    for (int i = 1;i <= m;i++)   std::cout << ans[i] << '\n';
}
```
