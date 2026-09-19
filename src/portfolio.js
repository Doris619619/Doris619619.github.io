// 文件用途：组织个人介绍、研究与实践分组，供首页、作品和关于页复用。
import { site } from "../content/site-data.js";
import { introduction, localizedProjects } from "../content/locales.js";
import { portfolioCopy } from "../content/portfolio.js";
import { escape, projectRow } from "./components.js";
import { pathFor } from "./routes.js";

/** Split the approved introduction at semantic boundaries without rewriting its wording. */
export function profileIntroduction(lang) {
  const t = portfolioCopy[lang];
  const source = introduction[lang];
  const [middle, end] = t.profileBreaks.map((marker) => source.indexOf(marker));
  const paragraphs = [source.slice(0, middle), source.slice(middle, end), source.slice(end)];
  return `<div class="profile-prose">${paragraphs.map((text, index) => `<p${index === 0 ? ' class="profile-lead"' : ""}>${escape(text.trim())}</p>`).join("")}<div class="profile-links"><a href="mailto:${site.email}">${t.contact} <span aria-hidden="true">↗</span></a><a href="${site.github}">GitHub <span aria-hidden="true">↗</span></a></div></div>`;
}

/** Render a quiet section label beside its content; collapse into reading order on small screens. */
export function editorialSection(id, title, note, body, link = "", label = "") {
  return `<section class="editorial-section" id="${id}"><header class="editorial-label"><h2>${escape(title)}</h2><p>${escape(note)}</p>${link ? `<a class="quiet-link" href="${link}">${escape(label)} <span aria-hidden="true">→</span></a>` : ""}</header><div class="editorial-body">${body}</div></section>`;
}

/** Group by the nature of the work while retaining research-first order and stable project routes. */
export function projectGroup(group, lang, home = false) {
  const t = portfolioCopy[lang];
  const entries = localizedProjects(lang).filter((project) => project.group === group);
  const body = `<div class="project-list">${entries.map((project) => projectRow(project, lang, "h3")).join("")}</div>${home ? `<a class="quiet-link project-more" href="${pathFor("projects", lang)}#practice">${t.practiceLink} <span aria-hidden="true">→</span></a>` : ""}`;
  return editorialSection(group, t[group], t[`${group}Note`], body, home ? pathFor("projects", lang) : "", t.allWork);
}
