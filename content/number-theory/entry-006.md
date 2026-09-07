---
title: "同余"
order: 60
---

# 同余 {#s-9413cbad71d3}

  **定义** 设整数 $m \ne 0$。若 $m \mid ( a - b )$，称 $m$ 为 **模数**（**模**），$a$ 同余于 $b$ 模 $m$，$b$ 是 $a$ 对模 $m$ 的 **剩余**。记作 $a \equiv b ( \operatorname{mod} m )$。

否则，$a$ 不同余于 $b$ 模 $m$，$b$ 不是 $a$ 对模 $m$ 的剩余。记作 $a \not\equiv b ( \operatorname{mod} m )$。

这样的等式，称为模 $m$ 的同余式，简称 **同余式**。

根据整除的性质，上述同余式也等价于 $a \equiv b ( \operatorname{mod} ( - m ) )$。

后文中，如果没有特别说明，模数总是 **正整数**。

式中的 $b$ 是 $a$ 对模 $m$ 的剩余，这个概念与余数完全一致。通过限定 $b$ 的范围，相应的有 $a$ 对模 $m$ 的最小非负剩余、绝对最小剩余、最小正剩余。

同余的性质：

- 同余是等价关系，即同余具有 
   - 自反性：$a \equiv a ( \operatorname{mod} m )$。

   - 对称性：若 $a \equiv b ( \operatorname{mod} m )$，则 $b \equiv a ( \operatorname{mod} m )$。

   - 传递性：若 $a \equiv b ( \operatorname{mod} m ) , b \equiv c ( \operatorname{mod} m )$，则 $a \equiv c ( \operatorname{mod} m )$。

- 线性运算：若 $a , b , c , d \in \mathbf{Z} , m \in \mathbf{N}^{*} , a \equiv b ( \operatorname{mod} m ) , c \equiv d ( \operatorname{mod} m )$ 则有： 
   - $a \pm c \equiv b \pm d ( \operatorname{mod} m )$。

   - $a \times c \equiv b \times d ( \operatorname{mod} m )$。

- 设 $f ( x ) = \sum_{i = 0}^{n} a_{i} x^{i}$ 和 $g ( x ) = \sum_{i = 0}^{n} b_{i} x^{i}$ 是两个整系数多项式，$m \in \mathbf{N}^{*}$，且 $a_{i} \equiv b_{i} ( \operatorname{mod} m ) , \quad 0 \le i \le n$，则对任意整数 $x$ 均有 $f ( x ) \equiv g ( x ) ( \operatorname{mod} m )$。进而若 $s \equiv t ( \operatorname{mod} m )$，则 $f ( s ) \equiv g ( t ) ( \operatorname{mod} m )$。

- 若 $a , b \in \mathbf{Z} , k , m \in \mathbf{N}^{*} , a \equiv b ( \operatorname{mod} m )$, 则 $a k \equiv b k ( \operatorname{mod} m k )$。

- 若 $a , b \in \mathbf{Z} , d , m \in \mathbf{N}^{*} , d \mid a , d \mid b , d \mid m$，则当 $a \equiv b ( \operatorname{mod} m )$ 成立时，有 $\frac{a}{d} \equiv \frac{b}{d} ( \operatorname{mod} \frac{m}{d} )$。

- 若 $a , b \in \mathbf{Z} , d , m \in \mathbf{N}^{*} , d \mid m$，则当 $a \equiv b ( \operatorname{mod} m )$ 成立时，有 $a \equiv b ( \operatorname{mod} d )$。

- 若 $a , b \in \mathbf{Z} , d , m \in \mathbf{N}^{*}$，则当 $a \equiv b ( \operatorname{mod} m )$ 成立时，有 $( a , m ) = ( b , m )$。若 $d$ 能整除 $m$ 及 $a , b$ 中的一个，则 $d$ 必定能整除 $a , b$ 中的另一个。

还有性质是乘法逆元，见 [逆元](/number-theory/entry-015#s-255be8061d66)。
