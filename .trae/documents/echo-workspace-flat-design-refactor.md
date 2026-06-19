# Echo Workspace — VEX-Timeline Flat Design 重构计划

## Summary

将 `/workspace/echo-workspace.html` 从深色科技风改写为严格遵循 `DESIGN.md` (VEX-Timeline Flat Design) 的浅色扁平化设计;同时彻底删除所有 Trae 比赛/报名相关内容与 Hero 顶部的"AI Innovation Competition 2026"徽章;Hero 直接从**项目介绍**开始,不再展示 Project Timeline mock。

**用户决策(已确认)**:
- 范围:同时删除比赛相关上下文(Hero 徽章、报名 CTA、Footer 报名链接、CTA 板块)
- 技术栈:**保留原生 CSS**,按 DESIGN.md 重写(不使用 Tailwind CDN;用内联 SVG 替代 lucide)
- 模式:**仅 Light 模式**,不实现 `prefers-color-scheme`

---

## Current State Analysis

**当前文件**:`/workspace/echo-workspace.html`(约 1242 行,单文件 HTML,含 Canvas 粒子动画、滚动渐入、深色科技风)

**现有内容板块顺序**:
1. Nav(含"立即报名"外链)
2. **Hero(以 Project Timeline mock 卡为主体视觉)**
3. Pain Points
4. Solution Flow
5. Core Features
6. Use Cases
7. Vision
8. **CTA 板块(立即报名参赛)**
9. Footer(含"报名参赛"链接与"AI Innovation Competition Entry"版权副标)

**违反 DESIGN.md 的现有写法**:
- `box-shadow` 大量出现(`.hero-mock`、`.btn-primary`、`.feature-card:hover` 等)
- `backdrop-filter: blur(...)`(`.nav.scrolled`、`.hero-mock`)
- 文字/边框渐变(`.hero-title .highlight`、`.vision-stat-num`、`.section-title .highlight`)
- 深色背景 `#06060e`,违反浅色单色板
- 字体: Sora / Outfit / JetBrains Mono 三套,违反 DESIGN.md 单一 Outfit 规范
- 装饰: Canvas 粒子(青色 + 连线)与"零人工深度"原则冲突

**应删除的 Trae/比赛内容**:
- Nav 中"立即报名"项
- Hero Badge `AI Innovation Competition 2026`
- Hero CTA "立即报名参赛"
- Hero `.hero-mock` 整块(含 `Project Timeline — AI Generated` 标题)
- `cta-section`(整段)
- Footer 副标"AI Innovation Competition Entry"
- Footer 链接"报名参赛"

---

## Proposed Changes

### 改动文件清单
- **修改**:`/workspace/echo-workspace.html`(整文件重写)
- **不创建**新文件,保留单文件可运行特性

### 1. `<head>` 改造

- 替换 `<title>`:`Echo Workspace — 让每一次创造都拥有长期记忆`
- Google Fonts `<link>` 替换为 Outfit 单字体:
  ```
  https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap
  ```
- 删除 Sora / JetBrains Mono 加载
- 删除 `<style>` 全部内容,按 DESIGN.md 重写(见第 2 节)

### 2. CSS Token 与样式重写

`:root` 完全替换为:
```css
:root {
  --canvas:        #FFFFFF;
  --fg:            #111827;
  --fg-muted:      #6B7280;
  --primary:       #3B82F6;
  --primary-hover: #2563EB;
  --secondary:     #10B981;
  --accent:        #F59E0B;
  --muted:         #F3F4F6;
  --border:        #E5E7EB;
  --font-sans:     'Outfit', system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  --radius-md:     6px;
  --radius-lg:     8px;
  --radius-full:   9999px;
  --t-fast:        200ms;
  --t-base:        300ms;
  --ease:          cubic-bezier(.2,.8,.2,1);
}
```
**不实现** `@media (prefers-color-scheme: dark)`。

**强制约束**:
- 全局 `box-shadow: none`(在 `*` 选择器中显式声明,杜绝遗漏)
- 全局禁止 `backdrop-filter`
- 按钮/卡片禁止渐变,渐变仅可出现在背景装饰的低透明度几何形状

