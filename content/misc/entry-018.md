---
title: "手工哈希"
order: 180
---

# 手工哈希 {#s-a16d7193f219}

  给 `unordered_map` 用的整数/ pair 哈希。SplitMix64 搅匀再 xor 时间种子，减轻被卡。自定义 `unordered_map<K,V,myhash>`。

<<< @/snippets/code/杂项/手工哈希.cpp
