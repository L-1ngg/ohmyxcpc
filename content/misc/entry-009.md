---
title: "cout 输出流控制"
order: 90
---

# cout 输出流控制 {#s-4c05434f3cb4}

控制数字输出的宽度、精度与进制。`setw` 通常只影响下一项，`fixed`、`setprecision` 等格式状态会继续影响后续输出。

设置字段宽度：`setw(x)` ，该函数可以使得补全 $x$ 位输出，默认用空格补全。

```cpp
bool Solve() {
    cout << 12 << endl;
    cout << setw(12) << 12 << endl;
    return 0;
}
```

输出（第二行右对齐，前导 10 个空格）：

```text
12
          12
```

设置填充字符：`setfill(x)` ，该函数可以设定补全类型，注意这里的 $x$ 只能为 `char` 类型。

```cpp
bool Solve() {
    cout << 12 << endl;
    cout << setw(12) << setfill('*') << 12 << endl;
    return 0;
}
```

输出：

```text
12
**********12
```
