// 文件用途：维护作品导览与个人介绍的双语编辑文案；详细事实仍取自原项目数据。
export const portfolioCopy = {
  zh: {
    title: "研究与作品",
    introduction: "我的研究围绕 PCB 设计优化展开，也参与机器人视觉系统开发和三维场景重建。这里记录我解决的问题、承担的工作与阶段成果。",
    research: "研究",
    researchNote: "电子设计自动化与人工智能",
    practice: "工程与课程实践",
    practiceNote: "机器人视觉与计算机图形学",
    profile: "关于我",
    profileNote: "梁彦诗 / Doris Liang",
    moreAbout: "更多关于我",
    allWork: "全部研究与作品",
    practiceLink: "工程与课程实践",
    writing: "写作与生活",
    writingNote: "研究和代码之外",
    life: "我也打乒乓球、写故事，参加校园活动。这些经历和研究一样，都是大学生活的一部分。",
    honors: "比赛与获奖记录",
    story: "阅读手记",
    detail: "项目详情",
    paper: "论文页面",
    report: "项目报告",
    result: "项目结果",
    contact: "邮件联系",
    profileBreaks: ["我关注", "研究和代码之外"]
  },
  en: {
    title: "Research & projects",
    introduction: "My research focuses on PCB design optimization. I also work on robot vision and 3D scene reconstruction. These projects document the problems, my contributions, and the results along the way.",
    research: "Research",
    researchNote: "Electronic design automation & AI",
    practice: "Engineering & coursework",
    practiceNote: "Robot vision & computer graphics",
    profile: "About me",
    profileNote: "Doris Liang / 梁彦诗",
    moreAbout: "More about me",
    allWork: "All research & projects",
    practiceLink: "Engineering & coursework",
    writing: "Writing & life",
    writingNote: "Beyond research and code",
    life: "I also play table tennis, write stories, and take part in campus activities. These experiences are part of my university life alongside research.",
    honors: "Competitions & recognition",
    story: "Read my writing",
    detail: "Project details",
    paper: "Paper page",
    report: "Project report",
    result: "Project results",
    contact: "Email me",
    profileBreaks: ["My interests", "Outside research"]
  }
};

// 摘要同时交代问题与个人工作，避免读者仅靠项目缩写猜测内容。
export const projectPresentation = {
  grace: {
    zh: { title: "电路板接地铜面与布线协同优化", text: "研究如何联合优化电路板走线与接地铜面。我独立开发了 KiCad 布局解析、局部区域切分和重布线模块，并完成优化结果回写。" },
    en: { title: "PCB ground-plane and rerouting co-design", text: "Research on jointly optimizing PCB routing and ground-plane generation. I independently developed the KiCad layout parser, local partitioning and rerouting modules, and integrated optimization write-back." }
  },
  "llm-pcb": {
    zh: { title: "大语言模型辅助电路板布局布线", text: "探索大语言模型如何参与 PCB 布局布线优化。我搭建并跑通了 LoRA / QLoRA 监督微调流程，研究强化学习方法在工程优化任务中的适用性。" },
    en: { title: "Language models for PCB placement and routing", text: "Exploring how language models can participate in PCB placement and routing optimization. I built the LoRA / QLoRA supervised fine-tuning workflow and studied reinforcement learning methods for engineering optimization." }
  },
  robomaster: {
    zh: { title: "RoboMaster · 机器人视觉系统", text: "在校队视觉组参与视频处理与状态显示开发。我搭建 ROS2 视频链路、使用 OpenCV 实现目标识别，并优化串口通信，解决状态数据传输中的丢包问题。" },
    en: { title: "RoboMaster · Robot vision systems", text: "As part of the university vision team, I built ROS2 video pipelines and OpenCV recognition, improved serial communication to resolve packet loss, and implemented real-time status overlays." }
  },
  vrgs: {
    zh: { title: "VR-GS · 三维场景重建", text: "UC Berkeley CS184 团队课程项目。我配置并调试 GPU 训练环境，基于约 1000 张多视角截图完成 3D Gaussian Splatting 训练，导出场景点云并保留可复现实验配置。" },
    en: { title: "VR-GS · 3D scene reconstruction", text: "A team course project for UC Berkeley CS184. I configured the GPU training environment, trained a 3D Gaussian Splatting model on approximately 1,000 multi-view screenshots, and exported the point cloud with reproducible experiment settings." }
  }
};
