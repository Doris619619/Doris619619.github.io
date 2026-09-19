# 梁彦诗 · Doris Liang Portfolio

一个以文字、灰阶与留白为主的个人作品集静态站点。视觉系统参考 Yohaku 的公开设计原则，但站点中的个人资料、项目叙述和图片均来自本仓库 `info/` 中的用户资料或用户提供的公开链接。

## 本地开发

本项目不需要安装第三方运行时依赖。

```powershell
pnpm dev
```

随后访问 <http://127.0.0.1:4173>。

## 检查与构建

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

构建产物位于 `dist/`。要生成 1440 / 1024 / 768 / 390 四个视口的深浅色验收截图，请运行：

```powershell
pnpm screenshots
```

截图保存至 `artifacts/screenshots/`；运行前需先启动本地预览。

## 更新个人资料

所有可公开的个人内容集中在 [content/site-data.js](content/site-data.js)：

- `site`：姓名、联系方式、简介与外部链接；
- `projects`：项目的背景、行动、结果、技术栈与来源；
- `experiences` / `education` / `honors` / `skills`：经历、教育、荣誉和技能。

未提供、不可虚构的资料集中列在 [content/todo.js](content/todo.js)。补充真实头像、公开文章或项目图片后，再将其接入页面；不要用素材网站图片冒充个人经历。

## 添加项目与文章

新增项目时，在 `projects` 中添加一条具有 `problem`、`action`、`result` 和 `source` 的记录。现阶段没有用户提供的公开文章，因此 Writing 入口保持隐藏；文章系统的 RSS 和空 feed 位于 `rss.xml`，在得到真实文章后再公开索引与详情页。

## 替换图片

公开可用的图片放在 `assets/`，并在 `honors` 或项目数据中引用相对路径。所有图片都应保留准确 `alt` 文案、尺寸和延迟加载。

## 设计 token

设计 token 定义在 [styles.css](styles.css)：

- 仅使用 sans / serif / mono 三类正文角色，以及仅供字标使用的 CJK / Latin 字标字体；
- 默认正文为 `14px / 22px`，完整字号 token 为 `caption-10` 至 `display-48`；
- 使用暖灰纸张色和三层 neutral scale；
- 强调色只用于焦点、CTA 与引用线；
- 支持深色模式与 `prefers-reduced-motion`。

## 许可证与归属

项目代码以本仓库后续指定的许可证为准。Yohaku 的公开设计语言仅作为视觉参考；本项目未复制 Innei 的个人文案、头像、照片、Logo 或私有代码。若未来直接引入 Yohaku 的公开代码，请依其 MIT 许可证保留 attribution。
