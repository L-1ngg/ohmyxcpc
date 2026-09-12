struct card {
    int suit, rank;
    friend bool operator<(const card &a, const card &b) { return a.rank < b.rank; }
    friend bool operator==(const card &a, const card &b) { return a.rank == b.rank; }
    friend bool operator!=(const card &a, const card &b) { return a.rank != b.rank; }
    friend auto &operator>>(istream &it, card &C) {
        string S, T;
        it >> S;
        T = "__23456789TJQKA";
        FOR(i, 0, T.sz - 1) {
            if (T[i] == S[0]) C.rank = i;
        }
        T = "_SHCD";
        FOR(i, 0, T.sz - 1) {
            if (T[i] == S[1]) C.suit = i;
        }
        return it;
    }
};
struct game {
    int level;
    vector<card> peo;
    int a, b, c, d, e;
    int u, v, w, x, y;
    bool Rk10() {
        sort(ALL(peo));
        reverse(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (u != v || v != w || w != x || x != y) return 0;
        if (a == 14 && b == 13 && c == 12 && d == 11 && e == 10) return 1;
        return 0;
    }
    bool Dif(vector<card> &peo) {
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (a != 14 || b != 5 || c != 4 || d != 3 || e != 2) return 0;
        vector<card> peo2 = {peo[1], peo[2], peo[3], peo[4], peo[0]};
        peo = peo2;
        return 1;
    }
    bool Rk9() {
        sort(ALL(peo));
        reverse(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (u != v || v != w || w != x || x != y) return 0;
        if (Dif(peo)) return 1;
        if (a == b + 1 && b == c + 1 && c == d + 1 && d == e + 1) return 1;
        return 0;
    }
    bool Rk8() {
        sort(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (a == b && b == c && c == d) return 1;
        if (b == c && c == d && d == e) {
            reverse(ALL(peo));
            return 1;
        }
        return 0;
    }
    bool Rk7() {
        sort(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (a == b && b == c && d == e) return 1;
        if (a == b && c == d && d == e) {
            reverse(ALL(peo));
            return 1;
        }
        return 0;
    }
    bool Rk6() {
        sort(ALL(peo));
        reverse(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (u != v || v != w || w != x || x != y) return 0;
        return 1;
    }
    bool Rk5() {
        sort(ALL(peo));
        reverse(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (Dif(peo)) return 1;
        if (a == b + 1 && b == c + 1 && c == d + 1 && d == e + 1) return 1;
        return 0;
    }
    bool Rk4() {
        sort(ALL(peo));
        reverse(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (a == b && b == c) return 1;
        if (b == c && c == d) {
            swap(peo[3], peo[0]);
            return 1;
        }
        if (c == d && d == e) {
            swap(peo[3], peo[0]);
            swap(peo[4], peo[1]);
            return 1;
        }
        return 0;
    }
    bool Rk3() {
        sort(ALL(peo));
        reverse(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        if (a == b && c == d) return 1;
        if (a == b && d == e) {
            swap(peo[2], peo[4]);
            return 1;
        }
        if (b == c && d == e) {
            swap(peo[0], peo[2]);
            swap(peo[2], peo[4]);
            return 1;
        }
        return 0;
    }
    bool Rk2() {
        sort(ALL(peo));
        reverse(ALL(peo));
        a = peo[0].rank, b = peo[1].rank, c = peo[2].rank, d = peo[3].rank, e = peo[4].rank;
        u = peo[0].suit, v = peo[1].suit, w = peo[2].suit, x = peo[3].suit, y = peo[4].suit;

        vector<card> peo2;
        if (a == b) return 1;
        if (b == c) {
            peo2 = {peo[1], peo[2], peo[0], peo[3], peo[4]};
            peo = peo2;
            return 1;
        }
        if (c == d) {
            peo2 = {peo[2], peo[3], peo[0], peo[1], peo[4]};
            peo = peo2;
            return 1;
        }
        if (d == e) {
            peo2 = {peo[3], peo[4], peo[0], peo[1], peo[2]};
            peo = peo2;
            return 1;
        }
        return 0;
    }
    bool Rk1() {
        sort(ALL(peo));
        reverse(ALL(peo));
        return 1;
    }
    game(vector<card> New_peo) {
        peo = New_peo;
        if (Rk10()) {
            level = 10;
            return;
        }
        if (Rk9()) {
            level = 9;
            return;
        }
        if (Rk8()) {
            level = 8;
            return;
        }
        if (Rk7()) {
            level = 7;
            return;
        }
        if (Rk6()) {
            level = 6;
            return;
        }
        if (Rk5()) {
            level = 5;
            return;
        }
        if (Rk4()) {
            level = 4;
            return;
        }
        if (Rk3()) {
            level = 3;
            return;
        }
        if (Rk2()) {
            level = 2;
            return;
        }
        if (Rk1()) {
            level = 1;
            return;
        }
    }
    friend bool operator<(const game &a, const game &b) {
        if (a.level != b.level) return a.level < b.level;
        FOR(i, 0, 4) if (a.peo[i] != b.peo[i]) return a.peo[i] < b.peo[i];
        return 0;
    }
    friend bool operator==(const game &a, const game &b) {
        if (a.level != b.level) return 0;
        FOR(i, 0, 4) if (a.peo[i] != b.peo[i]) return 0;
        return 1;
    }
};
void debug(vector<card> peo) {
    for (auto it : peo)
        cout << it.rank << " " << it.suit << "  ";
    cout << "\n\n";
}
int clac(vector<card> Ali, vector<card> Bob) {
    game atype(Ali), btype(Bob);
    if (atype < btype)
        return -1;
    else if (atype == btype)
        return 0;
    return 1;
}
