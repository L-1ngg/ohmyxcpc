---
title: 快速傅里叶变换 FFT
order: 205
---

# 快速傅里叶变换 FFT

使用说明：

1. 创建一个实例 `FFT_mul solver`；
2. 准备输入数据：将两个多项式 $A(x)$ 和 $B(x)$ 的系数（必须是实数）按升幂顺序转化为 `std::complex<double>` 类型，并推入 `solver.A` 和 `solver.B`；
3. 调用 `count(x, y)` 函数执行卷积操作；
4. 系数序列存储在 `solver.ret` 向量中。

$\mathcal O(N\log N)$ 。

```cpp
using i64 = long long;
const double PI = acos(-1);
struct FFT_mul {
    std::vector<std::complex<double>> A, B;
    std::vector<i64> ret;
    std::vector<std::complex<double>> roots;  // 预处理单位根表

    // 初始化单位根表
    void init_roots(int n) {
        roots.resize(n);
        for (int i = 0; i < n; i++) {
            double ang = 2 * PI * i / n;
            roots[i] = std::complex<double>(cos(ang), sin(ang));
        }
    }

    // 迭代 FFT
    void FFT(std::vector<std::complex<double>>& a, bool invert) {
        int n = (int)a.size();
        // bit-reversal
        for (int i = 1, j = 0; i < n; i++) {
            int bit = n >> 1;
            for (; j & bit; bit >>= 1) j ^= bit;
            j ^= bit;
            if (i < j) swap(a[i], a[j]);
        }

        for (int len = 2; len <= n; len <<= 1) {
            int step = n / len;
            for (int i = 0; i < n; i += len) {
                for (int j = 0; j < len / 2; j++) {
                    std::complex<double> u = a[i + j];
                    // 正变换用 roots，逆变换用共轭
                    std::complex<double> v =
                        a[i + j + len / 2] * (invert ? conj(roots[j * step]) : roots[j * step]);
                    a[i + j] = u + v;
                    a[i + j + len / 2] = u - v;
                }
            }
        }
        if (invert) {
            for (auto& x : a) x /= n;
        }
    }

    // 卷积
    void count(int x, int y) {
        if ((int)A.size() < x + 1) A.resize(x + 1);
        if ((int)B.size() < y + 1) B.resize(y + 1);

        int need = x + y + 1;
        int n = 1;
        while (n < need) n <<= 1;

        init_roots(n);

        std::vector<std::complex<double>> fa(n), fb(n);
        copy(A.begin(), A.begin() + (x + 1), fa.begin());
        copy(B.begin(), B.begin() + (y + 1), fb.begin());

        FFT(fa, false);
        FFT(fb, false);
        for (int i = 0; i < n; i++) fa[i] *= fb[i];
        FFT(fa, true);

        ret.assign(need, 0);
        for (int i = 0; i < need; i++) {
            ret[i] = (i64)llround(fa[i].real());
        }
    }
};
```

**系数顺序:** 输入系数必须严格按照**升幂顺序**（从 $x^0$ 到 $x^{\text{max\_deg}}$）。

**输入参数:** `count(x, y)` 传入的参数是多项式的**最高次数**，而不是系数的数量。

**精度与范围:**

- `i64` 用于存储最终结果，请确保中间结果（系数乘积之和）不超过 `i64` 的表示范围，否则仍可能溢出。
- 由于浮点误差，结果在 IFFT 后通过 `llround(fa[i].real())` 四舍五入到最近的整数。如果系数非常大，可能存在累积误差。

**零填充 (Padding):** 模板内部会自动处理零填充，将长度扩展到大于 $x+y$ 的最小二次幂 $N$。
