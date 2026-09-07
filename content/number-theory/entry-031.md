---
title: "整除(数论) 分块"
order: 310
---

# 整除 (数论) 分块 {#s-b71862448fb1}

  把 $\lfloor n / i \rfloor$ 相同的 $i$ 并为一块：$j = \lfloor n / \lfloor n / i \rfloor \rfloor$ 是右端点，块内个数 $j - i + 1$，块数 $\mathcal{O} ( \sqrt{n} )$。莫反、杜教筛、前缀和题里”枚举 $\lfloor n / i \rfloor$“都用它。

$\lfloor \frac{n}{l} \rfloor = \lfloor \frac{n}{l + 1} \rfloor = \cdots = \lfloor \frac{n}{r} \rfloor \Leftrightarrow \lfloor \frac{n}{l} \rfloor \le \frac{n}{r} < \lfloor \frac{n}{l} \rfloor + 1$ ，根据不等式左侧，得到 $r \le \lfloor \frac{n}{\lfloor \frac{n}{l} \rfloor} \rfloor$ 。

<<< @/snippets/code/数论/整除-数论-分块.cpp
