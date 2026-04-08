import { test, expect } from '@playwright/test';

test('admin can transfer amount', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/wallet.html');

  await page.getByTestId('transfer-btn').click();
  await page.getByTestId('transfer-phone').fill('0798255432');
  await page.getByTestId('transfer-amount').fill('1000');
  await page.getByTestId('process-transfer').click();

  await expect (page.getByTestId ('transfer-result')).toHaveText ('Transfer of R1000.00 sent to 0798255432');
  
});