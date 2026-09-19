// 文件用途：渲染双语社交入口与创作介绍；仅已确认的主页提供直接跳转。
import { social } from "../content/social.js";
import { escape } from "./components.js";

/** Render confirmed professional links without publishing a guessed LinkedIn identity. */
export function professionalLinks() {
  return social.linkedin ? `<a href="${escape(social.linkedin)}">LinkedIn <span aria-hidden="true">↗</span></a>` : "";
}

/** Show the supplied follower milestone and an expandable original profile code, usable without JavaScript. */
export function creatorProfile(lang) {
  const en = lang === "en";
  const account = social.douyin;
  return `<article class="creator-profile" id="creator"><div class="creator-copy"><p class="eyebrow">${en ? "OPEN SOURCE, HUMAN STORIES" : "开源世界里的人与故事"}</p><h3 lang="zh-CN">${escape(account.name)}</h3><p>${escape(account.description[lang])}</p><p class="creator-handle">${en ? "Douyin ID" : "抖音号"} · ${account.handle}</p><details class="creator-code"><summary>${en ? "Scan to find me on Douyin" : "扫码关注抖音"}</summary><figure><a href="/assets/douyin-profile-code.jpg" target="_blank" rel="noopener"><img src="/assets/douyin-profile-code.jpg" alt="${en ? "Douyin profile code for 每天认识一个Github用户, ID 92689179314" : "每天认识一个Github用户的抖音码，抖音号 92689179314"}" width="1125" height="1680" loading="lazy"></a><figcaption>${en ? "Open Douyin and scan, or save the image to scan from your album." : "打开抖音扫一扫，或保存图片后从相册识别。"}</figcaption></figure></details></div><div class="creator-audience"><strong>${account.followers[lang]}</strong><span>${en ? "Douyin followers" : "抖音粉丝"}</span><time datetime="${account.asOf}">${en ? "10K reached · Sep 18, 2026" : "2026.09.18 突破一万"}</time><a class="quiet-link" href="/assets/douyin-10k.jpg" target="_blank" rel="noopener">${en ? "View milestone" : "查看里程碑"} <span aria-hidden="true">↗</span></a></div></article>`;
}
