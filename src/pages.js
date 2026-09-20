// 文件用途：生成首页、作品、文章、荣誉与关于页的双语静态内容。
import { site, projects, skills, notes } from "../content/site-data.js";
import { honors } from "../content/honors.js";
import { introduction, ui, localizedProjects, localizedNote } from "../content/locales.js";
import { portfolioCopy } from "../content/portfolio.js";
import { profileIntroduction, projectGroup } from "./portfolio.js";
import { homeTimeline } from "./timeline.js";
import { honorsTimeline, honorsEntry } from "./honors.js";
import { hero } from "./hero.js";
import { creatorProfile, professionalLinks } from "./social.js";
import { notesArchive } from "./notes.js";
import { pathFor } from "./routes.js";
import { escape, date, sectionHeading, projectPeriod, awardLine, paperPdfLink } from "./components.js";

export const pageKeys = ["", "projects", ...projects.map((item) => `projects/${item.id}`), "notes", ...notes.map((note) => `notes/${note.slug}`), "honors", "about"];

/** Render index titles; omit optional supporting copy when the page only needs a heading. */
function pageTitle(title, subtitle, index) {
  return `<header class="page-title">${index ? `<p class="eyebrow">${index}</p>` : ""}<h1>${escape(title)}</h1>${subtitle ? `<p>${escape(subtitle)}</p>` : ""}</header>`;
}

/** Follow the opening and a personal introduction with one coherent, illustrated chronology. */
function home(lang) {
  return `${hero(lang)}<div class="content-shell home-content"><section class="home-introduction" id="profile" aria-label="${lang === "en" ? "About me" : "关于我"}">${profileIntroduction(lang, false)}</section>${homeTimeline(lang)}${honorsEntry(lang)}</div>`;
}

/** Present research and practice as distinct bodies of work, not an undifferentiated project directory. */
function projectsPage(lang) {
  const t = portfolioCopy[lang];
  return `${pageTitle(t.title, t.introduction)}<div class="portfolio-layout">${projectGroup("research", lang)}${projectGroup("practice", lang)}</div>`;
}

/** Display one project's evidence and contribution without inventing screenshots or publication claims. */
function projectDetail(project, lang) {
  const t = ui[lang];
  const reportLabel = project.linkLabel?.[lang] || (project.id === "grace" ? (lang === "en" ? "DAC 2026 presentation" : "DAC 2026 论文页面") : project.id === "robomaster" ? (lang === "en" ? "GitHub profile" : "GitHub 个人主页") : (lang === "en" ? "Project report" : "项目报告"));
  const links = project.link ? `<section class="detail-section"><h2>${t.sources}</h2><div class="text-links">${paperPdfLink(project, lang)}<a href="${escape(project.link)}">${reportLabel} ↗</a>${project.secondaryLink ? `<a href="${escape(project.secondaryLink)}">${escape(project.secondaryLinkLabel?.[lang] || "CS184 Showcase")} ↗</a>` : ""}</div></section>` : "";
  const preview = project.screenshot ? `<figure class="project-preview"><a href="${escape(project.screenshot)}" aria-label="${lang === "en" ? "Open full-size project screenshot" : "打开完整项目截图"}"><img src="${escape(project.screenshot)}" width="1440" height="900" alt="${escape(project.screenshotCaption[lang])}" loading="lazy"></a><figcaption>${escape(project.screenshotCaption[lang])}</figcaption></figure>` : "";
  return `<div class="reading-shell"><a class="back-link" href="${pathFor("projects", lang)}">← ${t.back} ${t.projects}</a><header class="detail-title project-detail-title"><h1>${escape(project.title)}</h1><p>${escape(project.subtitle)}</p><p class="project-status">${escape(project.status)}</p><p class="project-period">${lang === "en" ? "Project period" : "项目时间"} · ${projectPeriod(project, lang)}</p></header>${preview}${[[project.group === "research" ? t.background : (lang === "en" ? "Project background" : "项目背景"), project.statement], [t.contribution, project.detail], [t.outcome, project.result]].map(([title, text]) => `<section class="detail-section"><h2>${title}</h2><p>${escape(text)}</p></section>`).join("")}<section class="detail-section"><h2>${t.tools}</h2><p class="technology-line">${project.stack.map(escape).join(" · ")}</p></section>${links}</div>`;
}

