// 文件用途：将获奖记录组织成独立年份时间线，并连接首页入口、文学原文和已有证书。
import { honors } from "../content/honors.js";
import { ui } from "../content/locales.js";
import { escape, date } from "./components.js";
import { pathFor } from "./routes.js";

/** Offer a quiet route from the homepage chronology into the separate recognition archive. */
export function honorsEntry(lang) {
  const en = lang === "en";
  return `<aside class="honors-entry"><a class="honors-entry-cover" href="${pathFor("honors", lang)}#lingyu"><img src="/assets/lingyu-2025-cover.png" alt="${en ? "Lingyu magazine, Summer 2025 cover — view writing award" : "《灵语》2025 夏季刊封面，查看征文获奖记录"}" width="1105" height="1500" loading="lazy"></a><div><p class="eyebrow">${en ? "RECOGNITION" : "值得记住的时刻"}</p><h2><a href="${pathFor("honors", lang)}">${en ? "Honors & awards" : "荣誉与获奖"} <span aria-hidden="true">→</span></a></h2><p>${en ? "Academic competitions, creative work, and table tennis — eight recognitions along the way." : "学术竞赛、写作与影像，还有乒乓球赛场。这里收录一路上的八项荣誉。"}</p></div></aside>`;
}

/** Show original magazine artwork, existing certificates, or the institution mark without invented award imagery. */
function honorVisual(item, lang) {
  const en = lang === "en";
  if (item.cover) return `<a class="recognition-visual recognition-cover" href="/${item.cover}" target="_blank" rel="noopener"><img src="/${item.cover}" alt="${en ? "Lingyu magazine, Summer 2025 — open cover" : "《灵语》2025 夏季刊，打开封面原图"}" width="1105" height="1500" loading="lazy"></a>`;
  if (item.image) return `<a class="recognition-visual recognition-certificate" href="/${item.image}" target="_blank" rel="noopener"><img src="/${item.image}" alt="${escape(item.title[lang])} · ${en ? "Open certificate" : "打开获奖证书"}" loading="lazy"></a>`;
  return `<span class="recognition-visual recognition-institution"><img src="/assets/organizations/cuhk.png" alt="" width="697" height="101" loading="lazy"></span>`;
}

/** Sort all records by supplied month; preserve stable award anchors and never turn a cover into certificate evidence. */
export function honorsTimeline(lang) {
  const en = lang === "en";
  const t = ui[lang];
  const years = [...new Set(honors.map((item) => item.date.slice(0, 4)))].sort().reverse();
  const yearLinks = `<nav class="recognition-years" aria-label="${en ? "Awards by year" : "按获奖年份浏览"}">${years.map((year) => `<a href="#honors-${year}">${year}<span>${honors.filter((item) => item.date.startsWith(year)).length} ${en ? "awards" : "项"}</span></a>`).join("")}</nav>`;
  return `${yearLinks}<div class="recognition-timeline">${years.map((year) => `<section class="recognition-year" id="honors-${year}" aria-labelledby="heading-${year}"><h2 id="heading-${year}">${year}</h2><ol>${honors.filter((item) => item.date.startsWith(year)).sort((a, b) => b.date.localeCompare(a.date)).map((item) => `<li class="recognition-row" id="${item.id}"><time datetime="${item.date}">${date(item.date)}</time>${honorVisual(item, lang)}<div class="recognition-copy"><p class="eyebrow">${t[item.category]}</p><h3>${escape(item.title[lang])}</h3><p class="recognition-result">${escape(item.result[lang])}</p>${item.description ? `<p class="recognition-description">${escape(item.description[lang])}</p>` : ""}<div class="text-links">${item.image ? `<a href="/${item.image}" target="_blank" rel="noopener">${t.certificate} ↗</a>` : ""}${item.noteSlug ? `<a href="${pathFor(`notes/${item.noteSlug}`, lang)}">${en ? "Read the awarded story" : "阅读获奖原文"} →</a>` : ""}${item.id === "robomaster-award" ? `<a href="${pathFor("projects/robomaster", lang)}">${en ? "Robot vision project" : "机器人视觉项目"} →</a>` : ""}</div></div></li>`).join("")}</ol></section>`).join("")}</div>`;
}
