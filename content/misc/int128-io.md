---
title: int128 输入输出流控制
order: 15
---

# int128 输入输出流控制

int128 只在基于 $linux$ 系统的环境下可用，需要 $\tt C++20$ 。38 位精度，除输入输出外与普通数据类型无差别。该封装支持负数读入，需要注意 `write` 函数结尾不输出多余空格与换行。

```cpp
using i128 = __int128;

std::istream& operator>>(std::istream& is, i128& n) {
    std::string s;is >> s;
    n = 0;
    for (char i : s) n = n * 10 + i - '0';
    return is;
}
std::ostream& operator<<(std::ostream& os, i128 n) {
    if (n == 0) {
        return os << 0;
    }
    std::string s;
    while (n) {
        s += '0' + n % 10;
        n /= 10;
    }
    std::reverse(s.begin(), s.end());
    return os << s;
}
```

> [!WARNING] 待补充：正文中提到的 `write` 函数未在代码中给出实现。
