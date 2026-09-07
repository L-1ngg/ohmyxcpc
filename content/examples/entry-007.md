---
title: "N*M 数独字典序最小方案"
order: 70
---

# N\*M 数独字典序最小方案 {#s-8b76cd159e4a}

  构造字典序最小填充，不用搜。宫 $2^{N} \times 2^{M}$，整盘 $( 2^{N + M} )^{2}$。公式 $0$-index。

规则：每个宫大小为 $2^{N} * 2^{M}$ ，大图一共由 $M * N$ 个宫组成（总大小即 $2^{N} 2^{M} * 2^{N} 2^{M}$ ），要求每行、每列、每宫都要出现 $1$ 到 $2^{N} * 2^{M}$ 的全部数字。输出字典序最小方案。

下例为 $2 , 1$ 和 $1 , 2$ 时数独字典序最小的示意。

![img-01.png](/images/img-01.png)

公式：$( i , j )$ 格所填的内容为 $( i \operatorname{mod} 2^{N} \oplus \lfloor \frac{j}{2^{M}} \rfloor ) \cdot 2^{M} + ( \lfloor \frac{i}{2^{N}} \rfloor \oplus j \operatorname{mod} 2^{M} ) + 1$ ，注意 $i , j$ 从 $0$ 开始。
