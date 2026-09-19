// 文件用途：接入固定版本 Cuberto Mouse Follower，管理磁吸、空闲暂停与系统鼠标降级。
let libraries;
/** Load pinned local libraries only after a real desktop mouse is used. */
function loadLibraries() {
  if (!libraries) libraries = (async () => {
    for (const src of ["/assets/vendor/gsap-3.15.0.min.js", "/assets/vendor/mouse-follower-1.2.1.min.js"]) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src; script.onload = resolve; script.onerror = reject;
        document.head.append(script);
      });
    }
    window.MouseFollower.registerGSAP(window.gsap);
    return { Follower: window.MouseFollower, gsap: window.gsap };
  })();
  return libraries;
}
/** Enhance fine mouse input, with native fallback on touch, loading failure and reduced motion. */
export function initPointerMotion({ load = loadLibraries } = {}) {
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;
  let cursor, engine, pending, lastEvent, hoverTarget, idleTimer;
  let ticking = false, generation = 0, focused = true, disposed = false;
  /** Keep the enhancement off until conditions support a desktop pointer. */
  function eligible() { return !disposed && focused && fine.matches && !reduced.matches && !document.hidden; }
  /** Cancel upstream callbacks and remove its ticker before removing the cursor element. */
  function stop() {
    generation++; root.classList.remove("cursor-ready"); clearTimeout(idleTimer);
    if (cursor) {
      clearTimeout(cursor.visibleInt); clearTimeout(cursor.mediaInt);
      engine.killTweensOf(cursor.pos); engine.killTweensOf(cursor); cursor.destroy();
    }
    cursor = null; ticking = false; hoverTarget = null;
  }
  /** Sleep after easing finishes and remove residual velocity stretch. */
  function settle() {
    if (!cursor) return;
    cursor.vel = { x: 0, y: 0 }; cursor.render(true);
    engine.ticker.remove(cursor.ticker); ticking = false;
  }
  /** Use soft fills on links and magnetic centering only on the small hero social buttons. */
  function reflectTarget(event) {
    const native = event.target.closest?.('input,textarea,[contenteditable="true"],iframe');
    root.classList.toggle("cursor-ready", !native);
    if (native) { cursor.hide(); return; }
    cursor.show();
    const target = event.target.closest?.('a,button,summary,[role="button"]') || null;
    if (target === hoverTarget) return;
    cursor.removeState("-pointer -magnetic"); cursor.removeStick(); hoverTarget = target;
    if (target) cursor.addState("-pointer");
    if (target?.matches(".social-link")) { cursor.setStick(target); cursor.addState("-magnetic"); }
  }
  /** Discard stale async loads and let Cuberto handle easing and velocity deformation. */
  async function move(event) {
    if (event.pointerType !== "mouse") { stop(); return; }
    lastEvent = event;
    if (!eligible()) return;
    if (!cursor) {
      if (pending) return;
      const token = generation; pending = true;
      try {
        const { Follower, gsap } = await load();
        if (token !== generation || !eligible()) return;
        engine = gsap;
        cursor = new Follower({ speed: .18, ease: "power3.out", skewing: .7, skewingDeltaMax: .1,
          stickDelta: .35, stateDetection: {}, dataAttr: false, showTimeout: 0,
          initialPos: [lastEvent.clientX, lastEvent.clientY] });
        cursor.el.setAttribute("aria-hidden", "true");
        // Force rendering fixes the upstream axis-only movement skip; the adapter pauses this ticker when idle.
        engine.ticker.remove(cursor.ticker);
        cursor.ticker = () => cursor?.render(true);
      } catch { stop(); } finally { pending = false; }
    }
    if (!cursor) return;
    reflectTarget(lastEvent);
    if (!ticking) { engine.ticker.add(cursor.ticker); ticking = true; }
    clearTimeout(idleTimer); idleTimer = setTimeout(settle, 300);
  }
  /** Refresh hover geometry during scrolling without flashing the system arrow between wheel ticks. */
  function scroll() {
    if (!cursor || !lastEvent) return;
    cursor.removeStick(); hoverTarget = null;
    const target = document.elementFromPoint(lastEvent.clientX, lastEvent.clientY);
    if (target) reflectTarget({ target });
  }
  /** A wheel can be the first input after navigation or re-entry, without a pointermove. */
  function wheel(event) {
    if (!eligible()) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target) return move({ pointerType: "mouse", clientX: event.clientX, clientY: event.clientY, target });
  }
  /** Resume at the actual hit target after a focus change, even if the mouse has not moved. */
  function resume() {
    if (!eligible() || !lastEvent) return;
    const target = document.elementFromPoint(lastEvent.clientX, lastEvent.clientY);
    if (target) return move({ ...lastEvent, pointerType: "mouse", clientX: lastEvent.clientX, clientY: lastEvent.clientY, target });
  }
  /** Immediately restore the native cursor when input capabilities change. */
  function sync() { if (!eligible()) stop(); }
  /** Pause when the browser loses focus. */
  function blur() { focused = false; stop(); }
  /** Resume without waiting for the next mouse movement after focus returns. */
  function focus() { focused = true; return resume(); }
  /** Touch and pen input must not leave a desktop pointer visible. */
  function syncInput(event) { if (event.pointerType !== "mouse") stop(); }
  fine.addEventListener("change", sync); reduced.addEventListener("change", sync);
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("pointerdown", syncInput, { passive: true });
  window.addEventListener("blur", blur); window.addEventListener("focus", focus);
  window.addEventListener("pagehide", stop); window.addEventListener("scroll", scroll, { passive: true });
  root.addEventListener("pointerenter", move);
  window.addEventListener("wheel", wheel, { passive: true });
  root.addEventListener("pointerleave", stop); document.addEventListener("visibilitychange", sync);
  /** Release listeners and the instance when a consumer disposes of this enhancement. */
  return function dispose() {
    disposed = true; stop();
    fine.removeEventListener("change", sync); reduced.removeEventListener("change", sync);
    window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", syncInput);
    window.removeEventListener("blur", blur); window.removeEventListener("focus", focus);
    window.removeEventListener("pagehide", stop); window.removeEventListener("scroll", scroll);
    root.removeEventListener("pointerenter", move);
    window.removeEventListener("wheel", wheel);
    root.removeEventListener("pointerleave", stop); document.removeEventListener("visibilitychange", sync);
  };
}
