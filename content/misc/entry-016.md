---
title: "对拍板子"
order: 160
---

# 对拍板子 {#s-ed8e97eec564}

  同目录多题：`A.cpp` / `A-std.cpp` / `A-gen.cpp`。 一题多份源（`F.cpp` / `F-1.cpp` / `F-Brute.cpp`）共用该题一份暴力和生成器。 对拍器做成函数追加到 shell init（Linux `~/.bashrc`、Windows `$PROFILE`），两边接口相同；Windows 上机器若有 Python，`stress.py` 更好读。 prefix：`stress A` 或 `stress F-1`。被测用完整参数，std/gen 只取第一段连字符前的题号。 manual：`stress a.cpp brute.cpp gen.cpp`，三个路径原样用。 其它个数直接返回。 编译产物与中间文件均在临时目录固定路径，下次覆盖，不 `rm`。 挂了去看临时目录里的输入输出。三个 `g++` 都成功才进入循环。

Linux（`~/.bashrc` 末尾）：

```bash
# prefix: stress A / stress F-1 → F-1.cpp F-std.cpp F-gen.cpp
# manual: stress a.cpp brute.cpp gen.cpp
# /tmp/x /tmp/xstd /tmp/gen /tmp/test.in /tmp/x.out /tmp/xstd.out
stress() {
    case $# in
    1)
        sol=$1.cpp
        p=${1%%-*}
        std=$p-std.cpp
        gen=$p-gen.cpp
        ;;
    3)
        sol=$1
        std=$2
        gen=$3
        ;;
    *)
        return
        ;;
    esac
    g++ -std=gnu++20 -O2 -pipe -o /tmp/gen "$gen" &&
    g++ -std=gnu++20 -O2 -pipe -o /tmp/x "$sol" &&
    g++ -std=gnu++20 -O2 -pipe -o /tmp/xstd "$std" && {
        t=1
        while :; do
            echo $t
            /tmp/gen > /tmp/test.in
            /tmp/x < /tmp/test.in > /tmp/x.out
            /tmp/xstd < /tmp/test.in > /tmp/xstd.out
            diff -q /tmp/x.out /tmp/xstd.out || break
            t=$((t + 1))
        done
    }
}
```

Windows PowerShell（`$PROFILE` 末尾），输出用 `fc` 比对：

```powershell
# prefix: stress A / stress F-1 → F-1.cpp F-std.cpp F-gen.cpp
# manual: stress a.cpp brute.cpp gen.cpp
function stress {
    switch ($args.Count) {
        1 {
            $sol = "$($args[0]).cpp"
            $p = ($args[0] -split '-', 2)[0]
            $std = "$p-std.cpp"
            $gen = "$p-gen.cpp"
        }
        3 {
            $sol = $args[0]
            $std = $args[1]
            $gen = $args[2]
        }
        default { return }
    }
    g++ -std=gnu++20 -O2 -pipe -o "$env:TEMP\gen.exe" $gen
    if (-not $?) { return }
    g++ -std=gnu++20 -O2 -pipe -o "$env:TEMP\x.exe" $sol
    if (-not $?) { return }
    g++ -std=gnu++20 -O2 -pipe -o "$env:TEMP\xstd.exe" $std
    if (-not $?) { return }
    $t = 1
    while ($true) {
        Write-Host $t
        & "$env:TEMP\gen.exe" > "$env:TEMP\test.in"
        & "$env:TEMP\x.exe" < "$env:TEMP\test.in" > "$env:TEMP\x.out"
        & "$env:TEMP\xstd.exe" < "$env:TEMP\test.in" > "$env:TEMP\xstd.out"
        fc.exe "$env:TEMP\x.out" "$env:TEMP\xstd.out"
        if ($LASTEXITCODE -ne 0) { break }
        $t++
    }
}
```

Windows Python（存成 `stress.py`），更好读，输出在语言内比字节：

```python
# prefix: python stress.py A / python stress.py F-1 → F-1.cpp F-std.cpp F-gen.cpp
# manual: python stress.py a.cpp brute.cpp gen.cpp
# %TEMP%\x.exe %TEMP%\xstd.exe %TEMP%\gen.exe %TEMP%\test.in %TEMP%\x.out %TEMP%\xstd.out
import os, sys

def run(c):
    if os.system(c): sys.exit(1)

a = sys.argv[1:]
if len(a) == 1:          # prefix：python stress.py A
    p = a[0].split('-')[0]
    sol, std, gen = a[0] + '.cpp', p + '-std.cpp', p + '-gen.cpp'
elif len(a) == 3:        # manual：python stress.py a.cpp brute.cpp gen.cpp
    sol, std, gen = a
else:
    sys.exit(1)

T = os.environ['TEMP'] + '\\'  # Linux 写成 '/tmp/'，并删去各处的 .exe
run(f'g++ -std=gnu++20 -O2 -pipe -o {T}gen.exe {gen}')
run(f'g++ -std=gnu++20 -O2 -pipe -o {T}x.exe {sol}')
run(f'g++ -std=gnu++20 -O2 -pipe -o {T}xstd.exe {std}')

t = 1
while True:
    print(t)
    run(f'{T}gen.exe > {T}test.in')
    run(f'{T}x.exe < {T}test.in > {T}x.out')
    run(f'{T}xstd.exe < {T}test.in > {T}xstd.out')
    if open(f'{T}x.out', 'rb').read() != open(f'{T}xstd.out', 'rb').read():
        break
    t += 1
```

生成器骨架（存成 `A-gen.cpp`）：

<<< @/snippets/code/杂项/对拍板子.cpp
