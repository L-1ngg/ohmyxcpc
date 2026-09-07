signed main() {
    int n;
    cin >> n;

    vector<Point<ld>> in(n);
    for (auto &it : in) {
        cin >> it;
    }

    for (int i = 0; i < n; i++) {
        auto A = in[(i - 1 + n) % n];
        auto B = in[i];
        auto C = in[(i + 1) % n];
        if (cross(A - B, C - B) > 0) {
            cout << "No\n";
            return 0;
        }
    }
    cout << "Yes\n";
}
