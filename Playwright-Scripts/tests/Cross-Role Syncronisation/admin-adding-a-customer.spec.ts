import { test, expect } from '@playwright/test';

// Test case: Admin adds a new customer and verifies successful creation
test('Admin adds a new customer successfully', async ({ page }) => {

// Navigate to the customers page
await page.goto('https://quality-engineering-labs.vercel.app/customers.html');

// Open the add customer form and populate customer details
await page.getByTestId('add-cust-btn').click();
await page.getByTestId('cust-name').fill('Jason Barron');
await page.getByTestId('cust-phone').fill('0827247272');
await page.getByTestId('cust-email').click();
await page.getByTestId('cust-email').fill('[jason@gmail.com](mailto:jason@gmail.com)');

// Submit the form and verify success confirmation message is displayed
await page.getByTestId('save-cust-btn').click();
await expect(page.getByText('Customer added')).toBeVisible();

});
