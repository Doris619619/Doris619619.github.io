// 文件用途：生成首页、作品、文章、轨迹、荣誉与关于页的双语静态内容。
import { site, projects, skills } from "../content/site-data.js";
import { honors } from "../content/honors.js";
import { introduction, ui, localizedProjects, localizedJourney, localizedEducation, localizedNote } from "../content/locales.js";
import { portfolioCopy } from "../content/portfolio.js";
import { profileIntroduction, projectGroup } from "./portfolio.js";
import { homeTimeline } from "./timeline.js";
import { hero } from "./hero.js";
import { experienceSection } from "./experience.js";
import { creatorProfile, professionalLinks } from "./social.js";
import { pathFor } from "./routes.js";
import { escape, date, sectionHeading, projectPeriod, noteEntry, awardLine, paperPdfLink } from "./components.js";

export const pageKeys = ["", "projects", ...projects.map((item) => `projects/${item.id}`), "notes", "notes/unselected-road", "journey", "honors", "about"];

/** Render the quiet title block used on all non-home index pages. */
function pageTitle(title, subtitle, index) {
  return `<header class="page-title">${index ? `<p class="eyebrow">${index}</p>` : ""}<h1>${escape(title)}</h1><p>${escape(subtitle)}</p></header>`;
}

/** Follow the opening and a personal introduction with one coherent, illustrated chronology. */
function home(lang) {
  return `${hero(lang)}<div class="content-shell home-content"><section class="home-introduction" id="profile" aria-label="${lang === "en" ? "About me" : "关于我"}">${profileIntroduction(lang)}</section>${homeTimeline(lang)}</div>`;
}

/** Present research and practice as distinct bodies of work, not an undifferentiated project directory. */
function projectsPage(lang) {
  const t = portfolioCopy[lang];
  return `${pageTitle(t.title, t.introduction)}<div class="portfolio-layout">${projectGroup("research", lang)}${projectGroup("practice", lang)}</div>`;
}

/** Display one project's evidence and contribution without inventing screenshots or publication claims. */
function projectDetail(project, lang) {
  const t = ui[lang];
  const reportLabel = project.id === "grace" ? (lang === "en" ? "DAC 2026 presentation" : "DAC 2026 论文页面") : project.id === "robomaster" ? (lang === "en" ? "GitHub profile" : "GitHub 个人主页") : (lang === "en" ? "Project report" : "项目报告");
  const links = project.link ? `<section class="detail-section"><h2>${t.sources}</h2><div class="text-links">${paperPdfLink(project, lang)}<a href="${escape(project.link)}">${reportLabel} ↗</a>${project.secondaryLink ? `<a href="${escape(project.secondaryLink)}">CS184 Showcase ↗</a>` : ""}</div></section>` : "";
  return `<div class="reading-shell"><a class="back-link" href="${pathFor("projects", lang)}">← ${t.back} ${t.projects}</a><header class="detail-title project-detail-title"><h1>${escape(project.title)}</h1><p>${escape(project.subtitle)}</p><p class="project-status">${escape(project.status)}</p><p class="project-period">${lang === "en" ? "Project period" : "项目时间"} · ${projectPeriod(project, lang)}</p></header>${[[t.background, project.statement], [t.contribution, project.detail], [t.outcome, project.result]].map(([title, text]) => `<section class="detail-section"><h2>${title}</h2><p>${escape(text)}</p></section>`).join("")}<section class="detail-section"><h2>${t.tools}</h2><p class="technology-line">${project.stack.map(escape).join(" · ")}</p></section>${links}</div>`;
}

/** Render original Chinese paragraphs unchanged, with localized navigation and recognition metadata. */
function article(lang) {
  const t = ui[lang];
  const note = localizedNote(lang);
  return `<article class="reading-shell essay-page"><a class="back-link" href="${pathFor("notes", lang)}">← ${t.back} ${t.notes}</a><header class="detail-title"><p class="meta">${t.date} <time datetime="2025-01">${note.date}</time></p><h1>${escape(note.title)}</h1><p>${escape(note.summary)}</p>${awardLine(lang)}<p class="language-note">${t.languageNote}</p></header><div class="essay-reading" lang="zh-CN">${note.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}</div><a class="back-link essay-end" href="${pathFor("notes", lang)}">← ${t.back} ${t.notes}</a></article>`;
}

/** Combine dated education and practice records; use source start dates rather than invented milestones. */
function timeline(lang) {
  const t = ui[lang];
  const en = lang === "en";
  const events = [...localizedJourney(lang).map((item) => ({ ...item, kind: item.id === "ustf" ? (en ? "Teaching" : "教学") : (en ? "Practice & research" : "研究与实践") })), ...localizedEducation(lang).map((item) => ({ ...item, text: item.detail, kind: t.education }))].sort((a, b) => a.time.localeCompare(b.time));
  const labels = en ? ["University begins", "Research, Berkeley & RoboMaster", "Teaching, AI & research"] : ["大学启程", "研究、伯克利与 RoboMaster", "教学、AI 与科研"];
  const overview = `<nav class="year-overview" aria-label="${en ? "Jump to year" : "按年份浏览"}">${[2024, 2025, 2026].map((year, index) => `<a href="#year-${year}"><strong>${year}</strong><span>${labels[index]}</span></a>`).join("")}</nav>`;
  const years = [2024, 2025, 2026].map((year) => `<section class="timeline-year" id="year-${year}"><h2>${year}</h2><div class="timeline-events">${events.filter((item) => item.time.startsWith(String(year))).map((item) => `<article class="timeline-event"><p class="meta">${escape(item.time)} <span> / ${item.kind}</span></p><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></article>`).join("")}</div></section>`).join("");
  return `${pageTitle(t.journey, en ? "Education, research, and the work along the way." : "学习、研究，以及一路参与的实践。", "03 / JOURNEY")}${overview}${years}<aside class="related-line"><p>${en ? "Milestones beyond the projects" : "项目之外，也有值得记住的时刻"}</p><a href="${pathFor("honors", lang)}">${t.honors} →</a></aside>`;
}

