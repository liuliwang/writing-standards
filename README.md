# writing-standards

OpenCode 技能 + 安装器：把中英文学术写作规范（中文标点、数字用法、量和单位、中英混排、中英表达、统计结果报告、学术图表规范、论文结构与写作逻辑、GB/T 7714—2015 参考文献著录、学术诚信）安装到 AGENTS.md / CLAUDE.md 的带标记区块中，装好后持续生效、幂等可更新。

内置第二个工作流——学术图表制作：按 Springer/Elsevier 门槛与 CY/T 170 三线表细则，绘制数据图（matplotlib，LaTeX 出矢量 PDF / Word 出高分辨率 PNG）、流程图与架构图（mermaid/TikZ）、排版三线表（booktabs / Word），见图表指南 skills/writing-standards/reference/figures.md。

规范条文依据国标、行业标准与权威手册整理（GB/T 15834—2011、GB/T 15835—2011、GB/T 7714—2015、GB/T 7713.1—2006、CY/T 154—2017、CY/T 170/171—2019、GB 3100/3101—1993、GB/T 3358.1—2009、《第一批异形词整理表》、APA 7th、CMOS 17th、Springer/Elsevier 作者指南、中华医学会系列杂志编排规范），详见 skills/writing-standards/reference/rules.md。

## 安装

npm 12+ 默认禁用了 git 类型依赖（EALLOWGIT），二选一处理后再运行：

```sh
# 方式一：单次放行（必须写 =all，裸 --allow-git 无效）
npx --yes --allow-git=all github:liuliwang/writing-standards

# 方式二：持久化放行到用户级 .npmrc（之后所有 npx 不再需要 flag）
npm config set allow-git=all --location=user
npx github:liuliwang/writing-standards
```

默认安装到 ~/.agents/skills/writing-standards/。自定义目录：

```sh
npx github:liuliwang/writing-standards --dir ~/.config/opencode/skills
```

> 要求仓库为 public（npx 拉取 GitHub 仓库不支持私有仓库认证）。
> 不想放行 git 依赖时，可用一行克隆安装（装完自动清理）：
> ```sh
> git clone https://github.com/liuliwang/writing-standards.git /tmp/ws-install && node /tmp/ws-install/bin/cli.js && rm -rf /tmp/ws-install
> ```

## 更新

```sh
npx --yes --allow-git=all github:liuliwang/writing-standards --force
```

（已按安装节方式二持久化放行的，直接 npx github:liuliwang/writing-standards --force。）覆盖复制为最新版。

## 使用（技能本身）

在任意项目中打开 OpenCode，输入 @writing-standards，技能按请求分流为两个工作流：

- **安装规范**：说"安装写作规范"——探测项目级 AGENTS.md / CLAUDE.md 与全局 ~/.config/opencode/AGENTS.md，经你勾选、预览后把完整规范写入带标记区块（<!-- writing-standards:start vN --> … <!-- writing-standards:end -->），重复调用只更新区块内内容
- **绘制图表 / 排版表格**：说"画一张……图""做一个三线表"——确认载体（LaTeX/Word）与版式后，产出绘图源码（matplotlib/mermaid）或表格（booktabs/Word）并渲染成品，交付前按规范自查

## 修改规范条文

编辑 skills/writing-standards/reference/rules.md（写作规范）或 reference/figures.md（图表指南），提交后各机器重跑安装命令即同步。改动较大时同步递增 package.json 的 version。

## 本地开发

```sh
git clone https://github.com/liuliwang/writing-standards.git
cd writing-standards
node bin/cli.js          # 装到 ~/.agents/skills
node bin/cli.js --dir /tmp/test-skills   # 装到试验目录
```

## License

MIT