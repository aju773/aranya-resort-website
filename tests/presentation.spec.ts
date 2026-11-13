import { test, expect } from '@playwright/test';

const routes = ['/', '/stay', '/stay/premium-room-ac', '/stay/deluxe-room-ac-twin-bed', '/experiences', '/gallery', '/location', '/plan', '/stay/unknown-room', '/missing-page'];

for (const width of [1440, 390]) {
  test(`presentation pages, assets and local links at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    const writes: string[] = [];
    const destinations = new Set<string>();
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url()); });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(route.includes('unknown') || route.includes('missing') ? 404 : 200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('main')).toHaveAttribute('id', 'main');
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => Array.from(document.fonts).some(face => face.status === 'loaded' && face.family.includes('Manrope')))).toBeTruthy();
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(node => node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0)).toBeTruthy();
        await expect(image).toHaveAttribute('sizes', /vw/);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBeTruthy();
      for (const href of await page.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
        if (href && !href.startsWith('//')) destinations.add(href.split('#')[0]);
      }
      await page.screenshot({ path: `test-results/presentation-${width}-${route.replaceAll('/', '_') || 'home'}.png`, fullPage: true });
    }
    for (const href of destinations) expect((await request.get(href || '/')).status(), href).toBe(200);
    expect(errors).toEqual([]);
    expect(writes).toEqual([]);
  });
}

test('motion cleans up across navigation and responds to reduced motion', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-image')).toBeVisible();
  await page.locator('.header-action').click();
  await expect(page).toHaveURL('/plan');
  await page.getByRole('link', { name: 'Aranya home', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.locator('.hero-image').evaluate(node => getComputedStyle(node).transform)).toBe('none');
  expect(await page.locator('[data-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1'))).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
