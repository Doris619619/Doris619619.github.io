export const site = {
  name: "梁彦诗",
  englishName: "Doris Liang",
  role: "Computer Engineering · EDA / AI / Robotics",
  location: "深圳，中国",
  email: "124090348@link.cuhk.edu.cn",
  phone: "+86 180 2752 1937",
  github: "https://github.com/Doris619619",
  dacUrl: "https://63dac.conference-program.com/presentation/?id=RESEARCH1473&sess=sess129",
  avatar: "assets/26b172be3a63bb9123d2302763bc00da.jpg",
  introduction: "我在计算机工程、电子设计自动化与智能系统的交叉处学习和构建：把复杂的技术问题，做成可运行、可验证的系统。",
  source: "info/【中文】全.pdf、info/info.txt、用户提供的公开链接"
};

export const projects = [
  {
    id: "grace",
    index: "01",
    eyebrow: "EDA Research · DAC 2026",
    title: "GRACE",
    subtitle: "面向地平面生成与重布线协同设计引擎",
    statement: "让地平面生成不再只是布线后的被动填充，而成为与重布线共同求解的优化问题。",
    detail: "独立开发 KiCad 7.0 PCB 布局解析器、局部区域切分和重布线模块，并封装从解析、优化到回写评测的一键流水线。",
    result: "地平面面积平均提升 33.06%，碎片多边形数降低 54.34%。",
    stack: ["C++", "KiCad 7.0", "PCB Optimization"],
    link: "https://63dac.conference-program.com/presentation/?id=RESEARCH1473&sess=sess129"
  },
  {
    id: "llm-pcb",
    index: "02",
    eyebrow: "LLM Research · Ongoing",
    title: "LLM × PCB",
    subtitle: "大语言模型驱动的 PCB 布局布线优化",
    statement: "探索如何让大语言模型进入工程优化流程，并在真实布局布线约束下接受验证。",
    detail: "完成 LoRA / QLoRA 大模型 SFT 微调全流程；研究 PPO、GRPO、GSPO 在训练机制与适用场景上的差异。",
    result: "建立从数据预处理、训练配置到实验验证的完整研究工作流。",
    stack: ["SFT", "LoRA", "QLoRA", "RL" ]
  },
  {
    id: "robomaster",
    index: "03",
    eyebrow: "Robotics · ROS2",
    title: "RoboMaster Vision",
    subtitle: "机器人视觉与实时信息叠加",
    statement: "在快速变化的赛场信息中，让感知、传输与状态显示保持稳定同步。",
    detail: "基于 ROS2 搭建视频传输与处理流程，使用 OpenCV 做实时目标识别；优化视觉模块与控制单元的串口通信，并搭建实时信息叠加层。",
    result: "解决丢包问题，提升状态数据传输稳定性。",
    stack: ["ROS2", "OpenCV", "C++", "Serial IO"],
    link: "https://github.com/Doris619619"
  },
  {
    id: "vrgs",
    index: "04",
    eyebrow: "UC Berkeley CS184 · Showcase Winner",
    title: "VR-GS",
    subtitle: "Realtime VR Gaming based on 3D Gaussian Splatting",
    statement: "用多视角图像和可复现实验配置，把一个真实场景带入可探索的三维空间。",
    detail: "配置 GPU 训练环境并解决 Nerfstudio / Splatfacto 依赖问题；基于约 1000 张多视角截图与 COLMAP 位姿数据完成训练，导出场景点云。",
    result: "保留 checkpoint 与 config，形成可复现的 3D 场景重建流程。",
    stack: ["3DGS", "Nerfstudio", "COLMAP", "GPU" ],
    link: "https://yllivct.github.io/finalproject-vr/final-report/index.html",
    secondaryLink: "https://cs184.eecs.berkeley.edu/su25/project/showcase/"
  }
];

export const journey = [
  { time: "2026.01 — 至今", title: "学生助理 · CUHK-Shenzhen ITSO", text: "参与校内 AI 平台接口测试；完成 /chat/completions、/responses、流式返回与权限校验的覆盖，验证 64 个参数字段兼容性，并测试 Cherry Studio 多模型接入。" },
  { time: "2025.12 — 至今", title: "研究项目 · LLM 驱动的 PCB 布局布线优化", text: "搭建 LoRA / QLoRA SFT 微调全流程，研究强化学习方法在工程优化任务中的训练机制与潜在效果。" },
  { time: "2025.09 — 2025.12", title: "研究项目 · GRACE", text: "DAC 2026 Accepted，第 5 作者；开发 PCB 解析、局部重布线与优化回写模块。" },
  { time: "2025.07 — 至今", title: "RoboMaster 视觉组 · CUHK-Shenzhen", text: "围绕 ROS2 视频链路、OpenCV 目标识别、串口稳定性和实时画面状态叠加开展工程工作。" },
  { time: "2025.06", title: "讲师 & 授课教师 · 升途教育科技", text: "承担高三物理教学，并围绕观点构建、结构化表达和临场演讲开展英文辩论训练。" }
];

export const education = [
  { time: "2024.09 — 至今", title: "香港中文大学（深圳）", detail: "计算机工程 · GPA 3.571" },
  { time: "2025.06 — 2025.08", title: "UC Berkeley Summer Session", detail: "CS70 离散数学与概率论 · CS184 计算机图形学" }
];

export const highlights = [
  { value: "DAC '26", label: "GRACE 论文录用" },
  { value: "33.06%", label: "地平面面积平均提升" },
  { value: "64", label: "AI 平台参数字段验证" }
];

export const honors = [
  { title: "全国大学生数学建模竞赛", meta: "2025 · 广东省一等奖", image: "assets/math-modeling-award.png" },
  { title: "RoboMaster 高校联盟赛", meta: "2026 · 英雄机器人组二等奖", image: "assets/robomaster-certificate.png" },
  { title: "第十五届全运会志愿者", meta: "2025 · 服务 81.50 小时", image: "assets/volunteer-certificate.png" }
];

export const skills = [
  { label: "Build", items: "Python · C++ · Go · Qt · React · SQLite" },
  { label: "See", items: "OpenCV · ROS2 · OpenGL · 3D Gaussian Splatting" },
  { label: "Explore", items: "SFT · LoRA · PPO · GRPO · 数据合成" }
];

// 用户尚未上传公开手记；保留统一数据入口，后续追加真实内容即可。
export const notes = [];
