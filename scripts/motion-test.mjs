// 文件用途：在受控浏览器环境替身中验证动效生命周期、空闲停帧和无障碍降级。
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

/** Model event targets so capability and visibility transitions exercise the real module handlers. */
function target(extra = {}) {
  const listeners = new Map();
  return { ...extra, addEventListener(name, fn) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn); },
    removeEventListener(name, fn) { listeners.get(name)?.delete(fn); },
    fire(name, event = {}) { for (const fn of listeners.get(name) || []) fn(event); },
    count(name) { return listeners.get(name)?.size || 0; } };
}

const reduced = target({ matches: false });
const fine = target({ matches: true });
let mounted = false;
let now = 100;
let serial = 0;
let fills = 0;
const frames = new Map();
const context = Object.fromEntries(["clearRect", "setTransform", "save", "translate", "rotate", "beginPath", "lineTo", "closePath", "restore"].map((key) => [key, () => {}]));
context.fill = () => { fills++; };
const canvas = { setAttribute() {}, getContext: () => context, remove() { mounted = false; } };
const root = target();
const doc = target({ hidden: false, documentElement: root, body: { append() { mounted = true; } }, createElement: () => canvas });
const win = target();
const sandbox = { document: doc, window: win, matchMedia: (query) => query.includes("reduced") ? reduced : fine,
  getComputedStyle: () => ({ getPropertyValue: () => "#ca7181" }), devicePixelRatio: 3, innerWidth: 1000, innerHeight: 800,
  performance: { now: () => now }, MutationObserver: class { observe() {} },
  requestAnimationFrame(fn) { frames.set(++serial, fn); return serial; }, cancelAnimationFrame(id) { frames.delete(id); } };
const code = (await readFile("src/motion.js", "utf8")).replace("export function", "function");
vm.runInNewContext(code + "\ninitPointerMotion();", sandbox);
assert.equal(mounted, true);
assert.equal(canvas.width, 2000, "DPR is capped at two");
assert.equal(frames.size, 0, "No frames while idle");
win.fire("pointermove", { pointerType: "touch", clientX: 10, clientY: 10 });
assert.equal(frames.size, 0, "Touch never emits particles");
for (let i = 0; i < 100; i++) { now += 25; win.fire("pointermove", { pointerType: "mouse", clientX: i * 10, clientY: 50 }); }
assert.equal(frames.size, 1, "Movement shares a single frame loop");
/** Advance a synthetic display frame and retain any frame scheduled by the implementation. */
function tick() { now += 16; const callbacks = [...frames.values()]; frames.clear(); for (const fn of callbacks) fn(now); }
tick();
assert.equal(fills, 64, "Particle count is bounded");
for (let i = 0; i < 60; i++) tick();
assert.equal(frames.size, 0, "Trail drains and stops scheduling frames");
win.fire("pointerdown", { pointerType: "mouse", button: 0, clientX: 100, clientY: 100 });
assert.equal(frames.size, 1);
reduced.matches = true; reduced.fire("change");
assert.equal(mounted, false); assert.equal(frames.size, 0); assert.equal(win.count("pointermove"), 0);
reduced.matches = false; reduced.fire("change");
assert.equal(mounted, true); assert.equal(win.count("pointermove"), 1);
doc.hidden = true; doc.fire("visibilitychange");
assert.equal(mounted, false); assert.equal(win.count("resize"), 0);
doc.hidden = false; doc.fire("visibilitychange");
assert.equal(mounted, true); assert.equal(win.count("pointermove"), 1);
fine.matches = false; fine.fire("change");
assert.equal(mounted, false); assert.equal(frames.size, 0);
console.log("motion tests passed: idle, particle cap, DPR, touch, click, reduced motion, visibility and listener cleanup");
