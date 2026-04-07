import {test, expect} from '../../Fixture/athenticated-state-logged-in'

const baseURL: string = 'https://quality-engineering-labs.vercel.app/'

test('test', async ({loggedinState, page})=>{

    await page.goto(`${baseURL}wallet.html`)
    await page.getByTestId('topup-btn').click()
    await page.getByTestId('method-card').isChecked()
    await page.getByTestId('process-topup').click()
    await expect(page.getByTestId('topup-result')).toBeVisible()
})

