  import { test, expect } from '@playwright/test';
  
  
// Test case: Validate that adding a customer with missing required fields (phone)
// triggers the correct validation error message
  test('Add customer with missing fields', async ({ page }) => {

// Navigate directly to the Customers page
  await page.goto('https://quality-engineering-labs.vercel.app/customers.html');
  await page.getByRole('main').click();

  // Navigate to Customers via main navigation (extra safety step)
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Customers' }).click();

  // Click "Add Customer" button to open the form
  await page.getByTestId('add-cust-btn').click();

  // Fill in customer name
  await page.getByTestId('cust-name').click();
  await page.getByTestId('cust-name').fill('Khangweni');

  // Fill in phone number initially
  await page.getByTestId('cust-phone').click();
  await page.getByTestId('cust-phone').fill('0752837683');

  // Fill in email and notes
  await page.getByTestId('cust-email').click();
  await page.getByTestId('cust-email').fill('khangweni@email.com');


  await page.getByTestId('cust-notes').click();
  await page.getByTestId('cust-notes').fill('Prefers Electricity');
  await page.getByTestId('cust-phone').click();
  await page.getByTestId('cust-phone').fill('');

  // Submit the form without a phone number to trigger validation
  await page.getByTestId('save-cust-btn').click();

  // Verify that the correct validation error message is displayed
  await expect(page.getByTestId('cust-error')).toHaveText('Valid phone number required');
});