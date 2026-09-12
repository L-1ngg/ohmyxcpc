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

template <typename T> T disEx(Point<T> a, Point<T> b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}
template <typename T> ld dis(Point<T> a, Point<T> b) {
    return sqrt(disEx(a, b));
}
ld toDeg(ld x) {
    return x * 180 / PI;
}
ld toArc(ld x) {
    return PI / 180 * x;
}
Point<ld> rotate(Point<ld> a, Point<ld> b, ld rad) {

    ld x = (a.x - b.x) * cos(rad) - (a.y - b.y) * sin(rad) + b.x;
    ld y = (a.x - b.x) * sin(rad) + (a.y - b.y) * cos(rad) + b.y;
    return {x, y};
}
template <typename T> bool onLine(Point<T> a, Point<T> b, Point<T> c) {
    return sign(cross(b, a, c)) == 0;
}
template <typename T> bool onLine(Point<T> p, Line<T> l) {
    return onLine(p, l.a, l.b);
}
pair<Pd, ld> pointToCircle(Pd p, Pd o, ld r) {
    Pd U = o, V = o;
    ld d = dis(p, o);
    if (sign(d) == 0) {
        return {o, 0};
    }
    ld val1 = r * abs(o.x - p.x) / d;
    ld val2 = r * abs(o.y - p.y) / d * ((o.x - p.x) * (o.y - p.y) < 0 ? -1 : 1);
    U.x += val1, U.y += val2;
    V.x -= val1, V.y -= val2;
    if (dis(U, p) < dis(V, p)) {
        return {U, dis(U, p)};
    } else {
        return {V, dis(V, p)};
    }
}
tuple<int, Pd, Pd> circleIntersection(Pd p1, ld r1, Pd p2, ld r2) {
    ld x1 = p1.x, x2 = p2.x, y1 = p1.y, y2 = p2.y, d = dis(p1, p2);
    if (sign(abs(r1 - r2) - d) == 1) {
        return {0, {}, {}};
    } else if (sign(r1 + r2 - d) == -1) {
        return {1, {}, {}};
    }
    ld a = r1 * (x1 - x2) * 2, b = r1 * (y1 - y2) * 2, c = r2 * r2 - r1 * r1 - d * d;
    ld p = a * a + b * b, q = -a * c * 2, r = c * c - b * b;
    ld cosa, sina, cosb, sinb;
    if (sign(d - (r1 + r2)) == 0 || sign(d - abs(r1 - r2)) == 0) {
        cosa = -q / p / 2;
        sina = sqrt(1 - cosa * cosa);
        Point<ld> p0 = {x1 + r1 * cosa, y1 + r1 * sina};
        if (sign(dis(p0, p2) - r2)) {
            p0.y = y1 - r1 * sina;
        }
        return {2, p0, p0};
    } else {
        ld delta = sqrt(q * q - p * r * 4);
        cosa = (delta - q) / p / 2;
        cosb = (-delta - q) / p / 2;
        sina = sqrt(1 - cosa * cosa);
        sinb = sqrt(1 - cosb * cosb);
        Pd ans1 = {x1 + r1 * cosa, y1 + r1 * sina};
        Pd ans2 = {x1 + r1 * cosb, y1 + r1 * sinb};
        if (sign(dis(ans1, p2) - r2)) ans1.y = y1 - r1 * sina;
        if (sign(dis(ans2, p2) - r2)) ans2.y = y1 - r1 * sinb;
        if (ans1 == ans2) ans1.y = y1 - r1 * sina;
        return {3, ans1, ans2};
    }
}

template <class... A> int getPoint(A &&...);

// @book-begin
tuple<int, vector<Point<ld>>, vector<Point<ld>>> tangent(Point<ld> A, ld Ar, Point<ld> B, ld Br) {
    vector<Point<ld>> a, b;
    if (Ar < Br) {
        swap(Ar, Br);
        swap(A, B);
        swap(a, b);
    }
    ld d = disEx(A, B), dif = Ar - Br, sum = Ar + Br;
    if (d < dif * dif) {
        return {0, {}, {}};
    }
    ld base = atan2(B.y - A.y, B.x - A.x);
    if (d == 0 && Ar == Br) {
        return {-1, {}, {}};
    }
    if (d == dif * dif) {
        a.push_back(getPoint(A, Ar, base));
        b.push_back(getPoint(B, Br, base));
        return {1, a, b};
    }
    ld ang = acos(dif / sqrt(d));
    a.push_back(getPoint(A, Ar, base + ang));
    a.push_back(getPoint(A, Ar, base - ang));
    b.push_back(getPoint(B, Br, base + ang));
    b.push_back(getPoint(B, Br, base - ang));
    if (d == sum * sum) {
        a.push_back(getPoint(A, Ar, base));
        b.push_back(getPoint(B, Br, base + PI));
    } else if (d > sum * sum) {
        ang = acos(sum / sqrt(d));
        a.push_back(getPoint(A, Ar, base + ang));
        a.push_back(getPoint(A, Ar, base - ang));
        b.push_back(getPoint(B, Br, base + ang + PI));
        b.push_back(getPoint(B, Br, base - ang + PI));
    }
    return {a.size(), a, b};
}
// @book-end

int main() {
    return 0;
}
