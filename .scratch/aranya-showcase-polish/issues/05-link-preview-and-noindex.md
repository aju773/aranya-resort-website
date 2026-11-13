# 05: WhatsApp link preview and noindex

**What to build:** When the demo URL is pasted into WhatsApp it shows a photo card: a 1200×630 crop of the front-yard photo, the title "Aranya · A home in the hills of Wayanad" and the existing description. The site is marked noindex so it stays out of search results. Metadata uses absolute URLs derived from the deployed origin, so it works once the user deploys. Deployment itself is done by the user. See spec: Sharing and deployment.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] 1200×630 preview image generated from the front-yard photo
- [ ] Page head contains og:image, og:title, og:description, twitter card tags
- [ ] Image and page URLs are absolute and follow the deployed origin (configurable base URL)
- [ ] Robots metadata set to noindex
- [ ] Playwright test checks the metadata; suite green

## Comments
