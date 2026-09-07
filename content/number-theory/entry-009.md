---
title: "取整函数"
order: 90
---

# 取整函数 {#s-7af3aa2f8cd9}

  对于实数 $x$，定义 **下取整函数**（floor function）和 **上取整函数**（ceiling function）分别为

$$
\lfloor x \rfloor = \text{max} \{ k \in \mathbf{Z} : k \le x \} , \quad \lceil x \rceil = \text{min} \{ k \in \mathbf{Z} : k \ge x \} .
$$

利用下取整函数，一个实数可以分解为整数部分和小数部分：$x = \lfloor x \rfloor + \{ x \}$。其中，$\{ x \}$ 表示 $x$ 的小数部分。

取整函数有如下基本性质：（$x \in \mathbf{R} , \quad n \in \mathbf{Z}$）

- $x \in \mathbf{Z} \Leftrightarrow x = \lfloor x \rfloor = \lceil x \rceil$。

- $\lceil x \rceil - \lfloor x \rfloor = [ x \notin \mathbf{Z} ]$。

- $x - 1 < \lfloor x \rfloor \le x \le \lceil x \rceil < x + 1$。

- $\lfloor - x \rfloor = - \lceil x \rceil , \quad \lceil - x \rceil = - \lfloor x \rfloor$。

- $\lfloor x + n \rfloor = \lfloor x \rfloor + n , \quad \lceil x + n \rceil = \lceil x \rceil + n$。

- $\lfloor x \rfloor$ 和 $\lceil x \rceil$ 都是关于 $x$ 的单调弱增函数。

证明关于下（上）取整函数的等式经常用到如下等价形式：（$x \in \mathbf{R} , \quad n \in \mathbf{Z}$）

- $\lfloor x \rfloor = n \Leftrightarrow n \le x < n + 1 \Leftrightarrow x - 1 < n \le x$。

- $\lceil x \rceil = n \Leftrightarrow n - 1 < x \le n \Leftrightarrow x \le n < x + 1$。

证明关于下（上）取整函数的不等式经常用到如下等价形式：（$x \in \mathbf{R} , \quad n \in \mathbf{Z}$）

- $x < n \Leftrightarrow \lfloor x \rfloor < n$。

- $n < x \Leftrightarrow n < \lceil x \rceil$。

- $x \le n \Leftrightarrow \lceil x \rceil \le n$。

- $n \le x \Leftrightarrow n \le \lfloor x \rfloor$。

涉及和、差的性质如下：（$x , y \in \mathbf{R}$）

- $\lfloor x \rfloor + \lfloor y \rfloor \le \lfloor x + y \rfloor \le \lfloor x \rfloor + \lfloor y \rfloor + 1$，且恰有一个等号成立。

- $\lceil x \rceil + \lceil y \rceil - 1 \le \lceil x + y \rceil \le \lceil x \rceil + \lceil y \rceil$，且恰有一个等号成立。

- $\lfloor \vert x - y \vert \rfloor \le \vert \lfloor x \rfloor - \lfloor y \rfloor \vert \le \lceil \vert x - y \vert \rceil$。

- $\lfloor \vert x - y \vert \rfloor \le \vert \lceil x \rceil - \lceil y \rceil \vert \le \lceil \vert x - y \vert \rceil$。

涉及商的性质如下：（$x \in \mathbf{R} , \quad n \in \mathbf{Z} , \quad m \in \mathbf{Z}_{+}$）

- $\lceil \frac{n}{m} \rceil = \lfloor \frac{n + m - 1}{m} \rfloor , \quad \lfloor \frac{n}{m} \rfloor = \lceil \frac{n - m + 1}{m} \rceil$。

- $\lfloor \frac{x + n}{m} \rfloor = \lfloor \frac{\lfloor x \rfloor + n}{m} \rfloor , \quad \lceil \frac{x + n}{m} \rceil = \lceil \frac{\lceil x \rceil + n}{m} \rceil$。

- $\lfloor \frac{\lfloor x / n \rfloor}{m} \rfloor = \lfloor \frac{x}{n m} \rfloor , \quad \lceil \frac{\lceil x / n \rceil}{m} \rceil = \lceil \frac{x}{n m} \rceil$。

- 对于 $x > 0$，有 $\lfloor \frac{x}{m} \rfloor = \sum_{k = 1}^{\lfloor x \rfloor} [ m \mid k ]$。

其中，第二条和第三条性质都可以看作是如下结论的直接推论：

- 设 $f$ 为连续单增函数，且只要 $f ( x ) \in \mathbf{Z}$，就有 $x \in \mathbf{Z}$，那么

$$
\lfloor f ( x ) \rfloor = \lfloor f ( \lfloor x \rfloor ) \rfloor , \quad \lceil f ( x ) \rceil = \lceil f ( \lceil x \rceil ) \rceil .
$$

**证明** 由对称性，只需要证明第一个等式。如果 $x$ 是整数，那么命题显然。否则，$\lfloor x \rfloor < x$。由 $f$ 和下取整函数的单调性可知，$\lfloor f ( x ) \rfloor \ge \lfloor f ( \lfloor x \rfloor ) \rfloor$。如果等号不成立，那么设 $y = \lfloor f ( x ) \rfloor$，它满足 $\lfloor f ( \lfloor x \rfloor ) \rfloor < y \le \lfloor f ( x ) \rfloor$，这等价于 $f ( \lfloor x \rfloor ) < y \le f ( x )$。由 $f$ 的连续性可知，存在 $\lfloor x \rfloor < x_{0} \le x$ 使得 $f ( x_{0} ) = y$。因为 $y \in \mathbf{Z}$，所以 $x_{0} \in \mathbf{Z}$，这与 $\lfloor x \rfloor$ 的定义矛盾。故而，等号成立，即 $\lfloor f ( x ) \rfloor = \lfloor f ( \lfloor x \rfloor ) \rfloor$。

最后是一组关于带有取整函数的求和式的结论：（$x \in \mathbf{R} , \quad n \in \mathbf{Z} , \quad m \in \mathbf{Z}_{+}$）

- $n = \lfloor \frac{n}{2} \rfloor + \lceil \frac{n}{2} \rceil$。

- $n = \lfloor \frac{n}{m} \rfloor + \lfloor \frac{n + 1}{m} \rfloor + \cdots + \lfloor \frac{n + m - 1}{m} \rfloor$。

- $n = \lceil \frac{n}{m} \rceil + \lceil \frac{n - 1}{m} \rceil + \cdots + \lceil \frac{n - m + 1}{m} \rceil$。

- $\lfloor m x \rfloor = \lfloor x \rfloor + \lfloor x + \frac{1}{m} \rfloor + \cdots + \lfloor x + \frac{m - 1}{m} \rfloor$。

- $\lceil m x \rceil = \lceil x \rceil + \lceil x - \frac{1}{m} \rceil + \cdots + \lceil x - \frac{m - 1}{m} \rceil$。

- 当 $m \perp n$ 时，$\sum_{k = 1}^{m - 1} \lfloor \frac{k n}{m} \rfloor = \frac{1}{2} ( n - 1 ) ( m - 1 )$。

- 当 $m \perp n$ 时，$\sum_{k = 1}^{m - 1} \lceil \frac{k n}{m} \rceil = \frac{1}{2} ( n + 1 ) ( m - 1 )$。
