# 05 — Find location and practical information

**What to build:** Let visitors find directions and source-supported answers about arrival, facilities, suitability, and policies.

**Blocked by:** 01 — Project setup and property introduction

**Status:** ready-for-agent

**Completion:** complete, 26 October 2026

- [x] Deliver the Location/FAQ page with verified location and working map/directions links.
- [x] Publish only supported access, parking, timings, suitability, and policy details; avoid inventing cancellation, accessibility, pet, or child policies.
- [x] Implement accessible FAQ controls with keyboard operation, clear expanded state, and readable answers.
- [x] Use responsive layout, descriptive metadata, shared navigation, and restrained reduced-motion-aware transitions.
- [x] Verify outbound destinations, source references, accordion operation, mobile readability, and keyboard focus.


## Verification

- `/location` delivered with shared navigation and homepage discovery link; metadata, official address, map/directions queries and host phone.
- Official Aranya and the listing site sources checked live; claim boundaries recorded in `docs/location-sources.md`. No invented cancellation, child-age, road or parking-capacity guarantees. Google Maps uses an address query, not a verified entrance pin.
- Native details/summary tested with Enter, Space, Tab focus, expanded/collapsed state and JavaScript disabled.
- `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check`: pass.
- Serial full browser suite: 15/16 passed; desktop focus assertion required real keyboard input. Corrected test; final focused Location suite 3/3 passed against final production build on port 3105. Existing 13 checks passed in the full run.
- Desktop 1440px and mobile 390px screenshots inspected; readable layout, visible focus, no horizontal overflow. Reduced-motion checks pass; practical content has no animation.
- Standards/spec reviews completed using code-review skill. Fixed source mismatch by removing shared-pool claim from the the listing site-only answer. Completion evidence added here.

## Comments

- Initial port 3000 preview belonged to an older app state. Workspace dev preview on 3001 had unreliable client chunks during verification; final checks used an isolated production preview on 3105.
