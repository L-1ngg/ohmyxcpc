---
title: "同余类与剩余系"
order: 70
---

# 同余类与剩余系 {#s-1c769c6e38fa}

  为方便讨论，对集合 $A , B$ 和元素 $r$，我们引入如下记号：

- $r + A := \{ r + a : a \in A \}$；

- $r A := \{ r a : a \in A \}$；

- $A + B := \{ a + b : a \in A , b \in B \}$；

- $A B := \{ a b : a \in A , b \in B \}$。

**同余类** 对非零整数 $m$，把全体整数分成 $\vert m \vert$ 个两两不交的集合，且同一个集合中的任意两个数模 $m$ 均同余，我们把这 $\vert m \vert$ 个集合均称为模 $m$ 的 **同余类** 或 **剩余类**。用 $r \operatorname{mod} m$ 表示含有整数 $r$ 的模 $m$ 的同余类。

不难证明对任意非零整数 $m$，上述划分方案一定存在且唯一。

由同余类的定义可知：

- $r \operatorname{mod} m = \{ r + k m : k \in \mathbf{Z} \}$；

- $r \operatorname{mod} m = s \operatorname{mod} m \Leftrightarrow r \equiv s ( \operatorname{mod} m )$；

- 对任意 $r , s \in \mathbf{Z}$，要么 $r \operatorname{mod} m = s \operatorname{mod} m$，要么 $( r \operatorname{mod} m ) \cap ( s \operatorname{mod} m ) = \varnothing$；

- 若 $m_{1} \mid m$，则对任意整数 $r$ 均有 $r + m \mathbf{Z} \subseteq r + m_{1} \mathbf{Z}$。

注意到同余是等价关系，所以同余类即为同余关系的等价类。

我们把模 $m$ 的同余类全体构成的集合记为 $\mathbf{Z}_{m}$，即

$$
\mathbf{Z}_{m} := \{ r \operatorname{mod} m : 0 \le r < m \}
$$

不难发现：

- 对任意整数 $a$，$a + \mathbf{Z}_{m} = \mathbf{Z}_{m}$；

- 对任意与 $m$ 互质的整数 $b$，$b \mathbf{Z}_{m} = \mathbf{Z}_{m}$。

由商群的定义可知 $\mathbf{Z}_{m} = \mathbf{Z} / m \mathbf{Z}$，所以有时我们也会用 $\mathbf{Z} / m \mathbf{Z}$ 表示 $\mathbf{Z}_{m}$。

由抽屉原理可知：

- 任取 $m + 1$ 个整数，必有两个整数模 $m$ 同余。

- 存在 $m$ 个两两模 $m$ 不同余的整数。

由此我们给出完全剩余系的定义：

**完全剩余系** 对 $m$ 个整数 $a_{1} , a_{2} , \ldots , a_{m}$，若对任意的数 $x$，有且仅有一个数 $a_{i}$ 使得 $x$ 与 $a_{i}$ 模 $m$ 同余，则称这 $m$ 个整数 $a_{1} , a_{2} , \ldots , a_{m}$ 为模 $m$ 的 **完全剩余系**，简称 **剩余系**。

我们还可以定义模 $m$ 的：

- 最小非负（完全）剩余系：$0 , \ldots , m - 1$；

- 最小正（完全）剩余系：$1 , \ldots , m$；

- 绝对最小（完全）剩余系：$- \lfloor m / 2 \rfloor , \ldots , - \lfloor - m / 2 \rfloor - 1$；

- 最大非正（完全）剩余系：$- m + 1 , \ldots , 0$；

- 最大负（完全）剩余系：$- m , \ldots , - 1$。

若无特殊说明，一般我们只用最小非负剩余系。

我们注意到如下命题成立：

- 在模 $m$ 的任意一个同余类中，任取两个整数 $a_{1} , a_{2}$ 均有 $( a_{1} , m ) = ( a_{2} , m )$。

考虑同余类 $r \operatorname{mod} m$，若 $( r , m ) = 1$，则该同余类的所有元素均与 $m$ 互质，这说明我们也许可以通过类似方式得知所有与 $m$ 互质的整数构成的集合的结构。

**既约同余类** 对同余类 $r \operatorname{mod} m$，若 $( r , m ) = 1$，则称该同余类为 **既约同余类** 或 **既约剩余类**。

