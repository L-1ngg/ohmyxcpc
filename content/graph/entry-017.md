---
title: "欧拉路径/欧拉回路 Hierholzers"
order: 170
---

# 欧拉路径/欧拉回路 Hierholzers {#s-4be4ea74a576}

  一笔画完所有边。存在性看度数；求路径用 Hierholzer：DFS 把边删掉，回溯再写入答案（得到反序，最后 reverse）。必须连通（忽略孤立点）。

> 欧拉路径：一笔画完图中全部边，画的顺序就是一个可行解；当起点终点相同时称欧拉回路。

## 有向图欧拉路径存在判定 {#s-9ee30081bfb0}

  有向图欧拉路径存在：① 恰有一个点出度比入度多 $1$（为起点）；② 恰有一个点入度比出度多 $1$（为终点）；③ 恰有 $N - 2$ 个点入度均等于出度。如果是欧拉回路，则上方起点与终点的条件不存在，全部点均要满足最后一个条件。

<<< @/snippets/inline/graph/entry-017-15.cpp

## 无向图欧拉路径存在判定 {#s-5cb3b0b55e38}

  无向图欧拉路径存在：① 恰有两个点度数为奇数（为起点与终点）；② 恰有 $N - 2$ 个点度数为偶数。前提是有边的点连通（孤立点不计）；欧拉回路则要求 $0$ 个奇度点。

<<< @/snippets/inline/graph/entry-017-16.cpp

## 有向图欧拉路径求解（字典序最小） {#s-c1e79571473e}

  要求每个节点的出边按目标编号**升序**排列（读入后排序，或直接存进 `multiset`），每次取最小出边即保证字典序最小；起点 `s` 按上文判定选取（欧拉回路可任取非孤立点）。注意下方用 `vector::erase(begin())` 每次开头删除是 $\mathcal{O} ( \operatorname{deg} )$，总复杂度退化为 $\mathcal{O} ( M^{2} )$，边多时改用 `multiset` 或指针法。

<<< @/snippets/inline/graph/entry-017-17.cpp

## 无向图欧拉路径求解 {#s-ad996fec4c72}

  无向图存双向边，走过一条边时要同时从两个端点删除两个方向；起点 `s` 选奇度点（欧拉回路任取非孤立点），先按上文完成奇度点计数判定。若也要求字典序最小，同样需要邻接表按编号升序。

```cpp
auto dfs = [&](auto self, int x) -> void {
    while (ver[x].size()) {
        int net = *ver[x].begin();
        ver[x].erase(ver[x].find(net));
        ver[net].erase(ver[net].find(x));
        cout << x << " " << net << endl;
        self(self, net);
    }
};
dfs(dfs, s);
```
