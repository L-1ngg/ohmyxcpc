---
title: "数组打乱 shuffle"
order: 10
---

# 数组打乱 shuffle {#s-fe504920b8cb}

  均匀打乱。引擎用 `mt19937_64`，不要 `srand` + 已弃用的 `random_shuffle`。对拍造数据、随机化算法用。

```cpp
mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());  // 用系统时间做种子，防 hack
shuffle(ver.begin(), ver.end(), rng);
```
