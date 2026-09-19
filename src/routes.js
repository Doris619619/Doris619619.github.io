// 文件用途：统一静态站点路径及旧查询参数、锚点链接的迁移规则。
export const origin = "https://doris619619.github.io";
export const languages = ["zh", "en"];

/** Resolve a language-neutral page key to its canonical directory URL. */
export function pathFor(key = "", lang = "zh") {
  return `${lang === "en" ? "/en/" : "/"}${key ? `${key}/` : ""}`;
}

/** Preserve old journey year anchors on the homepage; article queries retain precedence there. */
export function legacyDestination(url) {
  const lang = url.pathname.startsWith("/en/") ? "en" : "zh";
  if (/^\/(en\/)?journey(?:\/|\/index\.html)?$/.test(url.pathname)) return pathFor("", lang) + (/^#year-(2024|2025|2026)$/.test(url.hash) ? url.hash : "#life-timeline");
  if (!["/", "/index.html", "/en/", "/en/index.html"].includes(url.pathname)) return null;
  if (url.searchParams.get("note") === "unselected-road") return pathFor("notes/unselected-road", lang);
  const aliases = { work: "projects", notes: "notes", about: "about", honors: "honors", toolbox: "about", grace: "projects/grace", "llm-pcb": "projects/llm-pcb", robomaster: "projects/robomaster", vrgs: "projects/vrgs", contact: "about" };
  const key = url.hash.slice(1);
  if (key === "journey") return pathFor("", lang) + "#life-timeline";
  return aliases[key] ? pathFor(aliases[key], lang) + (key === "contact" ? "#contact" : key === "toolbox" ? "#skills" : "") : null;
}
