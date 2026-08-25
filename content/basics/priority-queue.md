---
title: 优先队列 priority_queue
order: 13
---

# 优先队列 priority_queue

默认大根堆（堆顶为最大元素），自定义排序需要重载 `<`。

```cpp
//没有clear函数
std::priority_queue<int, std::vector<int>, std::greater<int>> q; //重定义为小根堆（堆顶为最小元素）
q.push(x); //插入元素x
q.top(); //获取堆顶元素
q.pop(); //弹出堆顶元素
```

```cpp
//重载运算符【注意，符号相反！！！】
struct Node {
    int x; std::string s;
    friend bool operator<(const Node &a, const Node &b)
    {
        if (a.x != b.x) return a.x > b.x;
        return a.s > b.s;
    }
};
```
