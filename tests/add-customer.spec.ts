import { test, expect } from '@playwright/test';

// Test case: Verify that a merchant can successfully add a customer

test('admin adds a customer', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/customers.html');

  await page.getByTestId('add-cust-btn').click();
  await page.getByTestId('cust-name').fill('Khumbelo Thandi');
  await page.getByTestId('cust-phone').fill('0798219298');
  await page.getByTestId('save-cust-btn').click();

  await expect(page.getByText ('Customer added')).toBeVisible();
});