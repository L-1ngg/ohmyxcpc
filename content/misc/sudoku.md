---
title: N*M 数独字典序最小方案
order: 105
---

# N*M 数独字典序最小方案

规则：每个宫大小为 $2^N*2^M$ ，大图一共由 $M*N$ 个宫组成（总大小即 $2^N2^M*2^N2^M$ ），要求每行、每列、每宫都要出现 $1$ 到 $2^N*2^M$ 的全部数字。输出字典序最小方案。

下例为 $2,1$ 和 $1,2$ 时数独字典序最小的示意。

<img src="https://s2.loli.net/2023/09/14/v78qVoTSujchFd4.png" alt="截图" style="zoom:40%;" />

公式：$(i,j)$ 格所填的内容为 $\big(i \bmod 2^N \oplus \left\lfloor \frac{j}{2^M} \right\rfloor \big) \cdot 2^M + \big(\left\lfloor \frac{i}{2^N} \right\rfloor \oplus  j \bmod 2^M \big) + 1$ ，注意 $i,j$ 从 $0$ 开始。
