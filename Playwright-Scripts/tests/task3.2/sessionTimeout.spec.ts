import { test, expect } from '@playwright/test';

test('Action after session timeout', async ({ page }) => {
    await page.goto('https://quality-engineering-labs.vercel.app/');

  // Simulate timeout
  await page.context().clearCookies();

  await page.reload();

  await expect(page).toHaveURL('https://quality-engineering-labs.vercel.app/login.html');
});

// Note: The above test simulates a session timeout by clearing cookies and reloading the page, then checks if the user is redirected to the login page.
// The system is not redirecting to the login page after simulating a session timeout. This could be due to how the application handles session management or the specific implementation of the timeout mechanism.