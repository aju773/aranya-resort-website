# 07 — Complete homepage storytelling and discovery

**What to build:** Deliver the complete homepage that introduces the stay, establishes trust, and guides visitors to the finished room, experience, gallery, and practical-information pages.

**Blocked by:** 02 — Browse stays and room details; 03 — Explore experiences; 04 — Browse interactive gallery; 05 — Find location and practical information

**Status:** ready-for-agent

**Completion:** complete, 26 October 2026

- [x] Integrate room overview, experience highlights, concise property/host story, sourced guest reviews, curated gallery preview, practical information, and closing CTA.
- [x] Link previews to their completed destinations and provide a useful reviews anchor; keep navigation free of blog/archive links.
- [x] Use accurate, brief attributed review excerpts or clearly attributed paraphrases with source links. Do not fabricate ratings, testimonials, or verified-guest badges.
- [x] Use factual English copy, authentic imagery, and the agreed warm typography and spacing throughout.
- [x] Add restrained coordinated section entrances without delaying navigation, hiding body copy, or introducing scroll hijacking.
- [x] Keep the closing CTA functional with completed destinations; use the planning route once ticket 06 is available without making its completion a blocker for this slice.
- [x] Verify homepage links, source accuracy, responsive composition, keyboard access, reduced motion, and asset loading.


## Verification

- Blockers 02–05 complete before implementation; completed planner 06 used for closing CTA.
- Added room overview and both detail links, experience preview, attributed host story, two sourced guest excerpts, three subject-linked gallery previews, location/FAQ discovery and closing planner action. Local English copy centralized; authentic registered photos only.
- Source checks and exact review attribution recorded in `docs/home-sources.md`. No fabricated ratings, badges or guaranteed services. No blog/archive navigation.
- Existing scoped GSAP section entrances applied to headings only, 12px/500ms, once; body content remains readable. Reduced motion and JavaScript-disabled content verified.
- `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check`: pass. Production build required execution outside sandbox after sandbox TypeScript subprocess output could not be parsed.
- Production preview on port 3017. Focused homepage checks 6/6 pass. Full serial regression run: 25/27 passed using installed system Chromium; two Stay tests expected the previous homepage link label. Updated selector to the new Compare all rooms action; focused Stay rerun with matching Playwright Chromium: 2/2 pass. All 27 scenarios passed across these runs.
- Desktop 1440px and mobile 390px full-page screenshots visually inspected after scrolling to load lazy images. Image loading, no horizontal overflow, reviews/gallery anchors, finished route navigation, keyboard planning, mobile menu, tablet planning access and reduced motion verified. No public deployment.

## Standards

Parallel standards review: 0 actionable findings or concrete baseline smells.

## Spec

Parallel spec review found tablet header hiding the planning action. Switched tablet widths to the menu and added a 1024px regression test. Reviewer confirmed resolved: 1 fixed, 0 remaining.
