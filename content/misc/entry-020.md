---
title: "OJ 测试"
order: 200
---

# OJ 测试 {#s-455d59a6fbd4}

  对于一个未知属性的 OJ，应当在正式赛前进行以下全部测试：

## GNU C++ 版本测试 {#s-9cf84e909260}

  用预定义宏看编译器版本，确认 `__int128`、pbds、gnu++20 能不能用。

<<< @/snippets/code/杂项/GNU-C++-版本测试.cpp

## 编译器位数测试 {#s-d450da6217ac}

  `sizeof` 指针或 `long` 判断 32/64 位。OJ 几乎都是 64 位。

```cpp
using i64 = __int128;  // 64 位 GNU C++11 支持
```

## 评测器环境测试 {#s-84538c2c4886}

  Windows 系统输出 $- 1$ ；反之则为一个随机数。

```cpp
#define int long long
map<int, int> dic;
int x = dic.size() - 1;
cout << x << endl;
```

## 运算速度测试 {#s-064db0cb2fef}

  测下面第一段三重循环（`n = 4E3`），表中数字为毫秒。「手动加速」指打开 `#pragma GCC optimize("Ofast", "unroll-loops")`。第二段是另一档负载（$3.4 \times 10^{8}$ 次 `mt19937`），不在表内。

|  | 本地-20(64) | [CodeForces-20(64)](https://codeforces.com/problemset/customtest) | [AtCoder-20(64)](https://atcoder.jp/contests/practice/custom_test) | [牛客-17(64)](https://ac.nowcoder.com/acm/problem/21122) | [学院 OJ](http://39.98.219.132/problem/2230) | CodeForces-17(32) | [马蹄集](https://www.matiji.net/exam/brushquestion/14/915/520382963B32011DA740D5275AB1C1BF) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **4E3 量级-硬跑** | 2454 | 2886 | 874 | 4121 | 4807 | 2854 | 4986 |
| **4E3 量级-手动加速** | 556 | 686 | 873 | 1716 | 1982 | 2246 | 2119 |

<<< @/snippets/code/杂项/运算速度测试.cpp

<<< @/snippets/inline/misc/entry-020-89.cpp
