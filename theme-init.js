// 文件用途：在样式加载前应用主题，避免深色页面闪白；存储不可用时仍支持系统主题。
document.documentElement.classList.add("js");
try {
  const saved = localStorage.getItem("theme");
  document.documentElement.dataset.theme = ["light", "dark"].includes(saved) ? saved : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
