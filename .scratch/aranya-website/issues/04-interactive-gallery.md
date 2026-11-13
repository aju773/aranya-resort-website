# 04 — Browse interactive gallery

**What to build:** Let visitors browse curated authentic property photographs and inspect them in an accessible full-size viewer.

**Blocked by:** 01 — Project setup and property introduction

**Status:** ready-for-agent

**Completion:** complete, 26 October 2026

- [x] Deliver a responsive gallery grouped meaningfully by available photo subjects, without displaying every downloaded image.
- [x] Use deduplicated authentic assets with provenance, accurate alt text, optimized delivery, and intentional crops.
- [x] Implement a lightbox with visible previous, next, and close buttons; keyboard navigation and Escape; focus containment and restoration.
- [x] Support mobile swiping with visible button alternatives and ensure scroll gestures remain usable outside the viewer.
- [x] Use restrained transitions and reduced-motion support; prevent background scrolling while the viewer is open and restore it on close.
- [x] Provide working navigation and descriptive metadata; verify keyboard/mobile interactions, image failures, and opening/closing behavior.

## Verification

- Eight existing deduplicated photos selected in three subject groups. Source URLs and original hashes in `docs/asset-register.json`; original bytes and watermarks retained. Thumbnail crops only; viewer contains whole photo.
- `/gallery` metadata, shared navigation and active state implemented. Original-image links provide a no-JavaScript fallback.
- Native modal plus explicit Tab wrap; previous/next buttons, arrow keys, Escape, close, focus restoration, body scroll lock and cleanup verified.
- Swipe event handling verified with synthetic touch events at desktop/mobile widths; visible buttons remain available. Real-device touch testing not performed.
- Image-failure fallback and original link verified; controls remain usable. Reduced-motion animation disabled.
- `npm run typecheck`, `npm run lint`, `npm run build`: pass.
- Production browser checks: 4/4 gallery tests; final serial regression run 13/13 pass. Desktop gallery and mobile viewer screenshots visually inspected.
- Standards and spec reviews: no blocking findings. Browser check exposed focus-wrap gap, corrected and retested.
- Preview port 3000 belonged to another server. Added `PLAYWRIGHT_BASE_URL` override; verified this workspace production preview at http://127.0.0.1:3004.
