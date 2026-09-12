---
title: "数组打乱 shuffle"
order: 10
---

# 数组打乱 shuffle {#s-fe504920b8cb}

均匀打乱。引擎用 `mt19937_64`，不要 `srand` + 已弃用的 `random_shuffle`。对拍造数据、随机化算法用。

**随机源：** 使用时间作为 `mt19937_64` 的种子；调试或对拍复现时换成固定种子。

```cpp
mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
shuffle(ver.begin(), ver.end(), rng);
```
