# 整批 PDF 发布与恢复

实现 issue #4。编译流程仍逐个生成整本和章节 PDF；发布 module 位于 `scripts/pdf/publication.mjs`，拥有暂存、产物一致性校验、提交、恢复及清理责任。

## Interface

```js
await publishPdfSet({
  outDir, // 专用于 PDF 发布的正式目录；生产位置为 content/public/pdfs
  build: async stagingDir => {
    // 将全部 <id>.pdf 写入 stagingDir，等待所有编译结束后返回清单。
    // 不写 manifest.json，不管理备份或恢复，不保留异步后台写入。
    return { generatedAt, targets }
  }
}) // => { status: 'published' }
```

module 创建正式目录同级的唯一暂存目录，使目录交换保持在同一文件系统。`build` 只负责生成 PDF 和构造清单；编译工作文件仍由编译流程管理。module 在调用 `build` 前拒绝遗留备份，完成后校验产物、写清单、备份旧目录，再提交新目录。

清单结构遵循 [清单契约](./pdf-manifest-contract.md)。每个目标必须对应暂存目录内的普通文件，大小与清单一致；拒绝符号链接、额外文件、缺失文件及缺失整本目标。module 不解析 PDF 内容，不另行扫描章节源文件；编译流程负责生成全部预定章节。真实整批入口测试验证该分工。

## 失败状态

失败抛出 `PdfPublicationError`，含 `code`、`published` 和原始 `cause`。`published` 表示正式目录的本次发布状态：`previous` 为未替换或已恢复的旧目录，`new` 为新目录已提交，`none` 为无正式目录；不表示重新验证过旧 PDF 的内容。

| code | 正式目录 | 处理与可恢复产物 |
| --- | --- | --- |
| `BACKUP_EXISTS` | 旧目录或无目录 | 不调用编译，不改动备份；`backupPath` 指向需要人工检查的遗留备份。 |
| `PREPARATION_FAILED` | 旧目录或无目录 | 创建暂存、编译、校验或写清单失败；尝试删除本次暂存。 |
| `COMMIT_FAILED` | 旧目录或无目录 | 备份失败则旧目录不动；最终交换失败则恢复旧目录；尝试删除本次暂存。 |
| `RECOVERY_FAILED` | 无目录 | 提交和恢复都失败；保留旧备份与完整新暂存，提供 `backupPath`、`stagingPath`、`recoveryError`。 |
| `CLEANUP_FAILED` | 新目录 | 发布已成功，但旧备份清理未完成；提供 `backupPath`，其内容可能已部分删除，不能视为完整备份。 |

失败后的暂存清理若再次失败，保留原错误码与原因，并附加 `cleanupError`、`stagingPath`；该暂存可能不完整。CLI 输出状态、原因与相关路径，所有失败状态退出码均为 1，包括发布成功但清理失败。下一次运行不自动删除遗留备份，操作者需先检查和处理。遗留暂存不自动恢复或清除。

## 测试与范围

复用 issue #4 的测试约定：从正式产物、清单一致性及失败结果判断行为，不断言 rename 次序或私有暂存名称。

- module interface 测试使用真实临时目录与小型文件，覆盖成功、编译失败、提交失败、恢复失败、遗留备份、清理失败及不完整产物。
- 第二参数仅供 module 内部测试注入 `rename` / `remove` 故障；正常操作仍落到真实文件系统，不是通用 filesystem adapter，不修改 Node 全局函数。
- 整批 CLI 保留真实 Typst 编译成功、编译失败保留旧清单和 PDF 的验证。原全局 monkeypatch 回滚测试迁到 module interface，回滚仍执行真实目录交换，但无需重复编译。
- 保持串行编译、现有清单格式、PDF 版式、静态网站和 CI 门禁；不增加浏览器行为。

本实现针对单进程完成或抛错的文件操作。两次目录交换之间可能短暂无正式目录，不提供持续读者可见的原子交换。进程崩溃、断电、并发发布、跨存储后端及远端部署事务均不在范围内。没有测量重构前后的性能，不宣称量化提速。
