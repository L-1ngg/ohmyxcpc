---
title: "format 格式化输出小数点"
order: 10
---

# format 格式化输出小数点 {#s-83f16aa16fec}

  C++20。没有 `format` 时用下面预置里的 `cc(x)`（`fixed << setprecision`）。

```cpp
cout << format("{:.2f}", 114514.1919810) << endl;
// output: 114514.19
```
