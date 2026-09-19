// 文件用途：在可选 Playwright 开发环境中复现新版四尺寸、深浅主题的页面截图与交互检查。
let chromium;
try { ({ chromium } = require("playwright")); }
catch { throw new Error("Optional screenshot tooling requires playwright and its Chromium browser; see README.md. The static site itself has no runtime dependencies."); }
const { mkdir } = require("node:fs/promises");
const assert = require("node:assert/strict");

/** Capture representative pages and verify mobile menu and theme behavior on a running local build. */
async function run() {
  await mkdir("artifacts/redesign", { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [390, 768, 1024, 1440]) {
      for (const theme of ["light", "dark"]) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "reduce" });
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        for (const route of ["/", "/projects/", "/journey/", "/honors/", "/en/notes/unselected-road/", "/en/about/"]) {
          await page.goto(`http://127.0.0.1:4173${route}`);
          await page.evaluate(() => document.fonts.ready);
          const state = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth, theme: document.documentElement.dataset.theme }));
          assert.equal(state.overflow, false, `${width} ${theme} ${route}`);
          assert.equal(state.theme, theme);
          const name = route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
          await page.screenshot({ path: `artifacts/redesign/${name}-${width}-${theme}.png`, fullPage: !route.includes("unselected-road") });
        }
        if (width === 390) {
          const menu = page.getByRole("button", { name: "Menu", exact: true });
          await menu.click();
          assert.equal(await menu.getAttribute("aria-expanded"), "true");
          await page.keyboard.press("Escape");
          assert.equal(await menu.getAttribute("aria-expanded"), "false");
        }
        await page.goto("http://127.0.0.1:4173/?note=unselected-road#top");
        await page.waitForURL("**/notes/unselected-road/");
        assert.deepEqual(errors, []);
        await page.close();
      }
    }
  } finally { await browser.close(); }
  console.log("Screenshot and interaction checks passed");
}
run().catch((error) => { console.error(error); process.exitCode = 1; });
