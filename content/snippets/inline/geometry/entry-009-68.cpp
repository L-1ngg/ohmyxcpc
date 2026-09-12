#include <bits/stdc++.h>

#define endl '\n'
#define append push_back
#define pop pop_back
#define list vector

using namespace std;

using i64 = long long;
typedef unsigned long long ull;
typedef pair<int, int> pii;
typedef pair<i64, i64> pll;
const int N = 2e5 + 5, inf = 0x3f3f3f3f, MOD = 998244353, mod = 1e9 + 7;
const i64 llinf = 0x3f3f3f3f3f3f3f3f;

typedef double db;
const db EPS = 1e-9;

inline int sign(db a) {
    return a < -EPS ? -1 : a > EPS;
}

inline int cmp(db a, db b) {
    return sign(a - b);
}

struct P {
    db x, y;

    P() {}

    P(db _x, db _y) : x(_x), y(_y) {}

    P operator+(P p) { return {x + p.x, y + p.y}; }

    P operator-(P p) { return {x - p.x, y - p.y}; }

    P operator*(db d) { return {x * d, y * d}; }

    P operator/(db d) { return {x / d, y / d}; }

    bool operator<(P p) const {
        int c = cmp(x, p.x);
        if (c) return c == -1;
        return cmp(y, p.y) == -1;
    }

    bool operator==(P o) const { return cmp(x, o.x) == 0 && cmp(y, o.y) == 0; }

    db dot(P p) { return x * p.x + y * p.y; }

    db det(P p) { return x * p.y - y * p.x; }

    db disTo(P p) { return (*this - p).abs(); }
    db disTo2(P p) { return (*this - p).abs2(); }
    db alpha() { return atan2(y, x); }
    void readint() {
        int x_, y_;
        cin >> x_ >> y_;
        x = x_, y = y_;
    }
    void readdb() { cin >> x >> y; }

    void write() { cout << "(" << x << ", " << y << ")" << endl; }
    db abs() { return sqrt(abs2()); }
    db abs2() { return x * x + y * y; }
    P rot90() { return P(-y, x); }
    int quad() const { return sign(y) == 1 || (sign(y) == 0 && sign(x) >= 0); }
    P unit() { return *this / abs(); }

    P rot(db an) { return {x * cos(an) - y * sin(an), x * sin(an) + y * cos(an)}; }
};

#define cross(p1, p2, p3) ((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y))
#define crossOp(p1, p2, p3) sign(cross(p1, p2, p3))

int cmp2(P A, P B) {
    return A.det(B) > 0 || (A.det(B) == 0 && A.abs2() < B.abs2());
}

bool chkLL(P p1, P p2, P q1, P q2) {

    db a1 = cross(q1, q2, p1);
    db a2 = -cross(q1, q2, p2);
    return sign(a1 + a2) != 0;
}

P isLL(P p1, P p2, P q1, P q2) {

    db a1 = cross(q1, q2, p1);
    db a2 = -cross(q1, q2, p2);
    return (p1 * a2 + p2 * a1) / (a1 + a2);
}

bool intersect(db l1, db r1, db l2, db r2) {

    if (l1 > r1) swap(l1, r1);
    if (l2 > r2) swap(l2, r2);
    return !(cmp(r1, l2) == -1 || cmp(r2, l1) == -1);
}

bool isSS(P p1, P p2, P q1, P q2) {

    return intersect(p1.x, p2.x, q1.x, q2.x) && intersect(p1.y, p2.y, q1.y, q2.y) &&
           crossOp(p1, p2, q1) * crossOp(p1, p2, q2) <= 0 &&
           crossOp(q1, q2, p1) * crossOp(q1, q2, p2) <= 0;
}

bool isSS_strict(P p1, P p2, P q1, P q2) {

    return crossOp(p1, p2, q1) * crossOp(p1, p2, q2) < 0 &&
           crossOp(q1, q2, p1) * crossOp(q1, q2, p2) < 0;
}

bool isMiddle(db a, db b, db m) {

    if (a > b) swap(a, b);
    return cmp(a, m) <= 0 && cmp(m, b) <= 0;
}

bool isMiddle(P a, P b, P m) {

    return isMiddle(a.x, b.x, m.x) && isMiddle(a.y, b.y, m.y);
}

bool onSeg(P p1, P p2, P q) {

    return crossOp(p1, p2, q) == 0 && isMiddle(p1, p2, q);
}

