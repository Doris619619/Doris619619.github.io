// 文件用途：为原有事实资料提供英文表达，并维护全站中英文界面和简介。
import { projects, journey, education, notes } from "./site-data.js";

export const introduction = {
  zh: "我是梁彦诗，目前就读于香港中文大学（深圳）计算机工程专业。我关注电子设计自动化、人工智能与机器人视觉，做过 PCB 优化、三维场景重建，也参与 RoboMaster 视觉系统开发。我喜欢顺着一个具体问题钻进去，再把学到的东西用在实际项目里。研究和代码之外，我也打乒乓球、写故事，参加校园活动。这里记录我的作品，也记录这些探索留下的片段。",
  en: "I’m Doris Liang, a Computer Engineering student at The Chinese University of Hong Kong, Shenzhen. My interests span electronic design automation, AI, and robot vision. I’ve worked on PCB optimization, 3D scene reconstruction, and vision systems for RoboMaster. I enjoy digging into a concrete problem and putting what I learn into practice. Outside research and coding, I play table tennis, write stories, and take part in campus life. This is a place for my projects and the experiences along the way."
};

export const ui = {
  zh: { home: "首页", projects: "作品", notes: "手记", journey: "轨迹", about: "关于", honors: "荣誉", menu: "菜单", nav: "主导航", theme: "切换深浅色模式", skip: "跳至主要内容", all: "查看全部", detail: "查看项目", selected: "精选研究", intro: "关于我", recent: "写作", date: "写于", award: "获奖", certificate: "查看证书", read: "阅读全文", back: "返回", background: "研究背景", contribution: "我的工作", outcome: "结果与进展", tools: "技术与工具", sources: "相关链接", education: "教育背景", activity: "校园生活", contact: "联系", academic: "学术与竞赛", creative: "写作与影像", sport: "体育", languageNote: "中文原作", rights: "梁彦诗 · Doris Liang", skills: "常用工具", original: "未选择的路", originalSummary: "在两条看似互相映照的路上，关于理想、妥协与未被选择的可能。" },
  en: { home: "Home", projects: "Projects", notes: "Writing", journey: "Journey", about: "About", honors: "Honors", menu: "Menu", nav: "Main navigation", theme: "Toggle light and dark theme", skip: "Skip to content", all: "View all", detail: "Explore project", selected: "Selected research", intro: "A little about me", recent: "Writing", date: "Written", award: "Recognition", certificate: "View certificate", read: "Read the story", back: "Back to", background: "Context", contribution: "My contribution", outcome: "Results & progress", tools: "Tools & technologies", sources: "Related links", education: "Education", activity: "Campus life", contact: "Contact", academic: "Academic & competitions", creative: "Writing & film", sport: "Sport", languageNote: "Original text in Chinese · English introduction only", rights: "Doris Liang · 梁彦诗", skills: "Tools I work with", original: "The Road Not Chosen", originalSummary: "A story of ideals, compromise, and the possibilities left behind on two seemingly parallel paths." }
};

const englishProjects = {
  grace: { subtitle: "Co-designing ground-plane generation and PCB rerouting", statement: "Treating ground-plane generation as a joint optimization problem with rerouting, rather than a passive fill after routing.", detail: "Independently developed a KiCad 7.0 PCB layout parser, local region partitioning, and rerouting modules, and integrated parsing, optimization, write-back, and evaluation into a single pipeline.", result: "Average ground-plane area increased by 33.06%; fragmented polygon count decreased by 54.34%." },
  "llm-pcb": { subtitle: "LLM-driven PCB placement and routing optimization", statement: "Exploring how large language models can participate in engineering optimization and be evaluated under real placement and routing constraints.", detail: "Built the complete LoRA / QLoRA supervised fine-tuning workflow; studied the training mechanisms and applicability of PPO, GRPO, and GSPO.", result: "Established a research workflow covering data preparation, training configuration, and experimental validation." },
  robomaster: { subtitle: "Robot vision and real-time status overlays", statement: "Keeping perception, transmission, and status displays in sync in a fast-moving competition environment.", detail: "Built a ROS2 video transmission and processing pipeline with OpenCV object recognition; improved serial communication between the vision module and controller and implemented real-time status overlays.", result: "Resolved packet loss issues and improved the reliability of status-data transmission." },
  vrgs: { subtitle: "Realtime VR Gaming based on 3D Gaussian Splatting", statement: "Reconstructing a real scene as an explorable 3D space using multi-view images and reproducible experiment settings.", detail: "Configured GPU training and resolved Nerfstudio / Splatfacto dependencies. Trained on approximately 1,000 multi-view screenshots with COLMAP camera poses and exported a scene point cloud.", result: "Preserved checkpoints and configurations for a reproducible 3D scene reconstruction workflow." }
};

