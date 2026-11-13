import { test, expect } from '@playwright/test';

test('link preview metadata is absolute and the site is noindex', async ({ page }) => {
  await page.goto('/');
  const meta = (attr: string, key: string) => page.locator(`head meta[${attr}="${key}"]`).first().getAttribute('content');
  expect(await meta('property', 'og:title')).toBe('Aranya · A home in the hills of Wayanad');
  expect(await meta('property', 'og:description')).toBeTruthy();
  expect(await meta('property', 'og:image')).toMatch(/^https?:\/\/.+\/og-image\.jpg$/);
  expect(await meta('name', 'twitter:card')).toBe('summary_large_image');
  expect(await meta('name', 'twitter:image')).toMatch(/^https?:\/\/.+\/og-image\.jpg$/);
  expect(await meta('name', 'robots')).toContain('noindex');
});
