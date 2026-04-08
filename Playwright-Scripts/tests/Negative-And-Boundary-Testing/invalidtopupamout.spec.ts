import { test, expect } from '@playwright/test';

test('Invalid top-up amount', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/wallet.html');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();
  await page.getByTestId('topup-btn').click();
  await page.getByTestId('topup-amount').click();
  await page.getByTestId('topup-amount').fill('-100');
  await page.getByTestId('process-topup').click();
    await expect(page.getByTestId('topup-result')).toHaveText('Minimum top-up is R10');
});