import { test, expect } from '@playwright/test';

test('admin can view customers', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/login.html');

 await page.getByLabel('Main navigation').getByRole('link', { name: 'Customers' }).click();

  await expect(page).toHaveURL('https://quality-engineering-labs.vercel.app/customers.html');
  await expect (page.getByText ('Customer Directory')).toBeVisible();

});