**核心组件样式**:
- `.btn`:h-56(56px)、px-7、uppercase、tracking-wider、font-semibold、rounded-md
- `.btn-primary`:`bg-primary`、白字;`hover:bg-primary-hover hover:scale-105`;**无阴影**
- `.btn-secondary`:`bg-muted`、`text-fg`;`hover:bg-border hover:scale-105`
- `.card`:无 border 无 shadow;`p-8`、rounded-lg;`hover:scale-[1.02]`
- `.card--primary/--secondary/--accent/--muted`:对应底色实色块
- `.tag`:rounded-full、uppercase、tracking-wider、font-semibold
- `.eyebrow`:uppercase、tracking-[0.12em]、font-semibold、`text-primary`、小字号
- `.icon-bubble`:56px 圆;`bg-primary`/`bg-white`;`group-hover:scale-110`
- `.section--muted/--primary/--secondary/--accent`:背景硬切,无渐变

**几何装饰**:
- `.deco`:绝对定位、`pointer-events: none`、低透明度 (`opacity: .08` ~ `.15`)、用纯色填充
- 提供三类形状:`.deco--circle`(大圆)、`.deco--square`(旋转方块)、`.deco--bar`(长条)
- 移动端 (`max-width: 640px`) `display: none` 隐藏装饰

**滚动渐入**:
```css
.reveal { opacity: 0; transform: translateY(24px);
  transition: opacity .6s var(--ease), transform .6s var(--ease); }
.reveal.visible { opacity: 1; transform: none; }
```

### 3. 删除清单(精确到当前行号)

| 类别 | 当前行号 | 内容 | 处理 |
|---|---|---|---|
| Nav 报名项 | 754 | `<li>…立即报名…trae.cn…</li>` | 整行删除 |
| Hero Badge | 762-764 | `<div class="hero-badge reveal">AI Innovation Competition 2026</div>` | 整段删除 |
| Hero CTA | 774-777 | `<a href="…trae.cn…" class="btn btn-primary">立即报名参赛</a>` | 替换为 `#features` 锚链"探索功能" |
| Hero Visual | 781-820 | `<div class="hero-visual">…hero-mock…</div>` | **整段删除** |
| CTA 板块 | 1052-1064 | `<section class="cta-section">` 整段 | 整段删除 |
| Footer 副标 | 1070 | `&copy; 2026 Echo Workspace. AI Innovation Competition Entry.` | 改为 `&copy; 2026 Echo Workspace.` |
| Footer 报名链接 | 1075 | `<a href="…trae.cn…" target="_blank">报名参赛</a>` | 整行删除 |

**CSS 同步删除**:
- `.noise-overlay`(55-60)
- `#hero-canvas { position: fixed; }` 的覆盖层(63-66)
- `.nav.scrolled` 的 `backdrop-filter`(76-79)
- `.nav-cta` 整套(110-123)
- `.hero-badge` / `.hero-badge-dot` / `@keyframes pulse-dot`(138-153, 94-97)
- `.hero-title .highlight` 渐变(161-165)
- `.btn-primary` 的 `box-shadow: 0 0 40px`(185)
- `.hero-mock` 及所有 `.mock-*`(207-291)
- `.pain-card` 的 `box-shadow` 与 `radial-gradient ::after`(328-347)
- `.feature-card` 的 `box-shadow`(427)
- `.usecase-card` 的 `::before` 渐变条与 `box-shadow`(547, 549-555)
- `.vision-section::before` 的 `radial-gradient`(608-615)
- `.vision-stat-num` 渐变文字(636-640)
- `.cta-section` / `.cta-card` 整套(646-674)
- `.section-title .highlight` 渐变(306-310)
- `body` 的深色背景与文字(48-50)

**JS 同步删除**:
- `// Parallax effect on hero visual`(1216-1229)
- Canvas 粒子整套: `class Particle`、`drawConnections`、`animate`、`resizeCanvas` 监听、`document.addEventListener('mousemove')`、粒子初始化循环(1080-1176, 1231-1240)

### 4. 新 `<body>` 结构(板块顺序与背景色块)

