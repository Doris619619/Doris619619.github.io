import { readFile } from "node:fs/promises";
const files = ["index.html", "app.js", "styles.css", "content/site-data.js", "content/todo.js"];
const prohibited = [/text-(?:xs|sm|base|lg|xl|2xl)/, /font-bold/, /text-\[\d+px\]/];
const contents = await Promise.all(files.map(async (file) => [file, await readFile(file, "utf8")]));
const matches = contents.flatMap(([file, text]) => prohibited.filter((rule) => rule.test(text)).map((rule) => `${file}: ${rule}`));
if (matches.length) throw new Error(`Design-system lint failed\n${matches.join("\n")}`);
console.log("lint passed");
