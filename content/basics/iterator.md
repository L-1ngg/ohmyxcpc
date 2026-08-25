---
title: 迭代器 iterator
order: 12
---

# 迭代器 iterator

```cpp
//构建一个UUU容器的正向迭代器，名字叫it
UUU::iterator it;

std::vector<int>::iterator it; //创建一个正向迭代器，++ 操作时指向下一个
std::vector<int>::reverse_iterator it; //创建一个反向迭代器，++ 操作时指向上一个
```

## next 与 prev

```cpp
auto it = s.find(x); // 建立一个迭代器
std::prev(it) / std::next(it); // 默认返回迭代器it的前/后一个迭代器
std::prev(it, 2) / std::next(it, 2); // 可选参数可以控制返回前/后任意个迭代器

/* 以下是一些应用 */
auto pre = std::prev(s.lower_bound(x)); // 返回第一个<x的迭代器
int ed = *std::prev(S.end(), 1); // 返回最后一个元素
```
