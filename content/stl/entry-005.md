---
title: "全排列 next/prev_permutation"
order: 50
---

# 全排列 next/prev\_permutation {#s-9023455a33dc}

  在提及 `next_permutation` 时，我们先补充几点字典序相关的知识。

> 对于三个字符所组成的序列`{a,b,c}`，其按照字典序的 6 种排列分别为： `{abc}`，`{acb}`，`{bac}`，`{bca}`，`{cab}`，`{cba}` 其排序原理是：先固定 `a` (序列内最小元素)，再对之后的元素排列。而 `b` \< `c` ，所以 `abc` \< `acb` 。同理，先固定 `b` (序列内次小元素)，再对之后的元素排列。即可得出以上序列。

`next_permutation` 算法，即是按照**字典序顺序**输出的全排列；相对应的，`prev_permutation` 则是按照**逆字典序顺序**输出的全排列。可以是数字，亦可以是其他类型元素。其直接在序列上进行更新，故直接输出序列即可。

<<< @/snippets/code/STL与库函数/全排列-nextprev_permutation.cpp
