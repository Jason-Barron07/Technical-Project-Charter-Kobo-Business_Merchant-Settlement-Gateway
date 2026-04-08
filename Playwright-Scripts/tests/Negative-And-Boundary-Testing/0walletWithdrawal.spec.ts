import { test, expect } from '@playwright/test';

test('Test withdrawal with zero amount', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'Wallet' }).click();
  await page.getByTestId('withdraw-btn').click();
  await page.getByTestId('withdraw-bank').selectOption('FNB');
  await page.getByTestId('withdraw-account').click();
  await page.getByTestId('withdraw-account').fill('621285632');
  await page.getByTestId('withdraw-amount').click();
  await page.getByTestId('withdraw-amount').fill('0');
  await page.getByTestId('process-withdraw').click();
  await expect(page.getByTestId('withdraw-result')).toHaveText('Minimum withdrawal is R50');
});