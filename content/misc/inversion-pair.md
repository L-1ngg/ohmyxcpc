---
title: 逆序对
order: 100
---

# 逆序对（归并排序解）

> 性质：交换序列的任意两元素，序列的逆序数的奇偶性必定发生改变。

```cpp
LL a[N], tmp[N], n, ans = 0;
void mergeSort(LL l, LL r){
    if (l >= r) return;
    LL mid = (l + r) >> 1, i = l, j = mid + 1, cnt = 0;
    mergeSort(l, mid);
    mergeSort(mid + 1, r);
    while (i <= mid || j <= r)
        if (j > r || (i <= mid && a[i] <= a[j]))
            tmp[cnt++] = a[i++];
        else
            tmp[cnt++] = a[j++], ans += mid - i + 1;
    for (LL k = 0; k < r - l + 1; k++)
        a[l + k] = tmp[k];
}
int main(){
    cin >> n;
    for (int i = 1; i <= n; i++)
        scanf("%lld", &a[i]);
    mergeSort(1, n);
    cout << ans << "\n";
    return 0;
}
```
