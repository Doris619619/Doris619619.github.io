import { education, highlights, honors, journey, notes, projects, site, skills } from "./content/site-data.js";

const arrow = "<span aria-hidden=\"true\">↗</span>";
const icon = (name) => name === "sun"
  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.93 4.93 6.7 6.7M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77"/></svg>`
  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.7 15.1A8.8 8.8 0 0 1 8.9 3.3 8.8 8.8 0 1 0 20.7 15.1Z"/></svg>`;
const tags = (items) => `<div class="tags">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;

function renderHeader() {
  document.querySelector(".site-header").innerHTML = `<a class="wordmark" href="#top" aria-label="返回顶部"><span>梁彦诗</span><em>Doris Liang</em></a><nav class="nav" aria-label="主导航"><a href="#top">首页</a><a href="#work">作品</a><a href="#notes">手记</a><a href="#journey">轨迹</a><a href="#about">关于</a><button class="theme-button" type="button" aria-label="切换深浅色模式">${icon("moon")}</button></nav>`;
}

function projectMarkup(project) {
  const links = project.link ? `<div class="work-links"><a href="${project.link}" target="_blank" rel="noreferrer" class="work-link">项目报告 ${arrow}</a>${project.secondaryLink ? `<a href="${project.secondaryLink}" target="_blank" rel="noreferrer" class="work-link">CS184 Showcase ${arrow}</a>` : ""}</div>` : "";
  return `<article class="work-card" id="${project.id}"><div class="work-top"><span>${project.index}</span><span>${project.eyebrow}</span></div><div class="work-body"><h3>${project.title}</h3><p class="work-subtitle">${project.subtitle}</p><p class="work-statement">${project.statement}</p><p class="work-detail">${project.detail}</p><p class="work-result">${project.result}</p>${tags(project.stack)}</div>${links}</article>`;
}

function renderMain() {
  const projectCards = projects.map(projectMarkup).join("");
  const journeyItems = journey.map((item) => `<article class="journey-item"><time>${item.time}</time><div><h3>${item.title}</h3><p>${item.text}</p></div></article>`).join("");
  const educationItems = education.map((item) => `<article><time>${item.time}</time><h3>${item.title}</h3><p>${item.detail}</p></article>`).join("");
  const highlightsMarkup = highlights.map((item) => `<div><strong>${item.value}</strong><span>${item.label}</span></div>`).join("");
  const honorMarkup = honors.map((item) => `<article class="honor"><img src="${item.image}" alt="${item.title}证书" loading="lazy"/><div><h3>${item.title}</h3><p>${item.meta}</p></div></article>`).join("");
  const skillsMarkup = skills.map((skill) => `<div class="skill-row"><span>${skill.label}</span><p>${skill.items}</p></div>`).join("");
  const notesMarkup = notes.length ? notes.map((note) => `<article class="note-card"><time>${note.date}</time><h3>${note.title}</h3><p>${note.summary}</p></article>`).join("") : `<div class="notes-empty"><span class="notes-feather" aria-hidden="true">⌁</span><div><p>手记还在等待第一篇真实内容。</p><small>未来可在 <code>content/site-data.js</code> 的 <code>notes</code> 数组中追加标题、日期、摘要与正文链接。</small></div></div>`;

  document.querySelector("main").innerHTML = `
    <section class="hero" id="top" aria-labelledby="home-title">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-spacer hero-spacer-top" aria-hidden="true"></div>
        <div class="portrait-wrap"><img src="${site.avatar}" alt="梁彦诗" class="portrait"/></div>
        <h1 id="home-title">
          <span class="hero-muted">Hi, I’m </span><span class="hero-person">${site.englishName}</span><span class="hero-wave" aria-label="挥手"> 👋</span><span class="hero-chinese-name">${site.name}</span><br/>
          <span class="hero-muted">I turn </span><i>ideas</i><span class="hero-muted"> into working systems with </span><span class="hero-star" aria-hidden="true">✦</span><code class="role-pill">Engineering</code><span class="type-caret" aria-hidden="true"></span>
        </h1>
        <p class="hero-intro">A CURIOUS ENGINEER EXPLORING EDA, AI, ROBOTICS, AND THE SPACE BETWEEN SOFTWARE AND HARDWARE.</p>
        <div class="hero-spacer hero-spacer-bottom" aria-hidden="true"></div>
        <div class="hero-footer">
          <p class="hero-quote">「把复杂的问题拆开，把模糊的想法做成真正能够运行的系统。」</p>
          <p class="hero-stats"><span>4 projects</span><b>·</b><span>3 honors</span><b>·</b><span>2024–2026</span></p>
        </div>
        <div class="social-row"><a href="mailto:${site.email}" aria-label="发送邮件">✉</a><a href="${site.github}" target="_blank" rel="noreferrer" aria-label="打开 GitHub">⌘</a><a href="${site.dacUrl}" target="_blank" rel="noreferrer" aria-label="打开 DAC 2026 页面">◌</a></div>
      </div>
    </section>

    <section class="signal-bar" aria-label="重点成果">${highlightsMarkup}</section>

    <section class="section work-section" id="work" aria-labelledby="work-title"><div class="section-kicker"><span>01</span><div><p>Selected work</p><h2 id="work-title">把研究，变成可运行的系统。</h2></div></div><div class="work-grid">${projectCards}</div></section>

    <section class="section notes-section" id="notes" aria-labelledby="notes-title"><div class="section-kicker"><span>02</span><div><p>Notes</p><h2 id="notes-title">手记，留给正在发生的事。</h2></div></div><div class="notes-nav" aria-label="手记栏目"><span class="active">全部</span><span>学习</span><span>项目</span><span>时光</span><span>思考</span></div><div class="notes-list">${notesMarkup}</div></section>

    <section class="section journey-section" id="journey" aria-labelledby="journey-title"><div class="section-kicker"><span>03</span><div><p>Journey</p><h2 id="journey-title">在研究、工程与赛场之间。</h2></div></div><div class="journey-list">${journeyItems}</div></section>

    <section class="section profile-section" id="about" aria-labelledby="about-title"><div class="section-kicker"><span>04</span><div><p>Profile</p><h2 id="about-title">从基础到现场。</h2></div></div><div class="profile-grid"><div class="education-list">${educationItems}</div><div class="about-copy"><p>我目前就读于香港中文大学（深圳）计算机工程专业。我的学习与实践围绕三个方向展开：电子设计自动化中的优化问题、能够被验证的 AI 系统，以及机器人视觉中的实时链路。</p><p>我喜欢把研究的抽象性带到工程里，也把工程中的真实约束带回研究。</p><a href="mailto:${site.email}" class="text-link">联系我 ${arrow}</a></div></div></section>

    <section class="section honors-section" aria-labelledby="honors-title"><div class="section-kicker"><span>05</span><div><p>Recognition</p><h2 id="honors-title">一些值得记住的节点。</h2></div></div><div class="honor-grid">${honorMarkup}</div></section>

    <section class="section toolbox" aria-labelledby="toolbox-title"><div class="section-kicker"><span>06</span><div><p>Toolbox</p><h2 id="toolbox-title">我常用的工作语言。</h2></div></div><div class="skills-list">${skillsMarkup}</div></section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title"><p class="eyebrow">Open to a thoughtful conversation</p><h2 id="contact-title">让我们聊聊<br/><i>next ideas.</i></h2><div><a href="mailto:${site.email}" class="button primary">发送邮件 ${arrow}</a><a href="${site.github}" target="_blank" rel="noreferrer" class="button">GitHub ${arrow}</a></div></section>`;
}

function themeSetup() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const apply = (value) => { root.dataset.theme = value; document.querySelector(".theme-button").innerHTML = icon(value === "dark" ? "sun" : "moon"); };
  apply(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  document.querySelector(".theme-button").addEventListener("click", () => { const next = root.dataset.theme === "dark" ? "light" : "dark"; localStorage.setItem("theme", next); apply(next); });
}

function renderFooter() { document.querySelector(".site-footer").innerHTML = `<p>© 2026 梁彦诗 · Doris Liang</p><p>EDA · AI · Robotics</p>`; }
renderHeader(); renderMain(); renderFooter(); themeSetup();
