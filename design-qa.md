# Visual QA

## Scope

Repair the portfolio’s Chinese reading typography to match the supplied
`innei.in` writing-page reference: serif family, regular weight, soft ink
colour, size, line-height, and readable column measure.

## Visual inputs

- Reference: `artifacts/font-qa/reference-innei-writing.png`
- Implementation: `artifacts/font-qa/implementation-2048-light.png`
- Side-by-side review: `artifacts/font-qa/side-by-side-comparison.png`
- Viewport: desktop, 2048 px wide captures; the reference browser chrome is
  excluded from the typography judgement.
- State: light theme; reference writing content compared with the portfolio
  profile/reading region. The page structures and copy intentionally differ,
  so this review judges typography rather than layout parity.

## Iteration history

1. **Failed:** the implementation used a dark, bold sans-serif treatment.
   Its Chinese glyph shape, weight, and visual tone did not match the reference.
2. **Fixed:** reading titles and prose now use the `Noto Serif SC` serif stack
   at weight 400. The primary heading is 48 px / 64.32 px; prose is
   21 px / 39.48 px with a 552 px reading measure; timeline titles are
   22 px / 33 px. Reading ink was softened to `#5e5a54` against the warm
   off-white surface.

## Final visual review

The combined comparison shows the corrected portfolio text now has the same
serif CJK character construction, regular rather than bold weight, muted
gray-brown tone, and similarly calm reading density as the reference. No
P0, P1, or P2 typography mismatch remains within this requested scope.

## Functional and implementation checks

- Computed browser styles confirm the serif stack resolves to `Noto Serif SC`
  at weight 400 for headings, body copy, and timeline titles.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass.

## Final result: passed

---

# Innei Hero source-grounded QA

## Source and legal scope

- The public Shiro repository was inspected first; its legacy Hero does not
  contain the current capsule/cursor/shimmer implementation.
- The deployed `https://innei.in/en` Hero was captured as the visual source at
  the required viewport. The public Yohaku design-system is MIT, but the full
  current Yohaku application is closed source; no private source or assets
  were copied. See `hero-source-audit.md` and `THIRD_PARTY_NOTICES.md`.

## Visual inputs

- Reference desktop: `artifacts/hero-qa/reference-innei-2048x1200.png`
- Implementation desktop: `artifacts/hero-qa/implementation-round4-2048x1200.png`
- Desktop side-by-side: `artifacts/hero-qa/side-by-side-round4.png`
- Reference mobile: `artifacts/hero-qa/reference-innei-390x844.png`
- Implementation mobile: `artifacts/hero-qa/implementation-round6-390x844.png`

## Measured parity at 2048 × 1200

| Element | Reference | Local |
| --- | ---: | ---: |
| Avatar | 98 × 98 px | 98 × 98 px |
| Heading | 35 px / 48.125 px | 35 px / 48.125 px |
| Heading tracking | 0.14 px | 0.14 px |
| Capsule text | 21.7 px / 21.7 px | 21.7 px / 21.7 px |
| Capsule height | 39 px | 39 px |
| Caret | 2 px wide | 2 px wide |
| Subtitle | 12 px / 18 px | 12 px / 16.8 px |
| Quote | 12 px / 18 px | 12 px / 18 px |
| Social controls | 36 px circles | 36 px circles |

The title and avatar top positions are within 10 px after the final desktop
alignment. Differences in title width, subtitle position, footer position, and
social count arise from the required replacement text, the added Chinese name,
and the three available destination links rather than a changed visual system.

## Iteration history

1. Replaced screenshot-estimated Inter/Georgia styles with the live page’s
   rendered Instrument Sans, mono capsule, Noto Serif SC, and exact animation
   parameters. Removed the project’s large elliptical line background.
2. Matched the live Hero container (`max-width: 1400px`), avatar treatment,
   80vh content region, title/capsule metrics, footer, and 36px social controls.
3. Captured the same 2048 × 1200 viewport again and corrected the Hero frame
   height so the following portfolio section no longer enters the first view.
4. Used computed reference values to set the desktop 98px avatar,
   35px/48.125px heading, 21.7px/39px capsule, and 2px cursor.
5. Captured 390 × 844 and matched its 70px avatar, 24px/39px heading,
   14.88px/28px capsule, 2px cursor, and 10px/14px subtitle.
6. Performed the final mobile vertical alignment pass.

## Motion and accessibility

- Capsule shimmer: 3.6s linear sweep; soft glow: 4.8s; star twinkle: 2.4s;
  cursor blink: 1.2s.
- The existing `prefers-reduced-motion` rule disables all Hero animations.

## Functional checks

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.
- Local preview responds with HTTP 200.

## Final result: passed
