// 文件用途：检查维护中的源文件说明、旧版卡片样式残留及动效可访问性约束。
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
const files = ["app.js", "theme-init.js", "styles.css", "scripts/build.mjs", "scripts/test.mjs", "scripts/typecheck.mjs", "scripts/lint.mjs"];
for (const dir of ["content", "src"]) for (const file of await readdir(dir)) if (file.endsWith(".js")) files.push(`${dir}/${file}`);
for (const file of files) {
  const source = await readFile(file, "utf8");
  assert.match(source, /^(?:\/\/|\/\*)/, `Missing file-purpose comment: ${file}`);
  assert.ok(!/^\s*debugger\s*;/m.test(source), `Debugger statement: ${file}`);
}
const css = await readFile("styles.css", "utf8");
assert.ok(!css.includes(".work-card"), "Old oversized card CSS must be removed");
assert.ok(css.includes("prefers-reduced-motion"));
assert.ok(css.includes(":focus-visible"));
console.log(`lint passed: ${files.length} maintained sources`);
