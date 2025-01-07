import { test, expect } from '@playwright/test';

import { precision, pyodideLoadTimeout, compareImages, parseLatexFloat } from './utility.mjs';

test('Test handling of symbolic expression error', async ({ page, browserName }) => {

  await page.goto('/AqVAmzYYfKrQkGZ8BvUC7T');
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached'});

  await page.locator("text=Accept").click();

  await page.locator('text=Updating...').waitFor({state: 'detached', timeout: pyodideLoadTimeout});

  let content = await page.locator('#result-value-21').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(57168.5056551697, precision);
});
