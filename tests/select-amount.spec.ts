import { test, expect } from '@playwright/test';

// Test case: Verify that a merchant can select a predefined amount (R50)

test('merchant can select amount', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');

  await page.getByTestId('input-phone').click();
  await page.getByTestId('input-phone').fill('0789965432');
  await page.getByTestId('select-product').selectOption('data');
  await page.getByTestId('select-provider').selectOption('Cell C');
  await page.getByTestId('quick-R50').click();
});