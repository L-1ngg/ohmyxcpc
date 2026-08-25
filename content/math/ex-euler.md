---
title: 扩展欧拉定理
order: 14
---

# 扩展欧拉定理

若正整数 $a$ 与 $m$ 互质，则

$$
a^{\varphi(m)}\equiv1(\mathrm{mod}\,m)
$$

推论：

$$
a^{b}\equiv a^{b \,\mathrm{mod}\,\varphi(m)}(\mathrm{mod}\,m)
$$

当 $a,m$ 不互质时，扩展 Euler 定理表述如下：

$$
a^{b}\equiv a^{b\,\mathrm{mod} \,\varphi(m)+\varphi(m)}(\mathrm{mod}\,m)
$$

式子仅在 $\varphi(m)\leq b$ 时成立

```cpp
#include <bits/stdc++.h>
using namespace std;
bool large_enough = false; // 判断是否有b >= phi(m)
inline int read(int MOD = 1e9 + 7) // 快速读入稍加修改即可以边读入边取模，不取模时直接模一个大于数据范围的数
{
    int ans = 0;
    char c = getchar();
    while (!isdigit(c))
        c = getchar();
    while (isdigit(c))
    {
        ans = ans * 10 + c - '0';
        if (ans >= MOD)
        {
            ans %= MOD;
            large_enough = true;
        }
        c = getchar();
    }
    return ans;
}
int phi(int n) // 求欧拉函数
{
    int res = n;
    for (int i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
            res = res / i * (i - 1);
        while (n % i == 0)
            n /= i;
    }
    if (n > 1)
        res = res / n * (n - 1);
    return res;
}
int qpow(int a, int n, int MOD) // 快速幂
{
    int ans = 1;
    while (n)
    {
        if (n & 1)
            ans = 1LL * ans * a % MOD; // 注意防止溢出
        n >>= 1;
        a = 1LL * a * a % MOD;
    }
    return ans;
}
int main()
{
    int a = read(), m = read(), phiM = phi(m), b = read(phiM);
    cout << qpow(a, b + (large_enough ? phiM : 0), m);
    return 0;
}
```
