# Echo Workspace

> **记录创新过程,让每一次改变都有迹可循。**

Echo Workspace 是一个由 AI 驱动的**创新过程记忆系统**。它把每一次尝试、失败、迭代与经验沉淀为可追溯的项目演化记录,让团队不仅知道项目最终是什么,更理解它为什么变成现在的样子。

本仓库是 Echo Workspace 的**独立产品宣传官网**(Marketing Site),用纯 HTML / CSS / JavaScript 构建,无任何构建步骤、无外部资源依赖(除 Google Fonts),可直接双击 `index.html` 在浏览器中打开。

---

## 项目介绍

在长期创新项目中,真正决定成败的"过程性信息"——尝试、调整、放弃的方案、当时的判断——往往没有被任何工具完整保留。大量重要信息分散在聊天记录、文档、图片、视频和个人经验中,随着时间推移,团队很难追踪项目为什么做出某些决定,也难以复用过去积累的经验。

Echo Workspace 希望通过 AI 帮助用户保存项目演化过程,让经验能够被理解、复用和传承。

---

## 产品形态

一个 Web 端 AI 工作空间,围绕"过程"而非"结果"组织信息:

- **Timeline** — 自动汇集图片、文档、聊天记录与简单描述,生成带时间、阶段、原因、影响的项目演化轨迹
- **AI Intelligence** — 识别关键阶段、提炼重要决策、解释方案背后的取舍
- **Project Report** — 将复杂的开发过程转化为清晰可分享的复盘文档

围绕"记录 → 理解 → 沉淀 → 复用"四步循环,把碎片经验变成可传承的项目记忆。

---

## 目标用户

适合所有需要长期创造的团队:

- **学生创新团队** — 记录比赛项目、毕业设计、社团开发的全过程
- **科研团队** — 保存实验过程、研究思路、模型迭代与论文脉络
- **工程团队** — 追踪架构决策、性能优化、技术选型与故障复盘
- **产品团队** — 沉淀产品决策过程,让所有讨论、放弃的方向与最终选择都成为团队共同的知识资产

---

## 真实来源

Echo Workspace 不是一个凭空设计的产品概念,而是来自长期工程项目的真实痛点:最有价值的不只是最终成果,而是过程中积累的经验、判断和思考。

---

## 仓库结构

```
.
├── index.html      # 7 个 section 的语义化 HTML(Hero / Pain / Value / Workflow / Scenarios / Origin / CTA)
├── styles.css      # CSS 变量 + BEM 组件库 + Dark Mode + 响应式三档断点
├── script.js       # 滚动 reveal / 动画 / 汉堡 / 主题同步(零依赖)
├── favicon.svg     # 浏览器标签页图标(Liquid Glass 时间轴)
├── icons/          # PNG 多尺寸图标(32 / 192 / 512)
└── README.md
```

**设计系统**:VEX-Timeline Flat Design——零 box-shadow、零 backdrop-blur、零渐变,Outfit 单一字体,色块硬切,装饰几何用绝对定位低透明度方块与圆环。

**配色**:White / Muted / Blue(Primary)/ Emerald(Secondary)/ Amber(Accent)/ Fg(深),暗色模式自动跟随系统设置。

---

## 本地运行

无需任何构建工具,任意一种方式即可预览:

### 方式一:Python 内置 HTTP 服务(推荐)

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

### 方式二:直接打开

```bash
# macOS
open index.html

# Linux
xdg-open index.html
```

### 方式三:Node 简易服务

```bash
npx serve .
```

---

## 部署

由于是纯静态文件,任意静态托管服务都支持:

- **GitHub Pages**:在仓库 Settings → Pages 中选择 `main` 分支根目录即可
- **Vercel / Netlify / Cloudflare Pages**:直接拖拽文件夹,自动识别
- **自有服务器**:将 `index.html`、`styles.css`、`script.js`、`favicon.svg` 四个文件部署到任意 Web 根目录

---

## 浏览器兼容

- Chrome / Edge / Firefox / Safari 最新两个大版本
- 移动端 Safari / Chrome(响应式断点 1100 / 900 / 640)
- 启用 `prefers-reduced-motion` 时自动关闭所有过渡与装饰动画

---

## License

MIT
