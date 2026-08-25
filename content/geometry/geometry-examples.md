---
title: 几何常用例题
order: 105
---

# 几何常用例题

## 将平面某点旋转任意角度

题意：给定平面上一点 $(a,b)$ ，输出将其逆时针旋转 $d$ 度之后的坐标。

```cpp
signed main() {
    int a, b, d;
    cin >> a >> b >> d;

    ld l = hypot(a, b); // 库函数，求直角三角形的斜边
    ld alpha = atan2(b, a) + toArc(d);

    cout << l * cos(alpha) << " " << l * sin(alpha) << endl;
}
```

## 平面最近点对（set 解）

借助 `set` ，在严格 $\mathcal O(N\log N)$ 复杂度内求解，比常见的分治法稍快。

```cpp
template<typename T> T sqr(T x) {
    return x * x;
}

using V = Point<int>;
signed main() {
    int n;
    cin >> n;

    vector<V> in(n);
    for (auto &it : in) {
        cin >> it;
    }

    int dis = disEx(in[0], in[1]); // 设定阈值
    sort(in.begin(), in.end());

    set<V> S;
    for (int i = 0, h = 0; i < n; i++) {
        V now = {in[i].y, in[i].x};
        while (dis && dis <= sqr(in[i].x - in[h].x)) { // 删除超过阈值的点
            S.erase({in[h].y, in[h].x});
            h++;
        }
        auto it = S.lower_bound(now);
        for (auto k = it; k != S.end() && sqr(k->x - now.x) < dis; k++) {
            dis = min(dis, disEx(*k, now));
        }
        if (it != S.begin()) {
            for (auto k = prev(it); sqr(k->x - now.x) < dis; k--) {
                dis = min(dis, disEx(*k, now));
                if (k == S.begin()) break;
            }
        }
        S.insert(now);
    }
    cout << sqrt(dis) << endl;
}
```

## 平面若干点能构成的最大四边形的面积（简单版，暴力枚举）

题意：平面上存在若干个点，保证没有两点重合、没有三点共线，你需要从中选出四个点，使得它们构成的四边形面积是最大的，注意这里能组成的四边形可以不是凸四边形。

暴力枚举其中一条对角线后枚举剩余两个点，$\mathcal O(N^3)$ 。

```cpp
signed main() {
    int n;
    cin >> n;
    vector<Pi> in(n);
    for (auto &it : in) {
        cin >> it;
    }
    ld ans = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) { // 枚举对角线
            ld l = 0, r = 0;
            for (int k = 0; k < n; k++) { // 枚举第三点
                if (k == i || k == j) continue;
                if (pointOnLineLeft(in[k], {in[i], in[j]})) {
                    l = max(l, triangleS(in[k], in[j], in[i]));
                } else {
                    r = max(r, triangleS(in[k], in[j], in[i]));
                }
            }
            if (l * r != 0) { // 确保构成的是四边形
                ans = max(ans, l + r);
            }
        }
    }
    cout << ans << endl;
}
```

## 平面若干点能构成的最大四边形的面积（困难版，分类讨论+旋转卡壳）

题意：平面上存在若干个点，可能存在多点重合、共线的情况，你需要从中选出四个点，使得它们构成的四边形面积是最大的，注意这里能组成的四边形可以不是凸四边形、可以是退化的四边形。

当凸包大小 $\le 2$ 时，说明是退化的四边形，答案直接为 $0$ ；大小恰好为 $3$ 时，说明是凹四边形，我们枚举不在凸包上的那一点，将两个三角形面积相减既可得到答案；大小恰好为 $4$ 时，说明是凸四边形，使用旋转卡壳求解。

```cpp
using V = Point<int>;
signed main() {
    int Task = 1;
    for (cin >> Task; Task; Task--) {
        int n;
        cin >> n;

        vector<V> in_(n);
        for (auto &it : in_) {
            cin >> it;
        }
        auto in = staticConvexHull(in_, 0);
        n = in.size();

        int ans = 0;
        if (n > 3) {
            ans = rotatingCalipers(in);
        } else if (n == 3) {
            int area = triangleAreaEx(in[0], in[1], in[2]);
            for (auto it : in_) {
                if (it == in[0] || it == in[1] || it == in[2]) continue;
                int Min = min({triangleAreaEx(it, in[0], in[1]), triangleAreaEx(it, in[0], in[2]), triangleAreaEx(it, in[1], in[2])});
                ans = max(ans, area - Min);
            }
        }

        cout << ans / 2;
        if (ans % 2) {
            cout << ".5";
        }
        cout << endl;
    }
}
```

## 线段将多边形切割为几个部分

题意：给定平面上一线段与一个任意多边形，求解线段将多边形切割为几个部分；保证线段的端点不在多边形内、多边形边上，多边形顶点不位于线段上，多边形的边不与线段重叠；多边形端点按逆时针顺序给出。下方的几个样例均合法，答案均为 $3$ 。

<img src="https://img2023.cnblogs.com/blog/2491503/202308/2491503-20230827211620035-1506522300.png" alt="截图" style="zoom:60%;" /><img src="https://img2023.cnblogs.com/blog/2491503/202308/2491503-20230827211624866-1953825694.png" alt="截图" style="zoom:60%;" />

当线段切割多边形时，本质是与多边形的边交于两个点、或者说是与多边形的两条边相交，设交点数目为 $x$ ，那么答案即为 $\frac{x}{2}+1$ 。于是，我们只需要计算交点数量即可，先判断某一条边是否与线段相交，再判断边的两个端点是否位于线段两侧。

