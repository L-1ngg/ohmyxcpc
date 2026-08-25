---
title: 常用库函数
order: 11
---

# 常用库函数

## 数组打乱 shuffle

```cpp
std::mt19937_64 rng(std::chrono::steady_clock::now().time_since_epoch().count());
std::shuffle(ver.begin(), ver.end(), rng);
```

## 数字转字符串

`itoa` 虽然能将整数转换成任意进制的字符串，但是其不是标准的 C 函数，且为 Windows 独有，且不支持 `long long`，建议手写。

```cpp
// to_string函数会直接将你的各种类型的数字转换为字符串。
// string to_string(T val);
double val = 12.12;
std::cout << std::to_string(val);
```

```cpp
// 【不建议使用】itoa允许你将整数转换成任意进制的字符串，参数为待转换整数、目标字符数组、进制。
// char* itoa(int value, char* string, int radix);
char ans[10] = {};
itoa(12, ans, 2);
std::cout << ans << '\n'; /*1100*/

// 长整型函数名ltoa，最高支持到int型上限2^31。ultoa同理。
```

## 字符串转数字

```cpp
// stoi直接使用
std::cout << std::stoi("12") << '\n';

// 【不建议使用】stoi转换进制，参数为待转换字符串、起始位置、进制。
// int stoi(string value, int st, int radix);
std::cout << std::stoi("1010", 0, 2) << '\n'; /*10*/
std::cout << std::stoi("c", 0, 16) << '\n'; /*12*/
std::cout << std::stoi("0x3f3f3f3f", 0, 0) << '\n'; /*1061109567*/

// 长整型函数名stoll，最高支持到long long型上限2^63。stoull、stod、stold同理。
```

```cpp
// atoi直接使用，空字符返回0，允许正负符号，数字字符前有其他字符返回0，数字字符前有空白字符自动去除
std::cout << atoi("12") << '\n';
std::cout << atoi("   12") << '\n'; /*12*/
std::cout << atoi("-12abc") << '\n'; /*-12*/
std::cout << atoi("abc12") << '\n'; /*0*/

// 长整型函数名atoll，最高支持到long long型上限2^63。
```

## 海伦公式

已知三角形三边长 $a, b, c$，记半周长为 $p$，面积为 $S$：

$$p = \frac{a+b+c}{2}, \qquad S = \sqrt{p(p-a)(p-b)(p-c)}$$

> [!WARNING] 待补充：原文件此小节结构损坏（标题行混入公式内容），已按残留文本还原公式，原配套代码块缺失。

## 全排列 next_permutation

在提及这个函数时，我们先需要补充几点字典序相关的知识。

> 对于三个字符所组成的序列 `{a,b,c}`，其按照字典序的 6 种排列分别为：
> `{abc}`，`{acb}`，`{bac}`，`{bca}`，`{cab}`，`{cba}`
> 其排序原理是：先固定 `a`（序列内最小元素），再对之后的元素排列。而 `b` < `c`，所以 `abc` < `acb`。同理，先固定 `b`（序列内次小元素），再对之后的元素排列。即可得出以上序列。

`next_permutation` 算法，即是按照**字典序顺序**输出的全排列；相对应的，`prev_permutation` 则是按照**逆字典序顺序**输出的全排列。可以是数字，亦可以是其他类型元素。其直接在序列上进行更新，故直接输出序列即可。

```cpp
int n;
std::cin >> n;
std::vector<int> a(n);
// std::iota(a.begin(), a.end(), 1);
for (auto &it : a) std::cin >> it;
std::sort(a.begin(), a.end());

do {
    for (auto it : a) std::cout << it << " ";
    std::cout << '\n';
} while (std::next_permutation(a.begin(), a.end()));
```

## 判断非递减 is_sorted

```cpp
//a数组[start,end)区间是否是非递减的，返回bool型
std::cout << std::is_sorted(a + start, a + end);
```

## 累加 accumulate

```cpp
//将a数组[start,end)区间的元素进行累加，并输出累加和+x的值
std::cout << std::accumulate(a + start, a + end, x);
```

## 其他函数

`exp2(x)`：返回 $2^x$

`log2(x)`：返回 $\log_2(x)$

`gcd(x, y) / lcm(x, y)`：以 $\log$ 的复杂度返回 $\gcd(|x|, |y|)$ 与 ${\tt lcm}(|x|, |y|)$，且返回值符号也为正数。（C++17 起，位于 `<numeric>` 头文件）
