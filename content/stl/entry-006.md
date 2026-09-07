---
title: "字符串转换为数值函数 sto"
order: 60
---

# 字符串转换为数值函数 sto {#s-2ad91ac0c966}

  可以快捷的将**一串字符串**转换为**指定进制的数字**。

使用方法

- `stoi(字符串, 0, x进制)` ：将一串 $x$ 进制的字符串转换为 `int` 型数字。

```cpp
cout << stoi("1010", 0, 2) << endl;          // 10
cout << stoi("c", 0, 16) << endl;            // 12
cout << stoi("0x3f3f3f3f", 0, 0) << endl;    // 1061109567
cout << stoi("10", 0, 8) << endl;            // 8
cout << stoll("aaaaaaaaaaa", 0, 16) << endl; // 11728124029610
```

- `stoll(字符串, 0, x进制)` ：将一串 $x$ 进制的字符串转换为 `long long` 型数字。

- `stoull`、`stod`、`stold` 同理。