/** Group all eight honors by discipline, preserving their full names and month-level dates. */
function honorsPage(lang) {
  const t = ui[lang];
  return `${pageTitle(t.honors, lang === "en" ? "In research, in writing, and on the court." : "在研究里，在文字里，也在赛场上。", "RECOGNITION / 08")}${["academic", "creative", "sport"].map((category) => `<section class="honor-group">${sectionHeading(t[category])}${honors.filter((item) => item.category === category).sort((a, b) => b.date.localeCompare(a.date)).map((item) => `<article class="honor-row" id="${item.id}"><time datetime="${item.date}">${date(item.date)}</time><div><h3>${escape(item.title[lang])}</h3><p class="honor-result">${escape(item.result[lang])}</p><div class="text-links">${item.image ? `<a href="/${item.image}" target="_blank" rel="noopener">${t.certificate} ↗</a>` : ""}${item.noteSlug ? `<a href="${pathFor(`notes/${item.noteSlug}`, lang)}">${t.read} →</a>` : ""}</div></div></article>`).join("")}</section>`).join("")}`;
}

/** Present personal background and volunteering separately from the formal honors list. */
function about(lang) {
  const t = ui[lang];
  const en = lang === "en";
  return `${pageTitle(en ? "Doris Liang" : "梁彦诗", en ? "Computer Engineering · CUHK-Shenzhen" : "计算机工程 · 香港中文大学（深圳）")}<div class="about-profile">${profileIntroduction(lang)}</div>${experienceSection(lang)}<section class="content-section">${sectionHeading(t.education)}${localizedEducation(lang).map((item) => `<article class="education-row"><p class="meta">${escape(item.time)}</p><h3>${escape(item.title)}</h3><p>${escape(item.detail)}</p></article>`).join("")}</section><section class="content-section" id="skills">${sectionHeading(t.skills)}${skills.map((item) => `<div class="skill-row"><span>${item.label}</span><p>${escape(en ? item.items.replace("数据合成", "Synthetic data") : item.items)}</p></div>`).join("")}</section><section class="content-section">${sectionHeading(t.activity, pathFor("honors", lang), t.honors)}<p>${en ? "Beyond research, I take part in table tennis, writing, and campus visual storytelling." : "研究之外，我也参加乒乓球比赛、征文和校园影像创作。"}</p><article class="volunteer-row"><p class="meta">2025</p><h3>${en ? "Volunteer · 15th National Games" : "第十五届全运会志愿者"}</h3><p>${en ? "81.50 hours of volunteer service." : "志愿服务 81.50 小时。"}</p><a href="/assets/volunteer-certificate.png" target="_blank" rel="noopener">${t.certificate} ↗</a></article></section><section class="content-section">${sectionHeading(en ? "Open-source storytelling" : "开源内容创作")}${creatorProfile(lang)}</section><section class="content-section contact-inline" id="contact">${sectionHeading(t.contact)}<a href="mailto:${site.email}">${site.email}</a><a href="${site.github}">GitHub ↗</a>${professionalLinks()}</section>`;
}

/** Resolve each declared route to a localized title, description, and static body. */
export function renderPage(key, lang) {
  const t = ui[lang];
  const project = key.startsWith("projects/") ? localizedProjects(lang).find((item) => key === `projects/${item.id}`) : null;
  const title = project ? project.title : key.startsWith("notes/") ? localizedNote(lang).title : t[key || "home"];
  const descriptions = {
    projects: lang === "en" ? "Research and engineering across EDA, AI, robotics, and computer graphics." : "电子设计自动化、AI、机器人视觉与计算机图形学中的研究和工程实践。",
    notes: lang === "en" ? "Stories and reflections, starting with The Road Not Chosen." : "故事与思考，从《未选择的路》开始。",
    journey: lang === "en" ? "Education, research, and practical experience from 2024 to 2026." : "2024—2026 年的教育、研究与实践轨迹。",
    honors: lang === "en" ? "Eight recognitions in academic competitions, writing, film, and table tennis." : "学术与竞赛、写作与影像、乒乓球比赛中的八项荣誉。"
  };
  const description = project ? project.subtitle : key.startsWith("notes/") ? localizedNote(lang).summary : descriptions[key] || introduction[lang];
  let body;
  if (!key) body = home(lang);
  else if (project) body = projectDetail(project, lang);
  else if (key === "notes/unselected-road") body = article(lang);
  else {
    const content = key === "projects" ? projectsPage(lang) : key === "notes" ? `${pageTitle(t.notes, description, "02 / WRITING")}${noteEntry(lang)}` : key === "journey" ? timeline(lang) : key === "honors" ? honorsPage(lang) : about(lang);
    body = `<div class="content-shell inner-page">${content}</div>`;
  }
  return { key, lang, title, description, body };
}
