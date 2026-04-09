import { test, expect } from '@playwright/test';

// Test case: Validate that phone numbers with spaces are accepted and processed correctly. This is a defect found during testing, as the system should ideally trim spaces from phone numbers before processing, but it is currently accepting them without issue. This test ensures that the presence of spaces does not cause any errors in processing the sale.
test('Spaces in phone number', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Sell' }).click();
  await page.getByTestId('input-phone').click();
  await page.getByTestId('input-phone').fill('072 583 7683');
  await page.getByTestId('input-customer-name').click();
  await page.getByTestId('input-customer-name').fill('Rendani');
  await page.getByTestId('select-product').selectOption('gaming');
  await page.getByTestId('select-provider').selectOption('Roblox');
  await page.getByTestId('quick-R100').click();
  await page.getByTestId('check-terms').check();
    await page.getByTestId('submit-btn').click();
    await expect(page.getByText('Sale Processed Successfully!')).toBeVisible();
});