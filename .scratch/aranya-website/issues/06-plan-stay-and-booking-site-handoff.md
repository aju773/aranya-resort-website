# 06 — Plan stay and continue to the booking site

**What to build:** Let visitors select stay preferences, review and edit them, then continue to the verified the booking site property page without creating a reservation.

**Blocked by:** 02 — Browse stays and room details

**Status:** ready-for-agent

**Completion:** complete, 26 October 2026

- [x] Deliver a dedicated flow for dates, adults/children, source-supported room preferences, optional requests, and review.
- [x] Connect room-specific CTAs to the flow with the selected room prefilled; connect shared Plan your stay actions and add the unobtrusive sticky mobile CTA.
- [x] Validate date order, past arrival dates, guest counts, and verified capacity constraints. Avoid inventing age/occupancy policies or claiming live availability.
- [x] Display clearly labelled sample prices only within the preview, with an understandable illustrative calculation and no guaranteed taxes, inclusions, or discounts.
- [x] Allow review-step editing and back navigation; preserve valid selections across navigation and refresh within the same tab/session.
- [x] Handle malformed, stale, or unavailable session storage gracefully, including stored dates that are no longer valid.
- [x] Collect no names, phone numbers, or emails. Optional requests are nonsensitive preferences, not guaranteed services or paid extras.
- [x] Explain before handoff that no reservation exists, prices are illustrative, actual terms/availability are determined by the booking site, and selections must be re-entered there.
- [x] Verify the external property URL and use Continue to the booking site. Do not send personal data, assume selection transfer, or show a reservation-confirmed screen.
- [x] Verify the valid journey, invalid inputs, editing, persistence failures, keyboard operation, mobile CTA clearance, and reduced motion. Confirm no payment, booking, notification, or email side effects.


## Verification

- Ticket 02 completion verified before implementation.
- `/plan` provides dates, adults/children, verified room preferences, fixed nonsensitive optional requests, review, editing and browser back/forward navigation. No contact fields or submission endpoint.
- Room detail CTAs prefill the room. Shared desktop/mobile actions open the planner; mobile sticky CTA reserves content clearance and stays hidden during planning, gallery viewing and open menus.
- Session storage restores only known fields and requests, rejects malformed/version-mismatched payloads, clears stale dates and invalid choices, and handles denied reads/writes without preventing planning. Initial room prefill persists before any edits. Editing a prefilled room survives refresh.
- Date order/past arrivals, whole guest counts and verified two-adult single-room capacity validated. Child arrangements explicitly unconfirmed; no invented age policy.
- Sample INR 8,000 per room/night appears only in review, explicitly invented demonstration data. Nights × sample amount shown; taxes, inclusions, extras and discounts unconfirmed.
- the booking site property destination and two-adult capacity rechecked against the linked property listing on 26 October 2026; evidence in `docs/room-sources.md`. Outbound link has no selection query or referrer transfer. Handoff explains no reservation, illustrative pricing, actual provider terms and manual re-entry.
- `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check`: pass.
- Production preview, one browser worker: full suite 23/23 passed. After review correction, focused planner suite 8/8 passed, recorded by `test-results/.last-run.json`. Covers desktop/mobile journeys, keyboard focus/errors, reduced motion, invalid input, stale/malformed/unavailable storage, review edits, refresh, browser history, CTA clearance and initial-prefill navigation regression.
- Desktop/mobile review screenshots visually inspected. No horizontal overflow. Browser request check found no action-triggered writes; no payment, reservation, email or notification services added.
- Development preview initially failed hydration; browser acceptance used the production build on local port 3010.

## Standards

No actionable violations or concrete baseline-smell findings. Next client boundary, Suspense, storage parsing and typed draft handling follow documented guidance. 0 findings.

## Spec

Review found initial room prefill was not saved until editing/submission. Fixed by saving normalized initial preferences on mount; added navigation regression. Reviewer confirmed resolved. 1 finding fixed, 0 remaining.

## Comments

- Implemented with grouped selection and separate review steps as permitted by the specification. No public deployment or external booking submission.
