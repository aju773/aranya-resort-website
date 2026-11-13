# 01 — Project setup and property introduction

**What to build:** Create the Next.js application and deliver a locally runnable, responsive Aranya homepage introduction with authentic photography and shared navigation.

**Blocked by:** None — can start immediately

**Status:** ready-for-agent

**Completion:** complete, 26 October 2026

- [x] Scaffold a Next.js App Router application with TypeScript and Tailwind CSS in the project workspace, preserving existing instructions, symlink, handoff, and planning documents.
- [x] Install and configure GSAP and its official React integration. Use a consistent package manager and lockfile; provide development, build, lint, and type-check commands.
- [x] Configure cream/forest-green design tokens, responsive spacing, Cormorant Garamond headings, and Manrope body text using optimized font loading.
- [x] Collect accessible property images from the official site and the listing site, deduplicate them, and record source URLs, subjects, and transformations. Report inaccessible assets honestly; preserve watermarks.
- [x] Deliver an authentic single-image hero, sourced introductory English copy, shared header/footer, and operable mobile menu. Expose only working destinations until later slices supply additional pages.
- [x] Use responsive optimized images, deliberate mobile crops, accurate alt text, and immediately readable hero text/CTA.
- [x] Implement restrained hero motion with scoped cleanup and reduced-motion support. Keep native scrolling and content visible if animation fails.
- [x] Include descriptive homepage metadata and a useful not-found state; add no backend, authentication, payment, or email service.
- [x] Verify local startup, build/type/lint checks, desktop/mobile layout, keyboard menu operation, focus handling, and reduced-motion behavior. Record results and run instructions.


## Verification

- `npm run lint`: pass, no warnings.
- `npm run typecheck`: pass.
- `npm run build`: pass, Next.js 16.4.3, static homepage and not-found, one build worker.
- Production server `npm start`: ready at http://localhost:3000.
- `PLAYWRIGHT_BROWSERS_PATH=/tmp/aranya-browsers npm test`: 3/3 pass against production server, serial Chromium run.
- Desktop 1440×1000 and mobile 390×844 screenshots visually inspected. Readable type, intentional crops, no horizontal overflow. Font and optimized-image loading verified.
- Keyboard menu opens with Enter, focuses first link, supports Tab navigation, closes with Escape and restores toggle focus. Link selection closes menu.
- Reduced motion disables image transform and smooth scrolling. Content/hero CTA remain usable with JavaScript disabled.
- Working introduction anchor, return-home link and HTTP 404 verified; no browser page errors.
- 21 source records, 20 unique originals collected from official/the listing site pages. Source URLs, hashes, visual subjects and transformations in `docs/asset-register.json`. No inaccessible selected assets; one identical original deduplicated. All original bytes/watermarks preserved.
- Standards/spec code reviews completed. Fixed current-page state, image preload API, asset subjects and copy organization. No remaining blocking findings.
- Existing instructions, CLAUDE.md symlink, handoff and planning documents retained. Run instructions in `README.md`.

## Comments

- Menu is a nonmodal disclosure. Normal Tab order remains available; focus exits close the menu.
- Only Home, introduction and location anchors exposed. Additional pages and planning CTA await later slices.
- Local preview only; image reuse permission requires owner review before public launch. No backend/services introduced.
