---
title: ST 表
order: 3
---

# ST 表

用于解决区间可重复贡献问题，需要满足 $x \text{ 运算符 } x=x$ （如区间最大值：$\max(x,x)=x$ 、区间 $\gcd$：$\gcd(x,x)=x$ 等），但是不支持修改操作。$\mathcal O(N\log N)$ 预处理，$\mathcal O(1)$ 查询。

```cpp
template<typename T>
struct sparse_table
{
    std::vector<std::vector<T>> vt;
    sparse_table(std::vector<T> a) {
        int n = a.size();
        vt.assign(n, std::vector<T>(30));
        for (int i = 0;i < n;++i)
            vt[i][0] = a[i];
        for (int s = 1;s < 30;++s) {
            for (int i = 0;i < n;++i) {
                int j = i + (1 << s - 1);
                if (j < n) {
                    vt[i][s] = vt[i][s - 1] + vt[i + (1 << s - 1)][s - 1];
                }
                else vt[i][s] = vt[i][s - 1];
            }
        }
    }
    T query(int l, int r) {//[l,r)
        if (l == r) return T(0);
        int len = r - l;
        int x = std::__lg(len);
        return vt[l][x] + vt[r - (1 << x)][x];
    }
};

struct Info
{
    i64 a;
    Info operator+(Info x) {
        return Info(std::max(a, x.a));
    }
};
```
