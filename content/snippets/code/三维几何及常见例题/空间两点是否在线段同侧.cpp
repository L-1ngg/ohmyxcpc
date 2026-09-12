#include <bits/stdc++.h>
using namespace std;

using ld = long double;
using u64 = unsigned long long;
const int MOD = 998244353;
const int mod = 1000000007;
const int N = 1000005;
const int M = 2000005;
const double eps = 1e-8;
const double PI = acos(-1.0);

struct Point3 {
    ld x, y, z;
    Point3(ld x_ = 0, ld y_ = 0, ld z_ = 0) : x(x_), y(y_), z(z_) {}
    Point3 &operator+=(Point3 p) & { return x += p.x, y += p.y, z += p.z, *this; }
    Point3 &operator-=(Point3 p) & { return x -= p.x, y -= p.y, z -= p.z, *this; }
    Point3 &operator*=(Point3 p) & { return x *= p.x, y *= p.y, z *= p.z, *this; }
    Point3 &operator*=(ld t) & { return x *= t, y *= t, z *= t, *this; }
    Point3 &operator/=(ld t) & { return x /= t, y /= t, z /= t, *this; }
    friend Point3 operator+(Point3 a, Point3 b) { return a += b; }
    friend Point3 operator-(Point3 a, Point3 b) { return a -= b; }
    friend Point3 operator*(Point3 a, Point3 b) { return a *= b; }
    friend Point3 operator*(Point3 a, ld b) { return a *= b; }
    friend Point3 operator*(ld a, Point3 b) { return b *= a; }
    friend Point3 operator/(Point3 a, ld b) { return a /= b; }
    friend auto &operator>>(istream &is, Point3 &p) { return is >> p.x >> p.y >> p.z; }
    friend auto &operator<<(ostream &os, Point3 p) {
        return os << "(" << p.x << ", " << p.y << ", " << p.z << ")";
    }
};
struct Line3 {
    Point3 a, b;
};
struct Plane {
    Point3 u, v, w;
};
using P3 = Point3;
using L3 = Line3;
ld len(P3 p) {
    return sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
}
P3 crossEx(P3 a, P3 b) {
    P3 ans;
    ans.x = a.y * b.z - a.z * b.y;
    ans.y = a.z * b.x - a.x * b.z;
    ans.z = a.x * b.y - a.y * b.x;
    return ans;
}
ld cross(P3 a, P3 b) {
    return len(crossEx(a, b));
}
ld dot(P3 a, P3 b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
P3 getVec(Plane s) {
    return crossEx(s.u - s.v, s.v - s.w);
}
ld dis(P3 a, P3 b) {
    ld val = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z);
    return sqrt(val);
}
P3 standardize(P3 vec) {
    return vec / len(vec);
}

template <class... A> int onPlane(A &&...);
template <class... A> int sign(A &&...);

// @book-begin
bool pointOnSegmentSide(P3 p1, P3 p2, L3 l) {
    if (!onPlane(p1, p2, l.a, l.b)) {
        return 0;
    }
    ld val = dot(crossEx(l.a - l.b, p1 - l.b), crossEx(l.a - l.b, p2 - l.b));
    return sign(val) == 1;
}
// @book-end

int main() {
    return 0;
}
