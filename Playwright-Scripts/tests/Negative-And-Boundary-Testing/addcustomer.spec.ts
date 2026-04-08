  import { test, expect } from '@playwright/test';
  
  test('Add customer with missing fields', async ({ page }) => {
    await page.goto('https://quality-engineering-labs.vercel.app/customers.html');
  
  await page.getByRole('main').click();
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Customers' }).click();
  await page.getByTestId('add-cust-btn').click();
  await page.getByTestId('cust-name').click();
  await page.getByTestId('cust-name').fill('Khangweni');
  await page.getByTestId('cust-phone').click();
  await page.getByTestId('cust-phone').fill('0752837683');
  await page.getByTestId('cust-email').click();
  await page.getByTestId('cust-email').fill('khangweni@email.com');
  await page.getByTestId('cust-notes').click();
  await page.getByTestId('cust-notes').fill('Prefers Electricity');
  await page.getByTestId('cust-phone').click();
  await page.getByTestId('cust-phone').fill('');
  await page.getByTestId('save-cust-btn').click();
    await expect(page.getByTestId('cust-error')).toHaveText('Valid phone number required');
});