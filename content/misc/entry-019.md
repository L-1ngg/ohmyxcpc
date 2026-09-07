---
title: "Python 常用语法"
order: 190
---

# Python 常用语法 {#s-ad41f45a2a68}

  大整数、高精度、简单脚本用。递归默认深度约 $1000$，要改 `setrecursionlimit`。输出用 `print`，大量输出注意不要逐行 flush。

## 读入与定义 {#s-2b4b7ae99980}

- 读入多个变量并转换类型：`X, Y = map(int, input().split())`

- 读入列表：`X = eval(input())`

- 多维数组定义：`X = [[0 for j in range(0, 100)] for i in range(0, 200)]`

## 格式化输出 {#s-6f50383cdbe3}

- 保留小数输出：`print("{:.12f}".format(X))` 指保留 $12$ 位小数

- 对齐与宽度：`print("{:<12f}".format(X))` 指左对齐，保留 $12$ 个宽度

## 排序 {#s-38cb5799aba7}

- 倒序排序：使用 `reverse` 实现倒序 `X.sort(reverse=True)`

- 自定义排序：下方代码实现了先按第一关键字降序、再按第二关键字升序排序。

   

   ```python
   X.sort(key=lambda x: x[1])
   X.sort(key=lambda x: x[0], reverse=True)
   ```

## 文件 IO {#s-236bcdaa3063}

- 打开要读取的文件：`r = open('X.txt', 'r', encoding='utf-8')`

- 打开要写入的文件：`w = open('Y.txt', 'w', encoding='utf-8')`

- 按行写入：`w.write(XX)`

## 增加输出流长度、递归深度 {#s-e90880e7c235}

  `sys.setrecursionlimit` 把递归上限抬高；`sys.set_int_max_str_digits` 允许超长整数转字符串（3.11+）。过大可能爆栈。

```python
import sys
sys.set_int_max_str_digits(200000)
sys.setrecursionlimit(100000)
```

## 自定义结构体 {#s-7cf8bcb8140c}

  `sort(key=lambda x: ...)` 按成员排序自定义对象，`reverse=True` 降序。

```python
class node:
    def __init__(self, A, B, C):
        self.A = A
        self.B = B
        self.C = C

w = []
for i in range(1, 5):
    a, b, c = input().split()
    w.append(node(a, b, c))
w.sort(key=lambda x: x.C, reverse=True)
for i in w:
    print(i.A, i.B, i.C)
```

## 数据结构 {#s-13d1c59025ba}

- 模拟 C++ 的 `map`，定义：`dic = dict()`

- 模拟栈与队列：使用常见的 `list` 即可完成，`list.insert(0, X)` 实现头部插入、`list.pop()` 实现尾部弹出、`list.pop(0)` 实现头部弹出

## 其他 {#s-3db083d3b483}

- 获取 ASCII 码：`ord()` 函数

- 转换为 ASCII 字符：`chr()` 函数
