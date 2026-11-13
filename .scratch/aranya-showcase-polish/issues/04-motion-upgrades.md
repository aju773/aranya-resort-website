# 04: Motion upgrades

**What to build:** Scrolling the site on a phone feels crafted but calm: the hero headline reveals line by line, room and place cards enter with a gentle stagger, selected photographs reveal with a soft mask wipe, and cards give tap/press feedback. All within existing motion rules: GSAP only, native scrolling, no pinning, scroll hijacking or autoplay, simplified on mobile, disabled under reduced-motion, content visible if animation fails. Extend the existing hero and section-reveal components rather than adding parallel systems. See spec: Motion.

**Blocked by:** 02 (Rating badge and testimonial carousel), 03 (Nearby places with photos and distances)

**Status:** done

- [ ] Hero headline line-by-line reveal; headline and CTA readable immediately if animation fails
- [ ] Staggered entrance for room cards and place cards
- [ ] Mask-wipe reveal on selected photographs
- [ ] CSS tap/press feedback on cards
- [ ] Reduced-motion: all headings, cards and images visible without waiting
- [ ] Mobile: effects simplified; no horizontal overflow at 390 px; no page errors
- [ ] Animations cleaned up on navigation/unmount
- [ ] Playwright tests cover reduced-motion visibility and overflow; full suite green

## Comments