bool onSeg_strict(P p1, P p2, P q) {

    return crossOp(p1, p2, q) == 0 && sign((q - p1).dot(p1 - p2)) * sign((q - p2).dot(p1 - p2)) < 0;
}

P proj(P p1, P p2, P q) {

    if (p1 == p2) return p1;
    P dir = p2 - p1;
    return p1 + dir * (dir.dot(q - p1) / dir.abs2());
}

P reflect(P p1, P p2, P q) {

    return proj(p1, p2, q) * 2 - q;
}

db nearest(P p1, P p2, P q) {

    if (p1 == p2) return p1.disTo(q);
    P h = proj(p1, p2, q);
    if (isMiddle(p1, p2, h)) return q.disTo(h);
    return min(p1.disTo(q), p2.disTo(q));
}

db disSS(P p1, P p2, P q1, P q2) {

    if (isSS(p1, p2, q1, q2)) return 0;
    return min(min(nearest(p1, p2, q1), nearest(p1, p2, q2)),
               min(nearest(q1, q2, p1), nearest(q1, q2, p2)));
}

bool cmp1(P a, const P &b) {
    int qa = a.quad(), qb = b.quad();
    if (qa != qb) return qa < qb;
    return sign(a.det(b)) > 0;
}

int type(P o1, db r1, P o2, db r2) {

    db d = o1.disTo(o2);
    if (cmp(d, r1 + r2) == 1) return 4;
    if (cmp(d, r1 + r2) == 0) return 3;
    if (cmp(d, abs(r1 - r2)) == 1) return 2;
    if (cmp(d, abs(r1 - r2)) == 0) return 1;
    return 0;
}

vector<P> isCL(P o, db r, P p1, P p2) {

    if (cmp(abs((o - p1).det(p2 - p1) / p1.disTo(p2)), r) > 0) return {};
    db x = (p1 - o).dot(p2 - p1), y = (p2 - p1).abs2(), d = x * x - y * ((p1 - o).abs2() - r * r);
    d = max(d, (db)0.0);
    P m = p1 - (p2 - p1) * (x / y), dr = (p2 - p1) * (sqrt(d) / y);
    return {m - dr, m + dr};
}

vector<P> isCC(P o1, db r1, P o2, db r2) {

    db d = o1.disTo(o2);
    if (cmp(d, r1 + r2) == 1) return {};
    if (cmp(d, abs(r1 - r2)) == -1) return {};
    d = min(d, r1 + r2);
    db y = (r1 * r1 + d * d - r2 * r2) / (2 * d), x = sqrt(r1 * r1 - y * y);
    P dr = (o2 - o1).unit();
    P q1 = o1 + dr * y, q2 = dr.rot90() * x;
    return {q1 - q2, q1 + q2};
}

vector<pair<P, P>> tancCC(P o1, db r1, P o2, db r2) {

    P d = o2 - o1;
    db dr = r1 - r2, d2 = d.abs2(), h2 = d2 - dr * dr;
    if (sign(d2) == 0 || sign(h2) < 0) return {};
    h2 = max((db)0.0, h2);
    vector<pair<P, P>> ret;
    for (db sign : {-1, 1}) {
        P v = (d * dr + d.rot90() * sqrt(h2) * sign) / d2;
        ret.push_back({o1 + v * r1, o2 + v * r2});
    }
    if (sign(h2) == 0) ret.pop_back();
    return ret;
}

db rad(P p1, P p2) {

    return atan2l(p1.det(p2), p1.dot(p2));
}

db areaCT(P o, db r, P p1, P p2) {

    p1 = p1 - o;
    p2 = p2 - o;
    vector<P> is = isCL(P(0, 0), r, p1, p2);
    if (is.empty()) return r * r * rad(p1, p2) / 2;
    bool b1 = cmp(p1.abs2(), r * r) == 1, b2 = cmp(p2.abs2(), r * r) == 1;
    if (b1 && b2) {
        P md = (is[0] + is[1]) / 2;
        if (sign((p1 - md).dot(p2 - md)) <= 0)
            return r * r * (rad(p1, is[0]) + rad(is[1], p2)) / 2 + is[0].det(is[1]) / 2;
        else
            return r * r * rad(p1, p2) / 2;
    }
    if (b1) return (r * r * rad(p1, is[0]) + is[0].det(p2)) / 2;
    if (b2) return (p1.det(is[1]) + r * r * rad(is[1], p2)) / 2;
    return p1.det(p2) / 2;
}

