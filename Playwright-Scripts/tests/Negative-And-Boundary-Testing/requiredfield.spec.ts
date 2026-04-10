import { test, expect } from '@playwright/test';

// Test case: Validate that submitting the Sell form without selecting a product type shows the appropriate error message.
test('Test with required fields', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Sell' }).click();
  await page.getByRole('main').click();
  await page.getByTestId('input-phone').click();
  await page.getByTestId('input-phone').fill('0721234567');
  await page.getByTestId('input-customer-name').click();
  await page.getByTestId('input-customer-name').fill('Rendani');
  await page.getByTestId('quick-R100').click();
  await page.getByTestId('check-terms').check();
  await page.getByTestId('submit-btn').click();
  await expect(page.getByTestId('error-product')).toHaveText('Please select a product type');
});