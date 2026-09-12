int phi(int n) {
    int ans = n;
    for (int i = 2; i <= n / i; i++) {
        if (n % i == 0) {
            ans = ans / i * (i - 1);
            while (n % i == 0) {
                n /= i;
            }
        }
    }
    if (n > 1) {
        ans = ans / n * (n - 1);
    }
    return ans;
}
signed main() {
    string n_, k_;
    int p;
    cin >> n_ >> k_ >> p;

    int n = 0;
    for (auto it : n_) {
        n = n * 10 + it - '0';
        n %= p;
    }
    int mul = phi(p), type = 0, k = 0;
    for (auto it : k_) {
        k = k * 10 + it - '0';
        type |= (k >= mul);
        k %= mul;
    }
    if (type) {
        k += mul;
    }
    cout << mypow(n, k, p) << endl;
}
