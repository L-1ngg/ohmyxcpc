---
title: "浮点数比较"
order: 100
---

# 浮点数比较 {#s-5c134f7b29c4}

比一堆形如 $x^{y^{z}}$ 与 $( x^{y} )^{z}$ 的大小。取 $\text{log}$ 后排序。`equal` 见二维几何。`ans[]` 是输出串表，本段未给出，按题目填。

比较下列浮点数的大小： $x^{y^{z}} , x^{z^{y}} , ( x^{y} )^{z} , ( x^{z} )^{y} , y^{x^{z}} , y^{z^{x}} , ( y^{x} )^{z} , ( y^{z} )^{x} , z^{x^{y}} , z^{y^{x}} , ( z^{x} )^{y}$ 和 $( z^{y} )^{x}$ 。

**依赖：** 比较器使用二维几何中的 `equal` 判断浮点近似相等；近似比较不一定满足排序要求的严格弱序，精确排序可改用整数化坐标。

```cpp
vector<pair<ld, int>> val = {
    {log(x) * pow(y, z), 0}, {log(x) * pow(z, y), 1}, {log(x) * y * z, 2},  {log(x) * z * y, 3},
    {log(y) * pow(x, z), 4}, {log(y) * pow(z, x), 5}, {log(y) * x * z, 6},  {log(y) * z * x, 7},
    {log(z) * pow(x, y), 8}, {log(z) * pow(y, x), 9}, {log(z) * x * y, 10}, {log(z) * y * x, 11}};

sort(val.begin(), val.end(), [&](auto x, auto y) {
    if (equal(x.first, y.first)) return x.second < y.second;
    return x.first > y.first;
});
cout << ans[val.front().second] << endl;
```
