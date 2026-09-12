---
title: "图论常见结论及例题"
order: 200
---

# 图论常见结论及例题 {#s-117e07362a72}

建模对照，不是证明。对上题意再套。

## 常见结论 {#s-89785a4d3a56}

1. 要在有向图上求一个最大点集，使得任意两个点 $( i , j )$ 之间至少存在一条路径（可以是从 $i$ 到 $j$ ，也可以反过来，这两种有一个就行），**即求解最长路**；

1. 要求出连通图上的任意一棵生成树，只需要跑一遍 **bfs** ；

1. 给出一棵树，要求添加尽可能多的边，使得其是二分图：对树进行二分染色，显然，相同颜色的点之间连边不会破坏二分图的性质，故可添加的最多的边数即为 $\text{cnt}_{\text{Black}} \cdot \text{cnt}_{\text{White}} - ( n - 1 )$ ；

1. 当一棵树可以被黑白染色时，所有染黑节点的度之和等于所有染白节点的度之和；

1. 在竞赛图中，入度小的点，必定能到达出度小（入度大）的点 [See](https://codeforces.com/contest/1498/problem/E) 。

1. 在竞赛图中，将所有点按入度从小到大排序，随后依次遍历，若对于某一点 $i$ 满足前 $i$ 个点的入度之和恰好等于 $\lfloor \frac{n \cdot ( n + 1 )}{2} \rfloor$ ，那么对于上一次满足这一条件的点 $p$ ，$p + 1$ 到 $i$ 点构成一个新的强连通分量 [See](https://codeforces.com/contest/1498/problem/E) 。



> 举例说明，设满足上方条件的点为 $p_{1} , p_{2} \quad ( p_{1} + 1 < p_{2} )$ ，那么点 $1$ 到 $p_{1}$ 构成一个强连通分量、点 $p_{1} + 1$ 到 $p_{2}$ 构成一个强连通分量。

1. 选择图中最少数量的边删除，使得图不连通，即求最小割；如果是删除点，那么拆点后求最小割 [See](https://www.luogu.com.cn/problem/P1345)。

1. 如果一张图是**平面图**，那么其边数一定小于等于 $3 n - 6$ [See](https://www.luogu.com.cn/problem/P3209) 。

1. 若一张有向完全图存在环，则一定存在三元环。

1. 竞赛图三元环计数：[See](https://ac.nowcoder.com/acm/contest/84244/F) 。

1. 有向图判是否存在环直接用 topsort；无向图判是否存在环直接用 dsu，也可以使用 topsort，条件变为 `deg[i] <= 1` 时入队。

## 常见例题 {#s-9ec36d9aefa5}

### 杂 {#s-f24c7140db49}

题意：给出一棵节点数为 $2 n$ 的树，要求将点分割为 $n$ 个点对，使得点对的点之间的距离和最大。

可以转化为边上问题：对于每一条边，其被利用的次数即为 $\text{min} \{ \mathrm{\text{其左边的点的数量}} , \mathrm{\text{其右边的点的数量}} \}$ ，使用树形 `dp` 计算一遍即可。如下图样例，答案为 $10$ 。

![img-08.png](/images/img-08.png)

<<< @/snippets/inline/graph/entry-020-19.cpp

---

题意：以哪些点为起点可以无限的在有向图上绕

概括一下这些点可以发现，一类是环上的点，另一类是可以到达环的点。建反图跑一遍 topsort 板子，根据容斥，未被移除的点都是答案 [See](https://atcoder.jp/contests/abc245/tasks/abc245_f) 。

---

题意：添加最少的边，使得有向图变成一个 SCC

将原图的 SCC 缩点，统计缩点后的新图上入度为 $0$ 和出度为 $0$ 的点的数量 $\text{cnt}_{\text{in}}$、$\text{cnt}_{\text{out}}$，答案即为 $\text{max} ( \text{cnt}_{\text{in}} , \text{cnt}_{\text{out}} )$ 。过程大致是先将一个出度为 $0$ 的点和一个入度为 $0$ 的点相连，剩下的点随便连 [See](https://www.acwing.com/problem/content/369/) 。

---

题意：添加最少的边，使得无向图变成一个 E-DCC

将原图的 E-DCC 缩点，统计缩点后的新图上度为 $1$ 的点（叶子结点）的数量 $\text{cnt}$ ，答案即为 $\lceil \frac{\text{cnt}}{2} \rceil$ 。过程大致是每次找两个叶子结点（但是还有一些条件限制）相连，若最后余下一个点随便连 [See](https://www.acwing.com/problem/content/397/) 。

---

题意：在树上找到一个最大的连通块，使得这个联通内点权和边权之和最大，输出这个值，数据中存在负数的情况。

使用 dfs 即可解决。

<<< @/snippets/inline/graph/entry-020-20.cpp

---

## Prüfer 序列：凯莱公式 {#s-c0c242939dbd}

题意：给定 $n$ 个顶点，可以构建出多少棵标记树？

![img-09.png](/images/img-09.png)

$n \le 4$ 时的样例如上，通项公式为 $n^{n - 2}$ 。

### Prüfer 序列扩展 {#s-b9c3659aa990}

一个 $n$ 个点 $m$ 条边的带标号无向图有 $k$ 个连通块。我们希望添加 $k - 1$ 条边使得整个图连通，求方案数量 [See](https://codeforces.com/contest/156/problem/D) 。

设 $s_{i}$ 表示每个连通块的数量，通项公式为 $n^{k - 2} \cdot \prod_{i = 1}^{k} s_{i}$ ，当 $k < 2$ 时答案为 $1$ 。

## 单源最短/次短路计数 {#s-a1dbf5c7925a}

依赖链式前向星段的 `h / tot / ver / ne / edge / add`；`Z` 为取模类（见杂项章），`INF` 需自行定义。下方 `Solve` 把边权固定为 $1$（`w = 1`），统计起点到每个点的**最短路条数，以及长度恰好为最短路 $+ 1$ 的次短路条数**，按题目修改边权读入即可。

**状态：** `d[u][0/1]` 分别维护最短 / 严格次短距离，对应 `num` 维护方案数；只有次短距离恰好比最短距离大 `1` 时才合并计数。每组测试前调用 `Clear()` 重置图、距离和计数。

<<< @/snippets/inline/graph/entry-020-21.cpp

## 判定图中是否存在负环 {#s-2d902030a7ba}

SPFA：某点入队超过 $n$ 次（或某点松弛次数 $\ge n$）则存在负环。$\mathcal{O} ( K M )$，常数比裸最短路更高，可被卡。

**范围：** 初始将所有顶点入队，检测任意连通分量中的负环；仅将一个源点入队只能检测从该源点可达的部分。

<<< @/snippets/code/图论/判定图中是否存在负环.cpp

## 输出任意一个三元环 {#s-0419cf2a59a4}

原题：给出一张有向完全图，输出任意一个三元环上的全部元素 [See](https://codeforces.com/problemset/problem/117/C) 。使用 dfs，复杂度 $\mathcal{O} ( N + M )$，可以扩展到非完全图和无向图。

<<< @/snippets/code/图论/输出任意一个三元环.cpp

## 带权最小环大小与计数 {#s-67284fbc9749}

原题：给出一张有向带权图，求解图上最小环的长度、有多少个这样的最小环 [See](https://acm.hdu.edu.cn/contest/problem?cid=1097&pid=1011) 。使用 floyd，复杂度为 $\mathcal{O} ( N^{3} )$ ，可以扩展到无向图。

<<< @/snippets/inline/graph/entry-020-22.cpp

## 最小环大小 {#s-b33599e5922d}

原题：给出一张无向图，求解图上最小环的长度、有多少个这样的最小环 [See](https://codeforces.com/contest/1205/problem/B) 。使用 floyd，可以扩展到有向图。

**顺序：** `val` 保留原边权；枚举 `k` 时先用只经过更小编号中间点的距离检查环，再进行本轮 Floyd 更新。交换顺序会把重复经过 `k` 的路径当成简单环。

<<< @/snippets/inline/graph/entry-020-23.cpp

使用 bfs，复杂度为 $\mathcal{O} ( N^{2} )$ 。

<<< @/snippets/inline/graph/entry-020-24.cpp

## 本质不同简单环计数 {#s-f69538f787fc}

原题：给出一张无向图，输出简单环的数量 [See](https://codeforces.com/contest/11/problem/D) 。注意这里环套环需要分别多次统计，下图答案应当为 $7$。使用状压 dp，复杂度为 $\mathcal{O} ( M \cdot 2^{N} )$，可以扩展到有向图。

![img-11.png](/images/img-11.png)

 image.png

<<< @/snippets/code/图论/本质不同简单环计数.cpp

## 输出任意一个非二元简单环 {#s-8bd05a23a0f6}

原题：给出一张无向图，不含自环与重边，输出任意一个简单环的大小以及其上面的全部元素 [See](https://codeforces.com/problemset/problem/1364/D) 。注意输出的环的大小是随机的，**不等价于最小环**。

由于不含重边与自环，所以环的大小至少为 $3$ ，使用 dfs 处理出 dfs 序，复杂度为 $\mathcal{O} ( N + M )$，可以扩展到有向图；如果有向图中二元环也允许计入答案，则需要删除下方标注行。

**适用：** 当前 DFS 跳过父顶点，按简单无向图使用；需要识别重边形成的二元环时，应按边编号区分父边。

<<< @/snippets/inline/graph/entry-020-25.cpp

## 有向图环计数 {#s-bcc308da161a}

原题：给出一张有向图，输出环的数量。注意这里环套环仅需要计算一次，数据包括二元环和自环，下图例应当输出 $3$ 个环。使用 dfs 染色法，复杂度为 $\mathcal{O} ( N + M )$。

![img-10.png](/images/img-10.png)

<<< @/snippets/inline/graph/entry-020-26.cpp

## 输出有向图任意一个环 {#s-8fe8e969e9bc}

DFS 三色：访问中的后向边指向栈上祖先，即找到环。含二元环和自环。任意一个即可。

<<< @/snippets/inline/graph/entry-020-27.cpp

## 判定带环图是否是平面图 {#s-5691a0a6c09e}

原题：给定一个环以一些额外边，对于每一条额外边判定其位于环外还是环内，使得任意两条无重合顶点的额外边都不相交（即这张图构成平面图）[See1](https://codeforces.com/contest/27/problem/D), [See2](https://www.luogu.com.cn/problem/P3209) 。

使用 2-sat。考虑全部边都位于环内，那么“一条边完全包含另一条边”、"两条边完全没有交集"这两种情况都不会相交，可以直接跳过这两种情况的讨论。

<<< @/snippets/code/图论/判定带环图是否是平面图.cpp