| # | 区块 | ID | 背景色块 | 说明 |
|---|---|---|---|---|
| 1 | Nav | — | `bg-canvas` | scroll 后加 `border-bottom: 2px solid var(--border)` |
| 2 | **Hero(项目介绍)** | `#about` | `bg-canvas` + 几何装饰 | **首屏从产品主张开始**,不再以 Project Timeline mock 开头 |
| 3 | Pain Points | `#pain` | `bg-muted` | 信息碎片化 / 经验难传承 / 协作断层 |
| 4 | Solution Flow | `#solution` | `bg-canvas` | 4 步流程 |
| 5 | Core Features | `#features` | `bg-primary` 蓝底白字 | 三张色块卡(三种不同底色制造拼接感) |
| 6 | Use Cases | `#scenarios` | `bg-muted` | Research / Engineering / Creation + 机器人来源卡 |
| 7 | Vision | `#vision` | `bg-secondary` 绿底白字 | "让每一个创造过程都拥有长期记忆" |
| 8 | Footer | — | `bg-fg` 深底 | 版权 + 锚链(无外链) |

**Section 背景硬切顺序**:White → Muted → White → Primary(蓝)→ Muted → Secondary(绿)→ Dark(底)。**禁止任何渐变过渡**。

### 5. Hero 板块文案(项目介绍开头)

```html
<section class="hero" id="about">
  <div class="hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">PROJECT MEMORY × AI</span>
      <h1 class="display">让每一次创造,<br>都拥有<span class="hl">长期记忆</span>。</h1>
      <p class="lead">Echo Workspace 是 AI 驱动的项目记忆与协作平台,帮助科研、工程开发、创意设计等长期项目记录、整理并理解整个创新过程,把碎片化资料转化为结构化的项目演化记录。</p>
      <div class="cta-row">
        <a href="#features" class="btn btn-primary">探索功能 <svg…arrow-right/></a>
        <a href="#scenarios" class="btn btn-secondary">查看应用场景</a>
      </div>
      <ul class="hero-meta">
        <li><strong>3</strong> 大核心能力</li>
        <li><strong>4</strong> 类团队场景</li>
        <li><strong>1</strong> 个 AI 项目大脑</li>
      </ul>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="deco deco--circle"></div>
      <div class="deco deco--square"></div>
      <div class="deco deco--bar"></div>
    </div>
  </div>
</section>
```

- "长期记忆"用 `color: var(--primary)` 实色,**无渐变**
- Hero 右侧纯几何色块装饰(直径 480 圆 + 旋转 12° 方块 + 长条),`opacity: .08`~`.15`
- 数字 "3 / 4 / 1" 使用大字号 font-extrabold 制造海报张力
- 移动端 hero 改单列,`.hero-art` 隐藏或缩小

### 6. Project Timeline 在新结构中的位置

- **不再**作为 Hero 主视觉
- 改为 **Core Features 区块**第 1 张色块卡的标题与说明:"AI Project Timeline · 智能项目时间轴"
- 该卡片内可用简化版的 mock(纯文字 + 标签,无 box-shadow / backdrop-filter),放在色块卡内部

### 7. Footer 改造

