import { access, readFile } from "node:fs/promises";
const expectedFiles = ["index.html", "styles.css", "app.js", "content/site-data.js", "content/todo.js", "robots.txt", "sitemap.xml", "rss.xml"];
await Promise.all(expectedFiles.map((file) => access(file)));
const [html, app, data, css] = await Promise.all([readFile("index.html", "utf8"), readFile("app.js", "utf8"), readFile("content/site-data.js", "utf8"), readFile("styles.css", "utf8")]);
for (const expected of ["lang=\"zh-CN\"", "prefers-reduced-motion", "梁彦诗", "I turn", "Engineering", "Robotics", "GRACE", "RoboMaster", "VR-GS", "CS184 Showcase", "手记", "未选择的路", "2025.01", "unselected-road", "renderNotePage", "essay-page", "26b172be3a63bb9123d2302763bc00da.jpg", "id=\"main\"", "github-mark", "dac-mark", "social-tooltip", "打开 GitHub", "DAC 63"]) { if (!`${html}\n${app}\n${data}\n${css}`.includes(expected)) throw new Error(`Missing expected portfolio content: ${expected}`); }
console.log("tests passed");
