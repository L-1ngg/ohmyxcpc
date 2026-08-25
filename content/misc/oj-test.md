---
title: OJ 测试
order: 20
---

# OJ 测试

对于一个未知属性的 OJ，应当在正式赛前进行以下全部测试：

## GNU C++ 版本测试

```cpp
for (int i : {1, 2}) {} // GNU C++11 支持范围表达式

auto cc = [&](int x) { x++; }; // GNU C++11 支持 auto 与 lambda 表达式
cc(2);

tuple<string, int, int> V; // GNU C++11 引入
array<int, 3> C; // GNU C++11 引入

auto dfs = [&](auto self, int x) -> void { // GNU C++14 支持 auto 自递归
    if (x > 10) return;
    self(self, x + 1);
};
dfs(dfs, 1);

vector in(1, vector<int>(1)); // GNU C++17 支持 vector 模板类型缺失

map<int, int> dic;
for (auto [u, v] : dic) {} // GNU C++17 支持 auto 解绑
dic.contains(12); // GNU C++20 支持 contains 函数

constexpr double Pi = numbers::pi; // C++20 支持
```

## 编译器位数测试

```cpp
using i64 = __int128; // 64 位 GNU C++11 支持
```

## 评测器环境测试

Windows 系统输出 $-1$ ；反之则为一个随机数。

```cpp
#define int long long
map<int, int> dic;
int x = dic.size() - 1;
cout << x << endl;
```

## 运算速度测试

|                       | 本地-20(64) | [CodeForces-20(64)](https://codeforces.com/problemset/customtest) | [AtCoder-20(64)](https://atcoder.jp/contests/practice/custom_test) | [牛客-17(64)](https://ac.nowcoder.com/acm/problem/21122) | [学院 OJ](http://39.98.219.132/problem/2230) | CodeForces-17(32) | [马蹄集](https://www.matiji.net/exam/brushquestion/14/915/520382963B32011DA740D5275AB1C1BF) |
| :-------------------: | :---------: | :---------------------------------------------------------------: | :----------------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------: | :---------------: | :-----------------------------------------------------------------------------------------: |
|   **4E3 量级-硬跑**   |    2454     |                               2886                                |                                874                                 |                           4121                           |                     4807                     |       2854        |                                            4986                                             |
| **4E3 量级-手动加速** |     556     |                                686                                |                                873                                 |                           1716                           |                     1982                     |       2246        |                                            2119                                             |

```cpp
// #pragma GCC optimize("Ofast", "unroll-loops")
#include <bits/stdc++.h>
using namespace std;

signed main() {
    int n = 4E3, cnt = 0;
    bitset<30> ans;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j += 2) {
            for (int k = 1; k <= n; k += 4) {
                ans |= i | j | k;
                cnt++;
            }
        }
    }
    cout << cnt << "\n";
}
```

```cpp
// #pragma GCC optimize("Ofast", "unroll-loops")

#include <bits/stdc++.h>
using namespace std;
mt19937 rnd(chrono::steady_clock::now().time_since_epoch().count());

signed main() {
    size_t n = 340000000, seed = 0;
    for (int i = 1; i <= n; i++) {
        seed ^= rnd();
    }

    return 0;
}
```
