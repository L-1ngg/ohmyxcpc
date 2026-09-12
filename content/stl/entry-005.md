---
title: "全排列 next/prev_permutation"
order: 50
---

# 全排列 next/prev\_permutation {#s-9023455a33dc}

原地将序列变为字典序下一排列或上一排列，返回是否成功；到达末端时重排为相反端的排列并返回 `false`。完整枚举从升序开始，单次变换最坏为 $O(n)$。

> 对于三个字符所组成的序列`{a,b,c}`，其按照字典序的 6 种排列分别为： `{abc}`，`{acb}`，`{bac}`，`{bca}`，`{cab}`，`{cba}` 其排序原理是：先固定 `a` (序列内最小元素)，再对之后的元素排列。而 `b` \< `c` ，所以 `abc` \< `acb` 。同理，先固定 `b` (序列内次小元素)，再对之后的元素排列。即可得出以上序列。

`next_permutation` 算法，即是按照**字典序顺序**输出的全排列；相对应的，`prev_permutation` 则是按照**逆字典序顺序**输出的全排列。可以是数字，亦可以是其他类型元素。其直接在序列上进行更新，故直接输出序列即可。

**枚举：** 从升序排列开始，使用 `do ... while (next_permutation(...))` 才能包含初始排列并枚举全部不同排列。

<<< @/snippets/code/STL与库函数/全排列-nextprev_permutation.cpp
