import {test as base, expect, Page} from '@playwright/test'
 
type myFixture = {
    loggedinState: Page;
}
 
export const test = base.extend<myFixture>({loggedinState: async({page},use)=>{

    await page.goto('https://quality-engineering-labs.vercel.app/login.html')
    await page.getByTestId('login-username').fill('admin')
    await page.getByTestId('login-password').fill('password123')
    await page.getByTestId('login-submit').click()
    await expect(page.getByTestId('dashboard-section')).toBeVisible()
    await use(page)

}})

export {expect}