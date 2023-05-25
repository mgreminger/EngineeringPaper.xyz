import { test, expect } from '@playwright/test';

import { precision, pyodideLoadTimeout } from './utility.mjs';

test('Test database', async ({ page, browserName }) => {
  await page.goto('/iframe_test.html');

  const frame = page.frame('ep-iframe');

  await frame.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  await frame.locator('#add-math-cell-0').click();
  await frame.locator('math-field.editable').nth(0).type('sigma_max');
  await frame.locator('math-field.editable').nth(0).press('Tab');
  await frame.locator('math-field.editable').nth(0).type('=');

  await frame.waitForSelector('.status-footer', { state: 'detached' });

  let content = await frame.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(5333333.33333333, precision);
});