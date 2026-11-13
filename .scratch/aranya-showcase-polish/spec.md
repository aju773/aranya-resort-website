> Written for the original, real-property version of this site. In the public repo the property is the fictional Aranya, and the rating, reviews and contact details are made up.

# Aranya showcase polish specification

**Status:** ready-for-agent

**Date:** 27 October 2026

**Approval basis:** Expert review of old site vs redesign (mobile), followed by grilling; all 17 decisions accepted by the user. Builds on `.scratch/aranya-website/spec.md` and supersedes it where they conflict (see Further Notes).

## Problem Statement

The project owner wants to share the Aranya redesign with the homestay owner as a live link on WhatsApp. The owner will open it on a phone. An expert review found the redesign looks better than the original site but says less:

- Copy carries about 42 disclaimers and inline source attributions, so it reads like a legal notice instead of a warm invitation.
- The original site's strongest trust signal (its state tourism classification) is missing.
- The original site lists 12 nearby places with distances; the redesign shows only 2 and deliberately avoids distances.
- Testimonials link out to third parties and are wrapped in caveats; the the booking site 5.0 rating is not shown.
- Motion is limited to a hero entrance and section fade-ins.
- There is no public URL, and a shared link would show no preview card in WhatsApp.

## Solution

Polish the redesign so the owner sees a site that is clearly better than the original and still contains everything the original had:

- Rewrite copy in the owner's warm voice, drawing on lines from the original site, and remove all disclaimers and source attributions except one booking line, the Plan page handoff notice, and sample-price labels.
- Show the Diamond rating and a the booking site rating badge, plus a swipeable testimonial section built from the original site's reviews and the booking site.
- Add a Places section with photo, name and approximate distance for all 12 places from the original site.
- Add four restrained motion upgrades within the existing motion rules.
- Deploy publicly on Vercel with a WhatsApp-friendly link preview.

## User Stories

1. As the homestay owner opening a WhatsApp link, I want a photo preview card with the property name, so that the link looks trustworthy and worth opening.
2. As the homestay owner, I want the site to open quickly on my phone, so that my first impression is not a loading screen.
3. As the homestay owner, I want to see my Diamond rating, so that I know the redesign keeps my most important credential.
4. As the homestay owner, I want all 12 places from my current site, so that I do not feel content was lost.
5. As the homestay owner, I want my own distance figures shown, so that I recognise and can correct them.
6. As the homestay owner, I want the copy to sound like my family welcoming guests, so that the site feels like Aranya.
7. As the homestay owner, I want my guests' original reviews featured, so that years of goodwill are not discarded.
8. As the homestay owner, I want my the booking site rating displayed, so that guests see current, verified satisfaction.
9. As the homestay owner, I want the site to feel smooth and alive without being flashy, so that it feels premium.
10. As a prospective guest on mobile, I want to read the welcome without wading through caveats, so that I feel invited.
11. As a prospective guest, I want a single clear note that booking happens on the booking site, so that I am not confused about where to book.
12. As a prospective guest, I want sample prices still labelled as samples, so that I do not mistake them for an offer.
13. As a prospective guest, I want to see the overall rating at a glance, so that I can judge quality in seconds.
14. As a prospective guest, I want category scores for food, cleanliness and value, so that I know what the property does well.
15. As a prospective guest, I want to swipe through testimonials, so that browsing reviews feels natural on my phone.
16. As a prospective guest, I want previous/next buttons on testimonials, so that I can browse without swiping.
17. As a prospective guest, I want testimonials not to advance on their own, so that I can read at my own pace.
18. As a prospective guest, I want each testimonial to show the guest's name and trip type, so that I can relate it to my own trip.
19. As a prospective guest, I want a link to all reviews on the booking site, so that I can read more where I will book.
20. As a prospective guest, I want to see the 4 closest places on the homepage, so that I quickly sense what is nearby.
21. As a prospective guest, I want a link to see all 12 places, so that I can plan outings.
22. As a prospective guest, I want each place to have a photo, so that I can decide which to visit.
23. As a prospective guest, I want an approximate distance for each place, so that I can judge travel effort.
24. As a prospective guest, I want places ordered nearest first, so that easy outings stand out.
25. As a prospective guest, I want hero text to reveal gracefully, so that the first screen feels crafted.
26. As a prospective guest, I want room and place cards to enter in a gentle sequence, so that scrolling feels polished.
27. As a prospective guest, I want photos to reveal softly as I scroll, so that imagery feels cinematic.
28. As a prospective guest, I want cards to respond when I tap them, so that I know my touch registered.
29. As a motion-sensitive visitor, I want all new motion disabled under reduced-motion, so that browsing stays comfortable.
30. As a visitor on a slow connection, I want content readable before animation completes, so that motion never blocks information.
31. As a keyboard user, I want testimonial controls focusable and operable, so that I can use the section without a mouse or touch.
32. As a screen-reader user, I want place photos and testimonials announced meaningfully, so that I get the same information.
33. As a photographer whose work is reused, I want credit given, so that the licence is respected.
34. As the project owner, I want the demo hidden from search engines, so that it does not compete with the official site.

## Implementation Decisions

### Copy and disclaimers

