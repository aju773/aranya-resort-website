import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`experience navigation, imagery and practical content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const nav = page.getByRole('navigation', { name: width === 390 ? 'Mobile navigation' : 'Main navigation', exact: true });
    if (width === 390) {
      await page.getByRole('button', { name: 'Menu' }).focus();
      await page.keyboard.press('Enter');
    }
    await nav.getByRole('link', { name: 'Experiences' }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/experiences');
    await expect(page).toHaveTitle(/Experiences at Aranya/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /vegetarian Kerala meals/);
    if (width === 390) await page.getByRole('button', { name: 'Menu' }).click();
    await expect(nav.getByRole('link', { name: 'Experiences' })).toHaveAttribute('aria-current', 'page');
    if (width === 390) await page.keyboard.press('Escape');
    await page.getByRole('link', { name: 'At the table' }).click();
    await expect(page).toHaveURL(/#food/);
    await expect(page.getByText(/fixed vegetarian menu/)).toBeVisible();
    await page.getByRole('link', { name: 'Beyond Aranya' }).click();
    await expect(page.getByRole('heading', { name: 'Soochipara Falls' })).toBeVisible();
    await expect(page.getByText(/Ask your hosts for the route/)).toBeVisible();
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0)).toBeTruthy();
    }
    expect(await page.locator('[data-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none'))).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.screenshot({ path: `test-results/experiences-${width}.png`, fullPage: true });
    await page.getByRole('link', { name: 'Explore rooms', exact: true }).click();
    await expect(page).toHaveURL('/stay');
    expect(errors).toEqual([]);
  });
}

test('experience content survives without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/experiences');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Beyond Aranya' }).click();
  await expect(page.getByRole('heading', { name: 'Edakkal Caves' })).toBeVisible();
  await context.close();
});

test('normal-motion section reveal finishes and stays readable on return', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/experiences');
  const heading = page.getByRole('heading', { name: 'Nowhere you need to be.' });
  await heading.scrollIntoViewIfNeeded();
  await expect.poll(() => heading.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42)).toBe(0);
  await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();
  await heading.scrollIntoViewIfNeeded();
  expect(await heading.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42)).toBe(0);
});
