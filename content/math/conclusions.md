---
title: 常见结论和定理
order: 28
---

# 常见结论和定理

## 麦乐鸡定理

给定两个互质的数 $n,m$ ，定义 $x=a*n+b*m（a \ge 0,b \ge 0）$，当 $x > n*m-n-m$ 时，该式子恒成立。

## 抽屉原理（鸽巢原理）

将 $n+1$ 个物体，划分为 $n$ 组，那么有至少一组有两个（或以上）的物体。

## 哥德巴赫猜想

任何一个大于 $5$ 的整数都可写成三个质数之和；任何一个大于 $2$ 的偶数都可写成两个素数之和。

## 除法、取模运算的本质

有公式：$x \div i=\left\lfloor\dfrac{x}{i}\right\rfloor+x-i\cdot \left\lfloor\dfrac{x}{i}\right\rfloor$ ，$x \mod i=x-i\cdot \left\lfloor\dfrac{x}{i}\right\rfloor$ 。

## 与、或、异或

| 运算 |  运算符、数学符号表示   |   解释    |
| :--: | :---------------------: | :-------: |
|  与  |       `&`、`and`        | 同 1 出 1 |
|  或  |       `\|`、`or`        | 有 1 出 1 |
| 异或 | `^`、$\bigoplus$、`xor` | 不同出 1  |

一些结论：

