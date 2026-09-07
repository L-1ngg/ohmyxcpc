---
title: "三角形面积"
order: 20
---

# 三角形面积 {#s-86ff43173d51}

  与多边形章鞋带公式同一件事。输入按 $x_{1} , y_{1} , x_{2} , y_{2} , x_{3} , y_{3}$。

## 行列式求面积 {#s-d0dfc866eadd}

$$
S = \frac{1}{2} \begin{pmatrix}1 & 1 & 1 \\ x_{1} & x_{2} & x_{3} \\ y_{1} & y_{2} & y_{3}\end{pmatrix}
$$

<<< @/snippets/code/线性代数/行列式求面积.cpp

## 海伦公式 {#s-5b8de5042d52}

$$
S = \frac{1}{4} \sqrt{( a + b + c ) ( a + b - c ) ( a + c - b ) ( b + c - a )}
$$

与 $S = \sqrt{p ( p - a ) ( p - b ) ( p - c )}$、$p = ( a + b + c ) / 2$ 相同。浮点近退化时不稳定，赛场优先叉乘。

```cpp
p=(a+b+c)/2;
sum=sqrt(p*(p-a)*(p-b)*(p-c));
```
