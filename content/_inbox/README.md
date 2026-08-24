# 收件箱 _inbox

把**未经整理**的模板草稿（`.md` / `.cpp` 等）放在这里。本目录不会被站点收录：

- `_` 开头目录被扫描规则排除（见 `scripts/lib/content.mjs`）
- 同时已从 VitePress 构建中剔除（`srcExclude`）

**整理方式**：让 AI 助手加载 `xcpc-template-ingest` Skill（pi 中可用 `/skill:xcpc-template-ingest`），它会完成规范化、归类落位与构建校验。

内容规范见 `docs/requirements.md` §7。
