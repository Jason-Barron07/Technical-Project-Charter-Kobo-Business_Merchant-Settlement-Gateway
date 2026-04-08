// Import Playwright test utilities
import { test, expect } from '@playwright/test';

// Test case: Admin adds a transaction and verifies success notification
test('Admin adds a transaction successfully', async ({ page }) => {

// Navigate to transactions page
await page.goto('https://quality-engineering-labs.vercel.app/transactions.html');

// Populate transaction details (description, amount, type, and category)
await page.getByTestId('txn-input').fill('Material for company warehouse');
await page.getByTestId('txn-amount').fill('29300000');
await page.getByTestId('txn-type').selectOption('stock');
await page.getByTestId('txn-category').selectOption('other');

// Submit the transaction and verify success message is displayed
await page.getByRole('button', { name: 'Add'}).click();
await expect(page.getByText('Transaction added')).toBeVisible();

});
