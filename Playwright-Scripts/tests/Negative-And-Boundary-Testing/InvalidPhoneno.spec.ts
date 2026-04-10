import { test, expect } from '@playwright/test';

// Test case: Validate that an invalid phone number format is rejected. Ensures the system enforces proper South African phone number validation.
test('Invalid phone number', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Sell' }).click();
  await page.getByTestId('input-phone').click();
  await page.getByTestId('input-phone').fill('whuthjygvs');
  await page.getByTestId('input-customer-name').click();
  await page.getByTestId('input-customer-name').fill('Rendani');
  await page.getByTestId('select-product').selectOption('gaming');
  await page.getByTestId('select-provider').selectOption('Roblox');
  await page.getByTestId('quick-R100').click();
  await page.getByTestId('check-terms').check();
  await page.getByTestId('submit-btn').click();await
     expect(page.getByTestId('error-phone')).toHaveText('Valid SA phone number required (e.g. 072 123 4567)');
});