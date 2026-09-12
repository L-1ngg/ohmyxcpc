---
title: "离散对数 bsgs 与 exbsgs"
order: 180
---

# 离散对数 bsgs 与 exbsgs {#s-b71c48ad77d4}

求最小非负整数 $x$，使 $a^x\equiv b\pmod P$。标准 BSGS 要求 $\gcd(a,P)=1$；exBSGS 先消去公共因子以处理不互质情况。典型时间和空间为 $O(\sqrt P)$，具体时间还取决于查找容器与模乘实现。

<<< @/snippets/code/数论/离散对数-bsgs-与-exbsgs.cpp
