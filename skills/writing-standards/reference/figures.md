# 学术图表绘制指南

配合 `rules.md` 第 10 节（学术图表规范）使用：本文件管"怎么产出"，rules.md 管"产出必须符合什么"。两者冲突时以 rules.md 为准。

## 工具路由

| 需求 | 工具 | LaTeX 载体 | Word 载体 |
|---|---|---|---|
| 数据图（折线/柱状/箱线/散点/热图/误差图） | matplotlib | 存 PDF（矢量） | 存 PNG（照片类内容 300 dpi，纯线图 600 dpi） |
| 流程图/架构图/状态图/时序图 | mermaid | mermaid 导出 SVG/PDF；用户要求 TikZ 时给 TikZ | mermaid 源码 + 导出的 PNG/SVG |
| 数据表格 | booktabs（LaTeX）| `\begin{table}` + `\booktabs` 三线表模板（见下） | Markdown 表或 CSV（粘贴 Word 后套三线表样式） |

动笔前先确认：载体（LaTeX / Word）、版式（单栏 ~90 mm / 双栏 ~190 mm）、编号体系（默认分章：图 2-1）。

## matplotlib 学术风格预设

所有数据图统一套用（对应 rules.md 第 10 节的 Springer/Elsevier 门槛）：

```python
import matplotlib as mpl
import matplotlib.pyplot as plt

# Wong 色盲友好色板 (Nature Methods, 2011)
COLORS = ["#000000", "#E69F00", "#56B4E9", "#009E73",
          "#F0E442", "#0072B2", "#D55E00", "#CC79A7"]

SINGLE_COL, DOUBLE_COL = 3.54, 7.48  # inch: 90 mm / 190 mm

def paper_style(width=SINGLE_COL):
    mpl.rcParams.update({
        "figure.figsize": (width, width * 0.618),
        "font.family": "sans-serif",
        "font.sans-serif": ["Arial", "Helvetica", "DejaVu Sans"],
        "font.size": 8, "axes.titlesize": 8, "axes.labelsize": 8,
        "xtick.labelsize": 7, "ytick.labelsize": 7, "legend.fontsize": 7,
        "axes.linewidth": 0.6, "lines.linewidth": 1.2, "lines.markersize": 4,
        "axes.spines.top": False, "axes.spines.right": False,
        "font.weight": "normal", "axes.grid": False,
        "savefig.dpi": 600, "savefig.bbox": "tight",
        "pdf.fonttype": 42, "ps.fonttype": 42,  # 字体嵌入不转曲
    })

paper_style()
# 用色: plt.plot(x, y, color=COLORS[5])
```

- 坐标轴三要素：`plt.xlabel("Time (min)")`——量名 + 单位进括号
- 误差必报：误差棒 `plt.errorbar(..., yerr=...)` 或均值线 ± 置信区间阴影 `plt.fill_between(...)`
- 保存：LaTeX 用 `plt.savefig("fig2-1.pdf")`；Word 用 `plt.savefig("fig2-1.png", dpi=600)`（线图）或 `dpi=300`（含照片内容）

## 图型选择

| 数据意图 | 图型 |
|---|---|
| 趋势/随变量变化 | 折线图 |
| 组间比较 | 柱状图（≤8 组）或分组柱 |
| 分布 | 箱线图 / 小提琴图 / 直方图 |
| 两变量关系 | 散点图（必要时加拟合线与 CI 带） |
| 构成 | 堆叠柱状图 |
| 混淆矩阵/相关性矩阵 | 热图 |

饼图、3D 效果图不用于学术文稿（rules.md 第 10 节）。

## LaTeX 三线表模板（booktabs）

```latex
\usepackage{booktabs} % 导言区

\begin{table}[htbp]
  \centering
  \caption{各方法在三个数据集上的准确率比较}
  \label{tab:2-1}
  \begin{tabular}{lccc}
    \toprule
    方法 & 数据集 A/(\%) & 数据集 B/(\%) & 数据集 C/(\%) \\
    \midrule
    基线方法        & 85.3 & 82.1 & 79.4 \\
    本文方法        & \textbf{91.2} & \textbf{88.6} & \textbf{86.0} \\
    \bottomrule
  \end{tabular}
  \begin{tablenotes}
    \small
    \item 注：加粗为最优结果；标目采用"量/(单位)"式，表内数值不带单位。
  \end{tablenotes}
\end{table}
```

规则对应（rules.md 第 10 节）：`\toprule`/`\bottomrule` 粗线、`\midrule` 细线、无竖线；表头禁斜线；有效位数一致；合计/统计行上方用 `\midrule` 分隔。

## Word / Markdown 三线表

产出 Markdown 表或 CSV 供粘贴，粘贴 Word 后手动套三线：上下框线 1.5 pt、表头下 0.75 pt、无竖线无底纹（Word 路径：表格设计 → 边框 → 先"无框线"，再分别设上下框线与表头下框线）。

```markdown
| 方法       | 数据集 A/(%) | 数据集 B/(%) | 数据集 C/(%) |
|-----------|-------------|-------------|-------------|
| 基线方法   | 85.3        | 82.1        | 79.4        |
| 本文方法   | **91.2**    | **88.6**    | **86.0**    |
注：加粗为最优结果。
```

## 图注模板

- 中文：`图 2-1 简短图题。说明句（解释全部符号与缩写；统计标注与 n 值；面板 (a)、(b) 逐一说明）。`
- 英文：`Figure 1. Short title. Descriptive sentence explaining all symbols, abbreviations, statistics, and panels.`

图注独立于图内（图内不放图题），置于图下方，须使图脱离正文可独立理解。

## 交付自查（对照 rules.md 第 10 节）

1. 编号体系正确（默认分章）且正文有"如图 X-X 所示"式提及
2. 线图为矢量 PDF 或 ≥600/1000 dpi；照片类 ≥300 dpi；RGB
3. 最终尺寸下字号 8～12 pt 全图统一、线宽达标
4. 表格三线结构、量/单位标目、数字对齐、有效位数一致
5. 色盲友好色板、不只靠颜色区分、黑白可辨
6. 图注自明（符号、缩写、统计、n 值齐全）
7. 交付含源码文件（.py/.mmd/.tex/.md），说明渲染方式
