struct Comb {
    int n;  // 当前已预处理到的上限
    vector<Z> _fac, _inv;  // _inv[i] = (i!)^{-1}，不是 i^{-1}

    Comb() : _fac{1}, _inv{0} {} // 0! = 1；_inv[0] 占位不用
    Comb(int n) : Comb() {
        init(n);
    }
    void init(int m) {
        if (m <= n) return;  // 只扩展不缩小
        _fac.resize(m + 1);
        _inv.resize(m + 1);
        for (int i = n + 1; i <= m; i++) {
            _fac[i] = _fac[i - 1] * i;
        }
        _inv[m] = _fac[m].inv(); // 先求最大阶乘的逆，再往回推
        for (int i = m; i > n; i--) {
            _inv[i - 1] = _inv[i] * i;
        }
        n = m;
    }
    Z fac(int x) {
        if (x > n) init(x);
        return _fac[x];
    }
    Z inv(int x) {  // 返回 (x!)^{-1}
        if (x > n) init(x);
        return _inv[x];
    }
    Z C(int x, int y) { // C(x,y)，非法下标返回 0
        if (x < 0 || y < 0 || x < y) return 0;
        return fac(x) * inv(y) * inv(x - y);
    }
    Z P(int x, int y) { // 排列数 P(x,y)
        if (x < 0 || y < 0 || x < y) return 0;
        return fac(x) * inv(x - y);
    }
} comb(1 << 21);  // 预处理范围按题目改；模数在 Z 里定
