#include "../contest.hpp"
int n, m;

// @book-begin
int main() {
    vector<int> val;
    for (int i = 1, x; i <= n; i++) {
        cin >> x;
        int it = upper_bound(val.begin(), val.end(), x) - val.begin();
        if (it >= val.size()) {
            val.push_back(x);
        } else {
            val[it] = x;
        }
    }
    cout << val.size() << endl;
}
// @book-end
