using i64 = long long;
int x, y;
int exgcd(int a, int b, int &x, int &y) {
    if (b == 0) {
        x = 1, y = 0;
        return a;
    }
    int r = exgcd(b, a % b, x, y);
    int temp = y;
    y = x - (a / b) * y;
    x = temp;
    return r;
}
i64 getInv(int a, int mod) {
    i64 x, y, d = exgcd(a, mod, x, y);
    return d == 1 ? (x % mod + mod) % mod : -1;
}
