import { test, expect } from '@playwright/test';

test('Add transaction without description', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Transactions' }).click();
  await page.getByTestId('txn-amount').click();
  await page.getByTestId('txn-amount').fill('50');
  await page.getByTestId('add-txn-btn').click();
  await expect (page.getByTestId('txn-error')).toHaveText('Please enter a description.');
});