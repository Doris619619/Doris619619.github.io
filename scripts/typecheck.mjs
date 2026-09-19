// 文件用途：对原生 JavaScript 执行真实语法检查；保留旧命令名，但不声称提供类型检查。
import { readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const files = ["app.js", "theme-init.js"];
for (const dir of ["content", "src", "scripts"]) {
  for (const file of await readdir(dir)) if (/\.(?:js|mjs|cjs)$/.test(file)) files.push(`${dir}/${file}`);
}
for (const file of files) execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
console.log(`JavaScript syntax passed: ${files.length} files (syntax validation, not static type checking)`);
