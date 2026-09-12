---
title: "lucas 定理"
order: 30
---

# lucas 定理 {#s-2a28dd101588}

Lucas 定理把大下标组合数拆成质数进制下的小组合数，要求模数 $p$ 为质数。`C(a, b, p)` 需支持 $0\le a,b<p$ 的查询；若已预处理阶乘和逆元，单次 Lucas 查询为 $O(\log_p n)$，预处理需要 $O(p)$ 时间和空间。

Lucas 定理内容如下：对于质数 $p$，有

$$
\binom{n}{m} \operatorname{mod} p = \binom{\lfloor n / p \rfloor}{\lfloor m / p \rfloor} \cdot \binom{n \operatorname{mod} p}{m \operatorname{mod} p} \operatorname{mod} p
$$

观察上述表达式，可知 $n \operatorname{mod} p$ 和 $m \operatorname{mod} p$ 一定是小于 $p$ 的数，可以直接求解，$\binom{\lfloor n / p \rfloor}{\lfloor m / p \rfloor}$ 可以继续用 Lucas 定理求解。这也就要求 $p$ 的范围不能够太大，一般在 $10^{5}$ 左右。边界条件：当 $m = 0$ 的时候，返回 $1$。

时间复杂度为 $O ( f ( p ) + g ( n ) \text{log} n )$，其中 $f ( n )$ 为预处理组合数的复杂度，$g ( n )$ 为单次求组合数的复杂度。

```cpp
long long Lucas(long long n, long long m, long long p) {
    if (m == 0) return 1;
    return (C(n % p, m % p, p) * Lucas(n / p, m / p, p)) % p;
}
```

```python
def Lucas(n, m, p):
    if m == 0:
        return 1
    return (C(n % p, m % p, p) * Lucas(n // p, m // p, p)) % p
```
