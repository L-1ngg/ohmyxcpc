// TODO：跨立点序与上面 tuple 版不同；原文 sign==1 会把端点/重叠判成不相交，与“均视为相交”矛盾
template<typename T> bool segmentIntersection(Lt l1, Lt l2) {
    auto [s1, e1] = l1;
    auto [s2, e2] = l2;
    auto A = max(s1.x, e1.x), AA = min(s1.x, e1.x);
    auto B = max(s1.y, e1.y), BB = min(s1.y, e1.y);
    auto C = max(s2.x, e2.x), CC = min(s2.x, e2.x);
    auto D = max(s2.y, e2.y), DD = min(s2.y, e2.y);
    return A >= CC && B >= DD && C >= AA && D >= BB &&
           sign(cross(s1, s2, e1) * cross(s1, e1, e2)) != 1 &&  // 原来 ==1，端点/重叠会判不相交
           sign(cross(s2, s1, e2) * cross(s2, e2, e1)) != 1;
}
