import { test, expect } from '@playwright/test';

test('merchant can view balance', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/login.html');
  
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();

   await expect(page).toHaveURL('https://quality-engineering-labs.vercel.app/wallet.html');

  await expect(page.getByText ('Available balance')).toBeVisible();
  
});