import { test, expect } from '@playwright/test';

// Test case: Verify that an admin/user can successfully checkout an order

test('admin can checkout order', async ({ page }) => {
    
  await page.goto('https://quality-engineering-labs.vercel.app/market.html');

 await page.getByTestId('add-cart-9').click();
  await page.getByTestId('fab-cart').click();
  await page.getByTestId('checkout-btn').click();
  await page.getByTestId('confirm-checkout-btn').click();
 
   await expect (page.getByText('Purchase complete! R200.00 deducted from wallet.', { exact: true })).toBeVisible ();
   
});