import {test, expect, Page} from '@playwright/test'

test('admin can sall airtime', async ({ page }) => {

  await page.goto('https://quality-engineering-labs.vercel.app/payment.html');

  await page.getByTestId('input-phone').fill('0798219300');
  await page.getByTestId('select-product').selectOption('airtime');
  await page.getByTestId('select-provider').selectOption('Vodacom');
  await page.getByTestId('quick-R29').click();
  await page.getByTestId('check-terms').check();

  await page.getByTestId('submit-btn').click();

  await expect(page.getByText('Sale Processed Successfully')).toBeVisible();
});