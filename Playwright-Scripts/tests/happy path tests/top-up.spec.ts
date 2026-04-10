import { test, expect } from '@playwright/test';

// Test case: Verify that a merchant can successfully top up wallet

test('admin can top up wallet', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/wallet.html');

  await page.getByTestId('topup-btn').click();
    await page.getByRole('button', { name: 'R250' }).click();
  await page.getByTestId('topup-pin').fill('8767543423436756');
  await page.getByTestId('process-topup').click();

  await expect(page.getByTestId('topup-result')).toHaveText ('Top-up successful! +R250 added via voucher');

});
