#include "../contest.hpp"
int n, m;

// @book-begin
int jos(int n, int k) {
    if (n == 1 || k == 1) return n - 1;
    if (k > n) return (jos(n - 1, k) + k) % n;
    int res = jos(n - n / k, k) - n % k;
    if (res < 0)
        res += n;
    else
        res += res / (k - 1);
    return res;
}
// @book-end

int main() {
    return 0;
}
