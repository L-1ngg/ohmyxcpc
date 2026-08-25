---
title: 读取一行数字，个数未知
order: 10
---

# 读取一行数字，个数未知

```cpp
string s;
getline(cin, s);
stringstream ss;
ss << s;
while (ss >> s) {
    auto res = stoi(s);
    cout << res * 100 << endl;
}
```
