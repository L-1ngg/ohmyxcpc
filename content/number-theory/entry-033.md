---
title: "Pollard-Rho 因式分解"
order: 330
---

# Pollard - Rho 因式分解 {#s-623fe9a9d630}

Pollard–Rho 随机寻找合数的非平凡因子，再结合素数测试递归分解。找到最小质因子 $p$ 的期望工作量常按 $O(\sqrt p)$ 次模运算估计，不能保证对数时间；失败或循环停滞时需要重试。

<<< @/snippets/code/数论/Pollard---Rho-因式分解.cpp
