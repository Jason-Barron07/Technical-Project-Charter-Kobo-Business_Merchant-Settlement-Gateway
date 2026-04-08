import {test, expect} from '../../Fixture/athenticated-state-logged-in'

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

// Test case: Admin selects card payment method and successfully performs a wallet top-up
test('Admin tops up wallet using card method', async ({ loggedinState, page }) => {


// Navigate to wallet page (admin already authenticated via fixture)
await page.goto(`${baseURL}wallet.html`)

// Open the top-up interface and select the "Card" payment method via UI
await page.getByTestId('topup-btn').click()
await page.locator('label.wallet-method-card:has-text("Card")').click()

// Verify that the card payment option is selected (radio input is checked)
await expect(page.getByTestId('method-card')).toBeChecked()

// Process the wallet top-up and confirm that the result is displayed
await page.getByTestId('process-topup').click()
await expect(page.getByTestId('topup-result')).toBeVisible()


})

