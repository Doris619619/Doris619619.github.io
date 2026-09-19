// 文件用途：提供全站共用的链接和主题图标，保留首页原有图形。
export const arrow = "<span aria-hidden=\"true\">↗</span>";
export const githubIcon = `<svg class="github-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 8.36 22.91c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18A10.9 10.9 0 0 1 12 6.07c.97 0 1.95.13 2.87.39 2.19-1.49 3.16-1.18 3.16-1.18.64 1.59.24 2.76.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.45-2.7 5.43-5.28 5.72.41.36.78 1.08.78 2.18v3.24c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>`;
export const dacIcon = `<span class="dac-mark" aria-hidden="true"><span class="dac-tile dac-tile-d">D</span><span class="dac-tile dac-tile-a">A</span><span class="dac-tile dac-tile-c">C</span><span class="dac-tile dac-tile-63">63</span></span>`;
/** 返回主题切换按钮的太阳或月亮图标。 */
export const icon = (name) => name === "sun"
  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.93 4.93 6.7 6.7M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77"/></svg>`
  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.7 15.1A8.8 8.8 0 0 1 8.9 3.3 8.8 8.8 0 1 0 20.7 15.1Z"/></svg>`;

// Bootstrap Icons (MIT): normalized size, original brand geometry.
export const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" aria-hidden="true" fill="currentColor" class="brand-mark brand-mark-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>`;

// Bootstrap Icons (MIT): normalized size, original brand geometry.
export const douyinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" aria-hidden="true" fill="currentColor" class="brand-mark brand-mark-douyin" viewBox="0 0 16 16">
  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
</svg>`;
