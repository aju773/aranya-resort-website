# Aranya website redesign specification

**Status:** ready-for-agent

**Date:** 26 October 2026

**Approval basis:** Conversation decisions accepted during grilling; final imagery boundary approved. This document is ready for review before ticket breakdown approval and implementation.

## Problem Statement

The project owner wants a complete, polished redesign of Aranya Homestay's guest-facing website to demonstrate to the property owner. Visitors should understand the stay, explore authentic rooms and experiences, and prepare their preferences before continuing to the booking site.

“Full functionality” means complete website pages and interactions. It does not mean an operational reservation system, payments, emails, inventory management, or an owner dashboard.

## Solution

Build the complete responsive website directly, without a separate prototype phase. Use authentic property photography, warm editorial typography, concise English copy, and restrained GSAP animation. Deliver a local preview first; public deployment is a separate decision.

The main visitor journey is:

Explore property → compare rooms → plan stay → review preferences → continue to the booking site.

The planning flow never creates a reservation. the booking site controls actual availability, rates, and booking. Clearly explain that selections must be entered again there.

## User Stories

1. As a prospective guest, I want an immediate sense of the property and location, so that I can decide whether to explore further.
2. As a guest, I want authentic photographs, so that I can judge the actual accommodation.
3. As a guest, I want clear navigation between pages, so that I can find practical information quickly.
4. As a mobile guest, I want a compact menu and reachable planning action, so that I can browse comfortably.
5. As a guest, I want to compare verified room characteristics, so that I can choose an appropriate room preference.
6. As a guest, I want room-specific photographs and details, so that I understand what each option provides.
7. As a guest, I want private and shared facilities distinguished, so that I know what to expect.
8. As a guest, I want inclusions explained, so that I can understand the stay's value.
9. As a guest, I want information about food and onsite experiences, so that I can picture time at the property.
10. As a guest, I want sourced nearby attraction information, so that I can plan outings without misleading travel claims.
11. As a guest, I want a concise property or host story, so that I understand its character.
12. As a guest, I want accurately sourced reviews, so that I can assess existing guest feedback.
13. As a guest, I want a curated gallery, so that I can explore rooms, scenery, and facilities without a photo dump.
14. As a guest, I want a full-size image viewer with visible controls, so that I can inspect photos easily.
15. As a mobile guest, I want swipe navigation with button alternatives, so that galleries work naturally on my device.
16. As a guest, I want location and directions links, so that I can plan arrival.
17. As a guest, I want readable FAQs and verified policies, so that common questions are answered.
18. As a guest, I want to select dates and guest counts, so that I can organize my intended stay.
19. As a guest, I want to select a room preference from a room page, so that I do not need to repeat that choice.
20. As a guest, I want to add optional requests, so that I can review my preferences together.
21. As a guest, I want useful validation messages, so that I can correct invalid dates or guest counts.
22. As a guest, I want to edit selections from the review step, so that mistakes are easy to fix.
23. As a guest, I want choices preserved during the current browser session, so that navigating back does not erase my work.
24. As a guest, I want sample prices clearly identified, so that I do not mistake them for an offer.
25. As a guest, I want an explicit the booking site handoff, so that I know where the real booking occurs.
26. As a keyboard user, I want visible focus and operable menus, forms, and galleries, so that I can use the whole website.
27. As a motion-sensitive visitor, I want reduced-motion preferences respected, so that browsing remains comfortable.
28. As a visitor on a slower connection, I want responsive images and immediately readable content, so that animation does not delay information.
29. As the project owner, I want every agreed page and interaction complete, so that I can demonstrate a convincing website to the client.
30. As the property owner reviewing the demo, I want sample content and image provenance distinguishable, so that I can assess what requires approval before launch.

## Implementation Decisions

### Stack and architecture

- Next.js App Router, TypeScript, Tailwind CSS, GSAP, and the official GSAP React integration.
- Server-render content by default. Use client components for navigation, galleries, animations, and the planning flow where required.
- Use GSAP timelines for coordinated entrances, ScrollTrigger for selected reveals, and CSS for simple hover/focus states. Do not add Motion alongside GSAP.
- Scope animations to their components and clean them up on navigation/unmount. Configure mobile and reduced-motion behavior through GSAP media queries.
- Store editorial content and sample planning data in structured local data. Centralize English copy for later translation.
- Use local React state plus session storage for nonsensitive planning choices within the current tab/session. Handle missing, invalid, or unavailable storage gracefully.
- No backend, database, authentication, or external booking API is required.

