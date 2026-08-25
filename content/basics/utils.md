---
title: 常用函数
order: 1
---

# 常用函数

```cpp
i64 qpow(i64 x, i64 b){
    i64 ret = 1;
    while(b){
        if(b & 1) ret = ret * x % mod;
        b >>= 1;
        x = x * x % mod;
    }
    return ret;
}

i64 mysqrt(i64 n) // 针对 sqrt 无法精确计算 ll 型
{
    i64 ans = sqrt(n);
    while ((ans + 1) * (ans + 1) <= n) ans++;
    while (ans * ans > n) ans--;
    return ans;
}

int mylcm(int x, int y)
{
    return x / std::gcd(x, y) * y;
}
```

```cpp
template<typename T> int log2floor(T n) // 针对 log2 无法精确计算 ll 型；向下取整
{
    assert(n > 0);
    for (T i = 0, chk = 1;; i++, chk *= 2) {
        if (chk <= n && n < chk * 2) {
            return i;
        }
    }
}
template<typename T> int log2ceil(T n) // 向上取整
{
    assert(n > 0);
    for (T i = 0, chk = 1;; i++, chk *= 2) {
        if (n <= chk) {
            return i;
        }
    }
}
int log2floor(int x)
{
    return 31 - __builtin_clz(x);
}
int log2ceil(int x) // 向上取整
{
    return log2floor(x) + (__builtin_popcount(x) != 1);
}
```

```cpp
template<typename T> T sign(const T &a)
{
    return a == 0 ? 0 : (a < 0 ? -1 : 1);
}
template<typename T> T floor(const T &a, const T &b) // 注意大数据计算时会丢失精度
{
    T A = abs(a), B = abs(b);
    assert(B != 0);
    return sign(a) * sign(b) > 0 ? A / B : -(A + B - 1) / B;
}
template<typename T> T ceil(const T &a, const T &b) // 注意大数据计算时会丢失精度
{
    T A = abs(a), B = abs(b);
    assert(b != 0);
    return sign(a) * sign(b) > 0 ? (A + B - 1) / B : -A / B;
}
```
