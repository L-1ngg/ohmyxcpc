---
title: "同余方程组、拓展中国剩余定理 excrt"
order: 230
---

# 同余方程组、拓展中国剩余定理 excrt {#s-7bfd0cb551f4}

  求解方程组 $x \equiv a_{i} ( \operatorname{mod} b_{i} )$（代码变量：余数存 `ai[]`、模数存 `bi[]`，与洛谷 P4777 的读入命名相反，注意别抄混）。**模数不要求两两互质**（互质时退化为普通 CRT）。做法是逐对合并：把已合并的方程 $x \equiv \text{ans} ( \operatorname{mod} M )$ 与新方程 $x \equiv a_{i} ( \operatorname{mod} b_{i} )$ 消元成 $M \cdot k \equiv a_{i} - \text{ans} ( \operatorname{mod} b_{i} )$，用 exgcd 解出 $k$。复杂度 $\mathcal{O} ( n \text{log} )$。

<<< @/snippets/inline/number-theory/entry-023-53.cpp
