import { test, expect } from '@playwright/test';

// Test case: Verify that a merchant can successfully sell 1 voucher

test('sell 1voucher', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');

  await page.getByTestId('input-phone').fill('0876543423');
  await page.getByTestId('select-product').selectOption('1voucher');
  await page.getByTestId('input-amount').fill('140');
  await page.getByText('I confirm this sale with the').click();
  await page.getByTestId('submit-btn').click();

  await expect (page.getByText ('Sale Processed Successfully')).toBeVisible()
}); 