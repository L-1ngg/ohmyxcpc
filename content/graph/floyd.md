---
title: 多源汇最短路（Floyd）
order: 4
---

# 多源汇最短路（Floyd）

使用邻接矩阵存图，可以处理负权边，以 $\mathcal{O}(N^3)$ 的复杂度计算。**注意，这里建立的是单向边，计算双向边需要额外加边**。

```cpp
void floyd() {
    for (int k = 1; k <= n; k ++)
        for (int i = 1; i <= n; i ++)
            for (int j = 1; j <= n; j ++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
}
```

