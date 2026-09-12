---
title: "容器与成员函数"
order: 130
---

# 容器与成员函数 {#s-52bea9cd2ea0}

常用容器与成员接口速查，包含堆、位集和自定义哈希。代码中的迭代器、键值与容量需替换为当前题目的对象。

## 优先队列 priority\_queue {#s-4702f10fd192}

默认大根堆（堆顶最大），自定义排序需要重载 `<`（比较语义与 `sort` 相反，见下例）。

**接口：** `p` 为小根堆，`p.push(x)` 插入，`p.top()` 读取最小值，`p.pop()` 移除最小值；后两者要求非空。清空可将 `p` 赋为空队列。

```cpp
priority_queue<int, vector<int>, greater<int>> p;
p.push(3);
p.push(1);
cout << p.top() << '\n';
p.pop();
p = {};
```

**比较：** 返回 `a.x > b.x` 会让较小的 `x` 优先出堆；比较器应满足严格弱序。

<<< @/snippets/code/STL与库函数/优先队列-priority_queue.cpp

## bitset {#s-4ade6b3cf5b9}

定长位集：每元素占 1 bit，`[i]` 访问第 $i$ 位（$0$ 为最低位），支持整体位运算（`&`、`|`、`^`、`~`、`<<`、`>>`），常用于状压与位并行加速。位数在编译期固定，`count()` 数 $1$ 的个数。

**接口：** `bitset<N>` 的长度 `N` 是编译期常量，可从整数或 01 字符串构造，最右字符对应第 `0` 位。`set` / `reset` / `flip` 修改一位，省略参数时作用于全部位；`count` / `any` / `none` 分别统计 1、判断有 1、判断全零。`to_string` 转 01 串，`to_ullong` 在超出结果类型时抛异常。

**扩展：** `_Find_first` / `_Find_next` 是 libstdc++ 扩展，返回首个 / 下一个置位位置，无结果时返回 `N`；按字扫描并枚举全部置位的开销约为 $O(N/w + k)$，其中 `w` 为机器字宽、`k` 为置位数。

<<< @/snippets/inline/stl/entry-013-1.cpp

## 哈希系列 unordered {#s-77d31f8f8f9a}

通常指代 unordered\_map、unordered\_set、unordered\_multimap、unordered\_multiset，与原版相比不进行排序。

如果将不支持哈希的类型作为 `key` 值代入，编译器就无法正常运行，这时需要我们为其手写哈希函数。而我们写的这个哈希函数的正确性其实并不是特别重要（但是不可以没有），当发生冲突时编译器会调用 `key` 的 `operator ==` 函数进行进一步判断。[参考](https://finixlei.blog.csdn.net/article/details/110267430?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-110267430-blog-101406104.topnsimilarv1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-110267430-blog-101406104.topnsimilarv1&utm_relevant_index=4)

### 对 pair、tuple 定义哈希 {#s-dcb114342da3}

`unordered_map` 默认不能以 `pair` 为键。把两维哈希异或/相乘混一下；自定义结构体同理。

**哈希：** `pair` 与 `tuple` 用成员哈希的异或组合，可能使交换后的键落入同一桶，影响效率但不改变由相等比较决定的结果。`tuple` 的折叠表达式需要 C++17。

<<< @/snippets/code/STL与库函数/对-pair、tuple-定义哈希.cpp

### 对结构体定义哈希 {#s-8f9172157608}

需要两个条件，一个是在结构体中重载等于号（区别于非哈希容器需要重载小于号，如上所述，当冲突时编译器需要根据重载的等于号判断），第二是写一个哈希函数。注意 `hash<>()` 的尖括号中的类型匹配。

**相等：** 两个结构体相等要求所有键字段都相等；相等键必须得到相同哈希值。

<<< @/snippets/code/STL与库函数/对结构体定义哈希.cpp

### 对 vector 定义哈希 {#s-042d63dc4481}

以下两个方法均可。注意 `hash<>()` 的尖括号中的类型匹配。

<<< @/snippets/code/STL与库函数/对-vector-定义哈希.cpp

<<< @/snippets/code/STL与库函数/对-vector-定义哈希-2.cpp
