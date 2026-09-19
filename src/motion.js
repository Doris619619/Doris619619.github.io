// 文件用途：以本地 Canvas 实现星光拖尾与点击星芒，管理空闲、触屏和减少动态效果的降级。
// Visual reference: tholman/cursor-effects Fairy Dust (MIT); independently implemented lifecycle and vector rendering.

/** Enhance fine-pointer visits without replacing the native cursor or intercepting input. */
export function initPointerMotion() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = matchMedia("(hover: hover) and (pointer: fine)");
  const canvas = document.createElement("canvas");
  canvas.className = "pointer-stars";
  canvas.setAttribute("aria-hidden", "true");
  const context = canvas.getContext("2d");
  if (!context) return;
  let enabled = false;
  let frame = 0;
  let previous = 0;
  let lastPoint = null;
  let lastEmission = 0;
  let particles = [];
  let palette = [];

  /** Read theme tokens once per theme change, never during animation frames. */
  function readPalette() {
    const style = getComputedStyle(document.documentElement);
    palette = ["--accent", "--hero-accent", "--ink-soft"].map((name) => style.getPropertyValue(name).trim());
  }

  /** Limit backing-store size on high-DPI screens while retaining CSS-pixel coordinates. */
  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * ratio);
    canvas.height = Math.round(innerHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  /** Discard transient stars and stop the frame loop on blur, hidden tabs or disabled motion. */
  function clear() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    lastPoint = null;
    particles = [];
    context.clearRect(0, 0, innerWidth, innerHeight);
  }

  /** Add a bounded burst; pointer movement cannot grow the particle buffer beyond 64 entries. */
  function emit(x, y, burst = false) {
    const count = burst ? 9 : 2;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 55 + Math.random() * 65 : 10 + Math.random() * 22;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        age: 0, life: 0.45 + Math.random() * 0.3, size: 3 + Math.random() * 4,
        angle, color: palette[i % palette.length] });
    }
    particles = particles.slice(-64);
    if (!frame) frame = requestAnimationFrame(draw);
  }

  /** Animate with elapsed time for consistent speed across refresh rates; sleep when the trail fades. */
  function draw(now) {
    const delta = previous ? Math.min((now - previous) / 1000, 0.04) : 1 / 60;
    previous = now;
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (const star of particles) {
      star.age += delta;
      star.x += star.vx * delta;
      star.y += star.vy * delta;
      star.vy += 32 * delta;
      const remaining = Math.max(0, 1 - star.age / star.life);
      context.save();
      context.translate(star.x, star.y);
      context.rotate(star.angle + star.age);
      context.globalAlpha = remaining * 0.8;
      context.fillStyle = star.color;
      const radius = star.size * remaining;
      context.beginPath();
      for (let point = 0; point < 8; point++) {
        const angle = point * Math.PI / 4;
        const length = point % 2 ? radius * 0.25 : radius;
        context.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
      }
      context.closePath();
      context.fill();
      context.restore();
    }
    particles = particles.filter((star) => star.age < star.life);
    frame = particles.length ? requestAnimationFrame(draw) : 0;
    if (!frame) { previous = 0; context.clearRect(0, 0, innerWidth, innerHeight); }
  }

  /** Sample mouse movement by distance and time; ignore pen/touch events on hybrid devices. */
  function onMove(event) {
    if (event.pointerType !== "mouse") return;
    const now = performance.now();
    if (now - lastEmission < 24) return;
    if (lastPoint && Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y) < 6) return;
    lastPoint = { x: event.clientX, y: event.clientY };
    lastEmission = now;
    emit(event.clientX, event.clientY);
  }

  /** Give a short primary-click response without cancelling selection or navigation. */
  function onPress(event) {
    if (event.pointerType === "mouse" && event.button === 0) emit(event.clientX, event.clientY, true);
  }

  /** Mount at most one canvas and detach animation listeners whenever capabilities change. */
  function sync() {
    const next = !reduced.matches && pointer.matches && !document.hidden;
    if (next === enabled) return;
    enabled = next;
    if (enabled) {
      readPalette();
      resize();
      document.body.append(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onPress, { passive: true });
      window.addEventListener("resize", resize);
    } else {
      clear();
      canvas.remove();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPress);
      window.removeEventListener("resize", resize);
    }
  }

  new MutationObserver(readPalette).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  reduced.addEventListener("change", sync);
  pointer.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  document.documentElement.addEventListener("pointerleave", clear);
  window.addEventListener("blur", clear);
  window.addEventListener("pagehide", clear);
  sync();
}
