# 03: Nearby places with photos and distances

**What to build:** A guest on Experiences sees all 12 places from the original site as photo cards in the "Beyond Aranya" section, nearest first, each showing "~X km from Aranya" using the owner's figures: Soochipara Falls 1.8, Kanthanpara Waterfalls 1.9, Neelimala Viewpoint 6.8, Chembra Peak 9, Karapuzha Dam 10.2, Heritage Museum 11.2, Edakkal Caves 13.2, Thusharagiri Falls 14, Pookode Lake 15.7, Lakkidi Viewpoint 16.6, Ancient Jain Temple 17.3, Karalad Lake 35. Home shows the 4 closest with a "See all 12 places" link to that section. Photos are freely licensed Wikimedia Commons images, served locally and recorded in the asset register with licence and author. One credit line closes the section: "Place photos: Wikimedia Commons contributors". The hosts' offer to help arrange vehicles and guides is kept, phrased warmly. See spec: Places.

**Blocked by:** 01 (Warm copy, disclaimer cut and Diamond rating)

**Status:** ready-for-agent

- [ ] Structured places data: name, km, photo, alt text; sorted ascending by distance
- [ ] 12 photos sourced from Wikimedia Commons under free licences, optimized through Next.js images, registered with licence and author
- [ ] Experiences shows 12 cards; Home shows the 4 closest; "See all" link reaches the Experiences section
- [ ] Each card shows name, "~X km from Aranya" and a loaded image with meaningful alt text
- [ ] Credit line present at the bottom of the Places section; no other source lines added
- [ ] No horizontal overflow at 390 px
- [ ] Playwright tests cover counts, order, distance text, image loading, credit and link; suite green

## Comments
