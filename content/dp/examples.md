---
title: 常用例题
order: 4
---

# 常用例题

## 寻找 helloworld 子序列

题意：在一篇文章（包含大小写英文字母、数字、和空白字符（制表/空格/回车））中寻找 ${\tt helloworld}$（任意一个字母的大小写都行）的子序列出现了多少次，输出结果对 $10^9+7$ 的余数。

字符串 DP ，构建一个二维 DP 数组，$dp[i][j]$ 的 $i$ 表示文章中的第几个字符，$j$ 表示寻找的字符串的第几个字符，当字符串中的字符和文章中的字符相同时，即找到符合条件的字符， `dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]` ，因为字符串中的每个字符不会对后面的结果产生影响，所以 DP 方程可以优化成一维的， 由于字符串中有重复的字符，所以比较时应该从后往前。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define LL long long
const int mod = 1e9 + 7;
char c, s[20] = "!helloworld";
LL dp[20];
int main(){
    dp[0] = 1;
    while ((c = getchar()) != EOF)
        for (int i = 10; i >= 1; i--)
            if (c == s[i] || c == s[i] - 32)
                dp[i] = (dp[i] + dp[i - 1]) % mod;
    cout << dp[10] << "\n";
    return 0;
}
```

## 最长括号匹配

题意：（最长括号匹配）给一个只包含‘(’，‘)’，‘[’，‘]’的非空字符串，“()”和“[]”是匹配的，寻找字符串中最长的括号匹配的子串，若有两串长度相同，输出靠前的一串。

设给定的字符串为 $\tt{}s$ ，可以定义数组 $dp[i], dp[i]$ 表示以 $s[i]$ 结尾的字符串里最长的括号匹配的字符。显然，从 $i - dp[i] + 1$ 到 $i$ 的字符串是括号匹配的，当找到一个字符是‘)’或‘]’时，再去判断第 $i - 1 - dp[i - 1]$ 的字符和第 $i$ 位的字符是否匹配，如果是，那么 `dp[i] = dp[i - 1] + 2 + dp[i - 2 - dp[i - 1]]` 。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int maxn = 1e6 + 10;
string s;
int len, dp[maxn], ans, id;
int main(){
    cin >> s;
    len = s.length();
    for (int i = 1; i < len; i++){
        if ((s[i] == ')' && s[i - 1 - dp[i - 1]] == '(' ) || (s[i] == ']' && s[i - 1 - dp[i - 1]] == '[')){
            dp[i] = dp[i - 1] + 2 + dp[i - 2 - dp[i - 1]];
            if (dp[i] > ans) {
                ans = dp[i];  //记录长度
                id = i;  //记录位置
            }
        }
    }
    for (int i = id - ans + 1; i <= id; i++)
        cout << s[i];
    cout << "\n";
    return 0;
}
```

## 去掉区间内包含“4”和“62”的数字

题意：去掉区间内包含“4”和“62”的数字，输出剩余的数字个数

```cpp
int T,n,m,len,a[20];//a数组用于判断每一位能取到的最大值
ll l,r,dp[20][15];
ll dfs(int pos,int pre,int limit){//记搜
    //pos搜到的位置，pre前一位数
    //limit判断是否有最高位限制
    if(pos>len) return 1;//剪枝
    if(dp[pos][pre]!=-1 && !limit) return dp[pos][pre];//记录当前值
    ll ret=0;//暂时记录当前方案数
    int res=limit?a[len-pos+1]:9;//res当前位能取到的最大值
    for(int i=0;i<=res;i++)
        if(!(i==4 || (pre==6 && i==2)))
            ret+=dfs(pos+1,i,i==res&&limit);
    if(!limit) dp[pos][pre]=ret;//当前状态方案数记录
    return ret;
}
ll part(ll x){//把数按位拆分
    len=0;
    while(x) a[++len]=x%10,x/=10;
    memset(dp,-1,sizeof dp);//初始化-1（因为有可能某些情况下的方案数是0）
    return dfs(1,0,1);//进入记搜
}
int main(){
    cin>>n;
    while(n--){
        cin>>l>>r;
        if(l==0 && r==0)break;
        if(l) printf("%lld\n",part(r)-part(l-1));//[l,r](l!=0)
        else printf("%lld\n",part(r)-part(l));//从0开始要特判
    }
}
```
