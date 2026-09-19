# Innei Hero source audit

## Public Shiro repository (legacy source)

- `apps/web/src/app/[locale]/(home)/components/Hero.tsx` — legacy two-column Hero structure, avatar, entry transitions, quote, and social links.
- `apps/web/src/app/[locale]/(home)/components/TwoColumnLayout.tsx` — legacy responsive container and desktop breakpoint behavior.
- `apps/web/src/lib/fonts.ts` — legacy Manrope and Noto Serif SC loading.
- `apps/web/src/styles/tailwindcss.css` — legacy font stacks and colour tokens.

These files do not contain the current `innei.in` capsule, cursor, or shimmer Hero. The current deployed site identifies itself as Yohaku; its full app is closed source. The public Yohaku design-system is MIT, while the Shiro repository is AGPLv3 with additional commercial-use terms.

## Current deployed Hero (publicly rendered evidence)

- `https://innei.in/en` — used as the live reference for the actual rendered Hero. Its visible DOM/CSS establishes the current values used here: Instrument Sans, 35px/48.125px desktop heading at a 2048px viewport, 98px avatar, 21.7px mono capsule text, 39px capsule height, 2px caret, 12px subtitle, 12px serif quote, 36px circular social controls, and the visible shimmer/twinkle/blink keyframes.

## Local migration files

- `app.js` — content replacement and Hero structure.
- `styles.css` — migrated public visual parameters, breakpoint sizing, and reduced-motion-safe animations.
- `scripts/hero-qa.cjs` — captures reference and local Hero at 2048 × 1200.
- `scripts/hero-compare.cjs` — creates the side-by-side review image.
- `artifacts/hero-qa/` — round-by-round visual evidence.
