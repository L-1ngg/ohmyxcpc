---
title: 高精度快速幂
order: 13
---

# 高精度快速幂

求解 $n^k \bmod p$，其中 $0\le n,k \le 10^{1000000},\ 1\le p \le 10^9$。容易发现 $n$ 可以直接取模，瓶颈在于 $k$ [See](https://codeforces.com/contest/17/problem/D)。

## 魔改十进制快速幂（暴力计算）

该算法复杂度 $\mathcal O({\tt len}(k))$ 。

```cpp
int mypow10(int n, vector<int> k, int p) {
    int r = 1;
    for (int i = k.size() - 1; i >= 0; i--) {
        for (int j = 1; j <= k[i]; j++) {
            r = r * n % p;
        }
        int v = 1;
        for (int j = 0; j <= 9; j++) {
            v = v * n % p;
        }
        n = v;
    }
    return r;
}
signed main() {
    string n_, k_;
    int p;
    cin >> n_ >> k_ >> p;

    int n = 0; // 转化并计算 n % p
    for (auto it : n_) {
        n = n * 10 + it - '0';
        n %= p;
    }
    vector<int> k; // 转化 k
    for (auto it : k_) {
        k.push_back(it - '0');
    }
    cout << mypow10(n, k, p) << endl; // 暴力快速幂
}
```

## 扩展欧拉定理（欧拉降幂公式）

$$
n^k \equiv \left\{\begin{matrix}
n^{k \bmod \varphi (p)} & \gcd(n,p)=1 \\
n^{k \bmod \varphi(p) + \varphi(p)} & \gcd(n,p)\neq 1 \wedge k\ge\varphi(p)\\
n^k & \gcd(n,p)\neq 1 \wedge k<\varphi(p)
\end{matrix}\right.
$$

最终我们可以将幂降到 $\varphi(p)$ 的级别，使得能够直接使用快速幂解题，复杂度瓶颈在求解欧拉函数 $\mathcal O(\sqrt p)$ 。

```cpp
int phi(int n) { //求解 phi(n)
    int ans = n;
    for (int i = 2; i <= n / i; i++) {
        if (n % i == 0) {
            ans = ans / i * (i - 1);
            while (n % i == 0) {
                n /= i;
            }
        }
    }
    if (n > 1) { //特判 n 为质数的情况
        ans = ans / n * (n - 1);
    }
    return ans;
}
signed main() {
    string n_, k_;
    int p;
    cin >> n_ >> k_ >> p;

    int n = 0; // 转化并计算 n % p
    for (auto it : n_) {
        n = n * 10 + it - '0';
        n %= p;
    }
    int mul = phi(p), type = 0, k = 0; // 转化 k
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
```
