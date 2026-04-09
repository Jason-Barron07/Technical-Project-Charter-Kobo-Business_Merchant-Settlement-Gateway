import { test, expect } from '@playwright/test';

// Test case: Boundary test for a valid withdrawal amount
// This verifies that the system correctly processes a withdrawal at a valid boundary value
test('Boundary test for withdrawal', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();
  await page.getByTestId('withdraw-btn').click();
  await page.getByTestId('withdraw-bank').selectOption('Capitec');
  await page.getByTestId('withdraw-account').click();
  await page.getByTestId('withdraw-account').fill('123456789');
  await page.getByTestId('withdraw-amount').click();
  await page.getByTestId('withdraw-amount').fill('580');
  await page.getByTestId('process-withdraw').click();
  await expect(page.getByTestId('withdraw-result')).toHaveText('Withdrawal of R580.00 to Capitec requested. ETA: 1-2 business days.');
});