/** Render original Chinese paragraphs unchanged, with localized navigation and recognition metadata. */
function article(lang, note) {
  const t = ui[lang];
  return `<article class="reading-shell essay-page"><a class="back-link" href="${pathFor("notes", lang)}">← ${t.back} ${t.notes}</a><header class="detail-title"><p class="meta">${t.date} <time datetime="${note.date.replaceAll(".", "-")}">${note.date}</time></p><h1>${escape(note.title)}</h1>${note.summary ? `<p>${escape(note.summary)}</p>` : ""}${awardLine(lang, false, note.slug)}<p class="language-note">${t.languageNote}</p></header><div class="essay-reading" lang="zh-CN">${note.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}</div><a class="back-link essay-end" href="${pathFor("notes", lang)}">← ${t.back} ${t.notes}</a></article>`;
}

/** Give recognition its own chronological path, separate from education and work. */
function honorsPage(lang) {
  const t = ui[lang];
  return `${pageTitle(t.honors, lang === "en" ? "In research, in writing, and on the court." : "在研究里，在文字里，也在赛场上。", "RECOGNITION / 08")}${honorsTimeline(lang)}`;
}

/** Keep supplementary skills, volunteering and creator images here; the homepage owns the biography and career. */
function about(lang) {
  const t = ui[lang];
  const en = lang === "en";
  return `${pageTitle(en ? "Beyond the work" : "关于我", en ? "Tools I use, stories I share, and time spent volunteering." : "常用的工具、分享的故事，以及志愿服务中的时光。")}<section class="content-section" id="skills">${sectionHeading(t.skills)}${skills.map((item) => `<div class="skill-row"><span>${item.label}</span><p>${escape(en ? item.items.replace("数据合成", "Synthetic data") : item.items)}</p></div>`).join("")}</section><section class="content-section">${sectionHeading(t.activity, pathFor("honors", lang), t.honors)}<article class="volunteer-row"><figure class="volunteer-certificate"><a href="/assets/volunteer-certificate.png" target="_blank" rel="noopener" aria-label="${en ? "Open full-size volunteer service certificate" : "查看志愿服务证书原图"}"><img src="/assets/volunteer-certificate.png" width="1637" height="2236" alt="${en ? "Certificate of 81.50 volunteer hours for the 15th National Games" : "第十五届全运会志愿服务 81.50 小时证书"}" loading="lazy"></a></figure><div class="volunteer-copy"><h3>${en ? "Volunteer · 15th National Games" : "第十五届全运会志愿者"}</h3><p>${en ? "81.50 hours of volunteer service" : "志愿服务 81.50 小时"} · <time datetime="2025">2025</time></p><a href="/assets/volunteer-certificate.png" target="_blank" rel="noopener">${en ? "View certificate" : "查看证书"} <span aria-hidden="true">↗</span></a></div></article></section><section class="content-section">${sectionHeading(en ? "Open-source storytelling" : "开源内容创作")}${creatorProfile(lang)}</section><section class="content-section contact-inline" id="contact">${sectionHeading(t.contact)}<a href="mailto:${site.email}">${site.email}</a><a href="${site.github}">GitHub ↗</a>${professionalLinks()}</section>`;
}

/** Resolve each declared route to a localized title, description, and static body. */
export function renderPage(key, lang) {
  const t = ui[lang];
  const project = key.startsWith("projects/") ? localizedProjects(lang).find((item) => key === `projects/${item.id}`) : null;
  const note = key.startsWith("notes/") ? localizedNote(lang, key.slice(6)) : null;
  const title = project ? project.title : note ? note.title : t[key || "home"];
  const descriptions = {
    projects: lang === "en" ? "Research and engineering across EDA, AI, personal software, robotics, and computer graphics." : "电子设计自动化、AI、个人软件、机器人视觉与计算机图形学中的研究和工程实践。",
    notes: lang === "en" ? "Stories and reflections." : "故事与思考。",
    honors: lang === "en" ? "Eight recognitions in academic competitions, writing, film, and table tennis." : "学术与竞赛、写作与影像、乒乓球比赛中的八项荣誉。"
  };
  const description = project ? project.subtitle : note ? (note.summary || note.title) : descriptions[key] || introduction[lang];
  let body;
  if (!key) body = home(lang);
  else if (project) body = projectDetail(project, lang);
  else if (note) body = article(lang, note);
  else {
    const content = key === "projects" ? projectsPage(lang) : key === "notes" ? `${pageTitle(t.notes)}${notesArchive(lang)}` : key === "honors" ? honorsPage(lang) : about(lang);
    body = `<div class="content-shell inner-page${key === "about" ? " about-page" : key === "notes" ? " notes-page" : ""}">${content}</div>`;
  }
  return { key, lang, title, description, body };
}
