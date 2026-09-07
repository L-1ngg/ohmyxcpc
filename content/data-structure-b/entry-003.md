---
title: "pbds 扩展库实现平衡二叉树"
order: 30
---

# pbds 扩展库实现平衡二叉树 {#s-203c3d595115}

  记得加上下面的头文件与命名空间。模板第三个参数是比较器（默认 `less`，改成 `greater` 即翻转顺序）。`tree` 不容许重复键，用第二维计数 `{x, ++dic[x]}` 实现可重集合（见下例）。

> 附常见成员函数：
> 
> 
> 
> ```cpp
> empty() / size()
> insert(x) // 插入元素x
> erase(x) // 删除元素/迭代器x
> order_of_key(x) // 返回元素x的排名
> find_by_order(x) // 返回排名为x的元素迭代器
> lower_bound(x) / upper_bound(x) // 返回迭代器
> join(Tree) // 将Tree树的全部元素并入当前的树
> split(x, Tree) // 将大于x的元素放入Tree树
> ```

<<< @/snippets/inline/data-structure-b/entry-003-10.cpp
