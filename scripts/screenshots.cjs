const { chromium } = require("playwright");
const { mkdir } = require("node:fs/promises");

const cases = [
  { name: "home-1440-light", width: 1440, height: 1100, theme: "light" },
  { name: "home-1024-dark", width: 1024, height: 1100, theme: "dark" },
  { name: "home-768-light", width: 768, height: 1100, theme: "light" },
  { name: "home-390-dark", width: 390, height: 844, theme: "dark" }
];

(async () => {
  await mkdir("artifacts/screenshots", { recursive: true });
  const browser = await chromium.launch({ headless: true });
  for (const item of cases) {
    const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, deviceScaleFactor: 1 });
    await page.addInitScript((theme) => localStorage.setItem("theme", theme), item.theme);
    await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
    await page.waitForTimeout(850);
    await page.screenshot({ path: `artifacts/screenshots/${item.name}.png`, fullPage: true });
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    if (dimensions.scrollWidth > dimensions.clientWidth) throw new Error(`${item.name} has horizontal overflow: ${JSON.stringify(dimensions)}`);
    await page.close();
  }
  await browser.close();
  console.log("screenshots passed");
})().catch((error) => { console.error(error); process.exit(1); });
