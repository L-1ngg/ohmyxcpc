---
title: "Miller-Rabin 素数测试"
order: 320
---

# Miller - Rabin 素数测试 {#s-b93fea6c3ba8}

  以平均 $\mathcal{O} ( 4 \cdot \text{log}^{3} X )$ 的复杂度判定数字 $X$ 是否是素数，这里记录的版本常数非常优秀，基本可以看作是 $\mathcal{O} ( 1 )$ 。**确定性结论**：底数表 `B = {2,3,5,7,11,13,17,19,23}` 对 $< 3.8 \times 10^{18}$ 的数判定**完全确定无误**；如果题目给到 long long 全域（上限 $9.2 \times 10^{18}$），把底表扩到前 12 个素数 $2 \cdots 37$ 即确定覆盖。

<<< @/snippets/code/数论/Miller---Rabin-素数测试.cpp
