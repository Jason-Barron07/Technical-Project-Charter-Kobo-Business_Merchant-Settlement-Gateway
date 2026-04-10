import { test, expect } from '@playwright/test';

// Test case: Validate that a transaction cannot be added without a description
test('Add transaction without description', async ({ page }) => {

  // Navigate to the application homepage
  await page.goto('https://quality-engineering-labs.vercel.app/');

  // Go to the Transactions section via the main navigation
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Transactions' }).click();

  // Enter transaction amount (valid input)
  await page.getByTestId('txn-amount').click();
  await page.getByTestId('txn-amount').fill('50');

  // Click "Add Transaction" button to submit the form
  await page.getByTestId('add-txn-btn').click();

  // Verify that the correct validation error message is displayed
  await expect (page.getByTestId('txn-error')).toHaveText('Please enter a description.');
});