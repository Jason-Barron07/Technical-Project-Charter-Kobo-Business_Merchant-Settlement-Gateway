import {test, expect} from '../Fixture/athenticated-state-logged-in'

test('test', async ({loggedinState, page})=>{

    await loggedinState
    await page.getByLabel('')

})

