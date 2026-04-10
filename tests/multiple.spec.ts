import { test, expect } from '@playwright/test';

// Test case: Verify that a merchant can successfully make multiple purchases

test('merchant can make multiple purchases', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/market.html');

  // betway voucherid is add-cart-5
  
  await page.getByTestId('add-cart-5').click();
  await page.getByTestId('qty-plus-5').click();
  await page.getByTestId('add-cart-8').click();
  await page.getByTestId('add-cart-15').click();
  await page.getByTestId('add-cart-22').click();
  await page.getByTestId('fab-cart').click();
  await page.getByTestId('checkout-btn').click();
  await page.getByTestId('confirm-checkout-btn').click();

  await expect (page.getByRole ('heading', { name: 'Purchase Complete!' })). toBeVisible();

  await expect (page.getByText ('Reference')).toBeVisible();
});

