import { test, expect } from '@playwright/test';

test('admin can purchase in bulk', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/market.html');

  await page.getByTestId('product-category').selectOption('1voucher');
  await page.getByTestId('add-cart-0').click();
  await page.getByTestId('qty-plus-0').click();
  await page.getByTestId('qty-plus-0').click();
  await page.getByTestId('fab-cart').click();
  await page.getByTestId('checkout-btn').click();
  await page.getByTestId('confirm-checkout-btn').click();

  await expect (page.getByRole('heading', { name: 'Purchase Complete!' })).toBeVisible();
});