import { test, expect } from '@playwright/test';

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

// Test case: Admin updates the business/store name and verifies successful save
test('Admin updates store name', async ({ page }) => {

// Navigate to application and access settings page (admin already authenticated)
await page.goto(`${baseURL}`)
await page.getByLabel('Main navigation').getByRole('link', { name: 'Settings' }).click();

// Update store name and persist changes
await page.getByTestId('set-store-name').fill('My Store');
await page.getByTestId('save-profile').click();

// Verify confirmation message indicating successful update
await expect(page.getByTestId('profile-saved')).toBeVisible();

});
