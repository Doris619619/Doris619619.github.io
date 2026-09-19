// 文件用途：将教育、工作、研究和创作整合为首页的日期—图标—经历时间线，复用现有事实与链接。
import { localizedExperience } from "../content/experience.js";
import { localizedEducation, localizedProjects } from "../content/locales.js";
import { social } from "../content/social.js";
import { escape, paperPdfLink } from "./components.js";
import { pathFor } from "./routes.js";

const drawings = {
  chip: '<rect x="8" y="8" width="16" height="16" rx="2"/><path d="M12 2v6m8-6v6M12 24v6m8-6v6M2 12h6m-6 8h6m16-8h6m-6 8h6M12 12h8v8h-8z"/>',
};

/** Use official institution marks where available and decorative subject icons elsewhere. */
function mark(name) {
  if (["cuhk", "sribd", "robomaster", "berkeley", "itso", "douyin"].includes(name)) return `<span class="history-mark history-mark-${name}"><img src="/assets/organizations/${name}.${name === "douyin" ? "jpg" : "png"}" alt="" width="80" height="80" loading="lazy"></span>`;
  return `<span class="history-mark history-mark-${name}"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name]}</svg></span>`;
}

/** Keep timeline links explicit, short and independently keyboard reachable. */
function link(url, text) { return `<a href="${escape(url)}">${escape(text)} <span aria-hidden="true">↗</span></a>`; }

/** Build selected milestones newest first, using confirmed dates and shared experience records. */
export function homeTimeline(lang) {
  const en = lang === "en";
  const roles = Object.fromEntries(localizedExperience(lang).map((item) => [item.id, item]));
  const education = localizedEducation(lang);
  const projects = localizedProjects(lang);
  const grace = projects.find((item) => item.id === "grace");
  const rows = [
    { id: "creator", time: "2026.09", mark: "douyin", title: en ? "Stories about the people behind open source" : "在抖音，介绍开源世界里的创作者", text: en ? `I make 每天认识一个Github用户. The account reached 10,000 followers on September 18, 2026.` : `我在运营「${social.douyin.name}」，分享 GitHub 用户和他们的故事。2026 年 9 月 18 日，账号突破一万粉丝。`, links: link(pathFor("about", lang) + "#creator", en ? "Douyin · 10K+ followers" : "抖音 · 1 万+ 粉丝") },
    { ...roles.ustf, mark: "chip" },
    { ...roles.sribd, mark: "sribd", links: link(roles.sribd.source, "LinkedIn") },
    { ...roles.itso, mark: "itso", text: en ? "I test the university’s AI platform and multi-model integrations, checking interface compatibility, streaming responses, and access permissions." : "参与校内 AI 平台与多模型接入测试，检查接口兼容性、流式响应和访问权限。", links: link(roles.itso.source, "LinkedIn") },
    { ...roles.ra, mark: "cuhk", text: en ? "I joined Prof. Tinghuan Chen’s group at CUHK-Shenzhen to work on electronic design automation: helping computers design better circuit boards." : "加入香港中文大学（深圳）陈廷欢教授课题组，研究电子设计自动化：让计算机帮助我们设计更好的电路板。", detail: `<ul class="history-research"><li>${link(pathFor("projects/grace", lang), en ? "PCB ground-plane and rerouting co-design" : "电路板接地铜面与布线协同优化")}<span>${en ? "GRACE · DAC 2026 · Fifth author" : "GRACE · DAC 2026 录用 · 第 5 作者"}</span>${paperPdfLink(grace, lang)}</li><li>${link(pathFor("projects/llm-pcb", lang), en ? "Language models for PCB placement and routing" : "大语言模型辅助电路板布局布线")}<span>${en ? "Submitted to AAAI 2027" : "AAAI 2027 在投"}</span></li></ul>`, links: link(roles.ra.source, en ? "Research group" : "课题组官网") },
    { id: "robotics", time: en ? "2025.07 — present" : "2025.07 — 至今", mark: "robomaster", title: en ? "Building vision systems with RoboMaster" : "在 RoboMaster 校队，开发机器人视觉系统", text: en ? "I work on video pipelines, target recognition and communication between the vision system and the robot controller." : "参与校队视觉组，搭建视频处理链路、实现目标识别，也处理视觉系统与控制单元之间的通信问题。", links: link(pathFor("projects/robomaster", lang), en ? "Robot vision project" : "机器人视觉项目") },
    { id: "berkeley", time: education[1].time, mark: "berkeley", title: en ? "A summer at UC Berkeley" : "在伯克利，学习图形学与三维重建", text: en ? "Studied discrete mathematics and computer graphics. For our CS184 project, we reconstructed a 3D scene using Gaussian Splatting; the project was a Showcase Winner." : "在 UC Berkeley 修读离散数学与计算机图形学。CS184 团队项目用高斯泼溅重建三维场景，获评 Showcase Winner。", links: link(pathFor("projects/vrgs", lang), en ? "3D scene reconstruction" : "三维场景重建项目") },
    { id: "university", time: education[0].time, mark: "cuhk", title: education[0].title, text: education[0].detail, links: link(pathFor("about", lang), en ? "More about me" : "更多关于我") }
  ];
  return `<section class="home-history" id="life-timeline" aria-labelledby="history-title"><header class="history-heading"><h2 id="history-title">${en ? "Along the way" : "一路走来"}</h2><a href="${pathFor("journey", lang)}">${en ? "Full timeline" : "完整轨迹"} <span aria-hidden="true">↗</span></a></header><ol class="history-list">${rows.map((item) => `<li class="history-row" id="${item.id}"><p class="history-date">${escape(item.time)}</p>${mark(item.mark)}<div class="history-body"><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p>${item.detail || ""}${item.links ? `<div class="history-links">${item.links}</div>` : ""}</div></li>`).join("")}</ol></section>`;
}
