---
title: 逆元
order: 9
---

# 逆元

## 费马小定理解（借助快速幂）

若 $p$ 为素数，$\gcd(a, p) = 1$，则 $a^{p - 1} \equiv 1 \pmod{p}$。

另一个形式：对于任意整数 $a$，有 $a^p \equiv a \pmod{p}$。

单次计算的复杂度即为快速幂的复杂度 $\mathcal O(\log X)$ 。限制：$MOD$ 必须是质数，且需要满足 $x$ 与 $MOD$ 互质。

```cpp
LL inv(LL x) { return mypow(x, mod - 2, mod);}
```

## 扩展欧几里得解

此方法的 $MOD$ 没有限制，复杂度为 $\mathcal O(\log X)$ ，但是比快速幂法常数大一些。

```cpp
int x, y;
int exgcd(int a, int b, int &x, int &y) { //扩展欧几里得算法
    if (b == 0) {
        x = 1, y = 0;
        return a; //到达递归边界开始向上一层返回
    }
    int r = exgcd(b, a % b, x, y);
    int temp = y; //把x y变成上一层的
    y = x - (a / b) * y;
    x = temp;
    return r; //得到a b的最大公因数
}
LL getInv(int a, int mod) { //求a在mod下的逆元，不存在逆元返回-1
    LL x, y, d = exgcd(a, mod, x, y);
    return d == 1 ? (x % mod + mod) % mod : -1;
}
```

## 离线求解：线性递推解

以 $\mathcal O(N)$ 的复杂度完成 $1-N$ 中全部逆元的计算。

```cpp
inv[1] = 1;
for (int i = 2; i <= n; i ++ )
    inv[i] = (p - p / i) * inv[p % i] % p;
```
