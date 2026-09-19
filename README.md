<!-- 文件用途：说明双语静态个人站的预览、构建、内容维护与验证方法。 -->
# 梁彦诗 · Doris Liang

一个研究优先的中英文个人站。保留首页开场，作品、文章、成长轨迹、荣誉和关于页面均有独立地址。原生 JavaScript + Node 静态生成，站点无第三方运行时依赖。

## 本地预览

需要 Node.js 22+、Python 3。运行：

```powershell
pnpm dev
```

命令先生成 `dist/`，随后仅在本机启动 <http://127.0.0.1:4173/>。英文版为 <http://127.0.0.1:4173/en/>。修改内容后运行 `pnpm build` 并刷新浏览器；开发服务器不自动构建。也可不用 pnpm，直接执行 `node scripts/build.mjs`，然后执行 `python -m http.server 4173 --bind 127.0.0.1 --directory dist`。

不要在仓库根目录启动静态服务器：页面 HTML、RSS、sitemap 和 robots.txt 均由构建生成到 `dist/`。

## 检查与发布

```powershell
pnpm lint
pnpm typecheck
pnpm test
```

- `lint`：维护中文件的说明、旧卡片样式残留、焦点与减少动效规则。
- `typecheck`：兼容旧命令名，实际执行 `node --check` 语法检查，不是静态类型检查。
- `test`：自动重新构建，检查 22 页静态 HTML、全部站内路径与锚点、双语互链、八项荣誉、旧 URL 兼容，以及中文文章 SHA-256 完整性。
- `build`：单独生成 `dist/`，不启动服务器。
- `screenshots`：可选的 Playwright 截图脚本，需要开发环境另外提供 `playwright` 及 Chromium；不属于默认构建依赖。本次验收使用 Codex 浏览器，截图见 `artifacts/redesign/`。

GitHub Pages 工作流发布 `dist/`，对 `main` 的推送会触发部署。分支上的本地构建不会发布网站。

## 页面与内容维护

中文使用 `/`，英文使用 `/en/`；两种语言均有 `projects/`、四个项目详情、`notes/`、文章详情、`journey/`、`honors/`、`about/`。

- `content/site-data.js`：已提供的中文个人资料、项目、教育、实践、技能和文学原文。
- `content/locales.js`：英文事实表述、中英文界面、自我介绍与项目身份；新增内容时同步两个语言版本。
- `content/honors.js`：荣誉正式名称、年月、类别、证书路径与文章关联。
- `src/pages.js`、`src/components.js`：静态页面与共享组件；`src/hero.js` 保留原有首页开场。
- `src/routes.js`：路径约定、生产域名与旧链接兼容。
- `app.js`、`theme-init.js`：主题、手机导航和语言锚点；正文不依赖浏览器脚本。

《未选择的路》写作日期为 2025.01，获奖日期为 2026.04，分别展示。英文页翻译标题、简介与获奖信息，正文保留中文并标明原作语言。文学正文如经作者主动修订，需要同步更新完整性测试的期望摘要。

所有图片均来自已有素材。证书通过文字链接打开查看。全运会志愿服务放在关于页，不纳入八项荣誉。未提供的图片、日期与个人经历不得虚构。

旧的 `/?note=unselected-road#top` 和首页栏目锚点仍可访问，由浏览器脚本导向新页面。新页面可直接访问、刷新和分享；没有 JavaScript 时正文及普通链接仍可用，旧链接迁移和交互增强需要 JavaScript。

## 设计与验收

内容区最大宽度 1040px，阅读区 700px，使用暖白、柔和玫瑰色和细分隔线。网页界面与大开场统一复用 LivePilot-v2 网页的 LiveNest Sans SC 本地字体，文学原文保留衬线字体。项目列表只展示名称、短说明与右侧短状态；完整身份与指标进入详情页。时间轴桌面展示横向年度导航，手机纵向展开。详细约束和验证记录见 [设计说明](docs/个人站改版.md) 与 [验收记录](docs/改版验收.md)。

既有 `design-qa.md`、`hero-source-audit.md` 及 font/hero 比较脚本是上一版历史记录，不代表新版结构。参考设计归属见 `THIRD_PARTY_NOTICES.md`；没有复制 Innei 的个人内容或图片。
