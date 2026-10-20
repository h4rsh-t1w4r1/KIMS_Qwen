#!/usr/bin/env node
/**
 * Verrolify visual gate (G4/G5/G6 helper): screenshots and mechanical checks for ordinary pages.
 *
 *   node shoot_pages.mjs --url http://localhost:3000 --out lab/shots [--paths /,/services] [--widths 375,768,1280,1440]
 *                        [--steps] [--chrome /path/to/chrome]
 *
 * Needs playwright-core (npm i -D playwright-core) and a Chrome or Chromium. Default launch uses the installed Chrome
 * (channel "chrome"). Falls back to the bundled Chromium if present. Set CHROME_PATH or --chrome to point at a binary,
 * and CHROME_ARGS for extra launch flags (locked-down or container environments).
 * For scroll-scrub pages with video, prefer kits/scrollcraft/scripts/shoot.mjs (it walks scroll positions per act).
 *
 * Per width and path: first-viewport and full-page screenshots (and one per viewport height with --steps), then checks:
 * horizontal overflow, console errors and failed requests, viewport meta disabling zoom, h1 count, images without alt,
 * html lang, tap targets under 44px at phone width. A reduced-motion pass at 1280 is also captured.
 * Writes report.json beside the images. Exit code 1 on any failed check. LOOK at the images: the report is not a verdict.
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : d; };
const flag = (k) => args.includes(`--${k}`);
const base = (opt("url", "") || "").replace(/\/$/, "");
if (!base) { console.error("usage: node shoot_pages.mjs --url <base-url> [--out dir] [--paths /,/x] [--widths 375,768,1280,1440] [--steps]"); process.exit(2); }
const out = opt("out", "lab/shots");
const paths = opt("paths", "/").split(",");
const widths = opt("widths", "375,768,1280,1440").split(",").map(Number);
const heights = { 375: 812, 768: 1024, 1280: 800, 1440: 900 };
fs.mkdirSync(out, { recursive: true });

let chromium;
try { ({ chromium } = await import("playwright-core")); }
catch { console.error("playwright-core is not installed. Run: npm i -D playwright-core"); process.exit(2); }

async function launch() {
  const exe = opt("chrome", process.env.CHROME_PATH);
  const extra = (process.env.CHROME_ARGS || "").split(" ").filter(Boolean);
  const common = { headless: true, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required", ...extra] };
  if (exe) return chromium.launch({ ...common, executablePath: exe });
  try { return await chromium.launch({ ...common, channel: "chrome" }); }
  catch { return await chromium.launch(common); }
}

const slug = (p) => (p === "/" ? "home" : p.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, ""));
const report = [];
let failed = false;
const browser = await launch();

async function pass(width, p, reduced) {
  const ctx = await browser.newContext({
    viewport: { width, height: heights[width] ?? 900 },
    deviceScaleFactor: width <= 768 ? 2 : 1,
    isMobile: width <= 480,
    hasTouch: width <= 768,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  const problems = [];
  page.on("console", (m) => { if (m.type() === "error") problems.push("console error: " + m.text().slice(0, 200)); });
  page.on("pageerror", (e) => problems.push("page error: " + String(e).slice(0, 200)));
  page.on("requestfailed", (r) => problems.push("request failed: " + r.url().slice(0, 120)));
  const url = base + p;
  const resp = await page.goto(url, { waitUntil: "load", timeout: 30000 }).catch((e) => { problems.push("goto failed: " + e.message); return null; });
  if (resp && resp.status() >= 400) problems.push("HTTP " + resp.status());
  await page.waitForTimeout(900);
  const tag = `${slug(p)}-${width}${reduced ? "-reduced" : ""}`;
  await page.screenshot({ path: path.join(out, `${tag}-fold.png`) });
  await page.screenshot({ path: path.join(out, `${tag}-full.png`), fullPage: true });
  const checks = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute("content") || "";
    const small = [...document.querySelectorAll("a[href],button,[role=button],input,select,textarea,summary")]
      .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44); }).length;
    return {
      overflowX: document.documentElement.scrollWidth - vw,
      viewport,
      h1: document.querySelectorAll("h1").length,
      imgNoAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
      lang: document.documentElement.getAttribute("lang") || "",
      smallTargets: small,
      title: document.title,
      scrollHeight: document.documentElement.scrollHeight,
    };
  });
  if (checks.overflowX > 1) problems.push(`horizontal overflow of ${checks.overflowX}px`);
  if (/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/i.test(checks.viewport)) problems.push("viewport meta disables zoom");
  if (checks.h1 !== 1) problems.push(`h1 count is ${checks.h1} (want 1)`);
  if (checks.imgNoAlt) problems.push(`${checks.imgNoAlt} images without alt attribute`);
  if (!checks.lang) problems.push("html lang missing");
  if (!checks.title) problems.push("document title missing");
  if (width <= 480 && checks.smallTargets > 0) problems.push(`${checks.smallTargets} tap targets under 44px (check in the screenshot)`);
  if (flag("steps") && !reduced) {
    const vh = heights[width] ?? 900;
    const n = Math.min(12, Math.ceil(checks.scrollHeight / vh));
    for (let i = 1; i < n; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * vh);
      await page.waitForTimeout(450);
      await page.screenshot({ path: path.join(out, `${tag}-s${String(i).padStart(2, "0")}.png`) });
    }
  }
  await ctx.close();
  report.push({ path: p, width, reduced, ...checks, problems });
  if (problems.length) failed = true;
  console.log(`${problems.length ? "FAIL" : "ok  "}  ${p}  ${width}px${reduced ? " reduced-motion" : ""}${problems.length ? "\n      - " + problems.join("\n      - ") : ""}`);
}

for (const p of paths) {
  for (const w of widths) await pass(w, p, false);
  await pass(1280, p, true);
}
await browser.close();
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
console.log(`\nscreenshots and report.json in ${out}. Open the images and look. The report is not a verdict.`);
process.exit(failed ? 1 : 0);
