---
title: "常用结论"
order: 50
---

# 常用结论 {#s-3d9fd866e2bb}

  体积、夹角、距离的公式速查。混积绝对值是平行六面体体积。

## 平面几何结论归档 {#s-dbd255628e76}

- `hypot` 函数可以直接计算直角三角形的斜边长；

- **边心距**是指正多边形的外接圆圆心到正多边形某一边的距离，边长为 $s$ 的正 $n$ 角形的边心距公式为 $a = \frac{t}{2 \cdot \operatorname{tan} \frac{\pi}{n}}$ ，外接圆半径为 $R$ 的正 $n$ 角形的边心距公式为 $a = R \cdot \text{cos} \frac{\pi}{n}$ ；

- **三角形外接圆半径**为 $\frac{a}{2 \text{sin} A} = \frac{a b c}{4 S}$ ，其中 $S$ 为三角形面积，内切圆半径为 $\frac{2 S}{a + b + c}$；

- 由小正三角形拼成的大正三角形，耗费的小三角形数量即为构成一条边的小三角形数量的平方。如下图，总数量即为 $4^{2}$ [See](https://codeforces.com/problemset/problem/559/A)。

   

   ![img-02.png](/images/img-02.png)

- 正 $n$ 边形圆心角为 $\frac{360^{\circ}}{n}$ ，圆周角为 $\frac{180^{\circ}}{n}$ 。定义正 $n$ 边形上的三个顶点 $A , B$ 和 $C$（可以不相邻），使得 $\angle A B C = \theta$ ，当 $n \le 360$ 时，$\theta$ 可以取 $1^{\circ}$ 到 $179^{\circ}$ 间的任何一个整数 [See](https://codeforces.com/problemset/problem/1096/C)。

- 某一点 $B$ 到直线 $A C$ 的距离公式为 $\frac{\vert \overrightarrow{B A} \times \overrightarrow{B C} \vert}{\vert A C \vert}$ ，等价于 $\frac{\vert a X + b Y + c \vert}{\sqrt{a^{2} + b^{2}}}$。

- `atan(y / x)` 函数仅用于计算第一、四象限的值，而 `atan2(y, x)` 则允许计算所有四个象限的正反切，在使用这个函数时，需要尽量保证 $x$ 和 $y$ 的类型为整数型，如果使用浮点数，实测会慢十倍。

- 在平面上有奇数个点 $A_{0} , A_{1} , \ldots , A_{n}$ 以及一个点 $X_{0}$ ，构造 $X_{1}$ 使得 $X_{0} , X_{1}$ 关于 $A_{0}$ 对称、构造 $X_{2}$ 使得 $X_{1} , X_{2}$ 关于 $A_{1}$ 对称、……、构造 $X_{j}$ 使得 $X_{j - 1} , X_{j}$ 关于 $A_{( j - 1 ) \operatorname{mod} \quad n}$ 对称。那么周期为 $2 n$ ，即 $A_{0}$ 与 $A_{2 n}$ 共点、$A_{1}$ 与 $A_{2 n + 1}$ 共点 [See](https://codeforces.com/contest/24/problem/C) 。

- 已知 $A \quad ( x_{A} , y_{A} )$ 和 $X \quad ( x_{X} , y_{X} )$ 两点及这两点的坐标，构造 $Y$ 使得 $X , Y$ 关于 $A$ 对称，那么 $Y$ 的坐标为 $( 2 \cdot x_{A} - x_{X} , 2 \cdot y_{A} - y_{X} )$ 。

- **海伦公式**：已知三角形三边长 $a , b$ 和 $c$ ，定义 $p = \frac{a + b + c}{2}$ ，则 $S_{\triangle} = \sqrt{p ( p - a ) ( p - b ) ( p - c )}$ ，在使用时需要注意越界问题，本质是铅锤定理，一般多使用叉乘计算三角形面积而不使用该公式。

- 棱台体积 $V = \frac{1}{3} ( S_{1} + S_{2} + \sqrt{S_{1} S_{2}} ) \cdot h$，其中 $S_{1} , S_{2}$ 为上下底面积。

- 正棱台侧面积 $\frac{1}{2} ( C_{1} + C_{2} ) \cdot L$，其中 $C_{1} , C_{2}$ 为上下底周长，$L$ 为斜高（上下底对应的平行边的距离）。

- 球面积 $4 \pi r^{2}$，体积 $\frac{4}{3} \pi r^{3}$。

- 正三角形面积 $\frac{\sqrt{3} a^{2}}{4}$，正四面体面积 $\frac{\sqrt{2} a^{3}}{12}$。

- 设扇形对应的圆心角弧度为 $\theta$ ，则面积为 $S = \frac{\theta}{2} \cdot R^{2}$ 。

## 立体几何结论归档 {#s-c979cab5e23f}

- 已知向量 $\overrightarrow{r} = \{ x , y , z \}$ ，则该向量的三个方向余弦为 $\text{cos} \alpha = \frac{x}{\vert \overrightarrow{r} \vert} = \frac{x}{\sqrt{x^{2} + y^{2} + z^{2}}} ; \quad \text{cos} \beta = \frac{y}{\vert \overrightarrow{r} \vert} ; \quad \text{cos} \gamma = \frac{z}{\vert \overrightarrow{r} \vert}$ 。其中 $\alpha , \beta , \gamma \in [ 0 , \pi ]$ ，$\text{cos}^{2} \alpha + \text{cos}^{2} \beta + \text{cos}^{2} \gamma = 1$ 。
