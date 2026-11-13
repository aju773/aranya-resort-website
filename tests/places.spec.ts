import { test, expect } from '@playwright/test';

const order = ['Soochipara Falls', 'Kanthanpara Waterfalls', 'Neelimala Viewpoint', 'Chembra Peak', 'Karapuzha Dam', 'Heritage Museum', 'Edakkal Caves', 'Thusharagiri Falls', 'Pookode Lake', 'Lakkidi Viewpoint', 'Ancient Jain Temple', 'Karalad Lake'];
const km = ['1.8', '1.9', '6.8', '9', '10.2', '11.2', '13.2', '14', '15.7', '16.6', '17.3', '35'];

test.use({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });

test('experiences lists 12 places nearest first with loaded photos and credit', async ({ page }) => {
  await page.goto('/experiences');
  const cards = page.locator('#nearby .place-card');
  await expect(cards).toHaveCount(12);
  await expect(cards.locator('h3')).toHaveText(order);
  for (let i = 0; i < 12; i++) await expect(cards.nth(i)).toContainText(`~${km[i]} km from Aranya`);
  const images = cards.locator('img');
  for (let i = 0; i < 12; i++) {
    await images.nth(i).scrollIntoViewIfNeeded();
    await expect.poll(() => images.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    expect((await images.nth(i).getAttribute('alt'))!.length).toBeGreaterThan(10);
  }
  await expect(page.locator('#nearby').getByText('Photos: Wikimedia Commons contributors')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('home shows 4 closest places and links to all', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.home-places .place-card');
  await expect(cards.locator('h3')).toHaveText(order.slice(0, 4));
  await page.getByRole('link', { name: 'See all 12 places' }).click();
  await expect(page).toHaveURL(/\/experiences#nearby/);
  await expect(page.locator('#nearby .place-card')).toHaveCount(12);
});
