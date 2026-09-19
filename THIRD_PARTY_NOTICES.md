<!-- 文件用途：记录参考设计和所分发字体的来源与许可。 -->
# Hero reference and licensing notice

The Hero visual parameters in this local, non-deployed portfolio were derived
from the publicly rendered DOM and CSS of `https://innei.in/en` on 2026-07-16.
No private Yohaku application source code, source assets, or font files were
copied into this project.

## Public sources inspected

- `Innei/Shiro` is the public predecessor. Its legacy Hero component is at
  `apps/web/src/app/[locale]/(home)/components/Hero.tsx`; its font setup is at
  `apps/web/src/lib/fonts.ts`. It is licensed AGPLv3 with additional commercial
  use terms in `ADDITIONAL_TERMS.md`.
- `Innei/Yohaku` publishes its `design-system/` under MIT. Its README states
  that the complete Yohaku application is maintained as a closed-source
  repository. This project does not copy that private implementation.
- The deployed site exposed its own rendered values, including Instrument Sans,
  Noto Serif SC, token sizes, and custom CSS animation parameters. Those values
  were reimplemented as new CSS for this page and attributed here.

Before public distribution or commercial use, review the upstream licenses and
the linked additional terms with the copyright holder or qualified counsel.

## LiveNest Sans SC web font

The website UI uses the unmodified `livenest-sans-sc.woff2` from the user's LivePilot-v2 web application. It is a subset of Noto Sans SC distributed under SIL Open Font License 1.1, copyright 2014–2021 Adobe, with Reserved Font Name Source. The font and license are distributed together under `assets/fonts/`. This reuse does not include the application's code, data, or desktop typography.

## Cursor effect reference

The Fairy Dust effect in [tholman/cursor-effects](https://github.com/tholman/cursor-effects) (declared MIT in the upstream README, inspected 2026-09-19) informed the visual direction of `src/motion.js`. The local code independently implements vector stars, elapsed-time animation, bounded particles, idle shutdown, capability changes, and visibility lifecycle. No upstream source file or runtime package is distributed.

## Homepage chronology and institution marks

The date / icon / prose layout references the user's screenshot and [Andrej Karpathy's homepage](https://karpathy.ai/), inspected 2026-09-19. The timeline implementation and subject SVG icons are original; no biography or source code was copied.

Institution marks are used to identify the user's education and experience. Ownership remains with the respective institutions; they are not covered by this project's code license. Original files are stored without image editing; CSS displays the university crest from the wide official mark.

- CUHK-Shenzhen: `assets/organizations/cuhk.png`, from [official university mark](https://www.cuhk.edu.cn/sites/webmaster.prod1.dpsite04.cuhk.edu.cn/files/zh-hans_logo.png).
- Shenzhen Research Institute of Big Data: `assets/organizations/sribd.png`, from [official institute mark](https://www.sribd.cn/sites/default/files/logo%2B_0.png).

## LinkedIn entry icon

`src/icons.js` embeds the LinkedIn SVG from [Bootstrap Icons](https://icons.getbootstrap.com/). Source geometry is unchanged, while dimensions and accessibility attributes are adapted for the local buttons. The former musical-note approximation has been replaced by the official Douyin app image.

- [LinkedIn source](https://github.com/twbs/icons/blob/main/icons/linkedin.svg)
- MIT license and copyright notice: `assets/licenses/bootstrap-icons-LICENSE.txt`. Retrieved 2026-09-19; no runtime package dependency.

## Additional official artwork (2026-09-19)

The following original images identify education, activities, and social destinations; ownership remains with the respective organizations and is not included in the code license. The Berkeley asset is the official B web icon, not a recreated wordmark. Downloaded copies avoid dependence on expiring image links.

- `assets/organizations/robomaster.png`: [official announcement](https://www.robomaster.com/en-US/resource/pages/announcement/713), [original blue logo](https://rm-static.djicdn.com/robomasters/public/document/RoboMaster-mecha-logo-blue.png).
- `assets/organizations/berkeley.png`: [official web icon guidance](https://brand.berkeley.edu/visual-identity/icons-secondary-marks/), [official 192px icon](https://brand.berkeley.edu/wp-content/uploads/2024/07/cropped-favicon-192x192.png).
- `assets/organizations/itso.png`: the user-specified [CUHKSZ-ITSO-Dev profile](https://github.com/CUHKSZ-ITSO-Dev), [avatar](https://avatars.githubusercontent.com/u/180953033?v=4).
- `assets/organizations/douyin.jpg`: image explicitly labelled 抖音logo on the [official mobile download page](https://m.douyin.com/app_download); original image stored unchanged.
- `assets/lingyu-2025-cover.png`: user-provided Lingyu Summer 2025 cover; no image edits. Shown as magazine artwork, not a certificate.

`assets/cursors/orbit.svg` and `orbit-link.svg` are original local vector cursor drawings, separate from all third-party brand artwork.
