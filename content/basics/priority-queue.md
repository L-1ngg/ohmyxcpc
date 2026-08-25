---
title: 优先队列 priority_queue
order: 13
---

# 优先队列 priority_queue

默认升序（大根堆），自定义排序需要重载 `<`。

```cpp
//没有clear函数
std::priority_queue<int, std::vector<int>, std::greater<int>> p; //重定义为降序（小根堆）
push(x); //向栈顶插入x
top(); //获取栈顶元素
pop(); //弹出栈顶元素
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
