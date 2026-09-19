// 文件用途：从全新构建验证静态路由、双语互链、原文完整性、奖项及全部站内链接。
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { notes, projects } from "../content/site-data.js";
import { honors } from "../content/honors.js";
import { localizedProjects, localizedJourney, localizedEducation, ui } from "../content/locales.js";
import { pageKeys } from "../src/pages.js";
import { origin, pathFor, legacyDestination, languages } from "../src/routes.js";
import { escape } from "../src/components.js";

execFileSync(process.execPath, ["scripts/build.mjs"], { stdio: "inherit" });
const pages = new Map();
for (const lang of languages) {
  for (const key of pageKeys) {
    const route = pathFor(key, lang);
    const html = await readFile(join("dist", route, "index.html"), "utf8");
    pages.set(route, html);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Exactly one page heading: ${route}`);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Unique IDs: ${route}`);
    assert.ok(html.includes(`<html lang="${lang === "en" ? "en" : "zh-CN"}">`));
    assert.ok(html.includes(`rel="canonical" href="${origin}${route}"`));
    assert.ok(html.includes(`href="${pathFor(key, lang === "en" ? "zh" : "en")}"`), `Language counterpart: ${route}`);
    assert.ok(!html.includes("undefined"), `No missing translated values: ${route}`);
    assert.ok(html.includes("/assets/fonts/livenest-sans-sc.woff2"), `Self-hosted UI font: ${route}`);
    assert.ok(!html.includes("work-card"), `No old project cards: ${route}`);
  }
}

// Check file existence and fragment targets from every generated document, not just known navigation links.
let checkedLinks = 0;
for (const [route, html] of pages) {
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll("&amp;", "&"), origin + route);
    if (url.origin !== origin) continue;
    const target = pages.get(url.pathname);
    if (url.pathname.endsWith("/")) assert.ok(target, `Missing page ${url.pathname} linked from ${route}`);
    else await access(join("dist", decodeURIComponent(url.pathname)));
    if (url.hash && target) assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `Missing fragment ${url.href}`);
    checkedLinks++;
  }
}

const font = await readFile("dist/assets/fonts/livenest-sans-sc.woff2");
assert.equal(createHash("sha256").update(font).digest("hex"), "f1121e7ef2838d3cbce718ce794fd3bf3da5e5707de07d34df3cbbed9801495c", "Reuse the exact LivePilot-v2 web font");
await access("dist/assets/fonts/OFL.txt");
assert.equal(honors.length, 8);
assert.equal(new Set(honors.map((item) => item.id)).size, 8);
assert.deepEqual(honors.map((item) => item.date).sort(), ["2024-10", "2025-04", "2025-11", "2025-12", "2026-04", "2026-04", "2026-05", "2026-09"]);
assert.deepEqual(["academic", "creative", "sport"].map((category) => honors.filter((item) => item.category === category).length), [3, 2, 3]);
assert.equal(createHash("sha256").update(JSON.stringify(notes[0].paragraphs)).digest("hex"), "efc0b689af68ecf9257f3edca852db4a8d6c52b1db5229b6b586f6b89dd749b0", "Chinese literary original must remain unchanged");
for (const lang of languages) {
  assert.deepEqual(Object.keys(ui[lang]).sort(), Object.keys(ui.zh).sort());
  assert.equal(localizedProjects(lang).length, 4);
  assert.equal(localizedJourney(lang).length, 5);
  assert.equal(localizedEducation(lang).length, 2);
  const awardsHtml = pages.get(pathFor("honors", lang));
  for (const honor of honors) {
    assert.equal((awardsHtml.match(new RegExp(`id="${honor.id}"`, "g")) || []).length, 1);
    assert.ok(awardsHtml.includes(escape(honor.title[lang])));
    assert.ok(awardsHtml.includes(escape(honor.result[lang])));
  }
  const story = pages.get(pathFor("notes/unselected-road", lang));
  for (const paragraph of notes[0].paragraphs) assert.ok(story.includes(`<p>${escape(paragraph)}</p>`));
  assert.ok(story.includes('datetime="2025-01"'));
  assert.ok(story.includes("2026.04"));
  assert.ok(story.includes('lang="zh-CN"'));
  for (const key of ["", "notes", "notes/unselected-road"]) assert.ok(pages.get(pathFor(key, lang)).includes(pathFor("honors", lang) + "#lingyu"));
  assert.ok(pages.get(pathFor("about", lang)).includes("81.50"));
  assert.ok(!awardsHtml.includes("81.50"));
  for (const project of projects) {
    const html = pages.get(pathFor(`projects/${project.id}`, lang));
    if (project.link) assert.ok(html.includes(escape(project.link)));
    if (project.secondaryLink) assert.ok(html.includes(escape(project.secondaryLink)));
  }
}
assert.equal(legacyDestination(new URL(`${origin}/?note=unselected-road#top`)), "/notes/unselected-road/");
assert.equal(legacyDestination(new URL(`${origin}/en/?note=unselected-road#top`)), "/en/notes/unselected-road/");
for (const [hash, route] of [["work", "projects/"], ["notes", "notes/"], ["journey", "journey/"], ["about", "about/"], ["contact", "about/#contact"], ["grace", "projects/grace/"]]) {
  assert.equal(legacyDestination(new URL(`${origin}/#${hash}`)), `/${route}`);
}
assert.equal(legacyDestination(new URL(`${origin}/#top`)), null);
assert.equal(legacyDestination(new URL(`${origin}/honors/#lingyu`)), null);
assert.equal(legacyDestination(new URL(`${origin}/?note=unknown`)), null);
assert.ok((await readFile("dist/rss.xml", "utf8")).includes("/notes/unselected-road/"));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 22);
assert.ok((await readFile("dist/404.html", "utf8")).includes("Page not found"));
console.log(`tests passed: ${pages.size} static pages, ${checkedLinks} internal references, 8 honors, original-text digest, language parity, and legacy URLs`);
