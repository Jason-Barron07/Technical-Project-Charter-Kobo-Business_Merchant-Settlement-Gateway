import { test, expect } from '@playwright/test';

test('admin user can log in successfully', async ({ page }) => {

  // Navigate to login page
  await page.goto('https://quality-engineering-labs.vercel.app/login.html', {
    waitUntil: 'domcontentloaded'
  });

  // Enter credentials
  await page.getByTestId('login-username').fill('admin');
  await page.getByTestId('login-password').fill('password123');

  // Submit login form
  await page.getByTestId('login-submit').click();

  // Assertions
  await expect(page).toHaveURL('https://quality-engineering-labs.vercel.app/login.html');

});
