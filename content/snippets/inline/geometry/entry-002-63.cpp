using Real = int;  // 整点；需要更大范围改 long long
using Point = complex<Real>;

Real cross(const Point &a, const Point &b) {
    return (conj(a) * b).imag();
}
Real dot(const Point &a, const Point &b) {
    return (conj(a) * b).real();
}

// 下面按 Point.x/.y 写，与上面 complex 版不能同时存在
Real cross(const Point &a, const Point &b) {
    return a.x * b.y - a.y * b.x;
} 
Real dot(const Point &a, const Point &b) {
    return a.x * b.x + a.y * b.y;
}
