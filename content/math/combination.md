---
title: 组合数
order: 100
---

# 组合数

## debug

提供一组测试数据：$\binom{132}{66}=$ 377'389'666'165'540'953'244'592'352'291'892'721'700，模数为 $998244353$ 时为 $241'200'029$；$10^9+7$ 时为 $598375978$。

## 逆元+卢卡斯定理（质数取模）

$\mathcal O(N)$ ，模数必须为质数。

```cpp
struct Comb {
    int n;
    vector<Z> _fac, _inv;

    Comb() : _fac{1}, _inv{0} {}
    Comb(int n) : Comb() {
        init(n);
    }
    void init(int m) {
        if (m <= n) return;
        _fac.resize(m + 1);
        _inv.resize(m + 1);
        for (int i = n + 1; i <= m; i++) {
            _fac[i] = _fac[i - 1] * i;
        }
        _inv[m] = _fac[m].inv();
        for (int i = m; i > n; i--) {
            _inv[i - 1] = _inv[i] * i;
        }
        n = m;
    }
    Z fac(int x) {
        if (x > n) init(x);
        return _fac[x];
    }
    Z inv(int x) {
        if (x > n) init(x);
        return _inv[x];
    }
    Z C(int x, int y) {
        if (x < 0 || y < 0 || x < y) return 0;
        return fac(x) * inv(y) * inv(x - y);
    }
    Z P(int x, int y) {
        if (x < 0 || y < 0 || x < y) return 0;
        return fac(x) * inv(x - y);
    }
} comb(1 << 21);
```

## 质因数分解

此法适用于：$1 \lt n, m, MOD \lt 10^7$ 的情况。

```cpp
int n,m,p,b[10000005],prime[1000005],t,min_prime[10000005];
void euler_Prime(int n){//用欧拉筛求出1~n中每个数的最小质因数的编号是多少，保存在min_prime中
    for(int i=2;i<=n;i++){
        if(b[i]==0){
            prime[++t]=i;
            min_prime[i]=t;
        }
        for(int j=1;j<=t&&i*prime[j]<=n;j++){
            b[prime[j]*i]=1;
            min_prime[prime[j]*i]=j;
            if(i%prime[j]==0) break;
        }
    }
}
long long c(int n,int m,int p){//计算C(n,m)%p的值
    euler_Prime(n);
    int a[t+5];//t代表1~n中质数的个数 ，a[i]代表编号为i的质数在答案中出现的次数
    for(int i=1;i<=t;i++) a[i]=0;//注意清0，一开始是随机数
    for(int i=n;i>=n-m+1;i--){//处理分子
        int x=i;
        while (x!=1){
            a[min_prime[x]]++;//注意min_prime中保存的是这个数的最小质因数的编号（1~t）
            x/=prime[min_prime[x]];
        }
    }
    for(int i=1;i<=m;i++){//处理分母
        int x=i;
        while (x!=1){
            a[min_prime[x]]--;
            x/=prime[min_prime[x]];
        }
    }
    long long ans=1;
    for(int i=1;i<=t;i++){//枚举质数的编号，看它出现了几次
        while(a[i]>0){
            ans=ans*prime[i]%p;
            a[i]--;
        }
    }
    return ans;
}
int main(){
    cin>>n>>m;
    m=min(m,n-m);//小优化
    cout<<c(n,m,MOD);
}
```

## 杨辉三角（精确计算）

$60$ 以内 `long long` 可解，$130$ 以内 `__int128` 可解。

```cpp
vector C(n + 1, vector<int>(n + 1));
C[0][0] = 1;
for (int i = 1; i <= n; i++) {
    C[i][0] = 1;
    for (int j = 1; j <= n; j++) {
        C[i][j] = C[i - 1][j] + C[i - 1][j - 1];
    }
}
cout << C[n][m] << endl;
```
