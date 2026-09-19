// 文件用途：增强静态页面的主题、手机菜单、语言定位及旧链接兼容，不负责渲染正文。
import { legacyDestination } from "./src/routes.js";

const legacy = legacyDestination(new URL(window.location.href));
if (legacy) window.location.replace(legacy);
const root = document.documentElement;
const themeButton = document.querySelector(".theme-button");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#primary-nav");
const media = matchMedia("(prefers-color-scheme: dark)");
let explicitTheme = false;
try { explicitTheme = ["light", "dark"].includes(localStorage.getItem("theme")); } catch { /* Storage may be blocked; theme remains usable for this page. */ }

/** Reflect theme state in the accessible button and browser chrome. */
function syncTheme() {
  const dark = root.dataset.theme === "dark";
  themeButton?.setAttribute("aria-pressed", String(dark));
  if (themeButton) themeButton.innerHTML = dark ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.7 15.1A8.8 8.8 0 0 1 8.9 3.3 8.8 8.8 0 1 0 20.7 15.1Z"/></svg>';
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#1b1a18" : "#fdfcf8");
}

/** Persist an intentional theme choice; blocked storage must not break navigation. */
function toggleTheme() {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  explicitTheme = true;
  try { localStorage.setItem("theme", root.dataset.theme); } catch { /* In-memory fallback. */ }
  syncTheme();
}

/** Keep the OS preference live until the visitor makes an explicit choice. */
function systemThemeChanged(event) {
  if (!explicitTheme) { root.dataset.theme = event.matches ? "dark" : "light"; syncTheme(); }
}

/** Synchronize menu visibility and ARIA state; Escape returns focus to its trigger. */
function setMenu(open, restoreFocus = false) {
  nav?.setAttribute("data-open", String(open));
  menuButton?.setAttribute("aria-expanded", String(open));
  if (restoreFocus) menuButton?.focus();
}

/** Open the nonmodal menu at its first link, so keyboard users can immediately traverse its destinations. */
function toggleMenu() {
  const open = menuButton?.getAttribute("aria-expanded") !== "true";
  setMenu(open);
  if (open) requestAnimationFrame(queueMenuFocus);
}

/** Wait for the disclosure visibility style to reach a rendered frame before focusing a link. */
function queueMenuFocus() { requestAnimationFrame(focusFirstMenuLink); }

/** Ignore a queued focus if a rapid second click has already closed the disclosure. */
function focusFirstMenuLink() {
  if (nav?.getAttribute("data-open") === "true") nav.querySelector("a")?.focus();
}

/** Dismiss mobile navigation from Escape, including focus that is inside the menu. */
function onKeydown(event) {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") setMenu(false, true);
}

/** Close the menu on outside clicks; preserve normal link navigation. */
function onDocumentClick(event) {
  if (!event.target.closest(".header-controls") || event.target.closest("#primary-nav a")) setMenu(false);
}

/** Preserve an in-page destination when a translated page has the same stable anchor. */
function syncLanguageAnchor() {
  const link = document.querySelector(".language-switch");
  if (link) { const target = new URL(link.href); target.hash = location.hash; link.href = target.href; }
}

/** Close a previous mobile disclosure when the viewport changes navigation modes. */
function onViewportChange() { setMenu(false); }

syncTheme();
syncLanguageAnchor();
themeButton?.addEventListener("click", toggleTheme);
menuButton?.addEventListener("click", toggleMenu);
media.addEventListener("change", systemThemeChanged);
document.addEventListener("keydown", onKeydown);
document.addEventListener("click", onDocumentClick);
window.addEventListener("hashchange", syncLanguageAnchor);
matchMedia("(min-width: 761px)").addEventListener("change", onViewportChange);
