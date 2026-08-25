---
title: 对拍板子
order: 16
---

# 对拍板子

compare.cpp

```cpp
#include <bits/stdc++.h>

int main() {
    system("g++ -std=c++23 -O2 -o gen.exe gen.cpp");
    system("g++ -std=c++23 -O2 -o x.exe x.cpp");
    system("g++ -std=c++23 -O2 -o xstd.exe xstd.cpp");

    // system("g++ -std=c++23 -O2 -o gen gen.cpp");
    // system("g++ -std=c++23 -O2 -o x x.cpp");
    // system("g++ -std=c++23 -O2 -o xstd xstd.cpp");

    int t = 0;
    while (true) {
        std::cout << "Test: " << t++ << '\n';
        system("gen > test.in");  // 数据生成器将生成数据写入输入文件
        system("x.exe < test.in > x.out");  // 获取程序1输出
        system("xstd.exe < test.in > xstd.out");  // 获取程序2输出

        // For linux
        // system("./xgen > test.in");
        // system("./x < test.in > x.out");
        // system("./xstd < test.in > xstd.out");

        // if (system("diff x.out xstd.out")) {
        //     std::cin.get();
        //     return 0;
        // }

        if (system("fc x.out xstd.out")) {
            system("pause");
            return 0;
        }
    }
}
```

gen.cpp

```cpp
#include <bits/stdc++.h>
using namespace std;
using u32 = unsigned;
using i64 = long long;

std::mt19937_64 rng(std::chrono::steady_clock::now().time_since_epoch().count());

i64 rnd(i64 L, i64 R) {
    static std::mt19937_64 rng(std::chrono::steady_clock::now().time_since_epoch().count());
    std::uniform_int_distribution<i64> dist(L, R);
    return dist(rng);
}

int main() {
    // int n = rnd(1, 1000);
    // int m = rnd(1, 1000);
    // vector<int> a(n);
    // for (int i = 0; i < n; i++) a[i] = i + 1;
    // std::shuffle(a.begin(), a.end(), rng);
    // cout << n << ' ' << 1 << endl;
    // for (int x : a) cout << x << ' ';
    // cout << endl;
    // cout << m << endl;
}
```

```python
import os
tc = 0
os.system("g++ ./std.cpp -o ./std")
os.system("g++ ./solve.cpp -o ./solve")

while True:
    os.system("python ./data.py > ./data.in")
    os.system("./std < ./data.in > ./std.out")
    os.system("./solve < ./data.in > ./solve.out");
    if(os.system("diff ./std.out ./solve.out")):
        print("WA")
        exit(0)
    else:
        tc += 1
        print("AC #%d" %(tc))
```
