import { test, expect } from '@playwright/test';

test('admin can withdraw amount', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/wallet.html');

   await page.getByTestId('withdraw-btn').click();
  await page.getByTestId('withdraw-bank').selectOption('Standard Bank');
  await page.getByTestId('withdraw-account').fill('524378670991');
  await page.getByTestId('withdraw-amount').fill('500');
  await page.getByTestId('process-withdraw').click();

  await expect(page.getByTestId('withdraw-result')).toHaveText('Withdrawal of R500.00 to Standard Bank requested. ETA: 1-2 business days.');
});
