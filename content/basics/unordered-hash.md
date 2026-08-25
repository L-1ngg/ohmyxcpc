---
title: 哈希系列 unordered
order: 15
---

# 哈希系列 unordered

通常指代 unordered_map、unordered_set、unordered_multimap、unordered_multiset，与原版相比不进行排序。

如果将不支持哈希的类型作为 `key` 值代入，编译器就无法正常运行，这时需要我们为其手写哈希函数。而我们写的这个哈希函数的正确性其实并不是特别重要（但是不可以没有），当发生冲突时编译器会调用 `key` 的 `operator ==` 函数进行进一步判断。[参考](https://finixlei.blog.csdn.net/article/details/110267430?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-110267430-blog-101406104.topnsimilarv1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3-110267430-blog-101406104.topnsimilarv1&utm_relevant_index=4)

## 对 pair、tuple 定义哈希

```cpp
struct hash_pair {
    template<typename T1, typename T2>
    size_t operator()(const std::pair<T1, T2> &p) const
    {
        return std::hash<T1>()(p.first) ^ std::hash<T2>()(p.second);
    }
};
std::unordered_set<std::pair<int, int>, int, hash_pair> S;
std::unordered_map<std::tuple<int, int, int>, int, hash_pair> M;
```

## 对结构体定义哈希

需要两个条件，一个是在结构体中重载等于号（区别于非哈希容器需要重载小于号，如上所述，当冲突时编译器需要根据重载的等于号判断），第二是写一个哈希函数。注意 `hash<>()` 的尖括号中的类型匹配。

```cpp
struct fff {
    std::string x, y;
    int z;
    friend bool operator==(const fff &a, const fff &b)
    {
        return a.x == b.x || a.y == b.y || a.z == b.z;
    }
};
struct hash_fff {
    size_t operator()(const fff &p) const
    {
        return std::hash<std::string>()(p.x) ^ std::hash<std::string>()(p.y) ^ std::hash<int>()(p.z);
    }
};
std::unordered_map<fff, int, hash_fff> mp;
```

## 对 vector 定义哈希

以下两个方法均可。注意 `hash<>()` 的尖括号中的类型匹配。

```cpp
struct hash_vector {
    size_t operator()(const std::vector<int> &p) const
    {
        size_t seed = 0;
        for (auto it : p) {
            seed ^= std::hash<int>()(it);
        }
        return seed;
    }
};
std::unordered_map<std::vector<int>, int, hash_vector> mp;
```

```cpp
namespace std {
    template<> struct hash<vector<int>> {
        size_t operator()(const vector<int> &p) const
        {
            size_t seed = 0;
            for (int i : p) {
                seed ^= hash<int>()(i) + 0x9e3779b9 + (seed << 6) + (seed >> 2);
            }
            return seed;
        }
    };
}
std::unordered_set<std::vector<int>> S;
```