P inCenter(P A, P B, P C) {

    double a = (B - C).abs(), b = (C - A).abs(), c = (A - B).abs();
    return (A * a + B * b + C * c) / (a + b + c);
}

P circumCenter(P a, P b, P c) {

    P bb = b - a, cc = c - a;
    double db = bb.abs2(), dc = cc.abs2(), d = 2 * bb.det(cc);
    return a - P(bb.y * dc - cc.y * db, cc.x * db - bb.x * dc) / d;
}

P othroCenter(P a, P b, P c) {

    P ba = b - a, ca = c - a, bc = b - c;
    double Y = ba.y * ca.y * bc.y, A = ca.x * ba.y - ba.x * ca.y,
           x0 = (Y + ca.x * ba.y * b.x - ba.x * ca.y * c.x) / A,
           y0 = -ba.x * (x0 - c.x) / ba.y + ca.y;
    return {x0, y0};
}

pair<P, db> min_circle(vector<P> ps) {

    random_shuffle(ps.begin(), ps.end());
    int n = ps.size();
    P o = ps[0];
    db r = 0;
    for (int i = 1; i < n; ++i) {
        if (o.disTo(ps[i]) > r + EPS) o = ps[i], r = 0;
        for (int j = 0; j < i; ++j)
            if (o.disTo(ps[j]) > r + EPS) {
                o = (ps[i] + ps[j]) / 2;
                r = o.disTo(ps[i]);
                for (int k = 0; k < j; ++k)
                    if (o.disTo(ps[k]) > r + EPS) {
                        o = circumCenter(ps[i], ps[j], ps[k]);
                        r = o.disTo(ps[i]);
                    }
            }
    }
    return {o, r};
}

db area(vector<P> ps) {

    db ret = 0;
    int n = ps.size();
    for (int i = 0; i < ps.size(); ++i) {
        ret += ps[i].det(ps[(i + 1) % n]);
    }
    return ret / 2;
}

int containP(const vector<P> &ps, P p) {

    int n = ps.size(), ret = 0;
    for (int i = 0; i < n; ++i) {
        P u = ps[i], v = ps[(i + 1) % n];
        if (onSeg(u, v, p)) return 1;
        if (cmp(u.y, v.y) <= 0) swap(u, v);
        if (cmp(p.y, u.y) > 0 || cmp(p.y, v.y) <= 0) continue;
        ret ^= crossOp(p, u, v) > 0;
    }
    return ret * 2;
}

vector<P> convexHull(vector<P> ps) {

    int n = ps.size();
    if (n <= 1) return ps;
    sort(ps.begin(), ps.end());
    vector<P> qs(n * 2);
    int k = 0;
    for (int i = 0; i < n; qs[k++] = ps[i++]) {
        while (k > 1 && crossOp(qs[k - 2], qs[k - 1], ps[i]) <= 0)
            --k;
    }
    for (int i = n - 2, t = k; i >= 0; qs[k++] = ps[i--]) {
        while (k > t && crossOp(qs[k - 2], qs[k - 1], ps[i]) <= 0)
            --k;
    }
    qs.resize(k - 1);
    return qs;
}

vector<P> convexHullnonstrict(vector<P> ps) {

    int n = ps.size();
    if (n <= 1) return ps;
    sort(ps.begin(), ps.end());
    vector<P> qs(n * 2);
    int k = 0;
    for (int i = 0; i < n; qs[k++] = ps[i++]) {
        while (k > 1 && crossOp(qs[k - 2], qs[k - 1], ps[i]) <= 0)
            --k;
    }
    for (int i = n - 2, t = k; i >= 0; qs[k++] = ps[i--]) {
        while (k > t && crossOp(qs[k - 2], qs[k - 1], ps[i]) <= 0)
            --k;
    }
    qs.resize(k - 1);
    return qs;
}

