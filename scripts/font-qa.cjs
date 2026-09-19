const { chromium } = require("playwright");
const { mkdir } = require("node:fs/promises");

(async () => {
  await mkdir("artifacts/font-qa", { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 2048, height: 1045 }, deviceScaleFactor: 1 });
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.goto("http://127.0.0.1:4173/#about", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "artifacts/font-qa/implementation-2048-light.png", fullPage: false });
  const evidence = await page.evaluate(() => {
    const read = (selector) => {
      const element = document.querySelector(selector);
      const styles = getComputedStyle(element);
      return { selector, family: styles.fontFamily, size: styles.fontSize, weight: styles.fontWeight, lineHeight: styles.lineHeight, letterSpacing: styles.letterSpacing, width: Math.round(element.getBoundingClientRect().width) };
    };
    return [read(".section-kicker h2"), read(".about-copy"), read(".journey-item h3")];
  });
  console.log(JSON.stringify(evidence, null, 2));
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
