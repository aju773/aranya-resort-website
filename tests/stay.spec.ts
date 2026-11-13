import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`room comparison and both details at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await page.getByRole('link', { name: 'Compare all rooms' }).click();
    await expect(page).toHaveTitle(/Stay at Aranya/);
    await expect(page.getByRole('article')).toHaveCount(2);
    for (const name of ['Premium Room AC', 'Deluxe Room AC (Twin Bed)']) {
      await page.getByRole('link', { name: `Explore ${name}`, exact: true }).click();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
      await expect(page).toHaveTitle(`${name} | Stay at Aranya`);
      await expect(page.getByRole('link', { name: `Plan a stay in ${name}` })).toHaveAttribute('href', `/plan?room=${name.startsWith('Premium') ? 'premium-room-ac' : 'deluxe-room-ac-twin-bed'}`);
      await expect(page.getByText(/Final booking happens on the booking site/)).toBeVisible();
      await page.locator('img').scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBeTruthy();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      await page.screenshot({ path: `test-results/${name.startsWith('Premium') ? 'premium' : 'deluxe'}-${width}.png`, fullPage: true });
      await page.getByRole('link', { name: 'Compare rooms' }).click();
    }
    await page.screenshot({ path: `test-results/stay-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
    expect((await page.goto('/stay/nonexistent'))?.status()).toBe(404);
  });
}
