import { test, expect } from '@playwright/test';

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

// Test case: Admin updates the owner name and verifies successful save
test('Admin updates owner name', async ({ page }) => {

// Navigate to application and access settings page
await page.goto(`${baseURL}`)
await page.getByLabel('Main navigation').getByRole('link', { name: 'Settings' }).click();

// Update owner name and save changes
await page.getByTestId('set-owner').fill('Jason Barron');
await page.getByTestId('save-profile').click();

// Verify success confirmation is displayed
await expect(page.getByTestId('profile-saved')).toBeVisible();

});
