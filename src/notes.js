// 文件用途：按年份与日期组织无封面的手记目录，允许摘要和获奖信息缺省。
import { localizedNotes } from "../content/locales.js";
import { escape, awardLine } from "./components.js";
import { pathFor } from "./routes.js";

/** Render one title/date row with optional summary and an award only when this article has one. */
function noteEntry(note, lang) {
  const isoDate = note.date.replaceAll(".", "-");
  return `<article class="note-entry"><header class="note-entry-header"><h3><a href="${pathFor(`notes/${note.slug}`, lang)}">${escape(note.title)}</a></h3><time datetime="${isoDate}">${escape(note.date)}</time></header>${note.summary ? `<p class="note-summary">${escape(note.summary)}</p>` : ""}${awardLine(lang, true, note.slug)}</article>`;
}

/** Sort a copy newest first and group by year; supplied records also support isolated layout previews. */
export function notesArchive(lang, records = localizedNotes(lang)) {
  const sorted = [...records].sort((a, b) => b.date.replaceAll(".", "-").localeCompare(a.date.replaceAll(".", "-")));
  const years = [...new Set(sorted.map((note) => note.date.slice(0, 4)))];
  return years.map((year) => `<section class="note-year" aria-labelledby="notes-year-${year}"><h2 id="notes-year-${year}">${year}</h2><div class="note-list">${sorted.filter((note) => note.date.startsWith(year)).map((note) => noteEntry(note, lang)).join("")}</div></section>`).join("");
}
