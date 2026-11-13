# 02 — Browse stays and room details

**What to build:** Let visitors compare actual room options and explore authentic room details before planning their stay.

**Blocked by:** 01 — Project setup and property introduction

**Status:** ready-for-agent

**Completion:** complete, 26 October 2026

- [x] Verify room identities, capacity, beds, facilities, inclusions, and private/shared distinctions from property sources; record evidence and unresolved facts.
- [x] Deliver the Stay page with clear room comparison and responsive photographs. Do not display sample prices as actual room rates.
- [x] Create detail pages only for genuinely distinct source-supported room options; include relevant photos and practical details without inventing categories.
- [x] Provide accurate alt text and labelled missing-photo placeholders or simplified sections when authentic imagery is unavailable.
- [x] Provide a room-specific planning entry that carries the room preference when the planning flow lands in ticket 06. Until then, use a working existing booking destination, clearly labelled as external, rather than a dead control.
- [x] Use shared typography, restrained motion, page metadata, navigation, readable mobile layouts, and visible keyboard focus.
- [x] Verify comparison/detail navigation, image loading, factual/source consistency, and desktop/mobile rendering.


## Verification

- Source research and unresolved conflicts recorded in `docs/room-sources.md`. the booking site verifies Premium king and Deluxe twin categories; older official/the listing site king-only description qualified. No rates published.
- `/stay` comparison and two statically generated detail routes. Unrecognized room returns 404. Homepage and shared desktop/mobile navigation link to Stay, with active state.
- General authentic bedroom photographs explicitly not mapped to categories. Category-specific imagery unavailable; simplified sections used.
- Room-named CTA uses verified external the booking site property URL. No automatic preference transfer claimed. Stable slugs and future ticket 06 integration documented.
- `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check`: pass.
- Production preview: `PLAYWRIGHT_BROWSERS_PATH=/tmp/aranya-browsers npm test`: 5/5 pass, one worker. Both details at desktop/mobile, optimized images, navigation, external URL, metadata, no overflow/page errors, invalid route, existing keyboard/reduced-motion/no-JS coverage.
- Desktop and mobile screenshots visually inspected. Existing menu test initially failed on development preview; full production rerun passed.
- Standards review: minor duplicated active-route predicate extracted. Spec review: unqualified homepage king-only claim corrected. No remaining blocking findings.

## Comments

- Ticket 01 completion verified before implementation. No backend, booking submission, new service or public deployment.
