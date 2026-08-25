---
title: 取整函数
order: 3
---

# 取整函数

对于实数 $x$，定义 **下取整函数**（floor function）和 **上取整函数**（ceiling function）分别为

$$
\lfloor x\rfloor = \max\{k\in\mathbf Z:k\le x\},~\lceil x\rceil = \min\{k\in\mathbf Z:k\ge x\}.
$$

利用下取整函数，一个实数可以分解为整数部分和小数部分：$x = \lfloor x\rfloor + \{x\}$。其中，$\{x\}$ 表示 $x$ 的小数部分。

取整函数有如下基本性质：（$x\in\mathbf R,~n\in\mathbf Z$）

- $x\in\mathbf Z \iff x = \lfloor x\rfloor = \lceil x\rceil$。
- $\lceil x\rceil - \lfloor x\rfloor = [x\notin\mathbf Z]$。
- $x - 1 < \lfloor x\rfloor \le x \le \lceil x\rceil < x + 1$。
- $\lfloor -x\rfloor = -\lceil x\rceil,~\lceil -x\rceil = -\lfloor x\rfloor$。
- $\lfloor x + n\rfloor = \lfloor x\rfloor + n,~\lceil x + n\rceil = \lceil x \rceil + n$。
- $\lfloor x\rfloor$ 和 $\lceil x\rceil$ 都是关于 $x$ 的单调弱增函数。

证明关于下（上）取整函数的等式经常用到如下等价形式：（$x\in\mathbf R,~n\in\mathbf Z$）

- $\lfloor x\rfloor = n \iff n \le x < n + 1 \iff x - 1 < n \le x$。
- $\lceil x\rceil = n \iff n - 1 < x \le n \iff x \le n < n + 1$。

证明关于下（上）取整函数的不等式经常用到如下等价形式：（$x\in\mathbf R,~n\in\mathbf Z$）

- $x < n \iff \lfloor x\rfloor < n$。
- $n < x \iff n < \lceil x\rceil$。
- $x \le n \iff \lceil x\rceil \le n$。
- $n \le x \iff n \le \lfloor x\rfloor$。

涉及和、差的性质如下：（$x,y\in\mathbf R$）

- $\lfloor x\rfloor + \lfloor y\rfloor \le \lfloor x + y\rfloor \le \lfloor x\rfloor + \lfloor y\rfloor + 1$，且恰有一个等号成立。
- $\lceil x\rceil +\lceil y\rceil -1\leq \lceil x+y\rceil \leq \lceil x\rceil +\lceil y\rceil$，且恰有一个等号成立。
- $\lfloor|x - y|\rfloor \le |\lfloor x\rfloor - \lfloor y\rfloor| \le \lceil|x - y|\rceil$。
- $\lfloor|x - y|\rfloor \le |\lceil x\rceil - \lceil y\rceil| \le \lceil|x-y|\rceil$。

涉及商的性质如下：（$x\in\mathbf R,~n\in\mathbf Z,~m\in\mathbf Z_+$）

- $\left\lceil\dfrac{n}{m}\right\rceil = \left\lfloor\dfrac{n+m-1}{m}\right\rfloor,~\left\lfloor\dfrac{n}{m}\right\rfloor = \left\lceil\dfrac{n-m+1}{m}\right\rceil$。
- $\left\lfloor\dfrac{x + n}{m} \right\rfloor = \left\lfloor\dfrac{\lfloor x\rfloor + n}{m} \right\rfloor,~\left\lceil\dfrac{x + n}{m} \right\rceil = \left\lceil\dfrac{\lceil x\rceil + n}{m} \right\rceil$。
- $\left\lfloor\dfrac{\lfloor x/n\rfloor}{m}\right\rfloor = \left\lfloor\dfrac{x}{nm}\right\rfloor,~\left\lceil\dfrac{\lceil x/n\rceil}{m}\right\rceil = \left\lceil\dfrac{x}{nm}\right\rceil$。
- 对于 $x > 0$，有 $\displaystyle\left\lfloor\dfrac{x}{m}\right\rfloor = \sum_{k=1}^{\lfloor x\rfloor}[m\mid k]$。

其中，第二条和第三条性质都可以看作是如下结论的直接推论：

- 设 $f$ 为连续单增函数，且只要 $f(x)\in\mathbf Z$，就有 $x\in\mathbf Z$，那么

$$
\lfloor f(x)\rfloor = \lfloor f(\lfloor x\rfloor)\rfloor,~ \lceil f(x)\rceil = \lceil f(\lceil x\rceil)\rceil.
$$

**证明**
由对称性，只需要证明第一个等式。如果 $x$ 是整数，那么命题显然。否则，$\lfloor x\rfloor < x$。由 $f$ 和下取整函数的单调性可知，$\lfloor f(x)\rfloor \ge \lfloor f(\lfloor x\rfloor)\rfloor$。如果等号不成立，那么设 $y = \lfloor f(x)\rfloor$，它满足 $\lfloor f(\lfloor x\rfloor)\rfloor < y \le \lfloor f(x)\rfloor$，这等价于 $f(\lfloor x\rfloor) < y \le f(x)$。由 $f$ 的连续性可知，存在 $\lfloor x\rfloor < x_0 \le x$ 使得 $f(x_0)=y$。因为 $y\in\mathbf Z$，所以 $x_0\in\mathbf Z$，这与 $\lfloor x\rfloor$ 的定义矛盾。故而，等号成立，即 $\lfloor f(x)\rfloor = \lfloor f(\lfloor x\rfloor)\rfloor$。

最后是一组关于带有取整函数的求和式的结论：（$x\in\mathbf R,~n\in\mathbf Z,~m\in\mathbf Z_+$）

- $n = \left\lfloor\dfrac{n}{2}\right\rfloor + \left\lceil\dfrac{n}{2}\right\rceil$。
- $n = \left\lfloor\dfrac{n}{m} \right\rfloor + \left\lfloor\dfrac{n+1}{m} \right\rfloor + \cdots + \left\lfloor\dfrac{n+m-1}{m} \right\rfloor$。
- $n = \left\lceil\dfrac{n}{m} \right\rceil + \left\lceil\dfrac{n-1}{m} \right\rceil + \cdots + \left\lceil\dfrac{n-m+1}{m} \right\rceil$。
- $\lfloor mx\rfloor = \lfloor x\rfloor + \left\lfloor x+\dfrac{1}{m}\right\rfloor + \cdots + \left\lfloor x+\dfrac{m-1}{m}\right\rfloor$。
- $\lceil mx\rceil = \lceil x\rceil + \left\lceil x - \dfrac{1}{m}\right\rceil + \cdots + \left\lceil x - \dfrac{m-1}{m}\right\rceil$。
- 当 $m\perp n$ 时，$\displaystyle\sum_{k=1}^{m-1}\left\lfloor\dfrac{kn}{m}\right\rfloor=\dfrac{1}{2}(n-1)(m-1)$。
- 当 $m\perp n$ 时，$\displaystyle\sum_{k=1}^{m-1}\left\lceil\dfrac{kn}{m}\right\rceil=\dfrac{1}{2}(n+1)(m-1)$。
