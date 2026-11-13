# 03 — Explore experiences

**What to build:** Let visitors explore Aranya food, hospitality, onsite experiences, and relevant nearby places through a complete experiences page.

**Blocked by:** 01 — Project setup and property introduction

**Status:** ready-for-agent

- [x] Publish warm, concise English copy supported by recorded sources, distinguishing onsite experiences from nearby attractions.
- [x] Verify food restrictions, activity availability, inclusions, and travel estimates before stating them. Omit or qualify uncertain claims.
- [x] Use authentic property imagery for actual food, views, and facilities. Generated visuals are limited to decorations or explicitly labelled concepts.
- [x] Deliver a responsive experiences page with descriptive metadata and a working navigation entry.
- [x] Apply subtle once-only section reveals, reduced-motion behavior, and immediate readable content.
- [x] Verify sources, navigation, image loading, keyboard usability, and desktop/mobile composition.

## Verification

Completed 26 October 2026.

- `/experiences` has desktop/mobile navigation, active state, metadata, section anchors and working Stay CTA.
- Sources and qualifications recorded in `docs/experience-sources.md`; authentic assets retain existing `docs/asset-register.json` provenance. No generated imagery, assumed travel estimates or guaranteed excursions.
- `npm run typecheck`, `npm run lint`, `npm run build`: pass.
- Serial Chromium production run: 9/9 tests pass, including 4 experience checks. Temporary Playwright config targeted port 3002 because port 3000 served another checkout; removed after verification. Browser cache: `/tmp/aranya-browsers`.
- Desktop 1440px and mobile 390px screenshots visually inspected; readable composition, intentional crops, images loaded, no horizontal overflow.
- Keyboard navigation, mobile menu/Escape, active navigation, anchor links, reduced motion, once-only normal-motion reveal and JavaScript-disabled content verified.
- Standards review: no actionable findings. Spec review: minor copy-centralization finding; page labels moved into structured content alongside editorial copy.
- Initial sandbox server/build restrictions resolved with approved execution. Development-mode menu timing failures did not reproduce against production; experience test waits for initial network idle before keyboard interaction.

## Comments

- Local preview only. Public image reuse permission still requires owner review before launch.
- Meal inclusions, dietary accommodation, kitchen visits, host-led outings and current attraction access require confirmation as stated on the page.
