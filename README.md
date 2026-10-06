# writing-standards

OpenCode 技能 + 安装器：把中英文学术写作规范（中文标点、数字用法、量和单位、中英混排、逻辑连接词、中英表达、英文标点、图表与论文结构、GB/T 7714—2015 参考文献著录、学术诚信）安装到 AGENTS.md / CLAUDE.md 的带标记区块中，装好后持续生效、幂等可更新。

规范条文依据国标与权威手册整理（GB/T 15834—2011、GB/T 15835—2011、GB/T 7714—2015、GB/T 7713.1—2006、CY/T 154—2017、GB 3100/3101—1993、《第一批异形词整理表》、APA 7th、CMOS 17th），详见 `skills/writing-standards/reference/rules.md`。

## 安装

```sh
npx github:<your-github-username>/writing-standards
```

默认安装到 `~/.agents/skills/writing-standards/`。自定义目录：

```sh
npx github:<your-github-username>/writing-standards --dir ~/.config/opencode/skills
```

> 要求仓库为 public（npx 拉取 GitHub 仓库不支持私有仓库认证）。

## 更新

```sh
npx github:<your-github-username>/writing-standards --force
```

覆盖复制为最新版。

## 使用（技能本身）

在任意项目中打开 OpenCode，输入 `@writing-standards` 或"安装写作规范"：技能会探测项目级 `AGENTS.md` / `CLAUDE.md` 与全局 `~/.config/opencode/AGENTS.md`，经你勾选、预览后把完整规范写入带标记区块（`<!-- writing-standards:start vN -->` … `<!-- writing-standards:end -->`），重复调用只更新区块内内容。

## 修改规范条文

编辑 `skills/writing-standards/reference/rules.md`（唯一规则源），提交后各机器重跑安装命令即同步。改动较大时同步递增 `package.json` 的 `version`。

## 本地开发

```sh
git clone https://github.com/<your-github-username>/writing-standards.git
cd writing-standards
node bin/cli.js          # 装到 ~/.agents/skills
node bin/cli.js --dir /tmp/test-skills   # 装到试验目录
```

## License

MIT
