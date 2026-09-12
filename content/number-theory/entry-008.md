---
title: "数论函数"
order: 80
---

# 数论函数 {#s-150f43597426}

数论函数定义在正整数上。积性函数可通过质因数分解化为质数幂上的计算，下方区分积性与完全积性的条件。

数论函数（也称算术函数）指定义域为正整数的函数。数论函数也可以视作一个数列。

## 积性函数 {#s-0fe92b2e08c4}

**定义** 在数论中，若函数 $f ( n )$ 满足 $f ( 1 ) = 1$，且 $f ( x y ) = f ( x ) f ( y )$ 对任意互质的 $x , y \in \mathbf{N}^{*}$ 都成立，则 $f ( n )$ 为 **积性函数**。

在数论中，若函数 $f ( n )$ 满足 $f ( 1 ) = 1$ 且 $f ( x y ) = f ( x ) f ( y )$ 对任意的 $x , y \in \mathbf{N}^{*}$ 都成立，则 $f ( n )$ 为 **完全积性函数**。

### 性质 {#s-4c16b7ea952d}

若 $f ( x )$ 和 $g ( x )$ 均为积性函数，则以下函数也为积性函数：

$$
h ( x ) \& = f ( x^{p} ) \\ h ( x ) \& = f^{p} ( x ) \\ h ( x ) \& = f ( x ) g ( x ) \\ h ( x ) \& = \sum_{d \mid x} f ( d ) g ( \frac{x}{d} )
$$

对正整数 $x$，设其唯一质因数分解为 $x = \prod p_{i}^{k_{i}}$，其中 $p_{i}$ 为质数。

若 $F ( x )$ 为积性函数，则有 $F ( x ) = \prod F ( p_{i}^{k_{i}} )$。

若 $F ( x )$ 为完全积性函数，则有 $F ( x ) = \prod F ( p_{i}^{k_{i}} ) = \prod F ( p_{i} )^{k_{i}}$。

### 例子 {#s-259da77b322b}

- 单位函数：$\epsilon ( n ) = [ n = 1 ]$。（完全积性）

- 恒等函数：$\text{id}_{k} ( n ) = n^{k}$，$\text{id}_{1} ( n )$ 通常简记作 $\text{id} ( n )$。（完全积性）

- 常数函数：$1 ( n ) = 1$。（完全积性）

- 除数函数：$\sigma_{k} ( n ) = \sum_{d \mid n} d^{k}$。$\sigma_{0} ( n )$ 通常简记作 $d ( n )$ 或 $\tau ( n )$，$\sigma_{1} ( n )$ 通常简记作 $\sigma ( n )$。

- 欧拉函数：$\varphi ( n ) = \sum_{i = 1}^{n} [ ( i , n ) = 1 ]$。

- 莫比乌斯函数：$\mu ( n ) = \begin{cases}1 & n = 1 \\ 0 & \exists d > 1 \\ d^{2} \mid n \\ ( - 1 )^{\omega ( n )} & \mathrm{\text{otherwise}}\end{cases}$，其中 $\omega ( n )$ 表示 $n$ 的本质不同质因子个数。

## 加性函数 {#s-a729296e71e9}

**定义** 在数论中，若函数 $f ( n )$ 满足 $f ( 1 ) = 0$ 且 $f ( x y ) = f ( x ) + f ( y )$ 对任意互质的 $x , y \in \mathbf{N}^{*}$ 都成立，则 $f ( n )$ 为 **加性函数**。

在数论中，若函数 $f ( n )$ 满足 $f ( 1 ) = 0$ 且 $f ( x y ) = f ( x ) + f ( y )$ 对任意的 $x , y \in \mathbf{N}^{*}$ 都成立，则 $f ( n )$ 为 **完全加性函数**。

**加性函数** 本节中的加性函数指数论上的加性函数 (Additive function)，应与代数中的 Additive map 做区分。

### 性质 {#s-a36a2dc91760}

对正整数 $x$，设其唯一质因数分解为 $x = \prod p_{i}^{k_{i}}$，其中 $p_{i}$ 为质数。

若 $F ( x )$ 为加性函数，则有 $F ( x ) = \sum F ( p_{i}^{k_{i}} )$。

若 $F ( x )$ 为完全加性函数，则有 $F ( x ) = \sum F ( p_{i}^{k_{i}} ) = \sum F ( p_{i} ) \cdot k_{i}$。

### 例子 {#s-2faaabd065bd}

为方便叙述，令所有质数组成的集合为 $\mathbf{P}$.

- 素因数分解中 $p$ 的重数：$\nu_{p} ( n ) = \text{max} \{ k \in \mathbf{N} : p^{k} \mid n \}$，其中，$p \in \mathbf{P}$。（完全加性）

- 所有质因子数目：$\Omega ( n ) = \sum_{p \in \mathbf{P}} \nu_{p} ( n )$。（完全加性）

- 相异质因子数目：$\omega ( n ) = \sum_{p \in \mathbf{P}} [ p \mid n ]$。

- 所有质因子之和：$a_{0} ( n ) = \sum_{p \in \mathbf{P}} \nu_{p} ( n ) \cdot p$。（完全加性）

- 相异质因子之和：$a_{1} ( n ) = \sum_{p \in \mathbf{P}} [ p \mid n ] \cdot p$。
