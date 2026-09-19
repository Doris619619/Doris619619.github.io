// 文件用途：维护经本人、领英和教授官网确认的双语工作与教学经历，供关于页和时间轴共用。
export const experience = [
  {
    id: "ra", time: "2025.09 — 至今", source: "https://mypage.cuhk.edu.cn/academics/chentinghuan/team.html",
    zh: { title: "本科生研究助理 · 陈廷欢教授课题组", text: "香港中文大学（深圳）。参与电子设计自动化与 PCB 优化研究，研究工作包括 GRACE（DAC 2026 录用，第 5 作者）和 LLM × PCB（AAAI 2027 在投）。" },
    en: { title: "Undergraduate Research Assistant · Prof. Tinghuan Chen", text: "The Chinese University of Hong Kong, Shenzhen. Research in electronic design automation and PCB optimization, including GRACE (accepted at DAC 2026, fifth author) and LLM × PCB (submitted to AAAI 2027)." }
  },
  {
    id: "itso", time: "2026.01 — 至今", source: "https://www.linkedin.com/in/yanshi-liang-015052430/",
    zh: { title: "ITSO 软件工程师 · 香港中文大学（深圳）", text: "参与校内 AI 平台接口测试；覆盖 /chat/completions、/responses、流式返回与权限校验，验证 64 个参数字段兼容性，并测试 Cherry Studio 多模型接入。" },
    en: { title: "Software Engineer · CUHK-Shenzhen ITSO", text: "Tested campus AI platform APIs, including /chat/completions, /responses, streaming and authorization. Verified compatibility across 64 parameter fields and tested multi-model access in Cherry Studio." }
  },
  {
    id: "sribd", time: "2026.06 — 2026.08", source: "https://www.linkedin.com/in/yanshi-liang-015052430/",
    zh: { title: "AI 智能体开发助理工程师 · 深圳市大数据研究院", text: "实习 · 深圳 · 混合办公。参与 AI 智能体开发。" },
    en: { title: "Assistant Engineer, AI Agent Development · Shenzhen Research Institute of Big Data", text: "Internship in Shenzhen, with hybrid work. Worked on AI agent development." }
  },
  {
    id: "ustf", time: "2026",
    zh: { title: "USTF · ECE2050 数字电路", text: "University Student Teaching Fellow · 香港中文大学（深圳）。参与 ECE2050 Digital Logic and Systems 课程教学。" },
    en: { title: "USTF · ECE2050 Digital Logic and Systems", text: "University Student Teaching Fellow at The Chinese University of Hong Kong, Shenzhen, supporting teaching for ECE2050." }
  }
];

/** Localize role descriptions and ongoing dates without inventing semesters or teaching duties. */
export function localizedExperience(lang) {
  return experience.map((item) => ({ id: item.id, source: item.source, time: lang === "en" ? item.time.replace("至今", "present") : item.time, ...item[lang] }));
}
