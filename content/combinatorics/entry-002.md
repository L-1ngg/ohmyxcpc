---
title: "常用组合数公式"
order: 20
---

# 常用组合数公式 {#s-c54ddb18d03a}

组合数恒等式速查，用于移项、求和与二项式反演。默认整数下标合法，越界组合数按零处理；含除法的变形需检查分母。

- $k * C_{n}^{k} = n * C_{n - 1}^{k - 1}$ ；

- $C_{k}^{n} * C_{m}^{k} = C_{m}^{n} * C_{m - n}^{m - k}$ ；

- $C_{n}^{k} + C_{n}^{k + 1} = C_{n + 1}^{k + 1}$ ；

- $\sum_{i = 0}^{n} C_{n}^{i} = 2^{n}$ ；

- $\sum_{k = 0}^{n} ( - 1 )^{k} * C_{n}^{k} = 0$ 。

- 二项式反演：$f_{n} = \sum_{i = 0}^{n} \binom{n}{i} g_{i} \Leftrightarrow g_{n} = \sum_{i = 0}^{n} ( - 1 )^{n - i} \binom{n}{i} f_{i}$，$f_{k} = \sum_{i = k}^{n} \binom{i}{k} g_{i} \Leftrightarrow g_{k} = \sum_{i = k}^{n} ( - 1 )^{i - k} \binom{i}{k} f_{i}$ ；

- $\sum_{i = 1}^{n} i \binom{n}{i} = n * 2^{n - 1}$ ；

- $\sum_{i = 1}^{n} i^{2} \binom{n}{i} = n * ( n + 1 ) * 2^{n - 2}$ ；

- $\sum_{i = 1}^{n} \frac{1}{i} \binom{n}{i} = \sum_{i = 1}^{n} \frac{2^{i} - 1}{i}$ ；

- $\sum_{i = 0}^{n} \binom{n}{i}^{2} = \binom{2 n}{n}$ ；

- 拉格朗日恒等式：$\sum_{i < j} ( a_{i} b_{j} - a_{j} b_{i} )^{2} = ( \sum_{i} a_{i}^{2} ) ( \sum_{i} b_{i}^{2} ) - ( \sum_{i} a_{i} b_{i} )^{2}$ 。
