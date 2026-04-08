import {test, expect} from '@playwright/test'

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

test('admin checks analytics', async ({page})=>{
    await page.goto(`${baseURL}login.html`)
    await page.getByLabel('Username').fill('admin')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', {name: 'Sign In'}).click()
    await page.getByTestId('action-analytics').click()
    await expect (page.getByText('Business Analytics')).toBeVisible()
})