db convexDiamter(vector<P> ps) {

    int n = ps.size();
    if (n <= 1) return 0;
    int is = 0;
    int js = 0;
    for (int k = 1; k < n; ++k) {
        is = ps[k] < ps[is] ? k : is, js = ps[js] < ps[k] ? k : js;
    }
    int i = is, j = js;
    db ret = ps[i].disTo(ps[j]);
    do {
        if ((ps[(i + 1) % n] - ps[i]).det(ps[(j + 1) % n] - ps[j]) >= 0)
            (++j) %= n;
        else
            (++i) %= n;
        ret = max(ret, ps[i].disTo(ps[j]));
    } while (i != is || j != js);
    return ret;
}

vector<P> convexCut(const vector<P> &ps, P q1, P q2) {

    vector<P> qs;
    int n = ps.size();
    for (int i = 0; i < n; ++i) {
        P p1 = ps[i], p2 = ps[(i + 1) % n];
        int d1 = crossOp(q1, q2, p1), d2 = crossOp(q1, q2, p2);
        if (d1 >= 0) qs.push_back(p1);
        if (d1 * d2 < 0) qs.push_back(isLL(p1, p2, q1, q2));
    }
    return qs;
}

vector<P> isLD(const vector<P> &ps, P q1, P q2) {

    int n = ps.size();
    vector<P> qs;
    for (int i = 0; i < n; ++i) {
        if (crossOp(q1, q2, ps[i]) == 0) qs.push_back(ps[i]);
        if (crossOp(q1, q2, ps[i]) * crossOp(q1, q2, ps[(i + 1) % n]) < 0)
            qs.push_back(isLL(q1, q2, ps[i], ps[(i + 1) % n]));
    }
    sort(qs.begin(), qs.end());
    qs.erase(unique(qs.begin(), qs.end()), qs.end());
    return qs;
}

vector<P> isSD(const vector<P> &ps, P q1, P q2) {

    int n = ps.size();
    vector<P> qs;
    qs.push_back(q1);
    qs.push_back(q2);
    for (int i = 0; i < n; ++i) {
        if (crossOp(q1, q2, ps[i]) == 0) qs.push_back(ps[i]);
        if (crossOp(q1, q2, ps[i]) * crossOp(q1, q2, ps[(i + 1) % n]) < 0)
            qs.push_back(isLL(q1, q2, ps[i], ps[(i + 1) % n]));
    }
    sort(qs.begin(), qs.end());
    qs.erase(unique(qs.begin(), qs.end()), qs.end());
    int s = -1, t = -1;
    for (int i = 0; i < n; ++i) {
        if (q1 == qs[i]) s = i;
        if (q2 == qs[i]) t = i;
    }
    if (s > t) swap(s, t);
    vector<P> ks;
    for (int i = s; i < t; ++i) {
        ks.push_back(qs[i]);
    }
    return ks;
}

bool containSeg(vector<P> ps, P p1, P p2) {

    vector<P> qs = isSD(ps, p1, p2);
    int n = qs.size();
    for (int i = 0; i < n - 1; ++i) {
        P m = (qs[i] + qs[i + 1]) / 2;
        if (containP(qs, m) == 0) return false;
    }
    return true;
}

vector<P> Minkowski(vector<P> A, vector<P> B) {
    vector<P> C(A.size() + B.size() + 1), v1(A.size()), v2(B.size());
    for (int i = 0; i < (int)A.size(); i++)
        v1[i] = A[(i + 1) % A.size()] - A[i];
    for (int i = 0; i < (int)B.size(); i++)
        v2[i] = B[(i + 1) % B.size()] - B[i];
    int cnt = 0;
    C[cnt] = (A[0] + B[0]);
    int p1 = 0, p2 = 0;
    while (p1 < (int)A.size() && p2 < (int)B.size()) {
        ++cnt;
        if (sign(v1[p1].det(v2[p2])) >= 0)
            C[cnt] = C[cnt - 1] + v1[p1++];
        else
            C[cnt] = C[cnt - 1] + v2[p2++];
    }
    while (p1 < (int)A.size()) {
        ++cnt;
        C[cnt] = C[cnt - 1] + v1[p1++];
    }
    while (p2 < (int)B.size()) {
        ++cnt;
        C[cnt] = C[cnt - 1] + v2[p2++];
    }
    return C;
}

bool containPs(const vector<P> &ts, P q) {

    int ps = upper_bound(ts.begin(), ts.end(), q, cmp2) - ts.begin() - 1;
    return (crossOp(ts[ps], ts[(ps + 1) % ts.size()], q) >= 0);
}

void solve() {}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int cases;
    cin >> cases;
    while (cases--)
        solve();
}