export const projectStatus = {
  grace: { zh: "DAC 2026 录用 · 第 5 作者", en: "Accepted at DAC 2026 · Fifth author" },
  "llm-pcb": { zh: "研究进行中", en: "Research in progress" },
  robomaster: { zh: "RoboMaster 视觉组 · 工程实践", en: "RoboMaster vision team · Engineering practice" },
  vrgs: { zh: "UC Berkeley CS184 · Showcase Winner", en: "UC Berkeley CS184 · Showcase Winner" }
};

const englishJourney = [
  { title: "Student Assistant · CUHK-Shenzhen ITSO", text: "Tested campus AI platform APIs, covering /chat/completions, /responses, streaming, and authorization. Verified compatibility across 64 parameter fields and tested multi-model access in Cherry Studio." },
  { title: "Research · LLM-driven PCB optimization", text: "Built a complete LoRA / QLoRA SFT workflow and investigated reinforcement learning methods for engineering optimization." },
  { title: "Research · GRACE", text: "Accepted at DAC 2026, fifth author. Developed PCB parsing, local rerouting, and optimization write-back modules." },
  { title: "RoboMaster Vision Team · CUHK-Shenzhen", text: "Worked on ROS2 video pipelines, OpenCV recognition, serial communication reliability, and real-time status overlays." },
  { title: "Instructor · Shengtu Education Technology", text: "Taught senior high-school physics and coached English debate, including argument building, structured expression, and impromptu speaking." }
];
const englishEducation = [
  { title: "The Chinese University of Hong Kong, Shenzhen", detail: "Computer Engineering · GPA 3.571" },
  { title: "UC Berkeley Summer Session", detail: "CS70 Discrete Mathematics and Probability Theory · CS184 Computer Graphics" }
];

/** Merge translated prose with the original IDs, technical stacks and public links. */
export function localizedProjects(lang) {
  return projects.map((project) => ({ ...project, ...(lang === "en" ? englishProjects[project.id] : {}), status: projectStatus[project.id][lang] }));
}

/** Localize dates and prose while retaining the supplied chronology, including ongoing work. */
export function localizedJourney(lang) {
  return journey.map((item, index) => ({ ...item, ...(lang === "en" ? englishJourney[index] : {}), time: lang === "en" ? item.time.replace("至今", "present") : item.time }));
}

/** Return education records without inferring graduation dates or degree achievements. */
export function localizedEducation(lang) {
  return education.map((item, index) => ({ ...item, ...(lang === "en" ? englishEducation[index] : {}), time: lang === "en" ? item.time.replace("至今", "present") : item.time }));
}

/** Translate only the literary work's introduction; its paragraphs remain the original Chinese. */
export function localizedNote(lang) {
  return { ...notes[0], title: ui[lang].original, summary: ui[lang].originalSummary };
}

// 项目索引交代具体问题；完整贡献与指标仍在原始项目数据中。
export const projectSummaries = {
    grace: { zh: "研究如何协同调整电路板布线与地平面生成，让接地铜面更完整、减少碎片。", en: "Research on jointly optimizing PCB routing and ground-plane generation for larger, less fragmented ground planes." },
    "llm-pcb": { zh: "用大语言模型探索 PCB 布局布线优化", en: "Exploring PCB optimization with language models" },
    robomaster: { zh: "机器人视觉、视频传输与实时状态显示", en: "Robot vision, video pipelines, and live status overlays" },
    vrgs: { zh: "基于 3D Gaussian Splatting 的场景重建", en: "3D scene reconstruction with Gaussian Splatting" }
  };

// 类型与成果分开表达，读者无需先认识项目缩写。
export const projectContext = {
  grace: { zh: "科研 · 电子设计自动化", en: "Research · Electronic design automation" },
  "llm-pcb": { zh: "科研 · 人工智能", en: "Research · Artificial intelligence" },
  robomaster: { zh: "竞赛工程 · 机器人视觉", en: "Competition engineering · Robot vision" },
  vrgs: { zh: "课程项目 · 计算机图形学", en: "Course project · Computer graphics" }
};
