---
title: "Pollard-Rho 因式分解"
order: 330
---

# Pollard - Rho 因式分解 {#s-623fe9a9d630}

  以单个因子 $\mathcal{O} ( \text{log} X )$ 的复杂度输出数字 $X$ 的全部质因数，由于需要结合素数测试，总复杂度会略高一些。如果遇到超时的情况，可能需要考虑进一步优化，例如检查题目是否强制要求枚举全部质因数等等。此外，还有一个[较长的模板](https://www.luogu.com.cn/record/114757731)可供参考，比这里记录的版本常数小约五倍。

<<< @/snippets/code/数论/Pollard---Rho-因式分解.cpp
