# 02: Rating badge and testimonial carousel

**What to build:** On Home, a guest sees "5.0 Excellent · 30 the booking site ratings" with Food 4.9, Cleanliness 4.9 and Value for money 4.8, followed by five swipeable testimonial cards (Anjali R, Kiran M, Thomas V trimmed to about two lines, Devika, Arun P.) showing quote, name and trip type where known, with no dates. Cards use large serif quote marks, have visible previous/next buttons, never autoplay, and are followed by one "Read all reviews on the booking site" link. Replaces the current a review site excerpts. See spec: Trust; Testimonials.

**Blocked by:** 01 (Warm copy, disclaimer cut and Diamond rating)

**Status:** ready-for-agent

- [ ] Rating badge and three category scores render from structured content data
- [ ] Five testimonial cards render with names; no dates shown
- [ ] Swipe works on mobile; previous/next buttons and keyboard move between cards
- [ ] No card changes without user interaction
- [ ] Controls are focusable with accessible names; cards announce meaningfully to screen readers
- [ ] One link to the booking site reviews below the section
- [ ] No horizontal page overflow at 390 px
- [ ] Playwright tests cover the above; suite green

## Comments
