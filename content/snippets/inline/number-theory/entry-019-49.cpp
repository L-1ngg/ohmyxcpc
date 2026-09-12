const int N = 1e5 + 7;
int v[N], prime[N], phi[N];
void euler(int n) {
    ms(v, 0);
    int m = 0;
    for (int i = 2; i <= n; ++i) {
        if (v[i] == 0) {
            v[i] = i, prime[++m] = i;
            phi[i] = i - 1;
        }

        for (int j = 1; j <= m; ++j) {

            if (prime[j] > v[i] || prime[j] > n / i) break;

            v[i * prime[j]] = prime[j];
            phi[i * prime[j]] = phi[i] * (i % prime[j] ? prime[j] - 1 : prime[j]);
        }
    }
}
int main() {
    int n;
    cin >> n;
    euler(n);
    for (int i = 1; i <= n; ++i)
        cout << phi[i] << endl;
    return 0;
}
