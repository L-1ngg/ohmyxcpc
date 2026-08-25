---
title: 欧拉函数
order: 13
---

# 欧拉函数

## 直接求解单个数的欧拉函数

$1$ 到 $N$ 中与 $N$ 互质数的个数称为欧拉函数，记作 $\varphi (N)$ 。求解欧拉函数的过程即为分解质因数的过程，复杂度 $\mathcal{O}(\sqrt{n})$ 。

```cpp
int phi(int n) { //求解 phi(n)
    int ans = n;
    for(int i = 2; i <= n / i; i ++) { //注意，这里要写 n / i ，以防止 int 型溢出风险和 sqrt 超时风险
        if(n % i == 0) {
            ans = ans / i * (i - 1);
            while(n % i == 0) n /= i;
        }
    }
    if(n > 1) ans = ans / n * (n - 1); //特判 n 为质数的情况
    return ans;
}
```

## 求解 1 到 N 所有数的欧拉函数

利用上述性质，我们可以快速递推出 $2-N$ 中每个数的欧拉函数，复杂度 $\mathcal{O}(N)$ ，而该算法**即是线性筛的算法**。

$$
\varphi(n)=(1-1/p_1)(1-1/p_2)(1-1/p_3)(1-1/p_4)\cdots(1-1/p_n);
$$

```cpp
const int N = 1e5 + 7;
int v[N], prime[N], phi[N];
void euler(int n) {
    ms(v, 0); //最小质因子
    int m = 0; //质数数量
    for (int i = 2; i <= n; ++ i) {
        if (v[i] == 0) { // i 是质数
            v[i] = i, prime[++ m] = i;
            phi[i] = i - 1;
        }
         //为当前的数 i 乘上一个质因子
        for (int j = 1; j <= m; ++ j) {
             //如 i 有比 prime[j] 更小的质因子，或超出 n ，停止
            if(prime[j] > v[i] || prime[j] > n / i) break;
             // prime[j] 是合数 i * prime[j] 的最小质因子
            v[i * prime[j]] = prime[j];
            phi[i * prime[j]] = phi[i] * (i % prime[j] ? prime[j] - 1 : prime[j]);
        }
    }
}
int main() {
    int n; cin >> n; euler(n);
    for (int i = 1; i <= n; ++ i) cout << phi[i] << endl;
    return 0;
}
```

```cpp
std::vector<int> pri, not_prime, phi;

void init(int n) {
    not_prime.assign(n + 1, 0);
    phi.assign(n + 1, 0);
    phi[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!not_prime[i]) {
            pri.push_back(i);
            phi[i] = i - 1;
        }
        for (int pri_j : pri) {
            if (i * pri_j > n) break;
            not_prime[i * pri_j] = true;
            if (i % pri_j == 0) {
                phi[i * pri_j] = phi[i] * pri_j;
                break;
            }
            phi[i * pri_j] = phi[i] * phi[pri_j];
        }
    }
}
```

## 使用莫比乌斯反演求解欧拉函数

```cpp
int phi[N];
vector<int> fac[N];
void get_eulers() {
    for (int i = 1; i <= N - 10; i++) {
        for (int j = i; j <= N - 10; j += i) {
            fac[j].push_back(i);
        }
    }
    phi[1] = 1;
    for (int i = 2; i <= N - 10; i++) {
        phi[i] = i;
        for (auto j : fac[i]) {
            if (j == i) continue;
            phi[i] -= phi[j];
        }
    }
}
```
