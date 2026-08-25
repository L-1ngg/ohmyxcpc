---
title: 二分
order: 3
---

# 二分

## 整数域二分

- $x$ 或 $x$ 的后继

```cpp
int l = 0, r = 1E8, ans = r;
while (l <= r) {
    int mid = (l + r) / 2;
    if (check(mid)) {
        r = mid - 1;
        ans = mid;
    } else {
        l = mid + 1;
    }
}
return ans;
```

- $x$ 或 $x$ 的前驱

```cpp
int l = 0, r = 1E8, ans = l;
while (l <= r) {
    int mid = (l + r) / 2;
    if (check(mid)) {
        l = mid + 1;
        ans = mid;
    } else {
        r = mid - 1;
    }
}
return ans;
```

## 实数域二分

目前主流的写法是限制二分次数。

```cpp
for (int t = 1; t <= 100; t++) {
    ld mid = (l + r) / 2;
    if (check(mid)) r = mid;
    else l = mid;
}
std::cout << l << '\n';
```

## 整体二分

**是什么**：当一组询问的答案都可以在值域上二分时，与其对每个询问分别二分，不如让所有询问**共享同一趟二分**——每一层递归取同一个 mid，批量判定当前所有询问的答案是否不超过 mid，把满足的分到左半区间、不满足的分到右半区间，分别递归，直到值域收敛到单点。

**什么时候用**：

- 题目允许离线（所有询问提前已知）
- 每个询问的答案具有可二分性
- 给定 mid 后，能把所有「数值不超过 mid 的修改」一次性加入数据结构（通常是树状数组或线段树），从而批量回答当前这一组询问

**复杂度**：值域共 $\log V$ 层，每层中每个修改和每个询问各被处理一次，总复杂度 $\mathcal O((n+q)\log V \cdot f)$，其中 $f$ 是单次加入/查询数据结构的代价（配树状数组时 $f = \log n$）。

**经典应用**：静态区间第 $k$ 小（可持久化线段树的离线替代）、带修改区间第 $k$ 小。

参考：许昊然《浅谈数据结构题几个非经典解法》

```cpp
int cal(auto x)
{
    // todo
}

void solve(int ql, int qr, int l, int r)
{
    if (ql > qr)return;
    if (l > r)return;
    if (l == r) {
        for (int q = ql;q <= qr;++q)ans[q] = l;
        return;
    }
    int mid = l + r + 1 >> 1;
    int cnt = cal(mid);
    solve(std::max(ql, cnt + 1), qr, l, mid - 1);
    solve(ql, std::min(qr, cnt), mid, r);
}

void solve()
{
    //input
    solve(ql, qr, 0, n, zf);
    //todo
}
```
