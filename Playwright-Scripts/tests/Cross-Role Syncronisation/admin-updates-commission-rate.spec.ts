import { test, expect } from '@playwright/test';

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

// Test case: Admin updates the commission rate and verifies successful save
test('Admin updates commission rate', async ({ page }) => {

// Navigate to application and open settings page
await page.goto(`${baseURL}`)
await page.getByLabel('Main navigation').getByRole('link', { name: 'Settings' }).click();

// Update commission percentage and save changes
await page.getByTestId('set-commission').fill('2');
await page.getByTestId('save-profile').click();

// Verify success message is displayed
await expect(page.getByTestId('profile-saved')).toBeVisible();

});
