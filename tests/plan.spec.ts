import { test, expect, type Page } from '@playwright/test';

async function fillDates(page: Page) {
  await page.getByLabel('Arrival', { exact: true }).fill('2027-12-10');
  await page.getByLabel('Departure', { exact: true }).fill('2027-12-12');
}
for (const width of [1440, 390]) {
  test(`planning journey, edit, refresh and handoff at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const writes: string[] = [];
    page.on('request', request => { if (request.method() !== 'GET') writes.push(request.url()); });
    await page.goto('/stay/premium-room-ac');
    await page.getByRole('link', { name: 'Plan a stay in Premium Room AC' }).click();
    await expect(page.getByLabel('Room', { exact: true })).toHaveValue('premium-room-ac');
    await fillDates(page);
    await page.getByLabel('Children', { exact: true }).fill('1');
    await page.getByLabel('Prefer a quiet room', { exact: true }).check();
    await page.reload();
    await expect(page.getByLabel('Arrival', { exact: true })).toHaveValue('2027-12-10');
    await expect(page.getByLabel('Prefer a quiet room', { exact: true })).toBeChecked();
    const review = page.getByRole('button', { name: 'Review preferences' });
    await review.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: 'Your stay, at a glance.' })).toBeFocused();
    await expect(page.getByText('2 nights × ₹8,000 per room/night = ₹16,000')).toBeVisible();
    await expect(page.getByText(/Check extra-bed options/)).toBeVisible();
    await expect(page.getByText(/No reservation has been created/)).toBeVisible();
    const handoff = page.getByRole('link', { name: 'Continue to the booking site' });
    await expect(handoff).toHaveAttribute('href', 'https://example.com/aranya-booking');
    await expect(handoff).toHaveAttribute('referrerpolicy', 'no-referrer');
    await page.goBack();
    await expect(page.getByLabel('Arrival', { exact: true })).toHaveValue('2027-12-10');
    await page.goForward();
    await expect(handoff).toBeVisible();
    await page.getByRole('button', { name: 'Back / edit preferences' }).click();
    await page.getByLabel('Room', { exact: true }).selectOption('deluxe-room-ac-twin-bed');
    await page.reload();
    await expect(page.getByLabel('Room', { exact: true })).toHaveValue('deluxe-room-ac-twin-bed');
    await page.getByRole('button', { name: 'Review preferences' }).click();
    await expect(page.getByText('Deluxe Room AC (Twin Bed)', { exact: true })).toBeVisible();
    await page.screenshot({ path: `test-results/plan-review-${width}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(writes.filter(url => !url.includes('__nextjs'))).toEqual([]);
    await page.goto('/stay');
    if (width === 390) {
      const sticky = page.locator('.mobile-plan');
      await expect(sticky).toBeVisible();
      await page.locator('footer').scrollIntoViewIfNeeded();
      const footer = await page.locator('footer small').boundingBox();
      const cta = await sticky.boundingBox();
      expect(footer && cta && footer.y + footer.height <= cta.y).toBeTruthy();
      await sticky.click();
      await expect(page.locator('.mobile-plan')).toHaveCount(0);
      await expect(page.getByLabel('Room', { exact: true })).toHaveValue('deluxe-room-ac-twin-bed');
    }
  });
}

test('invalid dates, guests and room show focused actionable errors', async ({ page }) => {
  await page.goto('/plan?room=made-up');
  await page.getByRole('button', { name: 'Review preferences' }).click();
  await expect(page.locator('.planner-errors')).toBeFocused();
  await expect(page.locator('.planner-errors').getByRole('link')).toHaveCount(3);
  await page.getByLabel('Arrival', { exact: true }).fill('2020-01-01');
  await page.getByLabel('Departure', { exact: true }).fill('2019-01-01');
  await page.getByLabel('Adults', { exact: true }).fill('3');
  await page.getByLabel('Children', { exact: true }).fill('-1');
  await page.getByRole('button', { name: 'Review preferences' }).click();
  await expect(page.locator('.planner-errors').getByRole('link')).toHaveCount(5);
  await page.locator('.planner-errors').getByRole('link', { name: /arrival date/ }).click();
  await expect(page.getByLabel('Arrival', { exact: true })).toBeFocused();
  await fillDates(page);
  await page.getByLabel('Adults', { exact: true }).fill('0');
  await page.getByLabel('Children', { exact: true }).fill('0.5');
  await page.getByRole('button', { name: 'Review preferences' }).click();
  await expect(page.getByLabel('Adults', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Children', { exact: true })).toHaveAttribute('aria-invalid', 'true');
});

for (const stored of ['{broken', JSON.stringify({ version: 99, draft: {} }), JSON.stringify({ version: 1, draft: { arrival: '2020-01-01', departure: '2020-01-02', adults: '99', children: '-1', room: 'unknown', requests: ['Email me', 'Prefer a quiet room'] } })]) {
  test(`recover from invalid saved preferences ${stored.slice(0, 30)}`, async ({ page }) => {
    await page.addInitScript(value => sessionStorage.setItem('aranya-plan-v1', value), stored);
    await page.goto('/plan');
    await expect(page.getByLabel('Arrival', { exact: true })).toHaveValue('');
    await expect(page.getByLabel('Adults', { exact: true })).toHaveValue('2');
    await expect(page.getByLabel('Children', { exact: true })).toHaveValue('0');
    await expect(page.getByLabel('Room', { exact: true })).toHaveValue('');
    await expect(page.getByRole('status')).toBeVisible();
  });
}

test('storage denied still permits review', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
  });
  await page.goto('/plan?room=premium-room-ac');
  await fillDates(page);
  await expect(page.getByRole('status')).toContainText('Saving is unavailable');
  await page.getByRole('button', { name: 'Review preferences' }).click();
  await expect(page.getByRole('link', { name: 'Continue to the booking site' })).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Arrival', { exact: true })).toHaveValue('');
});

test('room prefill persists before any edits when returning through shared planning action', async ({ page }) => {
  await page.goto('/stay/deluxe-room-ac-twin-bed');
  await page.getByRole('link', { name: 'Plan a stay in Deluxe Room AC (Twin Bed)' }).click();
  await expect(page.getByLabel('Room', { exact: true })).toHaveValue('deluxe-room-ac-twin-bed');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Stay', exact: true }).click();
  await page.locator('.header-action').click();
  await expect(page).toHaveURL(/\/plan$/);
  await expect(page.getByLabel('Room', { exact: true })).toHaveValue('deluxe-room-ac-twin-bed');
});
