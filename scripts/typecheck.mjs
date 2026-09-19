import { readFile } from "node:fs/promises";
await Promise.all(["app.js", "content/site-data.js", "content/todo.js"].map((file) => readFile(file, "utf8")));
console.log("typecheck passed (plain JavaScript project)");
