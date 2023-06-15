import { test, expect } from '@playwright/test';
import { cos } from 'mathjs';


import { precision, pyodideLoadTimeout, screenshotDir, compareImages, parseLatexFloat } from './utility.mjs';

test('Test database', async ({ page, browserName }) => {
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/images/image_small.jpg');
  });

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');

  const width = 1300;
  const height = 3000;

  await page.setViewportSize({ width: width, height: height });

  // Create a new document to test saving capability
  await page.locator("text=Accept").click();

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.type(':nth-match(math-field.editable, 1)', 'x=3');
  await page.click('#add-math-cell');

  // add inline documentation to second math field
  await page.locator('math-field.editable').nth(1).click();
  await page.locator('text=ABC').nth(0).click();
  await page.locator('text=Comment').click(); // enter comment mode
  await page.locator('math-field.editable').nth(1).type('Inline Documentation');
  await page.locator('text=Space').click();
  await page.locator('math-field.editable').nth(1).type('Test:');
  await page.locator('text=Comment').click(); // exit comment mode
  await page.locator('math-field.editable').nth(1).type('  cos(x)=');

  // make sure inline documentation appears correctly
  await page.locator('text=Inline Documentation Test:').waitFor({state: "attached", timeout: 500});

  await page.click('#add-documentation-cell');
  await page.type('div.editor div', `Sheet 1\nπ`);
  await page.press('div.editor div', 'Enter');

  await page.click('.ql-image'); // filechooser callback will handle selecting the image

  // Insert blank math cell between first and second cell.
  // Ensures that blank cells don't affect sheet solve and that 
  // they are saved an retrieved from the database corectly.
  await page.locator('#add-math-cell-1').click();

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  // check query result in cell 2
  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(cos(3), precision);

  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl1 = new URL(await page.$eval('#shareable-link', el => el.value));

  await page.click('[aria-label="Close the modal"]');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400); // time it takes quill toolbar to disappear
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot1.png`, fullPage: true });

  // Try to save page again, should return the same link as before
  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl1Verify = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');

  expect(sheetUrl1.pathname).toBe(sheetUrl1Verify.pathname);

  // create and save a second document that has plots
  await page.click('#new-sheet');
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.click('#add-documentation-cell');
  await page.type('div.editor div', 'Plot with 2 curves and no units');
  await page.type(':nth-match(math-field.editable, 1)', 'y=x');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', 'sigma=-x');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', 'y(-1<=x<=1)=');
  await page.locator('#add-row-3').click();
  await page.type(':nth-match(math-field.editable, 4)', 'sigma(-1<x<1)=');

  // add plot with 1 curve and units
  await page.click('#add-documentation-cell');
  await page.type(':nth-match(p, 2)', 'Plot with 2 curves and units');

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(-1\left[inch\right]\le x\le 1\left[inch\right]\right)=\left[inch\right]`);
  await page.locator('#add-row-5').click();
  await page.locator('#plot-expression-5-1 math-field.editable').type('sigma(-1[inch]<=x<=1[inch])=[m]');

  // switch to log-log plot
  await page.locator('text=log x').nth(1).click();
  await page.locator('text=log y').nth(1).click();

  await page.keyboard.press('Escape');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl2 = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');
  await page.evaluate(() => window.scrollTo(0, 0));
  
  await page.locator('h1 >> text=Title for testing purposes only').click(); // make sure mouse is not over plot otherwise toolbar appears
  await page.keyboard.press('Escape'); // unselect title
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot2.png`, fullPage: true });

  // reload the first document through a hash update
  await page.evaluate(hash => {
    window.history.pushState(null, "", hash);
    window.dispatchEvent(new PopStateEvent('popstate', null));
  }, sheetUrl1.pathname);
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});  
  await page.waitForTimeout(500); // navigating is flaky for chromium and webkit

  await page.evaluate(() => window.history.back());
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});
  await page.waitForTimeout(500); // navigating is flaky for chromium and webkit

  // forward again to the first document
  await page.evaluate(() => window.history.forward());
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot1_check.png`, fullPage: true });

  expect(compareImages(`${browserName}_screenshot1.png`, `${browserName}_screenshot1_check.png`)).toEqual(0);

  // attempt to load a document that doesn't exist
  await page.goto('/CUsUSuwHkHzNyButyCHEnz');
  await page.locator('text=Error retrieving sheet').waitFor({timeout: 5000});

  // reload the second document through a page reload (use a hash this time to make sure that works as well for old links)
  await page.goto(`/#${sheetUrl2.pathname.slice(1)}`);
  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot2_check.png`, fullPage: true });

  if (browserName === "firefox") {
    // firefox has issues rendering latex for the legend labels
    expect(compareImages(`${browserName}_screenshot2.png`, `${browserName}_screenshot2_check.png`)).toBeLessThan(50);
  } else {
    expect(compareImages(`${browserName}_screenshot2.png`, `${browserName}_screenshot2_check.png`)).toEqual(0);
  }
});


test('Test database consistency', async ({ page, browserName }) => {

  // retrieve a previously saved document from database and check screenshot
  await page.goto('/2kftdqNYyiaqAEyhXboNZF');

  const width = 1300;
  const height = 6000;

  await page.setViewportSize({ width: width, height: height });

  await page.locator('h3 >> text=Retrieving Sheet').waitFor({state: 'detached', timeout: 5000});
  await page.locator('text=Accept').click();
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });
  await page.keyboard.press('Escape'); // unselect all cells
  await page.waitForTimeout(500); // keyboard takes .4 sec to disappear
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDir}/${browserName}_screenshot_reference_check.png`, fullPage: true });

  expect(compareImages(`${browserName}_reference.png`, `${browserName}_screenshot_reference_check.png`)).toEqual(0);
});