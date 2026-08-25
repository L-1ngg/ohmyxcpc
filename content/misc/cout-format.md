---
title: cout 输出流控制
order: 9
---

# cout 输出流控制

设置字段宽度：`setw(x)` ，该函数可以使得补全 $x$ 位输出，默认用空格补全。

```cpp
bool Solve() {
    cout << 12 << endl;
    cout << setw(12) << 12 << endl;
    return 0;
}
```

![67dce9cb83b4b4ede4f7eb453a7033e0.png](https://s2.loli.net/2023/08/17/LgBUb5vzW2rHEP9.png)

设置填充字符：`setfill(x)` ，该函数可以设定补全类型，注意这里的 $x$ 只能为 $\tt char$ 类型。

```cpp
bool Solve() {
    cout << 12 << endl;
    cout << setw(12) << setfill('*') << 12 << endl;
    return 0;
}
```

![761488b7b2fd4871c5cfba7b112fcc6e.png](https://s2.loli.net/2023/08/17/agB6vjfNHwIiQAt.png)
