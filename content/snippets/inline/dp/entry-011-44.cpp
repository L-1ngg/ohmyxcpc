using namespace std;

const int N = 20,M = 1 << N;

int n;
int w[N][N];
int f[M][N];  //第一维表示是否访问到该点的压缩状态，第二维是走到点j
            //f[i][j]表示状态为i并且到j的最短路径

int main(){
    cin>>n;
    for (int i = 0; i < n; i ++ )
        for (int j = 0; j < n; j ++ )//读入i到j的距离
            cin>>w[i][j];
    memset(f, 0x3f, sizeof f);
    f[1][0]=0;
    for (int i = 0; i < 1 << n; i ++ )  //枚举压缩的状态
        for (int j = 0; j < n; j ++ )//枚举到0~j的点
            if(i >> j & 1)  //该状态存在j点
                for (int k = 0; k < n; k ++ )  //枚举从j倒数第二个点k
                    if(i >> k & 1)  //倒数点k存在
                        //状态转移方程，在f[i][j]和状态去掉j的点f[i-(1<<j)][k]+w[k][j]取最小值
                        f[i][j]=min(f[i][j],f[i-(1<<j)][k]+w[k][j]);
    cout<<f[(1<<n)-1][n-1]<<endl;  //输出状态全满也就是所有点都经过且到最后一个点的最短距离
    return 0;
}
