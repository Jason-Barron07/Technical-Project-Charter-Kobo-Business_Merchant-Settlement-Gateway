import { test, expect } from '@playwright/test';

test('Admin changes account PIN successfully', async ({ page }) => {

// Navigate to settings page and access security tab
await page.goto('https://quality-engineering-labs.vercel.app/settings.html');
await page.getByTestId('tab-security').click();

// Enter current PIN and provide new PIN details
await page.getByTestId('set-current-pin').click();
await page.getByTestId('set-current-pin').fill('password123');
await page.getByTestId('set-new-pin').click();
await page.getByTestId('set-new-pin').fill('password1234');
await page.getByTestId('set-confirm-pin').click();
await page.getByTestId('set-confirm-pin').fill('password1234');

// Submit PIN change request and verify confirmation message is displayed
await page.getByTestId('change-pin').click();
await expect(page.getByTestId('pin-result')).toBeVisible();

});
