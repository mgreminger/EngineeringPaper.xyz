import { test, expect } from '@playwright/test';

import { precision, pyodideLoadTimeout, screenshotDir, compareImages } from './utility.mjs';


test('Test local file save and open', async ({ page, browserName }) => {

  // retrieve a previously saved document from database and check screenshot
  await page.goto('/7e84f956bd114cceb8cd0e');

  const width = 1200;
  const height = 2000;

  await page.setViewportSize({ width: width, height: height });

  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});
  await page.locator('text=Accept').click();
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  let content = await page.locator('#result-value-0').textContent();
  expect(parseFloat(content)).toBeCloseTo(74, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('in');

  // save 
  await page.locator("h1 >> text=Test File Save").click();
  await page.keyboard.press('Escape'); // unselect all cells
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot_file_open_save.png`, fullPage: true });

  // save the sheet, need to use download event to get the file path that the browser uses
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#save-sheet').click();
  const download = await downloadPromise;
  const path = await download.path();

  // open blank sheet to clear contents
  await page.evaluate(() => window.forceLoadBlankSheet());

  // open the sheet that was just saved
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(path);
  });
  await page.locator('#open-sheet').click();

  await page.locator('h3 >> text=Opening File').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached' });

  // make sure equations still evaluate
  content = await page.locator('#result-value-0').textContent();
  expect(parseFloat(content)).toBeCloseTo(74, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('in');

  // Take second screenshot to make sure nothing changed
  // Click title to make sure mouse is not hovering over file open button
  await page.locator("h1 >> text=Test File Save").click();
  await page.keyboard.press('Escape'); // unselect all cells
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot_file_open_save_check.png`, fullPage: true });

  expect(compareImages(`${browserName}_screenshot_file_open_save.png`, `${browserName}_screenshot_file_open_save_check.png`)).toEqual(0);
});