### Pages and navigation

- Home: single-photo hero, concise stay promise, room overview, experiences, property story, sourced reviews, curated gallery preview, planning information, and final CTA.
- Stay: room comparison with verified capacity, beds, facilities, inclusions, and links to room details.
- Room detail pages: create only for genuinely distinct, source-supported options. Include gallery, practical details, and a CTA that preselects the room preference.
- Experiences: sourced food, hospitality, onsite experiences, and nearby places. Do not imply an activity is included or always available without evidence.
- Gallery: curated authentic photos grouped meaningfully; accessible lightbox with close, previous/next, keyboard support, focus restoration, and mobile swipe controls.
- Location/FAQ: location, directions, verified access and policy information, and accessible FAQ accordion.
- Plan your stay: dedicated multistep selection and review page.
- Primary navigation: Home, Stay, Experiences, Gallery, Location/FAQ, and Plan your stay. Provide a homepage reviews anchor where useful, rather than a separate reviews page.
- Consistent header/footer, active navigation, responsive menu, useful not-found state, and descriptive page titles.
- No blog or archives. Do not add unsupported contact forms or dead placeholder controls.

### Planning and the booking site handoff

- Steps: dates → adults/children → room preference → optional requests → review → Continue to the booking site.
- Steps may be grouped visually when this reduces friction, while preserving the selection/review distinction.
- Validate arrival/departure order, past arrival dates, guest counts, and room capacity where verified. Do not invent child-age or occupancy policies.
- Optional requests are preferences, not paid extras or guaranteed services. Collect no names, phone numbers, or email addresses.
- Show only clearly labelled sample pricing in the planning preview. Make the illustrative calculation understandable; do not imply final taxes, inclusions, discounts, or cancellation terms are confirmed.
- Do not present available/unavailable dates as live inventory. The preview cannot check availability or hold a room.
- Provide edit/back controls and preserve valid choices when navigating between pages or refreshing within the same tab session.
- Before leaving, state that no reservation has been created, sample prices are illustrative, and visitors must reselect details on the booking site.
- Link to the verified the booking site property page. Do not assume dates or room choices transfer or claim a partner integration.
- No simulated reservation confirmation screen. This supersedes the earlier handoff's confirmation proposal.

### Visual design and typography

- Warm cream backgrounds, forest-green accents, restrained contrast, generous spacing, and authentic photography.
- Use Cormorant Garamond medium-weight headlines and Manrope body/navigation/form text as the agreed starting pairing. Check actual content on mobile before finalizing sizes.
- Starting body size 17–18 px, comfortable line spacing, and approximately 60–70 characters per text line where appropriate.
- Responsive heading sizes, restrained italics, and minimal letter spacing. Load only required font weights through Next.js font optimization.
- Maintain readable contrast, visible focus, clear form labels, generous touch targets, and predictable controls.
- Compact sticky mobile Plan your stay action must not obscure content, form errors, or gallery controls.

### Motion

- Calm cinematic emphasis at hero, selected photography sections, and gallery transitions.
- Single authentic hero image with a brief subtle zoom-out. Keep headline and CTA available immediately; no loading animation gate.
- Whole-heading or line entrances only. Keep body copy and form entry still.
- Starting durations: controls 150–250 ms; section reveals 400–600 ms; hero image treatment 800–1,200 ms. Adjust after visual checks.
- Reveal sections once with small movement. Favor opacity and transforms; avoid layout shifts.
- Native scrolling. No pinned storytelling, scroll hijacking, custom cursors, compulsory exit animations, or automatic slideshows.
- Page entrances may use brief fades, but navigation must remain immediate.
- Simplify effects on mobile and disable unnecessary movement for reduced-motion users. Content remains available if animation fails.

### Copy and factual content

- English first. Warm, understated, personal homestay language with an atmospheric introduction followed by practical detail.
- Use specific actions such as Explore rooms, Plan your stay, and Continue to the booking site.
- Avoid generic luxury claims, fabricated amenities, unsupported availability, invented testimonials, and unverified ratings.
- Verify property-specific facts against sources during implementation. Missing evidence means omit, qualify, or mark for owner confirmation rather than invent.
- Display existing reviews accurately with source links. Keep quotations brief and attributed; do not fabricate verified-guest badges.
- Keep sample prices out of general property copy and room marketing cards.

