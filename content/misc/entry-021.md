---
title: "编译器设置"
order: 210
---

# 编译器设置 {#s-7c945b574571}

使用 GCC 的 `-std=gnu++20` 启用 GNU C++20 方言。`__int128` 是编译器扩展，PBDS 来自 libstdc++ 扩展库；它们的可用性取决于编译器、标准库和目标平台，不能仅由语言标准开关保证。

`-pipe`：驱动在 `cc1` 与 `as` 之间以管道传递汇编文本，替代临时 `.s`。不改变语义与目标码。代价：汇编器须能从标准输入读取（GNU `as` 可以，部分专有实现不行，故驱动默认关闭）；汇编失败时没有可事后打开的 `.s`；管道缓冲使两阶段紧耦合，缓冲满则前端阻塞；`/tmp` 若为 tmpfs，与落盘临时文件的差异可忽略。小翻译单元上收益通常可忽略。

`-O2`：启用较完整的优化通道。代价：编译时延明显上升（常见约 $1.5$–$3$ 倍）；调试时语句与指令对应变差。

`-O0`：关闭优化。代价：运行时性能差。

`-g`：写入调试符号。代价：目标文件增大；与高优化等级并用时行号可能漂移。

`-Wall -Wextra`：较广的静态诊断集合。代价：噪音与误报；不改变代码生成。

`-fsanitize=address`：AddressSanitizer，检测越界、use-after-free 等。代价：运行时显著变慢、内存占用上升；依赖运行时库；不宜提交评测机。

`-fsanitize=undefined`：UndefinedBehaviorSanitizer。代价：同上；覆盖并不完全。

`-Wl,--stack=`：向链接器传递栈预留，仅 MinGW。代价：在 Linux 上无效。

将下列函数追加到默认 init 末尾：Linux 为 `~/.bashrc`，Windows PowerShell 为 `$PROFILE`。不要使用 `~/.bashrc.d`。 `run` 不启用优化；`runo` 使用 `-O2`；`rund` 用于本地诊断。 目标文件固定单一临时路径，下次覆盖，不删除。

Linux（`~/.bashrc` 末尾）：

```bash
# run a.cpp < in.txt
# /tmp/a.out，下次覆盖
run() {
    g++ -std=gnu++20 -pipe "$1" -o /tmp/a.out &&
    /tmp/a.out
}
runo() {
    g++ -O2 -std=gnu++20 -pipe "$1" -o /tmp/a.out &&
    /tmp/a.out
}
rund() {
    g++ -O0 -g -std=gnu++20 -pipe -Wall -Wextra -fsanitize=address,undefined "$1" -o /tmp/a.out &&
    /tmp/a.out
}
```

Windows 只考虑 PowerShell（`$PROFILE` 末尾）。`rm` 是 `Remove-Item` 的别名。不用 `&&`（5.1 没有；7 才有）。`$?` 为上一命令是否成功。

```powershell
# run a.cpp    Get-Content in.txt | run a.cpp
# $env:TEMP\a.exe，下次覆盖
function run {
    g++ -std=gnu++20 -pipe $args[0] -o "$env:TEMP\a.exe"
    if ($?) { & "$env:TEMP\a.exe" }
}
function runo {
    g++ -O2 -std=gnu++20 -pipe $args[0] -o "$env:TEMP\a.exe"
    if ($?) { & "$env:TEMP\a.exe" }
}
function rund {
    g++ -O0 -g -std=gnu++20 -pipe -Wall -Wextra -fsanitize=address,undefined $args[0] -o "$env:TEMP\a.exe"
    if ($?) { & "$env:TEMP\a.exe" }
}
```
