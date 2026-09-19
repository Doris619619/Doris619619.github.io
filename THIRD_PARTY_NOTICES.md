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
