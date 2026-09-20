// 文件用途：为原有事实资料提供英文表达，并维护全站中英文界面和简介。
import { localizedExperience } from "./experience.js";
import { projects, journey, education, notes } from "./site-data.js";

export const introduction = {
  zh: "我是梁彦诗，也可以叫我 Doris。目前在香港中文大学（深圳）学习计算机工程。我热衷于从具体问题出发做深入研究，并把想法实现为可运行的系统。我关注电子设计自动化、人工智能与机器人视觉：研究过电路板优化，在伯克利做过三维场景重建，也在 RoboMaster 校队调试机器人。研究和代码之外，我在抖音做「每天认识一个Github用户」，介绍开源世界里的创作者；也打乒乓球、写故事。这里放着我的作品，也记下一路走来的尝试。",
  en: "I’m Yanshi Liang — you can call me Doris. I study Computer Engineering at CUHK-Shenzhen. I am passionate about pursuing in-depth research driven by concrete problems and turning ideas into working systems. My interests span electronic design automation, AI, and robot vision: from optimizing circuit boards to reconstructing 3D scenes at Berkeley and working on robots with the RoboMaster team. Outside research and coding, I introduce open-source creators on Douyin through 每天认识一个Github用户, play table tennis, and write stories. This is where I keep my projects and the things I try along the way."
};

export const ui = {
  zh: { home: "首页", projects: "作品", notes: "手记", journey: "轨迹", about: "关于", honors: "荣誉", menu: "菜单", nav: "主导航", theme: "切换深浅色模式", skip: "跳至主要内容", all: "查看全部", detail: "查看项目", selected: "精选研究", intro: "关于我", recent: "写作", date: "写于", award: "获奖", certificate: "查看证书", read: "阅读全文", back: "返回", background: "研究背景", contribution: "我的工作", outcome: "结果与进展", tools: "技术与工具", sources: "相关链接", education: "教育背景", activity: "校园生活", contact: "联系", academic: "学术与竞赛", creative: "写作与影像", sport: "体育", languageNote: "中文原作", rights: "梁彦诗 · Doris Liang", skills: "常用工具", original: "未选择的路", originalSummary: "在两条看似互相映照的路上，关于理想、妥协与未被选择的可能。" },
  en: { home: "Home", projects: "Projects", notes: "Writing", journey: "Journey", about: "About", honors: "Honors", menu: "Menu", nav: "Main navigation", theme: "Toggle light and dark theme", skip: "Skip to content", all: "View all", detail: "Explore project", selected: "Selected research", intro: "A little about me", recent: "Writing", date: "Written", award: "Recognition", certificate: "View certificate", read: "Read the story", back: "Back to", background: "Context", contribution: "My contribution", outcome: "Results & progress", tools: "Tools & technologies", sources: "Related links", education: "Education", activity: "Campus life", contact: "Contact", academic: "Academic & competitions", creative: "Writing & film", sport: "Sport", languageNote: "Original text in Chinese · English introduction only", rights: "Doris Liang · 梁彦诗", skills: "Tools I work with", original: "The Road Not Chosen", originalSummary: "A story of ideals, compromise, and the possibilities left behind on two seemingly parallel paths." }
};

const englishProjects = {
  threadline: { title: "Threadline · Tasks and time, together", subtitle: "A personal workspace for tasks, daily habits and time planning", statement: "Connect plans with actual effort: organize today's work and review where the time went.", detail: "Built daily workflows for tasks, recurring checklists, unscheduled work and end-of-day review, alongside calendars, habit tracking and time insights. One frontend serves browsers, iPhone PWA and Windows, with business data synchronized through Supabase.", result: "A downloadable Windows app with a compact desktop workspace and automatic updates. The public repository includes instructions for deploying the web version." },
  grace: { title: "PCB ground-plane and rerouting optimization", subtitle: "Co-designing ground-plane generation and PCB rerouting", statement: "Treating ground-plane generation as a joint optimization problem with rerouting, rather than a passive fill after routing.", detail: "Independently developed a KiCad 7.0 PCB layout parser, local region partitioning, and rerouting modules, and integrated parsing, optimization, write-back, and evaluation into a single pipeline.", result: "Average ground-plane area increased by 33.06%; fragmented polygon count decreased by 54.34%." },
  "llm-pcb": { title: "Language models for PCB placement and routing", subtitle: "LLM-driven PCB placement and routing optimization", statement: "Exploring how large language models can participate in engineering optimization and be evaluated under real placement and routing constraints.", detail: "Built the complete LoRA / QLoRA supervised fine-tuning workflow; studied the training mechanisms and applicability of PPO, GRPO, and GSPO.", result: "Established a research workflow covering data preparation, training configuration, and experimental validation." },
  robomaster: { subtitle: "Robot vision and real-time status overlays", statement: "Keeping perception, transmission, and status displays in sync in a fast-moving competition environment.", detail: "Built a ROS2 video transmission and processing pipeline with OpenCV object recognition; improved serial communication between the vision module and controller and implemented real-time status overlays.", result: "Resolved packet loss issues and improved the reliability of status-data transmission." },
  vrgs: { subtitle: "Realtime VR Gaming based on 3D Gaussian Splatting", statement: "Reconstructing a real scene as an explorable 3D space using multi-view images and reproducible experiment settings.", detail: "Configured GPU training and resolved Nerfstudio / Splatfacto dependencies. Trained on approximately 1,000 multi-view screenshots with COLMAP camera poses and exported a scene point cloud.", result: "Preserved checkpoints and configurations for a reproducible 3D scene reconstruction workflow." }
};

