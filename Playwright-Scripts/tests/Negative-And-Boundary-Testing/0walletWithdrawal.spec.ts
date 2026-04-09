import { test, expect } from '@playwright/test';

// Test case: Validate that withdrawing zero amount shows an error message
test('Test withdrawal with zero amount', async ({ page }) => {

  // Navigate to the application homepage
  await page.goto('https://quality-engineering-labs.vercel.app/');

   // Open the Wallet section from the main navigation menu
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();

   // Click on the withdraw button to initiate a withdrawal
  await page.getByTestId('withdraw-btn').click();
  await page.getByTestId('withdraw-bank').selectOption('FNB');

  // Enter the bank account number
  await page.getByTestId('withdraw-account').click();
  await page.getByTestId('withdraw-account').fill('621285632');

  // Enter withdrawal amount as 0 (boundary/negative test case)
  await page.getByTestId('withdraw-amount').click();
  await page.getByTestId('withdraw-amount').fill('0');
  await page.getByTestId('process-withdraw').click();

  // Verify that the correct validation message is displayed
  await expect(page.getByTestId('withdraw-result')).toHaveText('Minimum withdrawal is R50');
});