import { test, expect } from '@playwright/test';



test('test', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/settings.html');
  await page.getByTestId('tab-security').click();
  await page.getByTestId('set-current-pin').click();
  await page.getByTestId('set-current-pin').fill('password123');
  await page.getByTestId('set-new-pin').click();
  await page.getByTestId('set-new-pin').fill('password1234');
  await page.getByTestId('set-confirm-pin').click();
  await page.getByTestId('set-confirm-pin').fill('password1234');
  await page.getByTestId('change-pin').click();
  await expect (page.getByTestId('pin-result')).toBeVisible();
});