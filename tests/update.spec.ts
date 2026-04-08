import { test, expect } from '@playwright/test';

test('admin can edit customer details', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/customers.html');

  await page.getByTestId('edit-cust-2').click();
  await page.getByTestId('cust-email').fill('lindiwe.n@email.com');
  await page.getByTestId('cust-notes').fill('vodacom');
  await page.getByTestId('save-cust-btn').click();

  await expect(page.getByText('Customer updated')).toBeVisible();
});