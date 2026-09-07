---
title: "容器与成员函数"
order: 130
---

# 容器与成员函数 {#s-52bea9cd2ea0}

## 优先队列 priority\_queue {#s-4702f10fd192}

  默认大根堆（堆顶最大），自定义排序需要重载 `<`（比较语义与 `sort` 相反，见下例）。

```cpp
//没有clear函数，可用 swap(p, priority_queue<int, vector<int>, greater<int>>()) 清空
priority_queue<int, vector<int>, greater<int> > p;  //重定义为小根堆（堆顶最小）
push(x);  //向栈顶插入x
top(); //获取栈顶元素
pop(); //弹出栈顶元素
```

<<< @/snippets/code/STL与库函数/优先队列-priority_queue.cpp

## bitset {#s-4ade6b3cf5b9}

  定长位集：每元素占 1 bit，`[i]` 访问第 $i$ 位（$0$ 为最低位），支持整体位运算（`&`、`|`、`^`、`~`、`<<`、`>>`），常用于状压与位并行加速。位数在编译期固定，`count()` 数 $1$ 的个数。

<<< @/snippets/inline/stl/entry-013-1.cpp

## 哈希系列 unordered {#s-77d31f8f8f9a}

  通常指代 unordered\_map、unordered\_set、unordered\_multimap、unordered\_multiset，与原版相比不进行排序。

如果将不支持哈希的类型作为 `key` 值代入，编译器就无法正常运行，这时需要我们为其手写哈希函数。而我们写的这个哈希函数的正确性其实并不是特别重要（但是不可以没有），当发生冲突时编译器会调用 `key` 的 `operator ==` 函数进行进一步判断。[参考](https://finixlei.blog.csdn.net/article/details/110267430?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-110267430-blog-101406104.topnsimilarv1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-110267430-blog-101406104.topnsimilarv1&utm_relevant_index=4)

### 对 pair、tuple 定义哈希 {#s-dcb114342da3}

  `unordered_map` 默认不能以 `pair` 为键。把两维哈希异或/相乘混一下；自定义结构体同理。

<<< @/snippets/code/STL与库函数/对-pair、tuple-定义哈希.cpp

### 对结构体定义哈希 {#s-8f9172157608}

  需要两个条件，一个是在结构体中重载等于号（区别于非哈希容器需要重载小于号，如上所述，当冲突时编译器需要根据重载的等于号判断），第二是写一个哈希函数。注意 `hash<>()` 的尖括号中的类型匹配。

<<< @/snippets/code/STL与库函数/对结构体定义哈希.cpp

### 对 vector 定义哈希 {#s-042d63dc4481}

  以下两个方法均可。注意 `hash<>()` 的尖括号中的类型匹配。

<<< @/snippets/code/STL与库函数/对-vector-定义哈希.cpp

<<< @/snippets/code/STL与库函数/对-vector-定义哈希-2.cpp
