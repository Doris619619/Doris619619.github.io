// 文件用途：维护八项荣誉的正式名称、双语说明、证书及文章关联，并单独记录作品刊登信息。
export const lingyuPublication = {
  title: { zh: "《灵语》Vol.3 · 2026 秋季刊", en: "The Voice of Ling Vol. 3 · Autumn 2026" },
  // 正式发布通知为 9 月 22 日；官网刊物列表的 9 月 15 日单独保存，均不替代获奖日期。
  announcementDate: "2026-09-22",
  catalogDate: "2026-09-15",
  catalogUrl: "https://ling.cuhk.edu.cn/taxonomy/term/57",
  url: "https://book.yunzhan365.com/cnngp/peoq/mobile/index.html",
  readerPage: 38,
  cover: "assets/lingyu-2026-autumn-cover.jpg",
  coverWidth: 354,
  coverHeight: 480
};

export const honors = [
  { id: "deans-list", date: "2026-09", category: "academic", title: { zh: "香港中文大学（深圳）理工学院 Dean’s List", en: "Dean’s List · School of Science and Engineering, CUHK-Shenzhen" }, result: { zh: "院长荣誉名单", en: "Academic recognition" } },
  { id: "robomaster-award", date: "2026-05", category: "academic", title: { zh: "第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师高校联盟赛3V3对抗赛英雄机器人组", en: "25th National University Robot Competition · RoboMaster 2026 University League, 3V3 Hero Robot Category" }, result: { zh: "机器人竞技奖二等奖", en: "Second Prize · Robot Competition Award" }, image: "assets/robomaster-certificate.png" },
  { id: "lingyu", date: "2025-04", category: "creative", title: { zh: "道扬书院《灵语》院刊征文比赛", en: "Ling College · The Voice of Ling Writing Competition" }, result: { zh: "二等奖 ·《未选择的路》", en: "Second Prize · The Road Not Chosen" }, noteSlug: "unselected-road", cover: lingyuPublication.cover, publication: lingyuPublication, description: { zh: "把对理想与选择的思考写进故事，《未选择的路》获得院刊征文比赛二等奖。", en: "The Road Not Chosen, a story about ideals and choices, received Second Prize in the college magazine writing competition." } },
  { id: "table-tennis-2026", date: "2026-04", category: "sport", title: { zh: "香港中文大学（深圳）第九届体育节乒乓球混合团体比赛", en: "9th Sports Festival, CUHK-Shenzhen · Table Tennis Mixed Team Competition" }, result: { zh: "亚军", en: "Runner-up" } },
  { id: "math-modeling", date: "2025-12", category: "academic", title: { zh: "广东省大学生数学建模竞赛暨全国大学生数学建模竞赛广东赛区本科组", en: "Guangdong University Mathematical Modeling Competition / China Undergraduate Mathematical Contest in Modeling, Guangdong Division · Undergraduate Category" }, result: { zh: "一等奖", en: "First Prize" }, image: "assets/math-modeling-award.png" },
  { id: "one-world", date: "2025-11", category: "creative", title: { zh: "香港中文大学（深圳）“同一个世界”主题影像作品大赛", en: "One World Visual Works Competition, CUHK-Shenzhen" }, result: { zh: "视频组优秀奖", en: "Excellence Award · Video Category" } },
  { id: "table-tennis-2025", date: "2025-04", category: "sport", title: { zh: "香港中文大学（深圳）第八届体育节乒乓球混合团体比赛", en: "8th Sports Festival, CUHK-Shenzhen · Table Tennis Mixed Team Competition" }, result: { zh: "亚军", en: "Runner-up" } },
  { id: "table-tennis-2024", date: "2024-10", category: "sport", title: { zh: "香港中文大学（深圳）第八届新生杯乒乓球混合双打", en: "8th Freshmen Cup, CUHK-Shenzhen · Table Tennis Mixed Doubles" }, result: { zh: "亚军", en: "Runner-up" } }
];
