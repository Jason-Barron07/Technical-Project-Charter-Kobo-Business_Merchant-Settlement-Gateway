import { test, expect } from '@playwright/test';

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

// Test case: Admin updates the tax rate and verifies successful save
test('Admin updates tax rate', async ({ page }) => {

// Navigate to application and open settings page
await page.goto(`${baseURL}`)
await page.getByLabel('Main navigation').getByRole('link', { name: 'Settings' }).click();

// Update tax value and apply changes
await page.getByTestId('set-tax').fill('16');
await page.getByTestId('save-profile').click();

// Verify update confirmation is visible
await expect(page.getByTestId('profile-saved')).toBeVisible();

});
