---
title: "常见结论和定理"
order: 340
---

# 常见结论和定理 {#s-bcaee764bba7}

构造与存在性的速查，不是算法。用前确认条件（互质、奇偶、上下界）。

## 麦乐鸡定理 {#s-a5b6f80b120e}

给定两个互质的数 $n , m$ ，定义 $x = a * n + b * m ( a \ge 0 , b \ge 0 )$，当 $x > n * m - n - m$ 时，该式子恒成立。

## 抽屉原理（鸽巢原理） {#s-bf4e56f0352f}

将 $n + 1$ 个物体，划分为 $n$ 组，那么有至少一组有两个（或以上）的物体。

## 哥德巴赫猜想 {#s-1bef2795e6cf}

任何一个大于 $5$ 的整数都可写成三个质数之和；任何一个大于 $2$ 的偶数都可写成两个素数之和。

## 除法、取模运算的本质 {#s-66ac3c0ba58e}

有公式：$x \div i = \lfloor \frac{x}{i} \rfloor + x - i \cdot \lfloor \frac{x}{i} \rfloor$ ，$x \operatorname{mod} \quad i = x - i \cdot \lfloor \frac{x}{i} \rfloor$ 。

## 与、或、异或 {#s-084e9e2a3bc1}

| 运算 | 运算符、数学符号表示 | 解释 |
| --- | --- | --- |
| 与 | `&`、`and` | 同 1 出 1 |
| 或 | `\\|`、`or` | 有 1 出 1 |
| 异或 | `^`、$\bigoplus$、`xor` | 不同出 1 |

一些结论：

