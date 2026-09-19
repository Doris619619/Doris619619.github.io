// 文件用途：独立迁移旧轨迹页，避免依赖访客浏览器可能缓存的旧路由模块。
const home = location.pathname.startsWith("/en/") ? "/en/" : "/";
const anchor = /^#year-(2024|2025|2026)$/.test(location.hash) ? location.hash : "#life-timeline";
location.replace(home + anchor);
