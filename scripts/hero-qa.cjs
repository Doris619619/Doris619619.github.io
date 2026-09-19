const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

;(async () => {
  const round = process.argv[2] || "round1";
  const mobile = process.argv[3] === "mobile";
  const viewport = mobile ? { width: 390, height: 844 } : { width: 2048, height: 1200 };
  const suffix = `${viewport.width}x${viewport.height}`;
  const output = path.join(process.cwd(), "artifacts", "hero-qa");
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport, colorScheme: "light", deviceScaleFactor: 1 });
  const reference = await context.newPage();
  await reference.goto("https://innei.in/en", { waitUntil: "domcontentloaded", timeout: 60000 });
  await reference.waitForTimeout(2600);
  await reference.screenshot({ path: path.join(output, `reference-innei-${suffix}.png`) });
  const referenceMetrics = await reference.evaluate(() => {
    const select = (selector) => {
      const element = document.querySelector(selector);
      const css = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return { selector, fontFamily: css.fontFamily, fontSize: css.fontSize, fontWeight: css.fontWeight, lineHeight: css.lineHeight, letterSpacing: css.letterSpacing, width: Math.round(box.width), height: Math.round(box.height), top: Math.round(box.top) };
    };
    return ["main", "main img[alt='Site Owner Avatar']", "main h1", "main h1 code", "main h1 code + span", "main h1 + div", "main h1 + div + div + div", "main h1 + div + div + div + div"].map(select);
  });
  const implementation = await context.newPage();
  await implementation.goto("http://127.0.0.1:4173", { waitUntil: "networkidle", timeout: 30000 });
  await implementation.waitForTimeout(1200);
  await implementation.screenshot({ path: path.join(output, `implementation-${round}-${suffix}.png`) });
  const metrics = await implementation.evaluate(() => {
    const select = (selector) => {
      const element = document.querySelector(selector);
      const css = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return { selector, fontFamily: css.fontFamily, fontSize: css.fontSize, fontWeight: css.fontWeight, lineHeight: css.lineHeight, letterSpacing: css.letterSpacing, width: Math.round(box.width), height: Math.round(box.height), top: Math.round(box.top) };
    };
    return [".hero-inner", ".portrait", ".hero h1", ".role-pill", ".hero-intro", ".hero-quote", ".social-row"].map(select);
  });
  console.log(JSON.stringify({ reference: referenceMetrics, implementation: metrics }, null, 2));
  await browser.close();
})();
