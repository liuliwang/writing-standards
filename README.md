# writing-standards

中英文学术写作规范安装器：一次安装进 AGENTS.md / CLAUDE.md，装好后持续生效、幂等可更新。OpenCode 技能，配套 npx 安装器。

## 功能

把 15 节完整规范写入你选定的指令文件（项目级 AGENTS.md / CLAUDE.md 或全局），带标记区块管理、重复调用只更新区块。装完后智能体写作、绘图、做表自动遵守全部要求。

| 分区 | 覆盖内容 | 主要依据 |
|---|---|---|
| 写作基础（1～4 节） | 中文标点 · 数字用法 · 量和单位 · 中英混排 | GB/T 15834、GB/T 15835、GB 3100/3101、CY/T 154 |
| 语言表达（5～9 节） | 中文表达（语病判定、翻译腔防治、异形词）· 逻辑关系词 · 英文表达（Chinglish、名词化、CARS 缺口模型）· 英文标点 · 统计结果报告 | 编校差错认定细则、余光中/思果、Pinkham、Garner、Williams、GB/T 3358.1 |
| 图表公式（10～11 节） | 图表设计原则 · 三线表 · 色彩可及性 · 提交规格 · 图型选择 · 数学符号正斜体 · 公式排版 · 交叉引用（Word/LaTeX 机制） | CY/T 170/171、Springer/Elsevier/IEEE/ACS/APS 指南、Tufte、WCAG 2.1、GB 3102.11、GB/T 7713.2 |
| 结构版式（12～13 节） | 论文/综述/报告/会议/技术文档/书籍专著六类文体结构 · 版面开本 · 字体字号页码 · 孤行分页 · 图片放置（按规格/用途/美化）· LaTeX 与 Word 排版实现 | GB/T 7713 系列、CY/T 118～123、Diátaxis、GB/T 788、CY/T 120 |
| 学术规范（14～15 节） | 参考文献著录（GB/T 7714 顺序编码制，含示例）· 学术诚信（引用/转述/AI 披露） | GB/T 7714、Springer/Elsevier 政策 |

## 快速开始

```sh
# 安装（推荐：Vercel skills CLI，全局装入 OpenCode 技能目录）
npx skills add liuliwang/writing-standards -g -a opencode -y

# 更新全部已装技能
npx skills update -y

# 卸载
npx skills remove writing-standards
```

本仓库 skills/writing-standards/SKILL.md 即 skills CLI 的标准容器布局，可直接识别（registry：skills.sh）。

## 使用方法

在任意项目打开 OpenCode，输入 @writing-standards 或说"安装写作规范"——技能探测项目级与全局指令文件，列出候选让你勾选，预览完整规范块后写入；再次调用即同步最新条文。

安装进 AGENTS.md 的规范以标记区块管理（<!-- writing-standards:start vN --> … <!-- writing-standards:end -->），不影响文件其余内容，删除区块即卸载规范。绘图与做表要求（第 10、11、13 节）已包含在安装内容中，装好后自动生效。

## 备选安装（仓库自带安装器）

npm 12+ 默认禁用 git 类型依赖（EALLOWGIT），二选一处理后再运行：

```sh
# 方式一：单次放行（必须写 =all，裸 --allow-git 无效）
npx --yes --allow-git=all github:liuliwang/writing-standards

# 方式二：持久化放行到用户级 .npmrc
npm config set allow-git=all --location=user
npx github:liuliwang/writing-standards
```

默认装入 ~/.agents/skills/writing-standards/，可用 --dir 自定义。或一行克隆安装（免放行，装完自动清理）：

```sh
git clone https://github.com/liuliwang/writing-standards.git /tmp/ws-install && node /tmp/ws-install/bin/cli.js && rm -rf /tmp/ws-install
```

## 修改规范条文

编辑 skills/writing-standards/reference/rules.md（唯一规范源，15 节），提交后各机器重跑更新命令即同步；改动较大时同步递增 package.json 的 version。

## 版本记录

- 3.5 —— 合并为单一安装器工作流：图表与绘图要求全部随规范安装生效，移除按需清单工作流
- 3.4 —— 新增版式与排版节（版面、字体页码、图片放置、LaTeX/Word 实现）；GB/T 7713.1 引用更新为现行版
- 3.3 —— 中英表达扩充（语病、翻译腔、Chinglish、易混淆词）；结构节重组为多文体（含书籍专著）
- 3.2 —— 新增公式与交叉引用节（符号正斜体、排版、Word/LaTeX 交叉引用机制）
- 3.1 —— 图表要求并入规范第 10 节并大幅扩充
- 3.0 —— 双工作流形态：规范安装器 + 图表要求清单
- 2.0 —— 规则全面校订（国标原文级核对）
- 1.0 —— 初始版本（八节基础规范）

## License

MIT