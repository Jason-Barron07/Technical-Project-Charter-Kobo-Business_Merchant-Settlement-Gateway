import {test, expect} from '@playwright/test'

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

test('admin checks analytics', async ({page})=>{
    await page.goto(`${baseURL}login.html`)
    await page.getByTestId('action-analytics').click()
    await expect (page).toHaveTitle('Business Analytics')
})