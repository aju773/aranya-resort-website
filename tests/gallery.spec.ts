import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`gallery viewer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/gallery');
    await expect(page).toHaveTitle(/Gallery.*Aranya/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /photographs of Aranya/);
    const photos = page.locator('.gallery-thumbnail');
    await expect(photos).toHaveCount(8);
    for (const image of await photos.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0)).toBeTruthy();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.screenshot({ path: `test-results/gallery-${width}.png`, fullPage: true });
    await photos.first().focus();
    await page.keyboard.press('Enter');
    const viewer = page.getByRole('dialog', { name: 'Photo viewer' });
    await expect(viewer).toBeVisible();
    await expect(viewer.getByRole('button', { name: 'Close viewer' })).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
    await page.keyboard.press('Shift+Tab');
    await expect(viewer.getByRole('link', { name: 'Open original' })).not.toBeFocused();
    await expect(viewer.getByRole('button', { name: 'Next photo' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(viewer.getByRole('button', { name: 'Close viewer' })).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect(viewer.locator('#viewer-caption')).toHaveText('Tiled-roof wing of the house around a sandy courtyard');
    await viewer.getByRole('button', { name: 'Next photo' }).click();
    await expect(viewer.locator('#viewer-caption')).toContainText('red-tiled roof');
    await viewer.locator('.viewer-photo').dispatchEvent('touchstart', { touches: [{ identifier: 1, clientX: 300, clientY: 200 }] });
    await viewer.locator('.viewer-photo').dispatchEvent('touchend', { changedTouches: [{ identifier: 1, clientX: 100, clientY: 205 }] });
    await expect(viewer.locator('#viewer-caption')).toContainText('Tea-covered hills');
    expect(await viewer.locator('img').evaluate(node => getComputedStyle(node).animationName)).toBe('none');
    await page.screenshot({ path: `test-results/viewer-${width}.png` });
    await page.keyboard.press('Escape');
    await expect(viewer).toBeHidden();
    await expect(photos.first()).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
    await photos.last().click();
    await viewer.getByRole('button', { name: 'Previous photo' }).click();
    await viewer.getByRole('button', { name: 'Close viewer' }).click();
    await expect(photos.last()).toBeFocused();
    await page.getByRole('link', { name: 'House & hills', exact: true }).click();
    await expect(page).toHaveURL(/#house-and-hills/);
  });
}

test('failed images keep viewer controls usable', async ({ page }) => {
  await page.route('**/_next/image?**', route => route.abort());
  await page.goto('/gallery');
  await expect(page.locator('.photo-error').first()).toBeVisible();
  await page.locator('.gallery-thumbnail').first().click();
  const viewer = page.getByRole('dialog');
  await expect(viewer.locator('.photo-error')).toBeVisible();
  await expect(viewer.getByRole('link', { name: 'Open original' })).toHaveAttribute('href', /house/);
  await viewer.getByRole('button', { name: 'Next photo' }).click();
  await viewer.getByRole('button', { name: 'Close viewer' }).click();
  await expect(viewer).toBeHidden();
});

test('gallery reachable through shared navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Gallery' }).click();
  await expect(page).toHaveURL('/gallery');
  await expect(page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Gallery' })).toHaveAttribute('aria-current', 'page');
});