```html
<footer class="footer">
  <div class="footer-grid">
    <div>
      <div class="footer-logo">Echo Workspace</div>
      <p class="footer-tag">让每一个创造过程都拥有长期记忆。</p>
    </div>
    <ul class="footer-links">
      <li><a href="#about">项目介绍</a></li>
      <li><a href="#features">核心功能</a></li>
      <li><a href="#scenarios">应用场景</a></li>
      <li><a href="#vision">愿景</a></li>
    </ul>
  </div>
  <div class="footer-bottom">&copy; 2026 Echo Workspace.</div>
</footer>
```
- 背景 `var(--fg)`(#111827)深底白字
- 不出现 "AI Innovation Competition Entry" 与 "报名参赛" 链接

### 8. JS 改造

**保留**:
- `IntersectionObserver` 滚动渐入逻辑
- 平滑滚动
- Nav scroll 状态(改 `.scrolled` 颜色为白底 + 2px 实色下边框)

**删除**:
- Hero parallax(行 1216-1229)
- Canvas 粒子整套(若执行方案 A)或仅改色(若执行方案 B)

**决策**:采用**方案 A** — 完全删除 Canvas 粒子,改用纯 CSS + 内联 SVG 几何装饰。最严格执行 DESIGN.md"零人工深度"原则,避免浅色背景下粒子几乎不可见的视觉违和。

### 9. 实施步骤顺序

1. 备份当前文件:`/workspace/echo-workspace.html` → `/workspace/echo-workspace.html.bak`
2. 替换 `<head>`:`<title>`、Google Fonts `<link>`、`<style>` 全部
3. 重写 `<body>` 顶层结构(按第 4 节顺序)
4. 删除第 3 节清单中所有元素
5. 删除 Hero Visual / CTA 板块 / Footer 报名相关节点
6. 改造 `<script>`:删除 Canvas、parallax;保留 Scroll Reveal 与平滑滚动
7. 本地启动 `python3 -m http.server 8765`
8. 浏览器验证

---

## Assumptions & Decisions

| 决策点 | 取值 | 理由 |
|---|---|---|
| 是否引入 Tailwind CDN | 否 | 用户明确"保留原生 CSS" |
| 是否引入 lucide CDN | 否(用内联 SVG 替代) | 与"保留原生 CSS"一致;减少外部依赖 |
| 是否实现深色模式 | 否 | 用户明确"仅 Light 模式" |
| 是否保留 Canvas 粒子 | **否(方案 A)** | 最符合 DESIGN.md"零人工深度"原则;白底青色粒子几乎不可见 |
| Hero 是否出现 Project Timeline | **不出现** | 用户明确"删掉开头的 Project Timeline 全部内容" |
| Hero Badge 是否删除 | **是** | 用户明确"同时删比赛相关上下文" |
| 强调文字是否使用渐变 | **否(全部实色)** | DESIGN.md 强调"颜色即结构,硬切" |
| 内联 SVG 图标统一规范 | `stroke-width="2"`、`stroke-linecap="round"`、`stroke-linejoin="round"`、`fill="none"`、`viewBox="0 0 24 24"` | 与 lucide 默认风格保持一致,视觉统一 |
| Footer 背景 | `var(--fg)` 深底 | 与 DESIGN.md "Dark gray Footer" 一致;与前一个 Secondary 绿底形成色块节奏 |
| 移动端装饰是否显示 | 否 | 性能 + 扁平简洁 |

---

## Verification

1. **本地预览**:`python3 -m http.server 8765` → `http://localhost:8765/echo-workspace.html`,Chrome 打开无 404、无 console 错误。
2. **关键字搜索**(DevTools Ctrl+Shift+F):
   - 不应出现 `trae.cn`
   - 不应出现 `AI Innovation Competition`
   - 不应出现 `立即报名`
   - 不应出现 `Project Timeline — AI Generated`
3. **滚动渐入**:从顶部缓慢下滚,所有 `.reveal` 元素进入视口时上浮 + 淡入。
4. **颜色对比**(Lighthouse / axe DevTools):
   - `#111827` on `#FFFFFF`:对比比 ≥ 16(AAA)
   - `#FFFFFF` on `#3B82F6` 蓝底:对比比 ≥ 4.5(AA)
   - `#111827` on `#F59E0B` 琥珀底:对比比 ≥ 4.5(AA)
   - `#FFFFFF` on `#10B981` 绿底:对比比 ≥ 4.5(AA)
5. **DESIGN.md 合规**(DevTools Console):
   ```js
   [...document.querySelectorAll('*')]
     .filter(el => getComputedStyle(el).boxShadow !== 'none').length
   // 期望:0

   [...document.querySelectorAll('*')]
     .filter(el => getComputedStyle(el).backdropFilter !== 'none').length
   // 期望:0

   getComputedStyle(document.body).fontFamily
   // 期望:包含 "Outfit"
   ```
6. **响应式**:
   - 1440px:三列网格 + Hero 双栏
   - 768px:网格 1 列,装饰元素隐藏
   - 375px:所有 section padding 缩小,文字不溢出
7. **Hero 内容验证**:
   - 首屏不出现 Project Timeline mock 文字
   - 首屏出现"让每一次创造,都拥有长期记忆。"
   - 出现两个按钮(探索功能 / 查看应用场景),无外链
8. **文件体积**:单文件 ≤ 60KB(Gzip 后 ≤ 18KB)

---

## Key Files

- 修改目标:[`/workspace/echo-workspace.html`](computer:///workspace/echo-workspace.html)
- 设计系统源:`/workspace/.uploads/b71eafe5-5a2b-4c31-a49f-3d38d3994594_DESIGN.md`
- 备份(实施时创建):`/workspace/echo-workspace.html.bak`
