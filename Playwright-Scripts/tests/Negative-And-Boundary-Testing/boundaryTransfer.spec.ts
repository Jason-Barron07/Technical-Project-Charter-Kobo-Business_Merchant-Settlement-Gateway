import { test, expect } from '@playwright/test';


// Test case: Boundary test for transfer amount
// This verifies that a transfer at a valid upper boundary amount is processed successfully
test('Boundary test for transfer', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();
  await page.getByTestId('transfer-btn').click();
  await page.getByTestId('transfer-phone').fill('0725837683');
  await page.getByTestId('transfer-amount').click();
  await page.getByTestId('transfer-amount').fill('4981.50');
  await page.getByTestId('process-transfer').click();
  await expect(page.getByTestId('transfer-result')).toHaveText('Transfer of R4981.50 sent to 0725837683');
});