---
title: "多源汇最短路(Floyd)"
order: 40
---

# 多源汇最短路 (Floyd) {#s-39abf717d01a}

  枚举中转点 $k$，用 $i \to k \to j$ 松弛；$k$ 必须最外层。可负权，有负环则对角线会被更新成负。邻接矩阵、下标 $1 \cdots n$，无边先赋无穷。这里加的是单向边，双向要加两次。复杂度 $\mathcal{O} ( N^{3} )$。

```cpp
void floyd() {
    for (int k = 1; k <= n; k ++)
        for (int i = 1; i <= n; i ++)
            for (int j = 1; j <= n; j ++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
}
```
