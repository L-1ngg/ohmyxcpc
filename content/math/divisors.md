---
title: 倍数法求正约数集合
order: 15
---

# 倍数法求正约数集合

使用规律递推优化，时间复杂度为 $\mathcal{O}(N\log N)$ ，如果不需要详细的输出集合，则直接将 `vector` 换为普通数组即可（时间更快） 。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 7;
vector<int> f[N];

void divide(int n) {
    for (int i = 1; i <= n; ++ i)
        for (int j = 1; j <= n / i; ++ j)
            f[i * j].push_back(i);
    for (int i = 1; i <= n; ++ i) {
        for (auto it : f[i]) cout << it << " ";
        cout << endl;
    }
}
int main() {
    int x; cin >> x; divide(x);
    return 0;
}
```
