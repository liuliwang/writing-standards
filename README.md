# writing-standards

OpenCode 技能 + 安装器：把中英文学术写作规范（中文标点、数字用法、量和单位、中英混排、中英表达、统计结果报告、学术图表规范、公式与交叉引用、多文体结构与写作逻辑——论文/综述/报告/会议/技术文档/书籍专著、版式与排版——含图片放置、GB/T 7714—2015 参考文献著录、学术诚信）安装到 AGENTS.md / CLAUDE.md 的带标记区块中，装好后持续生效、幂等可更新。

内置第二个工作流——绘图与做表要求提供：在需要绘制图表或制作表格时，基于规范第 10～11、13 节输出针对性要求清单（规格参数、设计要求、验收清单），供任何执行者使用；本技能不代为绘图做表。

规范条文依据国标、行业标准与权威手册整理（GB/T 15834—2011、GB/T 15835—2011、GB/T 7714—2015、GB/T 7713.1 现行版/7713.2/7713.3、GB 3102.11—1993、GB/T 788—1999、CY/T 118—123/154/170/171/266 系列、CY/T 120—2015、GB 3100/3101—1993、GB/T 3358.1—2009、《第一批异形词整理表》、《图书编校质量差错认定细则》、余光中/思果翻译论述、Pinkham《中式英语之鉴》、Garner 2022、Williams《Style》、Swales CARS、APA 7th、CMOS 17th、Springer/Elsevier/IEEE/ACS/APS/Wiley/T&F 作者指南、Tufte、Nature Methods Points of View、WCAG 2.1、Diátaxis、中华医学会系列杂志编排规范），详见 skills/writing-standards/reference/rules.md。

## 安装（推荐：skills CLI）

使用 Vercel 出品的 skills CLI（配套 registry：skills.sh）安装与更新：

```sh
# 全局安装到 OpenCode 技能目录（~/.config/opencode/skills）
npx skills add liuliwang/writing-standards -g -a opencode -y

# 更新（更新全部已装技能）
npx skills update -y
```

本仓库布局 skills/writing-standards/SKILL.md 即 skills CLI 的标准容器布局，可直接识别。

## 备选安装方式（仓库自带安装器）

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

> 要求仓库为 public。不想放行 git 依赖时，可用一行克隆安装（装完自动清理）：
> ```sh
> git clone https://github.com/liuliwang/writing-standards.git /tmp/ws-install && node /tmp/ws-install/bin/cli.js && rm -rf /tmp/ws-install
> ```

## 使用（技能本身）

在任意项目中打开 OpenCode，输入 @writing-standards，技能按请求分流为两个工作流：

- **安装规范**：说"安装写作规范"——探测项目级 AGENTS.md / CLAUDE.md 与全局 ~/.config/opencode/AGENTS.md，经你勾选、预览后把完整规范写入带标记区块（<!-- writing-standards:start vN --> … <!-- writing-standards:end -->），重复调用只更新区块内内容
- **提供绘图/做表要求**：说"我要画一张……图""做一个三线表"——确认载体（LaTeX/Word）、目标出版物与栏式后，输出针对性要求清单（具体规格数字 + 设计要求 + 验收清单）；本技能不产出绘图代码与成品

## 修改规范条文

编辑 skills/writing-standards/reference/rules.md（唯一规范源，15 节：写作 9 节 + 图表 + 公式交叉引用 + 多文体结构 + 版式排版 + 引用 + 诚信），提交后各机器重跑安装命令即同步。改动较大时同步递增 package.json 的 version。

## 本地开发

```sh
git clone https://github.com/liuliwang/writing-standards.git
cd writing-standards
node bin/cli.js          # 装到 ~/.agents/skills
node bin/cli.js --dir /tmp/test-skills   # 装到试验目录
```

## License

MIT