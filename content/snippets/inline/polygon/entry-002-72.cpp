template<typename T> vector<Point<T>> staticConvexHull(vector<Point<T>> A, int flag = 1) {
    int n = A.size();
    if (n <= 2) {  // 特判
        return A;
    }
    vector<Point<T>> ans(n * 2);
    sort(A.begin(), A.end());
    int now = -1;
    auto bad = [&](Point<T> o, Point<T> a, Point<T> b) {  // flag=1 弹出共线，flag=0 保留
        auto cr = cross(o, a, b);
        return flag ? cr <= 0 : cr < 0;  // 原来写死 <=0，flag 参数没用上
    };
    for (int i = 0; i < n; i++) {  // 维护下凸包
        while (now > 0 && bad(A[i], ans[now], ans[now - 1])) {
            now--;
        }
        ans[++now] = A[i];
    }
    int pre = now;
    for (int i = n - 2; i >= 0; i--) {  // 维护上凸包
        while (now > pre && bad(A[i], ans[now], ans[now - 1])) {
            now--;
        }
        ans[++now] = A[i];
    }
    ans.resize(now);
    return ans;
}
