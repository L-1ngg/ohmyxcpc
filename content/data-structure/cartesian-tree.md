---
title: 笛卡尔树
order: 1
---

# 笛卡尔树

小根笛卡尔树

```cpp
cin >> n;
for (int i = 0;i < n;++i)cin >> nums[i];
for (int i = 0;i < n;++i)rs[i] = -1;
for (int i = 0;i < n;++i)ls[i] = -1;
top = 0;
for (int i = 0; i < n; i++) {
    int k = top;
    while (k > 0 && nums[stk[k - 1]] > nums[i]) k--;
    if (k) rs[stk[k - 1]] = i;  // rs代表笛卡尔树每个节点的右儿子
    if (k < top) ls[i] = stk[k];  // ls代表笛卡尔树每个节点的左儿子
    stk[k++] = i;
    top = k;
}
```
