---
title: "三路比较运算符"
order: 20
---

# 三路比较运算符 {#s-41490ab707bb}

C++20。放进结构体里，一次生成 `==` `<` 等。`V` 换成自己的类型。

```cpp
auto operator<=>(const V &) const = default;
```
