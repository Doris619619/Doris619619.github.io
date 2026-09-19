// 文件用途：生成可复用的导航、页脚、项目条目与获奖文章入口。
import { professionalLinks } from "./social.js";
import { site } from "../content/site-data.js";
import { honors } from "../content/honors.js";
import { ui, localizedNote, projectContext } from "../content/locales.js";
import { portfolioCopy, projectPresentation } from "../content/portfolio.js";
import { pathFor, origin } from "./routes.js";
import { icon, arrow } from "./icons.js";

/** Escape content before inserting it into text or quoted HTML/XML attributes. */
export function escape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

/** Format a supplied month without inventing a day. */
export function date(value) { return value.replaceAll("-", "."); }

/** Generate a compact section header with an optional real navigation link. */
export function sectionHeading(title, link = "", label = "") {
  return `<div class="section-heading"><h2>${escape(title)}</h2>${link ? `<a class="quiet-link" href="${link}">${escape(label)} <span aria-hidden="true">→</span></a>` : ""}</div>`;
}

/** Shared navigation marks the current section and links to the same page in the other language. */
function header(key, lang) {
  const t = ui[lang];
  const current = key.split("/")[0] || "home";
  const links = ["home", "projects", "notes", "journey", "about"].map((name) => `<a href="${pathFor(name === "home" ? "" : name, lang)}"${current === name ? ' aria-current="page"' : ""}>${t[name]}</a>`).join("");
  return `<header class="site-header" id="top"><a class="wordmark" href="${pathFor("", lang)}"><span>梁彦诗</span><em>Doris Liang</em></a><div class="header-controls"><nav class="nav" id="primary-nav" aria-label="${t.nav}">${links}</nav><a class="language-switch" lang="${lang === "en" ? "zh-CN" : "en"}" hreflang="${lang === "en" ? "zh-CN" : "en"}" href="${pathFor(key, lang === "en" ? "zh" : "en")}">${lang === "en" ? "中文" : "EN"}</a><button class="theme-button" type="button" aria-label="${t.theme}" aria-pressed="false">${icon("moon")}</button><button class="menu-button" type="button" aria-expanded="false" aria-controls="primary-nav">${t.menu}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></header>`;
}

/** Keep contact and secondary destinations reachable without a large marketing footer. */
function footer(lang) {
  const t = ui[lang];
  return `<footer class="site-footer"><div><a class="footer-name" href="${pathFor("about", lang)}">${t.rights}</a><p>© 2026 · EDA / AI / Robotics</p></div><nav aria-label="${lang === "en" ? "Footer" : "页脚导航"}"><a href="${pathFor("honors", lang)}">${t.honors}</a><a href="${pathFor("journey", lang)}">${t.journey}</a><a href="mailto:${site.email}">${t.contact}</a><a href="${site.github}">GitHub ${arrow}</a>${professionalLinks()}<a href="${pathFor("about", lang)}#creator">${lang === "en" ? "Douyin" : "抖音"}</a><a href="/rss.xml">RSS</a></nav></footer>`;
}

/** Produce a complete static document, including page-specific sharing and language metadata. */
export function documentPage({ key, lang, title, description, body }) {
  const canonical = `${origin}${pathFor(key, lang)}`;
  return `<!doctype html>
<!-- 文件用途：由构建脚本生成的独立静态页面，请修改内容数据或页面模板。 -->
<html lang="${lang === "en" ? "en" : "zh-CN"}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)} · ${lang === "en" ? "Doris Liang" : "梁彦诗"}</title><meta name="description" content="${escape(description)}"><meta name="theme-color" content="#fdfcf8"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="zh-CN" href="${origin}${pathFor(key)}"><link rel="alternate" hreflang="en" href="${origin}${pathFor(key, "en")}"><link rel="alternate" hreflang="x-default" href="${origin}${pathFor(key)}"><meta property="og:title" content="${escape(title)} · Doris Liang"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="${key.startsWith("notes/") ? "article" : "website"}"><meta property="og:locale" content="${lang === "en" ? "en_US" : "zh_CN"}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="alternate" type="application/rss+xml" title="Doris Liang · Writing" href="/rss.xml"><script src="/theme-init.js"></script><link rel="preload" href="/assets/fonts/livenest-sans-sc.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"></head><body><a class="skip-link" href="#main">${ui[lang].skip}</a>${header(key, lang)}<main id="main" tabindex="-1">${body}</main>${footer(lang)}<script type="module" src="/app.js"></script></body></html>`;
}

/** Show supplied project dates separately from publication years; summer does not imply exact months. */
export function projectPeriod(project, lang) {
  const { start, end, ongoing, season } = project.period;
  const beginning = `<time datetime="${start}">${date(start)}</time>`;
  const ending = end ? ` — <time datetime="${end}">${date(end)}</time>` : ongoing ? ` — ${lang === "en" ? "present" : "至今"}` : "";
  return `${beginning}${season === "summer" ? (lang === "en" ? " summer" : " 夏") : ending}`;
}

/** Keep dates, authorship, contribution and evidence in one reading column; links have distinct destinations. */
export function projectRow(project, lang, heading = "h2") {
  const t = portfolioCopy[lang];
  const copy = projectPresentation[project.id][lang];
  const featured = project.id === "grace";
  const pdfLink = paperPdfLink(project, lang);
  const externalLink = featured || project.id === "vrgs" ? `<a href="${escape(project.link)}">${featured ? t.paper : t.report} <span aria-hidden="true">↗</span></a>` : "";
  return `<article class="project-row${featured ? " project-featured" : ""}"><p class="project-meta"><span>${escape(projectContext[project.id][lang])}</span><span class="project-period">${projectPeriod(project, lang)}</span></p><${heading}><a href="${pathFor(`projects/${project.id}`, lang)}">${escape(copy.title)}</a></${heading}><p class="project-status">${escape(project.status)}</p><p class="project-summary">${escape(copy.text)}</p>${featured ? `<p class="project-result"><span>${t.result}</span>${escape(project.result)}</p>` : ""}<div class="project-links">${pdfLink}${externalLink}<a href="${pathFor(`projects/${project.id}`, lang)}">${t.detail} <span aria-hidden="true">→</span></a></div></article>`;
}

/** Connect the award and the story from every article entry point using one award record. */
export function awardLine(lang) {
  const award = honors.find((item) => item.noteSlug === "unselected-road");
  return `<a class="award-link" href="${pathFor("honors", lang)}#${award.id}">${date(award.date)} · ${escape(award.title[lang])} · ${lang === "en" ? "Second Prize" : "二等奖"}</a>`;
}

/** Show the real writing date independently of the later award date. */
export function noteEntry(lang, heading = "h2") {
  const note = localizedNote(lang);
  return `<article class="note-entry"><time datetime="2025-01">${note.date}</time><div><${heading}><a href="${pathFor(`notes/${note.slug}`, lang)}">${escape(note.title)} <span aria-hidden="true">→</span></a></${heading}><p>${escape(note.summary)}</p>${awardLine(lang)}</div></article>`;
}

/** Render a direct full-text link only when a verified PDF destination is configured. */
export function paperPdfLink(project, lang) {
  return project.pdfUrl ? `<a href="${escape(project.pdfUrl)}" target="_blank" rel="noopener">${lang === "en" ? "Paper PDF" : "论文 PDF"} <span aria-hidden="true">↗</span></a>` : "";
}
