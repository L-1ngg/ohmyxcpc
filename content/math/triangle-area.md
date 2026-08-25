---
title: 三角形面积
order: 301
---

# 三角形面积

## 行列式求面积

$$
S=\frac{1}{2}\begin{vmatrix}1&1&1\\x_{1}&x_{2}&x_{3}\\y_{1}&y_2&y_3 \end{vmatrix}
$$

```cpp
int main(){
    float num[6];
    for(int i = 0; i < 6; i++)
        cin >> num[i];
    float sum = 0.0;
    sum = 0.5*(num[0]*num[3]+num[2]*num[5]+num[4]*num[1]-num[0]*num[5]-num[2]*num[1]-num[4]*num[3]);
    cout << "三角形的面积为: ";
    sum == 0 ? cout << "Impossible" : cout <<sum;
    return 0;
}
```

## 海伦公式

$$
S = \frac{1}{4}\sqrt{(a+b+c)(a+b-c)(a+c-b)(b+c-a)}
$$

```cpp
p=(a+b+c)/2;
sum=sqrt(p*(p-a)*(p-b)*(p-c));
```
