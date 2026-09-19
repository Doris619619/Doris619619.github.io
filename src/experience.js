// 文件用途：以紧凑的编辑式列表展示研究、工作与教学身份，并提供可核对的来源链接。
import { localizedExperience } from "../content/experience.js";
import { escape, sectionHeading } from "./components.js";

/** Share verified roles on the about page without duplicating the underlying factual records. */
export function experienceSection(lang) {
  const en = lang === "en";
  return `<section class="content-section" id="experience">${sectionHeading(en ? "Research, work & teaching" : "研究、工作与教学")}${localizedExperience(lang).map((item) => `<article class="experience-row"><p class="meta">${escape(item.time)}</p><div><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p>${item.source ? `<a class="quiet-link" href="${escape(item.source)}">${item.id === "ra" ? (en ? "Research group" : "课题组官网") : "LinkedIn"} <span aria-hidden="true">↗</span></a>` : ""}</div></article>`).join("")}</section>`;
}
