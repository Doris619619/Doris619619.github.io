// 文件用途：生成中英文独立 HTML、404、RSS 和 sitemap，输出可直接托管的 GitHub Pages 站点。
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pageKeys, renderPage } from "../src/pages.js";
import { documentPage, escape } from "../src/components.js";
import { origin, languages, pathFor } from "../src/routes.js";
import { localizedNotes } from "../content/locales.js";

const workspace = resolve(import.meta.dirname, "..");
const output = resolve(workspace, "dist");
if (output !== join(workspace, "dist")) throw new Error("Build output must remain within the workspace dist directory");
await rm(output, { recursive: true, force: true });
await mkdir(join(output, "src"), { recursive: true });
for (const entry of ["styles.css", "app.js", "theme-init.js", "favicon.svg", "assets", "src/routes.js", "src/redirect.js", "src/motion.js"]) {
  await cp(join(workspace, entry), join(output, entry), { recursive: true });
}
for (const lang of languages) {
  for (const key of pageKeys) {
    const directory = join(output, pathFor(key, lang));
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, "index.html"), documentPage(renderPage(key, lang)));
  }
}
// Keep old bookmarks working without retaining a duplicate page or indexing redirects.
for (const lang of languages) {
  const destination = pathFor("", lang) + "#life-timeline";
  const directory = join(output, pathFor("journey", lang));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), `<!doctype html><html lang="${lang === "en" ? "en" : "zh-CN"}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><link rel="canonical" href="${origin}${pathFor("", lang)}"><title>${lang === "en" ? "Timeline moved" : "时间线已迁移"}</title><script type="module" src="/src/redirect.js"></script><noscript><meta http-equiv="refresh" content="0;url=${destination}"></noscript></head><body><a href="${destination}">${lang === "en" ? "Continue to the homepage timeline" : "前往首页时间线"}</a></body></html>`);
}
const urls = languages.flatMap((lang) => pageKeys.map((key) => `${origin}${pathFor(key, lang)}`));
await writeFile(join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`);
const feedNotes = localizedNotes("zh").sort((a, b) => b.date.localeCompare(a.date));
await writeFile(join(output, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>梁彦诗 · Doris Liang</title><link>${origin}/notes/</link><description>故事与思考 · Writing</description><language>zh-CN</language>${feedNotes.map((note) => `<item><title>${escape(note.title)}</title><link>${origin}/notes/${note.slug}/</link><guid>${origin}/notes/${note.slug}/</guid><description>${escape(note.summary || "")}</description></item>`).join("")}</channel></rss>`);
await writeFile(join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(join(output, ".nojekyll"), "");
await writeFile(join(output, "404.html"), '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>页面不存在 · Page not found</title><link rel="stylesheet" href="/styles.css"></head><body><main class="reading-shell"><h1>页面不存在</h1><p>Page not found.</p><p><a href="/">返回首页</a> · <a href="/en/">English home</a></p></main></body></html>');
console.log(`build passed: ${urls.length} static pages in dist/`);
