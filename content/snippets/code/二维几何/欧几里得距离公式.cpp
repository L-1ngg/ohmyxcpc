#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;

const int Knum = 4;
int read(int k = Knum) {
    string s;
    cin >> s;

    int num = 0;
    int it = s.find('.');
    if (it != -1) {
        num = s.size() - it - 1;
        s.erase(s.begin() + it);
    }
    for (int i = 1; i <= k - num; i++) {
        s += '0';
    }
    return stoi(s);
}
using ld = long double;
const ld PI = acos(-1);
const ld EPS = 1e-7;
const ld INF = numeric_limits<ld>::max();
#define cc(x) cout << fixed << setprecision(x);

ld fgcd(ld x, ld y) {
    return abs(y) < EPS ? abs(x) : fgcd(y, fmod(x, y));
}
template <typename T, typename S> bool equal(T x, S y) {
    return -EPS < x - y && x - y < EPS;
}
template <typename T> int sign(T x) {
    if (-EPS < x && x < EPS) return 0;
    return x < 0 ? -1 : 1;
}
template <typename T> struct Point {
    T x, y;
    Point(T x_ = 0, T y_ = 0) : x(x_), y(y_) {}

    template <typename U> operator Point<U>() { return Point<U>(U(x), U(y)); }

    Point operator-() const { return {-x, -y}; }
    Point operator+(const Point &b) const { return {x + b.x, y + b.y}; }
    Point operator-(const Point &b) const { return {x - b.x, y - b.y}; }

    Point operator+(const T &b) const { return {x + b, y + b}; }
    Point operator-(const T &b) const { return {x - b, y - b}; }
    Point operator*(const T &b) const { return {x * b, y * b}; }
    Point operator/(const T &b) const { return {x / b, y / b}; }

    T operator*(const Point &b) const { return x * b.x + y * b.y; }
    T operator^(const Point &b) const { return x * b.y - y * b.x; }

    Point &operator+=(const Point &p) {
        x += p.x;
        y += p.y;
        return *this;
    }
    Point &operator-=(const Point &p) {
        x -= p.x;
        y -= p.y;
        return *this;
    }

    Point &operator+=(const T t) {
        x += t;
        y += t;
        return *this;
    }
    Point &operator-=(const T t) {
        x -= t;
        y -= t;
        return *this;
    }
    Point &operator*=(const T t) {
        x *= t;
        y *= t;
        return *this;
    }
    Point &operator/=(const T t) {
        x /= t;
        y /= t;
        return *this;
    }

    bool operator<(const Point &b) const { return equal(x, b.x) ? y < b.y - EPS : x < b.x - EPS; }
    bool operator>(const Point &b) const { return b < *this; }
    bool operator==(const Point &b) const { return !(b < *this) && !(*this < b); }
    bool operator!=(const Point &b) const { return *this < b || b < *this; }

    friend istream &operator>>(istream &is, Point &p) { return is >> p.x >> p.y; }
    friend ostream &operator<<(ostream &os, const Point &p) {
        return os << format("({},{})", p.x, p.y);
        return os << '(' << p.x << ',' << p.y << ')';
    }
};

template <typename T> struct Line {
    Point<T> a, b;
    Line(Point<T> a_ = Point<T>(), Point<T> b_ = Point<T>()) : a(a_), b(b_) {}
    template <typename U> operator Line<U>() { return Line<U>(Point<U>(a), Point<U>(b)); }
    friend ostream &operator<<(ostream &os, const Line &l) {
        return os << '<' << l.a << ',' << l.b << '>';
    }
};
using Pd = Point<ld>;
using Ld = Line<ld>;
using Pi = Point<int>;

// @book-begin
template <typename T> T disEx(Point<T> a, Point<T> b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}
template <typename T> ld dis(Point<T> a, Point<T> b) {
    return sqrt(disEx(a, b));
}
// @book-end

int main() {
    return 0;
}
