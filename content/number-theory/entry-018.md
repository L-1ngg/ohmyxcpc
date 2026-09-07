---
title: "离散对数 bsgs 与 exbsgs"
order: 180
---

# 离散对数 bsgs 与 exbsgs {#s-b71c48ad77d4}

  以 $\mathcal{O} ( \sqrt{P} )$ 的复杂度求解 $a^{x} \equiv b ( \operatorname{mod} P )$ 。其中标准 BSGS 算法不能计算 $a$ 与 $\text{MOD}$ 互质的情况，而 exbsgs 则可以。

<<< @/snippets/code/数论/离散对数-bsgs-与-exbsgs.cpp
