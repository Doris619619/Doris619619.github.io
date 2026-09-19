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
