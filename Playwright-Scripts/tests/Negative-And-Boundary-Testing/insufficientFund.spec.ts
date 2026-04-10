import { test, expect } from '@playwright/test';

// Test case: Validate that a transfer fails when the amount exceeds available balance. This ensures the system correctly handles insufficient funds scenarios
test('insufficient funds transfer', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();
  await page.getByRole('main').click();
  await page.getByTestId('transfer-btn').click();
  await page.getByTestId('transfer-phone').click();
  await page.getByTestId('transfer-phone').fill('0725837683');
  await page.getByTestId('transfer-amount').click();
  await page.getByTestId('transfer-amount').fill('6000');
  await page.getByTestId('process-transfer').click();
  await expect(page.getByTestId('transfer-result')).toHaveText('Insufficient funds. Balance: R5000.00');
});
