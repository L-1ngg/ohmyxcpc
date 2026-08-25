# 代码风格规范（提炼自用户模板头）

用户的竞赛模板头（所有条目代码的风格基准）：

```cpp
#include <bits/stdc++.h>

#define ranges std::ranges
#define views std::views

using u32 = unsigned;
using i64 = long long;
using u64 = unsigned long long;

using pii = std::pair<int, int>;
using a3 = std::array<int, 3>;
using a4 = std::array<int, 4>;

const int dx[8] = { -1, 0, 1, 0, -1, -1, 1, 1 }, dy[8] = { 0, 1, 0, -1, -1, 1, -1, 1 };
const int N = 1e6;
const int MAXN = 1e6 + 10;
const int inf = 1e9;
const i64 INF = 1e18;
//const int mod = 1e9 + 7;
const int mod = 998244353;

void solve()
{

}

signed main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(0);
    int t = 1;
    //std::cin >> t;
    while (t--) {
        solve();
        std::cout << '\n';
    }
}
```

## 提炼的规则

- **不**使用 `using namespace std;`，标准库名字显式 `std::` 限定（`std::cout`、`std::gcd`、`std::pair`…）
- 类型别名用 `using`：`i64` / `u32` / `u64` / `pii` / `a3` / `a4`；**没有** `ll`、`ld`、`LL` 等别名
- 常量小写：`mod`（默认 998244353）、`inf` / `INF`；全局限长用 `N` / `MAXN`
- 大括号混合风格：**函数定义 Allman**（`{` 独占一行）；**控制语句 K&R**（`if` / `for` / `while` 行尾 `{`）
- 输出换行用 `'\n'`，不用 `endl`；`std::cin` / `std::cout` 显式限定
- 主函数写 `signed main()`，配 `std::ios::sync_with_stdio(false); std::cin.tie(0);`
- 循环用原生 `for`，不引入 `rep` 等宏；`pair` 成员用 `.first` / `.second`（无 `fi`/`se` 宏）
- 代码片段默认假设上述模板头已就位：可直接使用 `i64` / `mod` / `inf` / `pii` 等，不重复定义、不补 `main`

## 转换时的映射

| 原文 | 转为 |
|---|---|
| `ll` / `LL` / 其他长整型别名 | `i64` |
| `ld`（long double 别名） | `double`（模板头无 `ld` 别名） |
| `MOD` | `mod` |
| `endl` | `'\n'` |
| 裸 `cout` / `cin` / `gcd` / `swap` 等 | 加 `std::` 限定 |
| `p.fi` / `p.se` | `p.first` / `p.second` |
| 函数定义行尾 `{` | `{` 移到下一行（Allman） |
