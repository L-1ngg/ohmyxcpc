---
title: 高精度进制转换
order: 106
---

# 高精度进制转换

$2 - 62$ 进制相互转换。输入格式："转换前进制 转换后进制 要转换的数据"。注释：进制排序为 0-9，A-Z，a-z。

```cpp
#include<bits/stdc++.h>
using namespace std;
map<char, int> mp; //将字符转化为数字
map<int, char> mp2; //将数字转化为字符
int main(){
    for(int i = 0; i < 10; i++) mp[(char)i + 48] = i, mp2[i] = (char)i + 48;
    for(int i = 10; i < 36; i++) mp[(char)i + 55] = i, mp2[i] = (char)i + 55;
    for(int i = 36; i < 62; i++) mp[(char)i + 61] = i, mp2[i] = (char)i + 61;

    int tt = 1, a, b; cin >> tt;
    while(tt--){
        string s, sh;
        vector<int> nums, ans;
        cin >> a >> b >> s;
        for(auto c : s) nums.push_back(mp[c]);
        reverse(nums.begin(), nums.end());
        while(nums.size()){ //短除法，将整个大数一直除 b ，取余数
            int remainder = 0;
            for(int i = nums.size() - 1; ~i; i--){
                nums[i] += remainder * a;
                remainder = nums[i] % b;
                nums[i] /= b;
            }
            ans.push_back(remainder); //得到余数
            while(nums.size() && nums.back() == 0) nums.pop_back(); //去掉前导 0
        }
        reverse(ans.begin(), ans.end());
        for(int i : ans) sh += mp2[i];
        cout << a << ' ' << s << endl;
        cout << b << ' ' << sh << endl << endl;
    }
    return 0;
}
```