> 对于给定的 $X$ 和序列 $[a_1,a_2,…,a_n]$ ，有：$\pmb {X=(X \&a_1)or(X\&a_2)or…or(X\&a_n)}$ 。
> 原理是 $and$ 意味着取交集，$or$ 意味着取子集。[来源 - 牛客小白月赛 49C](https://ac.nowcoder.com/acm/contest/11226/C)

## 调和级数近似公式

```cpp
log(n) + 0.5772156649 + 1.0 / (2 * n)
```

## 欧拉函数常见性质

- $1-n$ 中与 $n$ 互质的数之和为 $n * \varphi(n) / 2$ 。

- 若 $a，b$ 互质，则 $\varphi (a*b) = \varphi (a) * \varphi(b)$ 。实际上，所有满足这一条件的函数统称为积性函数。

- 若 $f$ 是积性函数，且有 $\displaystyle n = \prod ^m _{i =1} p_i ^ {c_i}$ ，那么 $\displaystyle f(n) = \prod ^m _{i =1} f( p_i ^ {c_i} )$ 。

- 若 $p$ 为质数，且满足 $p \mid  n$ ，

  - $p^2 \mid n$ ，那么 $\varphi (n) = \varphi (n / p) * p$ 。
  - $p^2 \nmid n$，那么 $\varphi (n) = \varphi (n / p) * (p-1)$ 。

- $\displaystyle\sum _{d \mid n} \varphi (d)= n$ 。

  > 如 $n=10$ ，则 $d=10/5/2/1$ ，那么 $10 = \varphi(10) + \varphi(5) + \varphi(2) + \varphi(1)$ 。

- $\displaystyle\sum_{i = 1}^{n} \gcd(i, n) = \sum_{d|n} \left\lfloor \frac{n}{d} \right\rfloor \varphi(d)$ （欧拉反演）。

## 狄利克雷卷积

$\displaystyle \sum_{d | n} \varphi(d) = n$ ，$\displaystyle \sum_{d|n} \mu(d) \frac{n}{d} = \varphi(n)$ 。

## 斐波那契数列

通项公式：$F_n=\dfrac{1}{\sqrt 5}*  \Big[ \Big( \dfrac{1+\sqrt 5}{2} \Big)^n - \Big( \dfrac{1-\sqrt 5}{2} \Big)^n \Big]$ 。

直接结论：

- 卡西尼性质：$F_{n-1} * F_{n+1}-F_n^2=(-1)^n$ ；
- $F_{n}^2+F_{n+1}^2=F_{2n+1}$ ；
- $F_{n+1}^2-F_{n-1}^2=F_{2n}$ （由上一条写两遍相减得到）；
- 若存在序列 $a_0=1,a_n=a_{n-1}+a_{n-3}+a_{n-5}+...(n\ge 1)$ 则 $a_n=F_n(n\ge 1)$ ；
- 齐肯多夫定理：任何正整数都可以表示成若干个不连续的斐波那契数（ $F_2$ 开始）可以用贪心实现。

求和公式结论：

- 奇数项求和：$F_1+F_3+F_5+...+F_{2n-1}=F_{2n}$ ；
- 偶数项求和：$F_2+F_4+F_6+...+F_{2n}=F_{2n+1}-1$ ；
- 平方和：$F_1^2+F_2^2+F_3^2+...+F_n^2=F_n*F_{n+1}$ ；
- $F_1+2F_2+3F_3+...+nF_n=nF_{n+2}-F_{n+3}+2$ ；
- $-F_1+F_2-F_3+...+(-1)^nF_n=(-1)^n(F_{n+1}-F_n)+1$ ；
- $F_{2n-2m-2}(F_{2n}+F_{2n+2})=F_{2m+2}+F_{4n-2m}$ 。

数论结论：

- $F_a \mid F_b \Leftrightarrow a \mid b$ ；
- $\gcd(F_a,F_b)=F_{\gcd(a,b)}$ ；
- 当 $p$ 为 $5k\pm 1$ 型素数时，$\begin{cases} F_{p-1}\equiv 0\pmod p \\ F_p\equiv 1\pmod p \\ F_{p+1}\equiv 1\pmod p \end{cases}$ ；
- 当 $p$ 为 $5k\pm 2$ 型素数时，$\begin{cases} F_{p-1}\equiv 1\pmod p \\ F_p\equiv -1\pmod p \\ F_{p+1}\equiv 0\pmod p \end{cases}$ ；
- $F(n)\%m$ 的周期 $\le 6m$ （ $m=2\times 5^k$ 时取到等号）；
- 既是斐波那契数又是平方数的有且仅有 $1,144$ 。

## 杂

- 负数取模得到的是负数，如果要用 $0/1$ 判断的话请取绝对值；

- 辗转相除法原式为 $\gcd (x,y)=\gcd (x,y-x)$ ，推广到 $N$ 项为 $\gcd(a_1,a_2,\ldots,a_N)=\gcd(a_1,a_2-a_1,\dots,a_N-a_{N-1})$ ，

  - 该推论在“四则运算后 $\gcd$ ”这类题中有特殊意义，如求解 $\gcd(a_1+X,a_2+X,\dots,a_N+X)$ 时[See](https://codeforces.com/problemset/problem/1458/A)；

- 以下式子成立： $\gcd (a, m) = \gcd(a+x,m) \Leftrightarrow  \gcd(a, m)=\gcd(x,m)$ 。求解上式满足条件的 $x$ 的数量即为求比 $\dfrac{m}{\gcd(a,m)}$ 小且与其互质的数的个数，即用欧拉函数求解 $\varphi \Big(\dfrac{m}{\gcd(a,m)} \Big)$ 。

- 已知序列 $a$ ，定义集合 $S=\{a_i\cdot a_j \ \vert\  i<j\}$ ，现在要求解 $\gcd(S)$ ，即为求解 $\gcd(a_j,\gcd(a_i \ \vert\ i<j))$ ，换句话说，即为求解后缀 $\gcd$ 。

- 连续四个数互质的情况如下，当 $n$ 为奇数时，$n,n-1,n-2$ 一定互质；而当 $n$ 为偶数时，$\left\{\begin{matrix}n,n-1,n-3 \text{互质}& \gcd(n,n-3)=1\text{时}\\
  n-1,n-2,n-3 \text{互质}& \gcd(n,n-3)\neq1\text{时}
  \end{matrix}\right.$ [See](https://codeforces.com/problemset/problem/235/A)；

- 由 $a\mod b=(b+a)\mod b=(2\cdot b+a)\mod b=\dots=(K\cdot b+a)\mod b$ 可以推广得到 $(a\mod b)\mod c=((K\cdot bc+a)\mod b)\mod c$ ，由此可以得到一个 $bc$ 的答案周期[See](https://codeforces.com/problemset/problem/1342/C)；

- 对于长度为 $2\cdot N$ 的数列 $a$ ，将其任意均分为两个长度为 $N$ 的数列 $p,q$ ，随后对 $p$ 非递减排序、对 $q$ 非递增排序，定义 $\displaystyle f(p,q)=\sum_{i=1}^{n}|p_i-q_i|$ ，那么答案为 $a$ 数列前 $N$ 大的数之和减去前 $N$ 小的数之和[See](https://codeforces.com/problemset/problem/1444/B)。

- 令 $\left\{\begin{matrix} X=a+b\\
  Y=a\oplus b
  \end{matrix}\right.$ ，**如果**该式子**有解**，那么存在前提条件 $\left\{\begin{matrix} X \ge Y \\
  X,Y \text{同奇偶}
  \end{matrix}\right.$ ；进一步，此时最小的 $a$ 的取值为 $\dfrac{X-Y}{2}$ [See](https://codeforces.com/problemset/problem/76/D)。

  然而，上方方程并不总是有解的，只有当变量增加到三个时，才**一定有解**，即：**在保证上方前提条件成立的情况下**，求解 $\left\{\begin{matrix} X=a+b+c\\Y=a\oplus b\oplus c\end{matrix}\right.$ ，则一定存在一组解 $\{\dfrac{X-Y}{2},\dfrac{X-Y}{2},Y\}$ [See](https://codeforces.com/problemset/problem/1325/D)。

- 已知序列 $p$ 是由序列 $a_1$ 、序列 $a_2$ 、……、序列 $a_n$ 合并而成，且合并过程中各序列内元素相对顺序不变，记 $T(p)$ 是 $p$ 序列的最大前缀和，则 $\displaystyle T(p)=\sum_{i=1}^nT(a_i)$ [See](https://codeforces.com/problemset/problem/1469/B) 。

- $x+y=x|y+x\&y$ ，对于两个数字 $x$ 和 $y$ ，如果将 $x$ 变为 $x|y$ ，同时将 $y$ 变为 $x\&y$ ，那么在本质上即将 $x$ 二进制模式下的全部 $1$ 移动到了 $y$ 的对应的位置上 [See](https://codeforces.com/contest/1368/problem/D) 。

- 一个正整数 $x$ 异或、加上另一个正整数 $y$ 后奇偶性不发生变化：$a+b\equiv a\oplus b(\bmod2)$ [See](https://codeforces.com/contest/1634/problem/B) 。
