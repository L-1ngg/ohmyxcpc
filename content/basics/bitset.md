---
title: bitset
order: 14
---

# bitset

将数据转换为二进制，从高位到低位排序，以 $0$ 为最低位。当位数相同时支持全部的位运算。

```cpp
// 如果输入的是01字符串，可以直接使用">>"读入
std::bitset<10> s;
std::cin >> s;

//使用只含01的字符串构造——bitset<容器长度>B (字符串)
std::string S; std::cin >> S;
std::bitset<32> B (S);

//使用整数构造（两种方式）
int x; std::cin >> x;
std::bitset<32> B1 (x);
std::bitset<32> B2 = x;

// 构造时，尖括号里的数字不能是变量
int x; std::cin >> x;
std::bitset<x> ans; // 错误构造

[] //随机访问
set(x) //将第x位置1，x省略时默认全部位置1
reset(x) //将第x位置0，x省略时默认全部位置0
flip(x) //将第x位取反，x省略时默认全部位取反
to_ullong() //重转换为ULL类型
to_string() //重转换为ULL类型
count() //返回1的个数
any() //判断是否至少有一个1
none() //判断是否全为0

_Find_fisrt() // 找到从低位到高位第一个1的位置
_Find_next(x) // 找到当前位置x的下一个1的位置，复杂度 O(n/w + count)

std::bitset<23> B1("11101001"), B2("11101000");
std::cout << (B1 ^ B2) << '\n';  //按位异或
std::cout << (B1 | B2) << '\n';  //按位或
std::cout << (B1 & B2) << '\n';  //按位与
std::cout << (B1 == B2) << '\n'; //比较是否相等
std::cout << B1 << " " << B2 << '\n'; //你可以直接使用cout输出
```
