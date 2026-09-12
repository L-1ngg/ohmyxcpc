bitset<32> a("11101001"), b("11101000");
a.set(4);
a.reset(0);
a.flip(1);
cout << a[4] << ' ' << a.count() << '\n';
cout << a.any() << ' ' << a.none() << '\n';
cout << a.to_string() << ' ' << a.to_ullong() << '\n';
cout << (a ^ b) << '\n';
cout << (a | b) << '\n';
cout << (a & b) << '\n';
cout << (a == b) << '\n';
for (size_t i = a._Find_first(); i < a.size(); i = a._Find_next(i)) {
    cout << i << ' ';
}
cout << '\n';
