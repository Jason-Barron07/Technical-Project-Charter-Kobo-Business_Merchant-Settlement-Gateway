// navigate to transaction ledger

import { test, expect } from '@playwright/test';

test('admin can view transactions', async ({ page }) => {
  await page.goto('https://quality-engineering-labs.vercel.app/transactions.html');

  await expect(page.getByText ('Merchant Transactions')).toBeVisible();

}

)