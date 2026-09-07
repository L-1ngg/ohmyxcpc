---
title: "数字转字符串函数"
order: 30
---

# 数字转字符串函数 {#s-d90ac124e8fe}

  `itoa` 虽然能将整数转换成任意进制的字符串，但是其不是标准的 C 函数，且为 Windows 独有，且不支持 `long long` ，建议手写。

```cpp
// to_string函数会直接将你的各种类型的数字转换为字符串。
// string to_string(T val);
double val = 12.12;
cout << to_string(val);
```

<<< @/snippets/code/STL与库函数/数字转字符串函数.cpp
