// 文件用途：保留原有首页开场，仅将语言、计数和资源路径参数化。
import {site, projects} from "../content/site-data.js";
import {social} from "../content/social.js";
import {honors} from "../content/honors.js";
import {githubIcon, dacIcon} from "./icons.js";
/** 生成既有开场，计数来源于实际内容而非手工数字。 */
export function hero(lang) { const en = lang === "en"; return `    <section class="hero" id="home-hero" aria-labelledby="home-title">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-spacer hero-spacer-top" aria-hidden="true"></div>
        <div class="portrait-wrap"><img src="/${site.avatar}" alt="${en ? "Doris Liang" : "梁彦诗"}" width="98" height="98" class="portrait"/></div>
        <h1 id="home-title">
          <span class="hero-muted">Hi, I’m </span><span class="hero-person">${site.englishName}</span><span class="hero-wave" aria-label="${en ? "Wave" : "挥手"}"> 👋</span><span class="hero-chinese-name">${site.name}</span><br/>
          <span class="hero-muted">I turn </span><i>ideas</i><span class="hero-muted"> into working systems with </span><span class="hero-star" aria-hidden="true">✦</span><code class="role-pill">Engineering</code><span class="type-caret" aria-hidden="true"></span>
        </h1>
        <p class="hero-intro">A CURIOUS ENGINEER EXPLORING EDA, AI, ROBOTICS, AND THE SPACE BETWEEN SOFTWARE AND HARDWARE.</p>
        <div class="hero-spacer hero-spacer-bottom" aria-hidden="true"></div>
        <div class="hero-footer">
          <p class="hero-quote">${en ? "Break down complex problems. Build ideas into working systems." : "「把复杂的问题拆开，把模糊的想法做成真正能够运行的系统。」"}</p>
          <p class="hero-stats"><span>${projects.length} ${en ? "projects" : "个项目"}</span><b>·</b><span>${honors.length} ${en ? "honors" : "项荣誉"}</span><b>·</b><span>2024–2026</span></p>
        </div>
        <div class="social-row" aria-label="${en ? "Social links" : "社交链接"}"><a class="social-link" href="mailto:${site.email}" aria-label="${en ? "Email" : "发送邮件"}" data-tooltip="${en ? "Email" : "发送邮件"}"><span aria-hidden="true">✉</span><span class="social-tooltip" role="tooltip">${en ? "Email" : "发送邮件"}</span></a><a class="social-link social-link-github" href="${site.github}" target="_blank" rel="noreferrer" aria-label="${en ? "Open GitHub" : "打开 GitHub"}" data-tooltip="GitHub">${githubIcon}<span class="social-tooltip" role="tooltip">GitHub</span></a><a class="social-link social-link-dac" href="${site.dacUrl}" target="_blank" rel="noreferrer" aria-label="${en ? "Open DAC 2026" : "打开 DAC 2026 页面"}" data-tooltip="DAC 63">${dacIcon}<span class="social-tooltip" role="tooltip">DAC 63</span></a><a class="social-link" href="${social.linkedin}" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3v12h-3ZM9 9h3v1.6c.7-1.2 1.8-1.9 3.4-1.9 3.1 0 4.1 2 4.1 5V21h-3v-6.5c0-1.7-.3-3-2.1-3s-2.4 1.2-2.4 3V21H9Z"/></svg><span class="social-tooltip" role="tooltip">LinkedIn</span></a><a class="social-link" href="#creator" aria-label="${en ? "Douyin · 10K followers" : "抖音 · 一万粉丝"}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 3v12.5a4.5 4.5 0 1 1-4.5-4.5M14 3c0 4 3 6 6 6"/></svg><span class="social-tooltip" role="tooltip">${en ? "Douyin" : "抖音"}</span></a></div>
      </div>
    </section>

`; }
