---
title: "迭代器 iterator"
order: 100
---

# 迭代器 iterator {#s-fdbded18c186}

  指向容器元素的指针状对象。`begin` 首元素，`end` 尾后。随机访问容器可加减整数。

```cpp
//构建一个UUU容器的正向迭代器，名字叫it
UUU::iterator it;

vector<int>::iterator it;  //创建一个正向迭代器，++ 操作时指向下一个
vector<int>::reverse_iterator it;  //创建一个反向迭代器，++ 操作时指向上一个
```
