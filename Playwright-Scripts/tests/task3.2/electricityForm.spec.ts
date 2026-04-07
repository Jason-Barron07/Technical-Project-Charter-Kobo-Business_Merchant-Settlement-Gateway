import { test, expect } from '@playwright/test';

test('Electricity form meter number validation', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Sell' }).click();
  await page.getByTestId('input-phone').click();
  await page.getByTestId('input-phone').fill('0725837683');
  await page.getByTestId('select-product').selectOption('electricity');
  await page.getByTestId('quick-R500').click();
  await page.getByTestId('check-terms').check();
  await page.getByTestId('submit-btn').click();
    await expect(page.getByTestId('error-meter')).toHaveText('Meter number is required');
});