- Remove every disclaimer and inline source attribution across all pages ("the listing site describes…", "Kerala Tourism…", "Confirm…", "not guaranteed…", "not promises…", image-provenance captions).
- Keep only: one line near the plan/booking CTA stating final booking happens on the booking site; the existing handoff notice on the Plan page; sample-price labels in the planning preview.
- Remove the "Read the story on the listing site" and a review site outbound links. The host story is told directly on the page.
- Rewrite copy in the owner's warm voice, reusing phrases from the original site (e.g. being with family after a homely meal, "Aranya beckons you"). Keep copy centralized in the existing content modules.
- No sources page or footer credits link.

### Trust

- Show the tourism classification line in the Welcome section and in the footer, not in the hero. (Public version: replaced by a fictional-concept notice.)
- Rating badge: "5.0 Excellent · 30 the booking site ratings" with category scores Food 4.9, Cleanliness 4.9, Value for money 4.8. Store as structured content data.

### Testimonials

- Replace the current a review site excerpts with five cards: Anjali R, Kiran M, Thomas V (trimmed to about two lines), Devika (original site) and Arun P. (the booking site).
- Each card shows the quote, guest name and trip type where known. No dates.
- Mobile: horizontally swipeable track with large serif quote marks, plus visible previous/next buttons. Desktop: same component, more cards visible. No autoplay.
- One "Read all reviews on the booking site" link below the section.
- New client component for the testimonial carousel; content stays in structured data.

### Places

- New structured places data: name, approximate distance in km (owner's figures from the original site), photo, alt text, sorted ascending by distance. The 12 places: Soochipara Falls 1.8, Kanthanpara Waterfalls 1.9, Neelimala Viewpoint 6.8, Chembra Peak 9, Karapuzha Dam 10.2, Heritage Museum 11.2, Edakkal Caves 13.2, Thusharagiri Falls 14, Pookode Lake 15.7, Lakkidi Viewpoint 16.6, Ancient Jain Temple 17.3, Karalad Lake 35.
- Display distance as "~X km from Aranya".
- Experiences page: "Beyond Aranya" section shows all 12 as photo cards. Home page: the 4 closest with a "See all 12 places" link to that section.
- Photos: freely licensed images from Wikimedia Commons, downloaded and served locally through Next.js image optimization, recorded in the asset register with licence and author. Owner photos can replace them later.
- One visible credit line at the bottom of the Places section: "Place photos: Wikimedia Commons contributors". This is the only remaining source line.
- Keep the original site's note that the hosts help arrange vehicles and guides, phrased warmly.

### Motion

All within existing rules: GSAP only, native scrolling, no pinning, scroll hijacking or autoplay; simplified on mobile; disabled under reduced-motion; content visible if animation fails.

1. Hero headline reveals line by line.
2. Room and place cards enter with a stagger.
3. Selected photographs reveal with a soft mask wipe on scroll.
4. Cards give tap/press feedback (CSS).

Extend the existing hero and section-reveal components rather than adding parallel animation systems.

### Sharing and deployment

- Deploy publicly to Vercel free tier on a demo URL (e.g. `aranya-demo.vercel.app`). The user signs in to Vercel themselves.
- Mark the site noindex (robots metadata) so it stays out of search results.
- Open Graph and Twitter card metadata: 1200×630 crop of the front-yard photo, title "Aranya · A home in the hills of Wayanad", existing description. Absolute URLs based on the deployed origin.

## Testing Decisions

- Single seam: rendered pages through Playwright, matching the existing suite. Test only what a visitor sees or a crawler reads, never component internals.
- Copy: across all pages, rendered text contains none of the banned disclaimer/attribution phrases; the booking line and sample-price labels remain.
- Trust: Diamond rating and rating badge with category scores are visible on Home.
- Testimonials: five cards render with names; previous/next buttons and keyboard move between cards; no card change occurs without interaction.
- Places: Experiences shows 12 places, Home shows 4, each with name, "~X km" text and a loaded image; order is ascending by distance; credit line present; "See all" link reaches the Experiences section.
- Motion: with reduced-motion emulated, all headings, cards and images are visible without waiting; no horizontal overflow at 390 px width.
- Metadata: page head contains og:image, og:title, twitter card and robots noindex.
- Prior art: existing specs under the tests directory (home, experiences, presentation) using viewport sizing, reduced-motion emulation, image-load polling and overflow checks.
- Manual: after deploy, open the URL on a phone and paste it into WhatsApp to confirm the preview card.

## Out of Scope

- Contacting the owner or sending the link (the user does this).
- Performing the Vercel deployment and the manual WhatsApp/phone check (the user does this; the site only ships ready for it).
- Custom domain, analytics, or replacing the official site.
- Owner-supplied place photos (later swap).
- Recomputing road distances.
- New pages, booking backend, or changes to the planning flow beyond copy.
- Parallax, pinned storytelling, autoplaying carousels, or added animation libraries.
- AI-generated imagery.

## Further Notes

Supersedes these parts of `.scratch/aranya-website/spec.md`:

- Out of scope "Public deployment" → now in scope (demo URL, noindex).
- User story 30 (sample content and image provenance distinguishable) → dropped, except sample-price labels.
- "Each factual claim and testimonial has a source" content-review rule → sources are no longer displayed; claims must still be true and taken from the original site or the booking site.
- Experiences rule "no journey times or distances are assumed" → owner's approximate distances are shown.

No CONTEXT.md or ADRs: no new domain vocabulary or architectural reversal beyond the above.
