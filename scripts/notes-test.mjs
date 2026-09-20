// 文件用途：用仅存在于测试进程的多篇文章验证目录扩展、语言回退和详情路由隔离。
import assert from "node:assert/strict";
import { notes } from "../content/site-data.js";
import { localizedNote, localizedNotes } from "../content/locales.js";
import { notesArchive } from "../src/notes.js";

const fixtures = [
  { slug: "test-old", date: "2024.12", title: "较早的文章", paragraphs: ["较早的正文。"] },
  { slug: "test-new", date: "2026.09.20", title: "一篇没有封面也没有奖项的新文章", summary: "独立的摘要。", paragraphs: ["独立的正文。"], translations: { en: { title: "A new article without a cover or an award", summary: "An independent summary." } } },
  { slug: "test-middle", date: "2026.02", title: "同一年较早的文章", summary: "", paragraphs: ["另一篇正文。"] }
];
const originalLength = notes.length;
notes.push(...fixtures);
try {
  // Import after adding fixtures so route discovery exercises real content-driven generation.
  const { pageKeys, renderPage } = await import("../src/pages.js");
  const before = notes.map((note) => note.slug);
  for (const lang of ["zh", "en"]) {
    const archive = notesArchive(lang);
    assert.equal((archive.match(/class="note-entry"/g) || []).length, originalLength + fixtures.length);
    assert.ok(archive.indexOf("notes-year-2026") < archive.indexOf("notes-year-2025"));
    assert.ok(archive.indexOf("notes/test-new/") < archive.indexOf("notes/test-middle/"));
    assert.ok(archive.indexOf("notes-year-2025") < archive.indexOf("notes-year-2024"));
    assert.equal((archive.match(/class="award-link"/g) || []).length, 1);
    assert.ok(!archive.includes("<img") && !archive.includes("undefined"));
    for (const note of fixtures) {
      assert.ok(pageKeys.includes(`notes/${note.slug}`));
      const page = renderPage(`notes/${note.slug}`, lang);
      assert.ok(page.body.includes(note.paragraphs[0]));
      assert.ok(page.body.includes(`datetime="${note.date.replaceAll(".", "-")}"`));
      assert.ok(!page.body.includes('class="award-link"'));
      assert.ok(!page.body.includes("undefined"));
      assert.equal(page.title, localizedNote(lang, note.slug).title);
    }
  }
  assert.deepEqual(notes.map((note) => note.slug), before, "Sorting does not mutate content order");
  assert.equal(localizedNote("en", "test-new").title, fixtures[1].translations.en.title);
  assert.equal(localizedNote("en", "test-old").title, fixtures[0].title);
  assert.equal(localizedNote("zh", "missing"), undefined);
  assert.equal(localizedNotes("zh").length, originalLength + fixtures.length);
  console.log("notes tests passed: multiple years, date sorting, no covers, optional summaries/awards, localized routes");
} finally {
  notes.splice(originalLength);
}