export const projectStatus = {
  threadline: { zh: "个人软件作品 · Web / PWA / Windows", en: "Personal software project · Web / PWA / Windows" },
  grace: { zh: "DAC 2026 论文录用 · 第 5 作者", en: "Paper accepted at DAC 2026 · Fifth author" },
  "llm-pcb": { zh: "AAAI 2027 在投", en: "Submitted to AAAI 2027" },
  robomaster: { zh: "RoboMaster 视觉组 · 工程实践", en: "RoboMaster vision team · Engineering practice" },
  vrgs: { zh: "UC Berkeley CS184 · Showcase Winner", en: "UC Berkeley CS184 · Showcase Winner" }
};

const englishJourney = [
  { title: "Research · LLM-driven PCB optimization", text: "Submitted to AAAI 2027. Built a complete LoRA / QLoRA SFT workflow and investigated reinforcement learning methods for engineering optimization." },
  { title: "Research · PCB ground-plane and rerouting optimization", text: "Accepted at DAC 2026, fifth author. Developed PCB parsing, local rerouting, and optimization write-back modules." },
  { title: "RoboMaster Vision Team · CUHK-Shenzhen", text: "Worked on ROS2 video pipelines, OpenCV recognition, serial communication reliability, and real-time status overlays." },
  { title: "Instructor · Shengtu Education Technology", text: "Taught senior high-school physics and coached English debate, including argument building, structured expression, and impromptu speaking." }
];
const englishEducation = [
  { title: "The Chinese University of Hong Kong, Shenzhen", detail: "Electronic and Computer Engineering (Computer Engineering track)" },
  { title: "UC Berkeley Summer Session", detail: "CS70 Discrete Mathematics and Probability Theory · CS184 Computer Graphics" }
];

/** Merge translated prose with the original IDs, technical stacks and public links. */
export function localizedProjects(lang) {
  return projects.map((project) => ({ ...project, ...(lang === "en" ? englishProjects[project.id] : {}), status: projectStatus[project.id][lang] }));
}

/** Localize dates and prose while retaining the supplied chronology, including ongoing work. */
export function localizedJourney(lang) {
  return [...localizedExperience(lang), ...journey.map((item, index) => ({ ...item, ...(lang === "en" ? englishJourney[index] : {}), time: lang === "en" ? item.time.replace("至今", "present") : item.time }))];
}

/** Return education records without inferring graduation dates or degree achievements. */
export function localizedEducation(lang) {
  return education.map((item, index) => ({ ...item, ...(lang === "en" ? englishEducation[index] : {}), time: lang === "en" ? item.time.replace("至今", "present") : item.time }));
}

/** Translate only the literary work's introduction; its paragraphs remain the original Chinese. */
export function localizedNote(lang) {
  return { ...notes[0], title: ui[lang].original, summary: ui[lang].originalSummary };
}

// 类型与成果分开表达，读者无需先认识项目缩写。
export const projectContext = {
  threadline: { zh: "产品开发 · 效率工具", en: "Product development · Productivity" },
  grace: { zh: "科研 · 电子设计自动化", en: "Research · Electronic design automation" },
  "llm-pcb": { zh: "科研 · 人工智能", en: "Research · Artificial intelligence" },
  robomaster: { zh: "竞赛工程 · 机器人视觉", en: "Competition engineering · Robot vision" },
  vrgs: { zh: "课程项目 · 计算机图形学", en: "Course project · Computer graphics" }
};
