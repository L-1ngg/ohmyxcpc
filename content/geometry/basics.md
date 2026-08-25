---
title: 平面几何必要初始化
order: 3
---

# 平面几何必要初始化

## 字符串读入浮点数

```cpp
const int Knum = 4;
int read(int k = Knum) {
    string s;
    cin >> s;

    int num = 0;
    int it = s.find('.');
    if (it != -1) { // 存在小数点
        num = s.size() - it - 1; // 计算小数位数
        s.erase(s.begin() + it); // 删除小数点
    }
    for (int i = 1; i <= k - num; i++) { // 补全小数位数
        s += '0';
    }
    return stoi(s);
}
```

## 预置函数

```cpp
using ld = long double;
const ld PI = acos(-1);
const ld EPS = 1e-7;
const ld INF = numeric_limits<ld>::max();
#define cc(x) cout << fixed << setprecision(x);

ld fgcd(ld x, ld y) { // 实数域gcd
    return abs(y) < EPS ? abs(x) : fgcd(y, fmod(x, y));
}
template<typename T, typename S>
bool equal(T x, S y) {
    return -EPS < x - y && x - y < EPS;
}
template<typename T>
int sign(T x) {
    if (-EPS < x && x < EPS) return 0;
    return x < 0 ? -1 : 1;
}
```

## 点线封装

```cpp
template<typename T>
struct Point {  // 在C++17下使用emplace_back绑定可能会导致CE！
    T x, y;
    Point(T x_ = 0, T y_ = 0) : x(x_), y(y_) {}

    template<typename U>
    operator Point<U>() {  // 自动类型匹配
        return Point<U>(U(x), U(y));
    }

    Point operator-() const { return {-x, -y}; }
    Point operator+(const Point &b) const { return {x + b.x, y + b.y}; }
    Point operator-(const Point &b) const { return {x - b.x, y - b.y}; }

    Point operator+(const T &b) const { return {x + b, y + b}; }
    Point operator-(const T &b) const { return {x - b, y - b}; }
    Point operator*(const T &b) const { return {x * b, y * b}; }
    Point operator/(const T &b) const { return {x / b, y / b}; }

    T operator*(const Point &b) const { return x * b.x + y * b.y; }  // 点积
    T operator^(const Point &b) const { return x * b.y - y * b.x; }  // 叉积

    Point &operator+=(const Point &p) { x += p.x; y += p.y; return *this; }
    Point &operator-=(const Point &p) { x -= p.x; y -= p.y; return *this; }

    Point &operator+=(const T t) { x += t; y += t; return *this; }
    Point &operator-=(const T t) { x -= t; y -= t; return *this; }
    Point &operator*=(const T t) { x *= t; y *= t; return *this; }
    Point &operator/=(const T t) { x /= t; y /= t; return *this; }

    bool operator<(const Point &b) const {
        return equal(x, b.x) ? y < b.y - EPS : x < b.x - EPS;
    }
    bool operator>(const Point &b) const { return b < *this; }
    bool operator==(const Point &b) const { return !(b < *this) && !(*this < b); }
    bool operator!=(const Point &b) const { return *this < b || b < *this; }

    friend istream &operator>>(istream &is, Point &p) {
        return is >> p.x >> p.y;
    }
    friend ostream &operator<<(ostream &os, const Point &p) {
        return os << format("({},{})", p.x, p.y);     // C++20
        return os << '(' << p.x << ',' << p.y << ')'; // C++17
    }
};

template<typename T>
struct Line {
    Point<T> a, b;
    Line(Point<T> a_ = Point<T>(), Point<T> b_ = Point<T>()) : a(a_), b(b_) {}
    template<typename U>
    operator Line<U>() {  // 自动类型匹配
        return Line<U>(Point<U>(a), Point<U>(b));
    }
    friend ostream &operator<<(ostream &os, const Line &l) {
        return os << '<' << l.a << ',' << l.b << '>';
    }
};
```

## 叉乘

定义公式 $a\times b=|a||b|\sin \theta$。

```cpp
template<typename T>  // 叉乘
T cross(Point<T> a, Point<T> b) { return a.x * b.y - a.y * b.x; }
template<typename T>  // 叉乘 (p1 - p0) x (p2 - p0);
T cross(Point<T> p1, Point<T> p2, Point<T> p0) { return cross(p1 - p0, p2 - p0); }
```

## 点乘

定义公式 $a\times b=|a||b|\cos \theta$。

```cpp
template<typename T>  // 点乘
T dot(Point<T> a, Point<T> b) { return a.x * b.x + a.y * b.y; }
template<typename T>  // 点乘 (p1 - p0) * (p2 - p0);
T dot(Point<T> p1, Point<T> p2, Point<T> p0) { return dot(p1 - p0, p2 - p0); }
```

## 欧几里得距离公式

最常用的距离公式。**需要注意**，开根号会丢失精度，如无强制要求，先不要开根号，留到最后一步一起开。

```cpp
// Use with caution! This might not be the correct implementation of disEx as described below
template<typename T>
T disEx(Point<T> a, Point<T> b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}
template<typename T>
ld dis(Point<T> a, Point<T> b) {
    return sqrt(disEx(a, b));
}
```

## 曼哈顿距离公式

```cpp
template<typename T> T dis1(Point<T> p1, Point<T> p2) { // 曼哈顿距离公式
    return abs(p1.x - p2.x) + abs(p1.y - p2.y);
}
```

## 将向量转换为单位向量

```cpp
Point<ld> standardize(Point<ld> vec) { // 转换为单位向量
    return vec / sqrt(vec.x * vec.x + vec.y * vec.y);
}
```

## 向量旋转

将当前向量移动至原点后顺时针旋转 $90^{\circ}$ ，即获取垂直于当前向量的、起点为原点的向量。在计算垂线时非常有用。例如，要想获取点 $a$ 绕点 $o$ 顺时针旋转 $90^{\circ}$ 后的点，可以这样书写代码：`auto ans = o + rotate(o, a);` ；如果是逆时针旋转，那么只需更改符号即可：`auto ans = o - rotate(o, a);` 。

```cpp
template<typename T> Point<T> rotate(Point<T> p1, Point<T> p2) { // 旋转
    Point<T> vec = p1 - p2;
    return {-vec.y, vec.x};
}
```
