---
title: 日期换算（基姆拉尔森公式）
order: 12
---

# 日期换算（基姆拉尔森公式）

已知年月日，求星期数。

```cpp
int week(int y,int m,int d){
    if(m<=2)m+=12,y--;
    return (d+2*m+3*(m+1)/5+y+y/4-y/100+y/400)%7+1;
}
```
