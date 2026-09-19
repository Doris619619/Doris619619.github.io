const path = require("node:path");
const { chromium } = require("playwright");

;(async () => {
  const round = process.argv[2] || "round1";
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 2048, height: 1240 }, deviceScaleFactor: 1 });
  const compare = path.join(process.cwd(), "artifacts", "hero-qa", "compare.html");
  await page.goto(`file:///${compare.replace(/\\/g, "/")}?round=${round}`, { waitUntil: "load" });
  await page.screenshot({ path: path.join(process.cwd(), "artifacts", "hero-qa", `side-by-side-${round}.png`) });
  await browser.close();
})();
