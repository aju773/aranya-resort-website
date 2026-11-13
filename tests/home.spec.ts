import { test, expect } from '@playwright/test';

test('desktop introduction, optimized assets, destinations and not-found', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page).toHaveTitle(/Aranya.*Wayanad/);
  await page.getByRole('link', { name: 'Step inside' }).click();
  await expect(page).toHaveURL(/#introduction/);
  await expect(page.getByRole('heading', { name: 'A home in the hills. A slower kind of stay.' })).toBeInViewport();
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator('main img').all()) await image.scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBeTruthy();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
  expect(errors).toEqual([]);
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBe(404);
  await page.getByRole('link', { name: 'Back to Aranya' }).click();
  await expect(page).toHaveURL('/');
});

test('mobile keyboard menu, Escape, navigation and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(menu.getByRole('link', { name: 'Home', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.keyboard.press('Tab');
  await expect(menu.getByRole('link', { name: 'The homestay' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#introduction/);
  expect(await page.locator('html').evaluate(node => getComputedStyle(node).scrollBehavior)).toBe('auto');
  expect(await page.locator('.hero-image').evaluate(node => getComputedStyle(node).transform)).toBe('none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.goto('/');
  for (const image of await page.locator('main img').all()) await image.scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('main img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBeTruthy();
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
});

test('content and links remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Step inside' }).click();
  await expect(page).toHaveURL(/#introduction/);
  await context.close();
});

test('homepage discovery connects every finished destination and sourced guest voices', async ({ page }) => {
  await page.goto('/');
  const main = page.getByRole('main');
  for (const href of ['/stay', '/stay/premium-room-ac', '/stay/deluxe-room-ac-twin-bed', '/experiences', '/gallery', '/location', '/plan']) {
    const link = main.locator(`a[href="${href}"]`).first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(href);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.goto('/');
  }
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Guest reviews' }).click();
  await expect(page).toHaveURL('/#reviews');
  const reviews = page.getByRole('region', { name: 'Remembered by the people who stayed.' });
  await expect(reviews).toBeInViewport();
  await expect(reviews).toContainText('Anjali R');
  await expect(page.locator('nav a[href*="blog"], nav a[href*="archive"]')).toHaveCount(0);
  for (const group of ['house-and-hills', 'bedrooms', 'shared-spaces']) {
    await page.goto('/');
    await page.locator(`main a[href="/gallery#${group}"]`).click();
    await expect(page.locator(`#${group}`)).toBeInViewport();
  }
});

test('mobile discovery stays readable with reduced motion and keyboard planning', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#reviews');
  const closing = page.getByRole('region', { name: 'Make room for Wayanad.' });
  await closing.scrollIntoViewIfNeeded();
  await expect(closing).toContainText('Final booking happens on the booking site.');
  const plan = closing.getByRole('link', { name: 'Plan your stay' });
  await plan.focus();
  await expect(plan).toBeFocused();
  expect(await page.locator('[data-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).transform === 'none' && getComputedStyle(node).opacity === '1'))).toBeTruthy();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/plan');
});


test('rating badge and testimonial carousel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#reviews');
  const reviews = page.getByRole('region', { name: 'Remembered by the people who stayed.' });
  await expect(reviews).toContainText('5.0 Excellent · 30 guest ratings (sample)');
  for (const score of ['Food 4.9', 'Cleanliness 4.9', 'Value for money 4.8']) await expect(reviews).toContainText(score);
  const carousel = reviews.getByRole('group', { name: 'Guest testimonials' });
  const cards = carousel.getByRole('group', { name: /^Testimonial \d of 5$/ });
  await expect(cards).toHaveCount(5);
  for (const name of ['Anjali R', 'Kiran M', 'Thomas V', 'Devika', 'Arun P.']) await expect(carousel).toContainText(name);
  await expect(carousel).not.toContainText(/20\d\d/);
  const track = carousel.locator('[data-track]');
  const position = () => track.evaluate(node => node.scrollLeft);
  const start = await position();
  await page.waitForTimeout(1500);
  expect(await position()).toBe(start);
  await reviews.getByRole('button', { name: 'Next testimonial' }).click();
  await expect.poll(position).toBeGreaterThan(start);
  const moved = await position();
  await reviews.getByRole('button', { name: 'Previous testimonial' }).click();
  await expect.poll(position).toBeLessThan(moved);
  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(position).toBeGreaterThan(start);
  const link = reviews.getByRole('link', { name: /Read all reviews on the booking site/ });
  await expect(link).toHaveAttribute('href', /example\.com\/aranya-booking/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test('tablet menu keeps planning reachable', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Plan your stay' }).click();
  await expect(page).toHaveURL('/plan');
});

test('reduced motion leaves headings, cards and photos visible at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const hidden = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('.hero-line, [data-reveal], [data-stagger] > *, [data-wipe]')].filter(node => {
    const style = getComputedStyle(node);
    return style.opacity !== '1' || (style.clipPath !== 'none' && style.clipPath !== '');
  }).length);
  expect(hidden).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});