我们把模 $m$ 既约剩余类的个数记作 $\varphi ( m )$，称其为 Euler 函数（欧拉函数，见 [后节](/number-theory/entry-019#s-66c11f2e7838)）。

我们把模 $m$ 的既约同余类全体构成的集合记为 $\mathbf{Z}_{m}^{*}$，即

$$
\mathbf{Z}_{m}^{*} := \{ r \operatorname{mod} m : 0 \le r < m , ( r , m ) = 1 \}
$$

**Warning** 对于任意的整数 $a$ 和与 $m$ 互质的整数 $b$，$b \mathbf{Z}_{m}^{*} = \mathbf{Z}_{m}^{*}$，但是 $a + \mathbf{Z}_{m}^{*}$ 不一定为 $\mathbf{Z}_{m}^{*}$。这一点与 $\mathbf{Z}_{m}$ 不同。

由抽屉原理可知：

- 任取 $\varphi ( m ) + 1$ 个与 $m$ 互质的整数，必有两个整数模 $m$ 同余。

- 存在 $\varphi ( m )$ 个与 $m$ 互质且两两模 $m$ 不同余的整数。

由此我们给出既约剩余系的定义：

**既约剩余系** 对 $t = \varphi ( m )$ 个整数 $a_{1} , a_{2} , \ldots , a_{t}$，若 $( a_{i} , m ) = 1 , \quad \forall 1 \le i \le t$，且对任意满足 $( x , m ) = 1$ 的数 $x$，有且仅有一个数 $a_{i}$ 使得 $x$ 与 $a_{i}$ 模 $m$ 同余，则称这 $t$ 个整数 $a_{1} , a_{2} , \ldots , a_{t}$ 为模 $m$ 的 **既约剩余系**、**缩剩余系** 或 **简化剩余系**。

类似地，我们也可以定义最小非负既约剩余系等概念。

若无特殊说明，一般我们只用最小非负既约剩余系。

## 剩余系的复合 {#s-39ceead5d574}

  对正整数 $m$，我们有如下定理：

- 若 $m = m_{1} m_{2} , \quad 1 \le m_{1} , m_{2}$，令 $Z_{m_{1}} , Z_{m_{2}}$ 分别为模 $m_{1} , m_{2}$ 的 **完全** 剩余系，则对任意与 $m_{1}$ 互质的 $a$ 均有：

$$
Z_{m} = a Z_{m_{1}} + m_{1} Z_{m_{2}} .
$$

为模 $m$ 的 **完全** 剩余系。进而，若 $m = \prod_{i = 1}^{k} m_{i} , \quad 1 \le m_{1} , m_{2} , \ldots , m_{k}$，令 $Z_{m_{1}} , \ldots , Z_{m_{k}}$ 分别为模 $m_{1} , \ldots , m_{k}$ 的 **完全** 剩余系，则：

$$
Z_{m} = \sum_{i = 1}^{k} ( \prod_{j = 1}^{i - 1} m_{j} ) Z_{m_{i}} .
$$

为模 $m$ 的 **完全** 剩余系。

**证明** 只需证明对任意满足 $a x + m_{1} y \equiv a x \prime + m_{1} y \prime ( \operatorname{mod} m_{1} m_{2} )$ 的 $x , x \prime \in Z_{m_{1}}$，$y , y \prime \in Z_{m_{2}}$，都有：

$$
a x + m_{1} y = a x \prime + m_{1} y \prime .
$$

实际上，由 $m_{1} \mid m_{1} m_{2}$，我们有 $a x + m_{1} y \equiv a x \prime + m_{1} y \prime ( \operatorname{mod} m_{1} )$，进而 $a x \equiv a x \prime ( \operatorname{mod} m_{1} )$，由 $( a , m_{1} ) = 1$ 可知 $x \equiv x \prime ( \operatorname{mod} m_{1} )$，进而有 $x = x \prime$。

进一步，$m_{1} y \equiv m_{1} y \prime ( \operatorname{mod} m_{1} m_{2} )$，则 $y \equiv y \prime ( \operatorname{mod} m_{2} )$，即 $y = y \prime$。

因此，

$$
a x + m_{1} y = a x \prime + m_{1} y \prime .
$$

- 若 $m = m_{1} m_{2} , \quad 1 \le m_{1} , m_{2} , ( m_{1} , m_{2} ) = 1$，令 $Z_{m_{1}}^{*} , Z_{m_{2}}^{*}$ 分别为模 $m_{1} , m_{2}$ 的 **既约** 剩余系，则：

$$
Z_{m}^{*} = m_{2} Z_{m_{1}}^{*} + m_{1} Z_{m_{2}}^{*} .
$$

为模 $m$ 的 **既约** 剩余系。

**Tip** 该定理等价于证明 Euler 函数为积性函数。

**证明** 令 $Z_{m_{1}} , Z_{m_{2}}$ 分别为模 $m_{1} , m_{2}$ 的完全剩余系，我们已经证明了

$$
Z_{m} = m_{2} Z_{m_{1}} + m_{1} Z_{m_{2}}
$$

为模 $m$ 的完全剩余系。令 $M = \{ a \in Z_{m} : ( a , m ) = 1 \} \subseteq Z_{m}$，显然 $M$ 为模 $m$ 的既约剩余系，所以我们只需证明 $M = Z_{m}^{*}$ 即可。

显然 $Z_{m}^{*} \subseteq Z_{m}$。

任取 $m_{2} x + m_{1} y \in M$，其中 $x \in Z_{m_{1}}$ 且 $y \in Z_{m_{2}}$，有 $( m_{2} x + m_{1} y , m_{1} m_{2} ) = 1$，由 $( m_{1} , m_{2} ) = 1$ 可得

$$
1 = ( m_{2} x + m_{1} y , m_{1} ) = ( m_{2} x , m_{1} ) = ( x , m_{1} ) ,
$$

$$
1 = ( m_{2} x + m_{1} y , m_{2} ) = ( m_{1} y , m_{2} ) = ( y , m_{2} ) .
$$

因此可得 $x \in Z_{m_{1}}^{*}$ 且 $y \in Z_{m_{2}}^{*}$，即 $M \subseteq Z_{m}^{*}$。

任取 $m_{2} x + m_{1} y \in Z_{m}^{*}$，其中 $x \in Z_{m_{1}}^{*}$ 且 $y \in Z_{m_{2}}^{*}$，有 $( x , m_{1} ) = 1$ 且 $( y , m_{2} ) = 1$，由 $( m_{1} , m_{2} ) = 1$ 可得

$$
( m_{2} x + m_{1} y , m_{1} ) = ( m_{2} x , m_{1} ) = ( x , m_{1} ) = 1 ,
$$

$$
( m_{2} x + m_{1} y , m_{2} ) = ( m_{1} y , m_{2} ) = ( x , m_{2} ) = 1 ,
$$

因此可得 $( m_{2} x + m_{1} y , m_{1} m_{2} ) = 1$，即 $Z_{m}^{*} \subseteq M$。

综上所述，

$$
Z_{m}^{*} = m_{2} Z_{m_{1}}^{*} + m_{1} Z_{m_{2}}^{*} .
$$

为模 $m$ 的 **既约** 剩余系。
