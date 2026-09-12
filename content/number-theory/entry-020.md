---
title: "扩展欧拉定理"
order: 200
---

# 扩展欧拉定理 {#s-d4ec4636e646}

扩展欧拉定理用于对大指数降幂，处理底数与模数不互质的情形。必须同时保留指数余数和是否达到阈值的信息。

若正整数 $a$ 与 $m$ 互质，则

$$
a^{\varphi ( m )} \equiv 1 ( \operatorname{mod} \quad m )
$$

推论：

$$
a^{b} \equiv a^{b \quad \operatorname{mod} \quad \varphi ( m )} ( \operatorname{mod} \quad m )
$$

当 $a , m$ 不互质时，扩展 Euler 定理表述如下：

$$
a^{b} \equiv a^{b \quad \operatorname{mod} \quad \varphi ( m ) + \varphi ( m )} ( \operatorname{mod} \quad m )
$$

式子仅在 $\varphi ( m ) \le b$ 时成立。

下面板子解决”指数 $b$ 以字符串给出（大到无法读入整数）“的场景：`read(MOD)` 边读边对 `MOD=φ(m)` 取模，同时用 `large_enough` 记录 $b \ge \varphi ( m )$ 是否成立；最后按上式计算 $a^{b + \varphi ( m )} \operatorname{mod} m$。

**降幂条件：** `large_enough` 记录原指数是否达到 `phi(m)`，不能只保留指数余数。快速幂中先提升到 `i64` 再乘，模数范围仍须保证乘积可表示。

<<< @/snippets/inline/number-theory/entry-020-52.cpp
