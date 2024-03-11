#include <iostream>
#include <string>
using namespace std;

typedef long long int ll;

void solve() {
    ll n, m_count = 0, p_count = 0, mp_count = 0;
    cin >> n;
    string s;
    cin >> s;
    string m = "map";
    string p = "pie";
    string mp = "mapie";
    size_t m_pos = s.find(m);
    size_t p_pos = s.find(p);
    size_t mp_pos = s.find(mp);
    while (m_pos != string::npos) {
        m_count++;
        m_pos = s.find(m, m_pos + 1);
    }
    while (p_pos != string::npos) {
        p_count++;
        p_pos = s.find(p, p_pos + 1);
    }
    while (mp_pos != string::npos) {
        mp_count++;
        mp_pos = s.find(mp, mp_pos + 1);
    }
    cout << p_pos + m_pos - mp_count << endl;
    return;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    ll numberoftestcases;
    cin >> numberoftestcases;

    while (numberoftestcases--) {
        solve();
    }
    return 0;
}
