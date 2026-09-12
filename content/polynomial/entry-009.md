---
title: "结论 from LuanXR"
order: 90
---

# 结论 from LuanXR {#s-efb583ec049d}

生成函数速查。泰勒与广义二项式用来展开、对拍系数。

1. 序列 $a$ 的**普通生成函数**: $F ( x ) = \sum a_{n} x^{n}$

1. 序列 $a$ 的**指数生成函数**: $F ( x ) = \sum a_{n} \frac{x^{n}}{n !}$

泰勒展开式

1. $\frac{1}{1 - x} = 1 + x + x^{2} + x^{3} + \ldots = \sum_{n = 0}^{\infty} x^{n}$

1. $\frac{1}{1 - x^{2}} = 1 + x^{2} + x^{4} + \cdots$

1. $\frac{1}{1 - x^{3}} = 1 + x^{3} + x^{6} + \cdots$

1. $\frac{1}{( 1 - x )^{2}} = 1 + 2 x + 3 x^{2} + \cdots$

1. $e^{x} = 1 + \frac{x^{1}}{1 !} + \frac{x^{2}}{2 !} + \frac{x^{3}}{3 !} + \cdots = \sum_{n = 0}^{\infty} \frac{x^{n}}{n !}$

1. $e^{- x} = 1 - \frac{x^{1}}{1 !} + \frac{x^{2}}{2 !} - \frac{x^{3}}{3 !} + \cdots$

1. $\frac{e^{x} + e^{- x}}{2} = 1 + \frac{x^{2}}{2 !} + \frac{x^{4}}{4 !} + \cdots$

1. $\frac{e^{x} - e^{- x}}{2} = x + \frac{x^{3}}{3 !} + \frac{x^{5}}{5 !} + \cdots$

有穷序列的生成函数

1. $1 + x + x^{2} = \frac{1 - x^{3}}{1 - x}$

1. $1 + x + x^{2} + x^{3} = \frac{1 - x^{4}}{1 - x}$

广义二项式定理

$$
\frac{1}{( 1 - x )^{n}} = \sum_{i = 0}^{\infty} \binom{n + i - 1}{i} x^{i}
$$

证明

1. 扩展域 $( 1 + x )^{n} = \sum_{i = 0}^{n} \binom{n}{i} x^{i}$，因 $i > n , \binom{n}{i} = 0$。

1. 扩展指数为负数 $\binom{- n}{i} = \frac{( - n ) ( - n - 1 ) \cdots ( - n - i + 1 )}{i !} = ( - 1 )^{i} \times \frac{n ( n + 1 ) \cdots ( n + i - 1 )}{i !} = ( - 1 )^{i} \binom{n + i - 1}{i}$

1. 括号内的加号变减号 $( 1 - x )^{- n} = \sum_{i = 0}^{\infty} ( - 1 )^{i} \binom{n + i - 1}{i} ( - x )^{i} = \sum_{i = 0}^{\infty} \binom{n + i - 1}{i} x^{i}$