### Image acquisition and generation

- Collect available property photos from the official website and the listing site, deduplicate, and maintain an asset/source register. Acquisition breadth does not mean displaying every image.
- Curate the strongest relevant images for each page. Preserve aspect ratios, choose deliberate responsive crops, provide accurate alt text, and optimize through Next.js image delivery.
- Permitted edits: cropping, straightening, exposure/color adjustment, and cautious upscaling that preserves actual property details.
- Generated imagery is permitted only for decorative illustrations/textures or clearly labelled concept visuals.
- Room galleries, property galleries, and representations of actual facilities must use authentic photos. Do not generate replacement rooms, pools, views, food, or amenities and present them as Aranya.
- When essential photos are unavailable, use clearly labelled placeholders or simplify the section until the owner supplies images.
- Preserve watermarks. Record source and transformation history; public availability does not establish reuse rights. Permission review precedes public launch.

## Testing Decisions

- Use the agreed visitor journey as the primary test seam: browser-level checks of navigation, room exploration, planning, review/editing, and the the booking site handoff.
- No existing app or test suite provides prior test patterns. Add focused checks for externally observable behavior; avoid tests that mirror component internals.
- Verify valid and invalid dates, guest counts, verified capacity limits, selection persistence, editing, sample-price labels, and explicit external handoff wording.
- Verify the outbound destination without creating a real reservation, submitting a third-party form, or sending personal data.
- Verify menus, gallery/lightbox, FAQ controls, keyboard focus, Escape behavior, and reduced-motion rendering.
- Inspect desktop and mobile layouts on every page type: text wrapping, image crops, touch controls, sticky CTA clearance, horizontal overflow, and loading/layout shifts.
- Run relevant type/lint/build checks and a focused browser journey. Avoid unnecessary full-suite or concurrent heavy runs.
- Check that fonts/images load, links resolve, and no app action calls payment, email, reservation, or owner-notification services.
- Content review is part of acceptance: each factual claim and testimonial has a source; generated concepts and sample pricing are unmistakable.
- Completion requires all agreed pages and controls working, with any remaining source or infrastructure limitation explicitly reported.

## Out of Scope

- Separate prototype phase.
- Live inventory or channel synchronization.
- Real reservations, payment transactions, booking emails, owner notifications, or cancellation processing.
- Owner/admin dashboard, CMS, guest accounts, and review-submission forms.
- Automatic transfer of selected dates/rooms to the booking site without separately verified support and scope approval.
- Public deployment, contacting the owner, or representing the demo as the official replacement site.
- Fabricated property imagery, facts, reviews, ratings, or booking guarantees.
- Multilingual delivery beyond centralized English copy.

## Further Notes

- This specification supersedes conflicting earlier proposals: GSAP replaces Motion; complete website implementation replaces prototyping; the booking site handoff replaces simulated reservation confirmation.
- Current workspace contains planning/configuration documents, not an implemented app. No successful live verification of property facts is claimed by this specification.
- Primary content sources: https://github.com/aju773/aranya-resort-website and https://www.listing-site.com/hs/aranya.
- Existing booking reference: https://github.com/aju773/aranya-resort-websitebooking-form/.
- External booking reference to verify before use: https://example.com/aranya-booking.
- Exact room options, source-supported policies, usable assets, and illustrative price values are implementation research/data tasks within these boundaries, not permission to invent business claims.
- Use local Markdown only. Review this spec, then present dependency-aware vertical ticket slices for approval before writing individual implementation tickets.

## Approved presentation refinements, 26 October 2026

- Keep the complete front-yard photograph, including the house and clouds, in its native landscape proportions on Home and Gallery at every viewport. No thumbnail hover crop.
- Retain the existing fonts and large headings. Improve small text across the site with 14–16px labels and controls, stronger control weights, darker secondary text, and reduced letter spacing. The compact wordmark tagline remains distinct branding.
- User confirmed both choices in chat. These reversible styling changes need no ADR or domain glossary additions.

- Follow-up confirmed: preserve native proportions for every photo across all pages, remove gallery hover zoom and hero entrance zoom, and place hero text below its full photo on desktop and mobile. Supersedes earlier cropped layouts. No domain terms or ADR needed.

- Latest user revision: restore the original homepage hero with photo background, overlaid text, shading, viewport height, and entrance animation. Other photos retain full proportions; readability improvements remain. This supersedes the hero portion of the previous refinement.
