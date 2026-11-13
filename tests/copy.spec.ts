import { test, expect } from '@playwright/test';

const banned = [/the listing site/i, /a review site/i, /Kerala Tourism/i, /not guaranteed/i, /not promise/i, /confirm/i, /Photo source/i, /Photograph not/i, /Property details from/i, /Source:/i, /Independent design preview/i];
const pages = ['/', '/stay', '/stay/premium-room-ac', '/stay/deluxe-room-ac-twin-bed', '/experiences', '/gallery', '/location', '/plan'];

for (const path of pages) {
  test(`${path} has no disclaimers or outbound source links`, async ({ page }) => {
    await page.goto(path);
    const text = await page.locator('body').innerText();
    for (const phrase of banned) expect(text, String(phrase)).not.toMatch(phrase);
    const hrefs = await page.locator('a[href^="http"]').evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''));
    for (const href of hrefs) expect(href).not.toMatch(/listing-site|review-site|keralatourism|dtpcwayanad/i);
  });
}

test('plan summary keeps only the handoff notice and sample-price label', async ({ page }) => {
  await page.goto('/plan');
  const future = (days: number) => new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
  await page.getByLabel('Arrival', { exact: true }).fill(future(10));
  await page.getByLabel('Departure', { exact: true }).fill(future(12));
  await page.getByLabel('Room', { exact: true }).selectOption({ index: 1 });
  await page.getByRole('button', { name: 'Review preferences' }).click();
  const text = await page.locator('body').innerText();
  for (const phrase of banned) expect(text, String(phrase)).not.toMatch(phrase);
  await expect(page.getByText('Sample price · illustrative only')).toBeVisible();
  await expect(page.getByText(/The booking site determines actual rates/)).toBeVisible();
});

test('booking line sits beside the plan call to action', async ({ page }) => {
  await page.goto('/');
  const closing = page.getByRole('region', { name: 'Make room for Wayanad.' });
  await expect(closing).toContainText('Final booking happens on the booking site.');
  await expect(closing.getByRole('link', { name: 'Plan your stay' })).toBeVisible();
});

test('concept notice shows in Welcome and footer, not the hero', async ({ page }) => {
  await page.goto('/');
  const line = 'Aranya is a fictional homestay. This is a concept website';
  await expect(page.getByRole('region', { name: 'A home in the hills. A slower kind of stay.' })).toContainText(line);
  await expect(page.locator('footer')).toContainText(line);
  await expect(page.locator('.hero, header').first()).not.toContainText('fictional homestay');
});
