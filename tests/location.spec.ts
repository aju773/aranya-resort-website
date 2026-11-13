import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`location navigation and keyboard FAQ at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    if (width === 390) await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('navigation', { name: width === 390 ? 'Mobile navigation' : 'Main navigation', exact: true }).getByRole('link', { name: 'Location/FAQ' }).click();
    await expect(page).toHaveURL('/location');
    await expect(page).toHaveTitle(/Location & FAQ/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Wayanad/);
    if (width === 390) await page.getByRole('button', { name: 'Menu' }).click();
    await expect(page.getByRole('link', { name: 'Location/FAQ', exact: true }).filter({ visible: true })).toHaveAttribute('aria-current', 'page');
    if (width === 390) await page.keyboard.press('Escape');
    for (const name of ['Open map', 'Get directions']) {
      const href = await page.getByRole('link', { name }).getAttribute('href');
      const url = new URL(href ?? '');
      expect(url.origin).toBe('https://www.google.com');
      expect(url.searchParams.get('api')).toBe('1');
      expect(url.searchParams.get(name === 'Open map' ? 'query' : 'destination')).toContain('Wayanad, Kerala, India');
    }
    await expect(page.getByRole('link', { name: 'Call the host' })).toHaveAttribute('href', 'tel:+910000000000');
    for (const details of await page.locator('details').all()) {
      const summary = details.locator('summary');
      const answer = details.locator('.faq-answer');
      await summary.focus();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      await expect(summary).toBeFocused();
      await expect(summary).toHaveCSS('outline-style', 'solid');
      await expect(answer).toBeHidden();
      await page.keyboard.press('Enter');
      await expect(details).toHaveAttribute('open', '');
      await expect(answer).toBeVisible();
      await page.keyboard.press('Space');
      await expect(answer).toBeHidden();
    }
    await page.screenshot({ path: `test-results/location-${width}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(await page.locator('html').evaluate(node => getComputedStyle(node).scrollBehavior)).toBe('auto');
  });
}

test('FAQ remains operable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/location');
  await page.getByText('Can children stay?', { exact: true }).click();
  await expect(page.getByText(/children’s beds/)).toBeVisible();
  await context.close();
});
