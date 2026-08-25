---
title: Lucas 定理
order: 102
---

# Lucas 定理

Lucas 定理内容如下：对于质数 $p$，有

$$
\binom{n}{m}\bmod p = \binom{\left\lfloor n/p \right\rfloor}{\left\lfloor m/p\right\rfloor}\cdot\binom{n\bmod p}{m\bmod p}\bmod p
$$

观察上述表达式，可知 $n\bmod p$ 和 $m\bmod p$ 一定是小于 $p$ 的数，可以直接求解，$\displaystyle\binom{\left\lfloor n/p \right\rfloor}{\left\lfloor m/p\right\rfloor}$ 可以继续用 Lucas 定理求解。这也就要求 $p$ 的范围不能够太大，一般在 $10^5$ 左右。边界条件：当 $m=0$ 的时候，返回 $1$。

时间复杂度为 $O(f(p) + g(n)\log n)$，其中 $f(n)$ 为预处理组合数的复杂度，$g(n)$ 为单次求组合数的复杂度。

```cpp
long long Lucas(long long n, long lm, long long p) {
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
