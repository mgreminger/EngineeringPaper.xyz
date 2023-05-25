import { test, expect } from '@playwright/test';

import { precision, pyodideLoadTimeout, screenshotDir, compareImages, parseLatexFloat } from './utility.mjs';


test('Test local file save and open', async ({ page, browserName }) => {
  test.skip(browserName === "chromium", "Playwright does not currently support the File System Access API");

  page.forceDeleteCell = async function (index) {
    await this.evaluate((index) => window.forceDeleteCell(index), index);
    await this.waitForTimeout(200);
  }

  // retrieve a previously saved document from database and check screenshot
  await page.goto('/7e84f956bd114cceb8cd0e');

  const width = 1200;
  const height = 2000;

  await page.setViewportSize({ width: width, height: height });

  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});
  await page.locator('text=Accept').click();
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  let content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(74, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('in');

  // save 
  await page.locator("h1 >> text=Test File Save").click();
  await page.keyboard.press('Escape'); // unselect all cells
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot_file_open_save.png`, fullPage: false });

  // save the sheet, need to use download event to get the file path that the browser uses
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#save-sheet').click();
  const download = await downloadPromise;
  const path = await download.path();

  // open blank sheet to clear contents
  await page.evaluate(() => window.forceLoadBlankSheet());

  // open the sheet that was just saved
  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(path);
  });
  await page.locator('#open-sheet').click();

  await page.locator('h3 >> text=Opening File').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached' });

  // make sure equations still evaluate
  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(74, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('in');

  // Take second screenshot to make sure nothing changed
  // Click title to make sure mouse is not hovering over file open button
  await page.locator("h1 >> text=Test File Save").click();
  await page.keyboard.press('Escape'); // unselect all cells
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot_file_open_save_check.png`, fullPage: false });

  expect(compareImages(`${browserName}_screenshot_file_open_save.png`, `${browserName}_screenshot_file_open_save_check.png`)).toEqual(0);

  // Attempt to open an image file to make sure there is not a crash and that there is an error message shown
  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(`${screenshotDir}/${browserName}_screenshot_file_open_save_check.png`);
  });
  await page.locator('#open-sheet').click();
  await page.locator('text=Error parsing input file').waitFor({timeout: 5000});
  await page.keyboard.press('Escape');

  // test inserting sheet that was just saved into a blank sheet
  await page.evaluate(() => window.forceLoadBlankSheet());
  await page.forceDeleteCell(0);

  await page.locator('#insert-sheet').click();
  await page.locator('text=Select by File').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(path);
  });
  await page.locator('text=click to select').click();

  await page.locator('h3 >> text=Opening File').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-0').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(74, precision);
  content = await page.locator('#result-units-0').textContent();
  expect(content).toBe('in');

});


test('Repeated open failure bug', async ({ page, browserName }) => {
  test.skip(browserName === "chromium", "Playwright does not currently support the File System Access API");

  await page.goto('/');
  await page.locator('text=Accept').click();

  // open the sheet that causes the error
  const path = "tests/test_sheet.epxyz";
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(path);
  });
  await page.locator('#open-sheet').click();

  await page.locator('h3 >> text=Opening File').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  let content = await page.locator('#result-value-17').textContent();
  expect(parseLatexFloat(content)).toBeCloseTo(5+1/3, precision);
  content = await page.locator('#result-units-17').textContent();
  expect(content).toBe('MPa');

  // reopen the sheet
  await page.locator('#open-sheet').click();
  await page.locator('h3 >> text=Opening File').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached' });

  content = await page.locator('#result-value-17').textContent({timeout: 5000});
  expect(parseLatexFloat(content)).toBeCloseTo(5+1/3, precision);
  content = await page.locator('#result-units-17').textContent();
  expect(content).toBe('MPa');

});


test('Test opening file with results and syntax error', async ({ page, browserName }) => {
  test.skip(browserName === "chromium", "Playwright does not currently support the File System Access API");

  await page.goto('/');
  await page.locator('text=Accept').click();

  // open the sheet that causes the error
  const path = "tests/test_sheet_parsing_error.epxyz";
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(path);
  });
  await page.locator('#open-sheet').click();

  await page.locator('h3 >> text=Opening File').waitFor({state: 'detached', timeout: 5000});

  // ensure that result is not displayed even though it is in file
  await page.locator('#result-value-1').waitFor({state: "detached", timeout: 1000});

});


test('Test clearing results on valid input after page initial load form file', async ({ page, browserName }) => {
  test.skip(browserName === "chromium", "Playwright does not currently support the File System Access API");

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');

  await page.locator('text=Accept').click();

  // open the sheet that causes the error
  const path = "tests/test_sheet_with_results.epxyz";
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles(path);
  });
  await page.locator('#open-sheet').click();

  await page.locator('h3 >> text=Opening File').waitFor({state: 'detached', timeout: 5000});

  // wait for results from file to appear
  await page.locator('#result-value-0').waitFor({state: "attached", timeout: 1000});

  // change value of initial cell to new valid content, results should be cleared
  await page.setLatex(0, '1=');

  // ensure that result is not displayed even though it is in file
  await page.locator('#result-value-0').waitFor({state: "detached", timeout: 1000});

});

