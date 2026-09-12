---
title: "迭代器 iterator"
order: 100
---

# 迭代器 iterator {#s-fdbded18c186}

指向容器元素的指针状对象。`begin` 首元素，`end` 尾后。随机访问容器可加减整数。

**类型：** `iterator` 正向遍历，`reverse_iterator` 反向遍历；`++` 都沿各自的遍历方向前进。实际使用时通过 `begin()` / `rbegin()` 初始化。

```cpp
vector<int> a = {1, 2, 3};
auto it = a.begin();
auto rit = a.rbegin();
cout << *it << ' ' << *rit << '\n';
```
