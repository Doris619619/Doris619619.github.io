// 文件用途：保留原有首页开场，仅将语言、计数和资源路径参数化。
import {site, projects} from "../content/site-data.js";
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
        <div class="social-row" aria-label="${en ? "Social links" : "社交链接"}"><a class="social-link" href="mailto:${site.email}" aria-label="${en ? "Email" : "发送邮件"}" data-tooltip="${en ? "Email" : "发送邮件"}"><span aria-hidden="true">✉</span><span class="social-tooltip" role="tooltip">${en ? "Email" : "发送邮件"}</span></a><a class="social-link social-link-github" href="${site.github}" target="_blank" rel="noreferrer" aria-label="${en ? "Open GitHub" : "打开 GitHub"}" data-tooltip="GitHub">${githubIcon}<span class="social-tooltip" role="tooltip">GitHub</span></a><a class="social-link social-link-dac" href="${site.dacUrl}" target="_blank" rel="noreferrer" aria-label="${en ? "Open DAC 2026" : "打开 DAC 2026 页面"}" data-tooltip="DAC 63">${dacIcon}<span class="social-tooltip" role="tooltip">DAC 63</span></a></div>
      </div>
    </section>

`; }
