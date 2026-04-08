import {test, expect} from '@playwright/test'

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

// Test case: Admin logs in, navigates to analytics dashboard, and verifies page content
test('Admin checks analytics dashboard', async ({ page }) => {


// Navigate to login page and authenticate using admin credentials
await page.goto(`${baseURL}login.html`)
await page.getByLabel('Username').fill('admin')
await page.getByLabel('Password').fill('password123')
await page.getByRole('button', { name: 'Sign In' }).click()

// Access analytics section from the application
await page.getByTestId('action-analytics').click()

// Verify that the analytics dashboard is displayed
await expect(page.getByText('Business Analytics')).toBeVisible()


})
