---
title: "离散傅里叶变换 dft 与其逆变换 idft"
order: 30
---

# 离散傅里叶变换 dft 与其逆变换 idft {#s-46a110d9451e}

点值与系数互换：单位根上求值。卷积变成点值相乘再变回。长度必须是 $2$ 的幂。`idft` 里 `(1-P)/n` 在模 $P$ 下等于 $n^{- 1}$。`rev` / `roots` 是全局表，多模数同时用会串。

**接口：** `dft(a)` 原地正变换，`idft(a)` 原地逆变换；长度须为模数支持的 2 的幂，依赖同套 `MInt<P>` 与单位根预处理。

<<< @/snippets/inline/polynomial/entry-003-58.cpp
