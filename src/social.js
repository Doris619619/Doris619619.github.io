// 文件用途：渲染双语社交入口与创作介绍；仅已确认的主页提供直接跳转。
import { social } from "../content/social.js";
import { escape } from "./components.js";

/** Render confirmed professional links without publishing a guessed LinkedIn identity. */
export function professionalLinks() {
  return social.linkedin ? `<a href="${escape(social.linkedin)}">LinkedIn <span aria-hidden="true">↗</span></a>` : "";
}

/** Group account facts in one reading column, followed by equally sized original images and full-size links. */
export function creatorProfile(lang) {
  const en = lang === "en";
  const account = social.douyin;
  return `<article class="creator-profile" id="creator"><div class="creator-copy"><h3 lang="zh-CN">${escape(account.name)}</h3><p>${escape(account.description[lang])}</p><p class="creator-handle">${en ? "Douyin ID" : "抖音号"} · ${account.handle}</p><p class="creator-audience"><strong>${account.followers[lang]}</strong> ${en ? "Douyin followers" : "抖音粉丝"}<span aria-hidden="true"> · </span><time datetime="${account.asOf}">${en ? "10K reached · Sep 18, 2026" : "2026.09.18 突破一万"}</time></p></div><div class="creator-gallery"><figure class="creator-code"><a href="/assets/douyin-profile-code.jpg" target="_blank" rel="noopener"><img src="/assets/douyin-profile-code.jpg" alt="${en ? "Douyin profile code for 每天认识一个Github用户, ID 92689179314" : "每天认识一个Github用户的抖音码，抖音号 92689179314"}" width="1125" height="1680" loading="lazy"></a><figcaption>${en ? "Scan in Douyin to follow" : "抖音扫码关注"}</figcaption></figure><figure class="creator-milestone"><a href="/assets/douyin-10k.jpg" target="_blank" rel="noopener" aria-label="${en ? "Open full-size 10,000 followers milestone" : "查看一万粉丝纪念原图"}"><img src="/assets/douyin-10k.jpg" alt="${en ? "Douyin 10,000 followers milestone" : "抖音粉丝突破一万纪念图"}" width="1157" height="1482" loading="lazy"></a><figcaption>${en ? "10,000 followers milestone" : "一万粉丝纪念"}</figcaption></figure></div></article>`;
}