> 对于给定的 $X$ 和序列 $[ a_{1} , a_{2} , \ldots , a_{n} ]$ ，有：$\mathbf{X = ( X \& a_{1} ) o r ( X \& a_{2} ) o r \ldots o r ( X \& a_{n} )}$ 。 原理是 $a n d$ 意味着取交集，$o r$ 意味着取子集。[来源 - 牛客小白月赛 49C](https://ac.nowcoder.com/acm/contest/11226/C)

## 调和级数近似公式 {#s-ee3ec35bbd4d}

$H_{n} \approx \text{ln} n + \gamma + 1 / ( 2 n )$，$\gamma \approx 0.5772156649$。估 $\sum \lfloor n / i \rfloor$ 的量级。

```cpp
log(n) + 0.5772156649 + 1.0 / (2 * n)
```

## 欧拉函数常见性质 {#s-4a187c1925d0}

- $1 - n$ 中与 $n$ 互质的数之和为 $n * \varphi ( n ) / 2$ 。

- 若 $a , b$ 互质，则 $\varphi ( a * b ) = \varphi ( a ) * \varphi ( b )$ 。实际上，所有满足这一条件的函数统称为积性函数。

- 若 $f$ 是积性函数，且有 $n = \prod_{i = 1}^{m} p_{i}^{c_{i}}$ ，那么 $f ( n ) = \prod_{i = 1}^{m} f ( p_{i}^{c_{i}} )$ 。

- 若 $p$ 为质数，且满足 $p \mid n$ ，


   - $p^{2} \mid n$ ，那么 $\varphi ( n ) = \varphi ( n / p ) * p$ 。

   - $p^{2} \nmid n$，那么 $\varphi ( n ) = \varphi ( n / p ) * ( p - 1 )$ 。

- $\sum_{d \mid n} \varphi ( d ) = n$ 。



> 如 $n = 10$ ，则 $d = 10 / 5 / 2 / 1$ ，那么 $10 = \varphi ( 10 ) + \varphi ( 5 ) + \varphi ( 2 ) + \varphi ( 1 )$ 。

- $\sum_{i = 1}^{n} \text{gcd} ( i , n ) = \sum_{d \vert n} \lfloor \frac{n}{d} \rfloor \varphi ( d )$ （欧拉反演）。

## 狄利克雷卷积 {#s-4aa2e6b0ec00}

$\sum_{d \vert n} \varphi ( d ) = n$ ，$\sum_{d \vert n} \mu ( d ) \frac{n}{d} = \varphi ( n )$ 。

## 斐波那契数列 {#s-ae358a9065d4}

通项公式：$F_{n} = \frac{1}{\sqrt{5}} * [ ( \frac{1 + \sqrt{5}}{2} )^{n} - ( \frac{1 - \sqrt{5}}{2} )^{n} ]$ 。

直接结论：

- 卡西尼性质：$F_{n - 1} * F_{n + 1} - F_{n}^{2} = ( - 1 )^{n}$ ；

- $F_{n}^{2} + F_{n + 1}^{2} = F_{2 n + 1}$ ；

- $F_{n + 1}^{2} - F_{n - 1}^{2} = F_{2 n}$ （由上一条写两遍相减得到）；

- 若存在序列 $a_{0} = 1 , a_{n} = a_{n - 1} + a_{n - 3} + a_{n - 5} + \cdots ( n \ge 1 )$ 则 $a_{n} = F_{n} ( n \ge 1 )$ ；

- 齐肯多夫定理：任何正整数都可以表示成若干个不连续的斐波那契数（ $F_{2}$ 开始）可以用贪心实现。

求和公式结论：

- 奇数项求和：$F_{1} + F_{3} + F_{5} + \cdots + F_{2 n - 1} = F_{2 n}$ ；

- 偶数项求和：$F_{2} + F_{4} + F_{6} + \cdots + F_{2 n} = F_{2 n + 1} - 1$ ；

- 平方和：$F_{1}^{2} + F_{2}^{2} + F_{3}^{2} + \cdots + F_{n}^{2} = F_{n} * F_{n + 1}$ ；

- $F_{1} + 2 F_{2} + 3 F_{3} + \cdots + n F_{n} = n F_{n + 2} - F_{n + 3} + 2$ ；

- $- F_{1} + F_{2} - F_{3} + \cdots + ( - 1 )^{n} F_{n} = ( - 1 )^{n} ( F_{n + 1} - F_{n} ) + 1$ ；

- $F_{2 n - 2 m - 2} ( F_{2 n} + F_{2 n + 2} ) = F_{2 m + 2} + F_{4 n - 2 m}$ 。

数论结论：

- $F_{a} \mid F_{b} \Leftrightarrow a \mid b$ ；

- $\text{gcd} ( F_{a} , F_{b} ) = F_{\text{gcd} ( a , b )}$ ；

- 当 $p$ 为 $5 k \pm 1$ 型素数时，$\begin{cases} F_{p - 1} \equiv 0 ( \operatorname{mod} p ) \\ F_{p} \equiv 1 ( \operatorname{mod} p ) \\ F_{p + 1} \equiv 1 ( \operatorname{mod} p )\end{cases}$ ；

- 当 $p$ 为 $5 k \pm 2$ 型素数时，$\begin{cases} F_{p - 1} \equiv 1 ( \operatorname{mod} p ) \\ F_{p} \equiv - 1 ( \operatorname{mod} p ) \\ F_{p + 1} \equiv 0 ( \operatorname{mod} p )\end{cases}$ ；

- $F ( n ) \% m$ 的周期 $\le 6 m$ （ $m = 2 \times 5^{k}$ 时取到等号）；

- 既是斐波那契数又是平方数的有且仅有 $1 , 144$ 。

## 杂 {#s-3bd660083f8b}

- 负数取模得到的是负数，如果要用 $0 / 1$ 判断的话请取绝对值；

- 辗转相除法原式为 $\text{gcd} ( x , y ) = \text{gcd} ( x , y - x )$ ，推广到 $N$ 项为 $\text{gcd} ( a_{1} , a_{2} , \ldots , a_{N} ) = \text{gcd} ( a_{1} , a_{2} - a_{1} , \ldots , a_{N} - a_{N - 1} )$ ，


   - 该推论在“四则运算后 $\text{gcd}$ ”这类题中有特殊意义，如求解 $\text{gcd} ( a_{1} + X , a_{2} + X , \ldots , a_{N} + X )$ 时[See](https://codeforces.com/problemset/problem/1458/A)；

- 以下式子成立： $\text{gcd} ( a , m ) = \text{gcd} ( a + x , m ) \Leftrightarrow \text{gcd} ( a , m ) = \text{gcd} ( x , m )$ 。求解上式满足条件的 $x$ 的数量即为求比 $\frac{m}{\text{gcd} ( a , m )}$ 小且与其互质的数的个数，即用欧拉函数求解 $\varphi ( \frac{m}{\text{gcd} ( a , m )} )$ 。

- 已知序列 $a$ ，定义集合 $S = \{ a_{i} \cdot a_{j} \quad \vert \quad i < j \}$ ，现在要求解 $\text{gcd} ( S )$ ，即为求解 $\text{gcd} ( a_{j} , \text{gcd} ( a_{i} \quad \vert \quad i < j ) )$ ，换句话说，即为求解后缀 $\text{gcd}$ 。

- 连续四个数互质的情况如下，当 $n$ 为奇数时，$n , n - 1 , n - 2$ 一定互质；而当 $n$ 为偶数时，$\begin{cases} n , n - 1 , n - 3 \mathrm{\text{互质}} & \text{gcd} ( n , n - 3 ) = 1 \mathrm{\text{时}} \\ n - 1 , n - 2 , n - 3 \mathrm{\text{互质}} & \text{gcd} ( n , n - 3 ) \ne 1 \mathrm{\text{时}}\end{cases}$ [See](https://codeforces.com/problemset/problem/235/A)；

- 由 $a \operatorname{mod} \quad b = ( b + a ) \operatorname{mod} \quad b = ( 2 \cdot b + a ) \operatorname{mod} \quad b = \ldots = ( K \cdot b + a ) \operatorname{mod} \quad b$ 可以推广得到 $( a \operatorname{mod} \quad b ) \operatorname{mod} \quad c = ( ( K \cdot b c + a ) \operatorname{mod} \quad b ) \operatorname{mod} \quad c$ ，由此可以得到一个 $b c$ 的答案周期[See](https://codeforces.com/problemset/problem/1342/C)；

- 对于长度为 $2 \cdot N$ 的数列 $a$ ，将其任意均分为两个长度为 $N$ 的数列 $p , q$ ，随后对 $p$ 非递减排序、对 $q$ 非递增排序，定义 $f ( p , q ) = \sum_{i = 1}^{n} \vert p_{i} - q_{i} \vert$ ，那么答案为 $a$ 数列前 $N$ 大的数之和减去前 $N$ 小的数之和[See](https://codeforces.com/problemset/problem/1444/B)。

- 令 $\begin{cases} X = a + b \\ Y = a \oplus b\end{cases}$ ，**如果**该式子**有解**，那么存在前提条件 $\begin{cases} X \ge Y \\ X , Y \mathrm{\text{同奇偶}}\end{cases}$ ；进一步，此时最小的 $a$ 的取值为 $\frac{X - Y}{2}$ [See](https://codeforces.com/problemset/problem/76/D)。

然而，上方方程并不总是有解的，只有当变量增加到三个时，才**一定有解**，即：**在保证上方前提条件成立的情况下**，求解 $\begin{cases} X = a + b + c \\ Y = a \oplus b \oplus c\end{cases}$ ，则一定存在一组解 $\{ \frac{X - Y}{2} , \frac{X - Y}{2} , Y \}$ [See](https://codeforces.com/problemset/problem/1325/D)。

- 已知序列 $p$ 是由序列 $a_{1}$ 、序列 $a_{2}$ 、……、序列 $a_{n}$ 合并而成，且合并过程中各序列内元素相对顺序不变，记 $T ( p )$ 是 $p$ 序列的最大前缀和，则 $T ( p ) = \sum_{i = 1}^{n} T ( a_{i} )$ [See](https://codeforces.com/problemset/problem/1469/B) 。

- $x + y = x \vert y + x \& y$ ，对于两个数字 $x$ 和 $y$ ，如果将 $x$ 变为 $x \vert y$ ，同时将 $y$ 变为 $x \& y$ ，那么在本质上即将 $x$ 二进制模式下的全部 $1$ 移动到了 $y$ 的对应的位置上 [See](https://codeforces.com/contest/1368/problem/D) 。

- 一个正整数 $x$ 异或、加上另一个正整数 $y$ 后奇偶性不发生变化：$a + b \equiv a \oplus b ( \operatorname{mod} 2 )$ [See](https://codeforces.com/contest/1634/problem/B) 。
