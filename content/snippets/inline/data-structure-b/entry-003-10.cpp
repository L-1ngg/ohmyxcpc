#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
using V = pair<int, int>;
tree<V, null_type, less<V>, rb_tree_tag, tree_order_statistics_node_update> ver;
map<int, int> dic;

int n;
cin >> n;
for (int i = 1, op, x; i <= n; i++) {
    cin >> op >> x;
    if (op == 1) {
        ver.insert({x, ++dic[x]});
    } else if (op == 2) {
        ver.erase({x, dic[x]--});
    } else if (op == 3) {
        cout << ver.order_of_key({x, 1}) + 1 << endl;
    } else if (op == 4) {
        cout << ver.find_by_order(--x)->first << endl;
    } else if (op == 5) {
        int idx = ver.order_of_key({x, 1}) - 1;
        cout << ver.find_by_order(idx)->first << endl;
    } else if (op == 6) {
        int idx = ver.order_of_key({x, dic[x]});
        if (ver.find({x, 1}) != ver.end()) idx++;
        cout << ver.find_by_order(idx)->first << endl;
    }
}