```cpp
signed main() {
    Pi s, e;
    cin >> s >> e; // 读入线段

    int n;
    cin >> n;
    vector<Pi> in(n);
    for (auto &it : in) {
        cin >> it; // 读入多边形端点
    }

    int cnt = 0;
    for (int i = 0; i < n; i++) {
        Pi x = in[i], y = in[(i + 1) % n];
        cnt += (pointNotOnLineSide(x, y, {s, e}) && segmentIntersection(Line{x, y}, {s, e}));
    }
    cout << cnt / 2 + 1 << endl;
}
```

## 平面若干点能否构成凸包（暴力枚举）

题意：给定平面上若干个点，判断其是否构成凸包 [See](https://atcoder.jp/contests/abc266/tasks/abc266_c) 。

可以直接使用凸包模板，但是代码较长；在这里我们使用暴力枚举试点，也能以 $\mathcal O(N)$ 的复杂度通过。当两个向量的叉乘 $\le0$ 时说明其夹角大于等于 $180\degree$ ，使用这一点即可判定。

```cpp
signed main() {
    int n;
    cin >> n;

    vector<Point<ld>> in(n);
    for (auto &it : in) {
        cin >> it;
    }

    for (int i = 0; i < n; i++) {
        auto A = in[(i - 1 + n) % n];
        auto B = in[i];
        auto C = in[(i + 1) % n];
        if (cross(A - B, C - B) > 0) {
            cout << "No\n";
            return 0;
        }
    }
    cout << "Yes\n";
}
```

## 凸包上的点能构成的最大三角形（暴力枚举）

可以直接使用凸包模板，但是代码较长；在这里我们使用暴力枚举试点，也能以 $\mathcal O(N)$ 的复杂度通过。

> 另外补充一点性质：所求三角形的反互补三角形一定包含了凸包上的所有点（可以在边界）。通俗的说，构成的三角形是这个反互补三角形的中点三角形。如下图所示，点 $A$ 不在 $\triangle BCE$ 的反互补三角形内部，故 $\triangle BCE$ 不是最大三角形；$\triangle ACE$ 才是。
>
> <img src="https://img2023.cnblogs.com/blog/2491503/202308/2491503-20230827205516769-1055425260.png" alt="截图" style="zoom:80%;" />
>
> ![](https://img2023.cnblogs.com/blog/2491503/202308/2491503-20230827205528116-1886683012.png)

```cpp
signed main() {
    int n;
    cin >> n;

    vector<Point<int>> in(n);
    for (auto &it : in) {
        cin >> it;
    }

    #define S(x, y, z) triangleAreaEx(in[x], in[y], in[z])

    int i = 0, j = 1, k = 2;
    while (true) {
        int val = S(i, j, k);
        if (S((i + 1) % n, j, k) > val) {
            i = (i + 1) % n;
        } else if (S((i - 1 + n) % n, j, k) > val) {
            i = (i - 1 + n) % n;
        } else if (S(i, (j + 1) % n, k) > val) {
            j = (j + 1) % n;
        } else if (S(i, (j - 1 + n) % n, k) > val) {
            j = (j - 1 + n) % n;
        } else if (S(i, j, (k + 1) % n) > val) {
            k = (k + 1) % n;
        } else if (S(i, j, (k - 1 + n) % n) > val) {
            k = (k - 1 + n) % n;
        } else {
            break;
        }
    }
    cout << i + 1 << " " << j + 1 << " " << k + 1 << endl;
}
```

## 凸包上的点能构成的最大四角形的面积（旋转卡壳）

由于是凸包上的点，所以保证了四边形一定是凸四边形，时间复杂度 $\mathcal O(N^2)$ 。

```cpp
template<typename T> T rotatingCalipers(vector<Point<T>> &p) {
    #define S(x, y, z) triangleAreaEx(p[x], p[y], p[z])
    int n = p.size();
    T ans = 0;
    auto nxt = [&](int i) -> int {
        return i == n - 1 ? 0 : i + 1;
    };
    for (int i = 0; i < n; i++) {
        int p1 = nxt(i), p2 = nxt(nxt(nxt(i)));
        for (int j = nxt(nxt(i)); nxt(j) != i; j = nxt(j)) {
            while (nxt(p1) != j && S(i, j, nxt(p1)) > S(i, j, p1)) {
                p1 = nxt(p1);
            }
            if (p2 == j) {
                p2 = nxt(p2);
            }
            while (nxt(p2) != i && S(i, j, nxt(p2)) > S(i, j, p2)) {
                p2 = nxt(p2);
            }
            ans = max(ans, S(i, j, p1) + S(i, j, p2));
        }
    }
    return ans;
    #undef S
}
```

## 判断一个凸包是否完全在另一个凸包内

题意：给定一个凸多边形 $A$ 和一个凸多边形 $B$ ，询问 $B$ 是否被 $A$ 包含，分别判断严格/不严格包含。[例题](https://codeforces.com/contest/166/problem/B)。

考虑严格包含，使用 $A$ 点集计算出凸包 $T_1$ ，使用 $A,B$ 两个点集计算出不严格凸包 $T_2$ ，如果包含，那么 $T_1$ 应该与 $T_2$ 完全相等；考虑不严格包含，在计算凸包 $T_2$ 时严格即可。最终以 $\mathcal O(N)$ 复杂度求解，且代码不算很长。

> [!WARNING] 待补充：该小节仅有思路说明，原文未附代码实现。
