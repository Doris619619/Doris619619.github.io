const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 2048, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto("file:///D:/Repo/YanshiLiang/artifacts/font-qa/compare.html", { waitUntil: "load" });
  await page.screenshot({ path: "artifacts/font-qa/side-by-side-comparison.png", fullPage: true });
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
