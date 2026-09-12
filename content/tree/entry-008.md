---
title: "prufur 序列"
order: 80
---

# prufur 序列 {#s-be982ecb92c3}

$n$ 点带标号树 $\leftrightarrow$ 长 $n - 2$、值域为点编号的序列，一一对应。度数 $d$ 的点在序列里出现 $d - 1$ 次。用来计数生成树，不常用来存树。

## 对树建立 Prüfer 序列 {#s-5520fee2dfbb}

每次取编号最小的叶删掉，记下它连向的那个点。做 $n - 2$ 次后剩两点。用堆/set 取最小叶是 $\mathcal{O} ( n \text{log} n )$。结点从 $0$ 标号。

显然使用堆可以做到 $O ( n \text{log} n )$ 的复杂度

**编号：** C++ 版本使用从 `0` 开始的节点编号。

<<< @/snippets/code/树上问题/对树建立-Prüfer-序列.cpp

```python
# 结点从 0 标号；与上面 C++ 版等价（每次取编号最小的叶）
def pruefer_code(adj):
    n = len(adj)
    leafs = set()
    degree = [0] * n
    killed = [False] * n
    for i in range(n):
        degree[i] = len(adj[i])
        if degree[i] == 1:
            leafs.add(i)
    code = [0] * (n - 2)
    for i in range(n - 2):
        leaf = min(leafs)
        leafs.remove(leaf)
        killed[leaf] = True
        v = next(u for u in adj[leaf] if not killed[u])
        code[i] = v
        degree[v] -= 1
        if degree[v] == 1:
            leafs.add(v)
    return code
```

## Cayley 公式 (Cayley’s formula) {#s-7c6b6375774b}

完全图 $K_{n}$ 有 $n^{n - 2}$ 棵生成树。

怎么证明？方法很多，但是用 Prüfer 序列证是很简单的。任意一个长度为 $n - 2$ 的值域 $[ 1 , n ]$ 的整数序列都可以通过 Prüfer 序列双射对应一个生成树，于是方案数就是 $n^{n - 2}$。

### 图连通方案数 {#s-9624e456ee75}

Prüfer 序列可能比你想得还强大。它能创造比 [凯莱公式](/tree/entry-008#s-7c6b6375774b) 更通用的公式。比如以下问题：

> 一个 $n$ 个点 $m$ 条边的带标号无向图有 $k$ 个连通块。我们希望添加 $k - 1$ 条边使得整个图连通。求方案数。

设 $s_{i}$ 表示每个连通块的数量。我们对 $k$ 个连通块构造 Prüfer 序列，然后你发现这并不是普通的 Prüfer 序列。因为每个连通块的连接方法很多。不能直接淦就设啊。于是设 $d_{i}$ 为第 $i$ 个连通块的度数。由于度数之和是边数的两倍，于是 $\sum_{i = 1}^{k} d_{i} = 2 k - 2$。则对于给定的 $d$ 序列构造 Prüfer 序列的方案数是

$$
n^{k - 2} \cdot \prod_{i = 1}^{k} s_{i}
$$
