import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByRole('link', { name: 'Account' }).click();
  await page.getByTestId('login-username').click();
  await page.getByTestId('login-username').fill('Khangwenim');
  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').fill('Unarine1?');
  await page.getByTestId('remember-me').check();
  await page.getByTestId('login-submit').click();
  expect(page.getByTestId('login-error')).toHaveText('Invalid username or password');
});