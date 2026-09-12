---
title: "最大公约数与最小公倍数"
order: 30
---

# 最大公约数与最小公倍数 {#s-c2707bb2fbae}

最大公约数是同时整除两数的最大正整数；最小公倍数是同时为两数倍数的最小正整数。非零输入满足 $\gcd(a,b)\operatorname{lcm}(a,b)=|ab|$，实现时先除后乘并检查结果范围。

**Warning** 一些作者认为 $0$ 和 $0$ 的最大公约数无定义，其余作者一般将其视为 $0$。C++ STL 的实现中采用后者，即认为 $0$ 和 $0$ 的最大公约数为 $0$。

最大公约数有如下性质：

- $( a_{1} , \ldots , a_{n} ) = ( \vert a_{1} \vert , \ldots , \vert a_{n} \vert )$；

- $( a , b ) = ( b , a )$；

- 若 $a \ne 0$，则 $( a , 0 ) = ( a , a ) = \vert a \vert$；

- $( b q + r , b ) = ( r , b )$；

- $( a_{1} , \ldots , a_{n} ) = ( ( a_{1} , a_{2} ) , a_{3} , \ldots , a_{n} )$。进而 $\forall 1 < k < n - 1 , \quad ( a_{1} , \ldots , a_{n} ) = ( ( a_{1} , \ldots , a_{k} ) , ( a_{k + 1} , \ldots , a_{n} ) )$；

- 对不全为 $0$ 的整数 $a_{1} , \ldots , a_{n}$ 和非零整数 $m$，$( m a_{1} , \ldots , m a_{n} ) = \vert m \vert ( a_{1} , \ldots , a_{n} )$；

- 对不全为 $0$ 的整数 $a_{1} , \ldots , a_{n}$，若 $( a_{1} , \ldots , a_{n} ) = d$，则 $( a_{1} / d , \ldots , a_{n} / d ) = 1$；

- $( a^{n} , b^{n} ) = ( a , b )^{n}$。

最大公约数还有如下与互素相关的性质：

- 若 $b \vert a c$ 且 $( a , b ) = 1$，则 $b \mid c$；

- 若 $b \vert c$、$a \vert c$ 且 $( a , b ) = 1$，则 $a b \mid c$；

- 若 $( a , b ) = 1$，则 $( a , b c ) = ( a , c )$；

- 若 $( a_{i} , b_{j} ) = 1 , \quad \forall 1 \le i \le n , 1 \le j \le m$，则 $( \prod_{i} a_{i} , \prod_{j} b_{j} ) = 1$。特别地，若 $( a , b ) = 1$，则 $( a^{n} , b^{m} ) = 1$；

- 对整数 $a_{1} , \ldots , a_{n}$，若 $\exists v \in \mathbf{Z} , \quad \prod_{i} a_{i} = v^{m}$，且 $( a_{i} , a_{j} ) = 1 , \quad \forall i \ne j$，则 $\forall 1 \le i \le n , \quad \sqrt[m]{a_{i}} \in \mathbf{Z}$。

最小公倍数有如下性质：

- $[ a_{1} , \ldots , a_{n} ] = [ \vert a_{1} \vert , \ldots , \vert a_{n} \vert ]$；

- $[ a , b ] = [ b , a ]$；

- 若 $a \ne 0$，则 $[ a , 1 ] = [ a , a ] = \vert a \vert$；

- 若 $a \mid b$，则 $[ a , b ] = \vert b \vert$；

- $[ a_{1} , \ldots , a_{n} ] = [ [ a_{1} , a_{2} ] , a_{3} , \ldots , a_{n} ]$。进而 $\forall 1 < k < n - 1 , \quad [ a_{1} , \ldots , a_{n} ] = [ [ a_{1} , \ldots , a_{k} ] , [ a_{k + 1} , \ldots , a_{n} ] ]$；

- 若 $a_{i} \mid m , \quad \forall 1 \le i \le n$，则 $[ a_{1} , \ldots , a_{n} ] \mid m$；

- $[ m a_{1} , \ldots , m a_{n} ] = \vert m \vert [ a_{1} , \ldots , a_{n} ]$；

- $[ a , b , c ] [ a b , b c , c a ] = [ a , b ] [ b , c ] [ c , a ]$；

- $[ a^{n} , b^{n} ] = [ a , b ]^{n}$。

最大公约数和最小公倍数可以组合出很多奇妙的等式，如：

- $( a , b ) [ a , b ] = \vert a b \vert$；

- $( a b , b c , c a ) [ a , b , c ] = \vert a b c \vert$；

- $\frac{( a , b , c )^{2}}{( a , b ) ( b , c ) ( a , c )} = \frac{[ a , b , c ]^{2}}{[ a , b ] [ b , c ] [ a , c ]}$。

这些性质均可通过定义或 [唯一分解定理](/number-theory/entry-005#s-bbf33d78bee6) 证明，其中使用唯一分解定理的证明更容易理解。

## 互素 {#s-8d726a65d838}

**定义** 若 $( a_{1} , a_{2} ) = 1$，则称 $a_{1}$ 和 $a_{2}$ **互素**（**既约**）。

若 $( a_{1} , \ldots , a_{k} ) = 1$，则称 $a_{1} , \ldots , a_{k}$ **互素**（**既约**）。

多个整数互素，不一定两两互素。例如 $6$、$10$ 和 $15$ 互素，但是任意两个都不互素。

互素的性质与最大公约数理论：裴蜀定理（Bézout’s identity），见 [后节](/number-theory/entry-014#s-79fe74cf0840)。
