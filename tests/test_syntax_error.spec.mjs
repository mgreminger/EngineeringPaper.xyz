import { test, expect } from '@playwright/test';


test('Test syntax error Show Me button', async ({ page, browserName }) => {
  await page.goto('/');

  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();

  // add many empty math cells with syntax errors
  for (let i = 0; i < 20; i++) {
    await page.locator('textarea').nth(i).press('Enter');
  }

  // click the show me button to jump to first syntax error
  await page.locator('text=Show Me').click();

  // first cell should now be visible
  await expect(page.locator('button.bx--tooltip__trigger').nth(0)).toBeFocused({timeout: 500});

});