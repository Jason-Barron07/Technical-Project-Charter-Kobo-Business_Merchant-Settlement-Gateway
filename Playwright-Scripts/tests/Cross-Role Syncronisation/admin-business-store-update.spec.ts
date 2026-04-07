// Import Playwright test utilities with authenticated admin session
import { test, expect } from '../../Fixture/athenticated-state-logged-in'

// Base URL of the application
const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

// Test case: Admin updates business profile information and verifies success
test('Admin updates business profile details', async ({ page }) => {


// Navigate to application (admin already authenticated via fixture)
await page.goto(`${baseURL}`)

// Access settings page and update business details
await page.getByLabel('Main navigation').getByRole('link', { name: 'Settings' }).click();
await page.getByTestId('set-store-name').fill('My Store');
await page.getByTestId('set-owner').fill('Jason Barron');
await page.getByTestId('set-tax').fill('16');
await page.getByTestId('set-commission').fill('2');

// Save changes and verify confirmation message is displayed
await page.getByTestId('save-profile').click();
await expect(page.getByTestId('profile-saved')).toBeVisible();

});


