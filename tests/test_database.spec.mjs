import { test, expect } from '@playwright/test';
import { compareImages } from './utility.mjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13;

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

  await page.type(':nth-match(textarea, 1)', 'x=3');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'cos(x)=');

  await page.click('#add-documentation-cell');
  await page.type('div.editor div', `Sheet 1\nπ`);
  await page.press('div.editor div', 'Enter');

  await page.click('.ql-image'); // filechooser callback will handle selecting the image

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });

  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl1 = new URL(await page.$eval('#shareable-link', el => el.value));

  await page.click('[aria-label="Close the modal"]');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400); // time it takes quill toolbar to disappear
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.screenshot({ path: `./tests/images/${browserName}_screenshot1.png`, fullPage: true });

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
  await page.type(':nth-match(textarea, 1)', 'y=x');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'sigma=-x');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'y(-1<=x<=1)=');
  await page.locator('#add-row-3').click();
  await page.type(':nth-match(textarea, 4)', 'sigma(-1<x<1)=');

  // add plot with 1 curve and units
  await page.click('#add-documentation-cell');
  await page.type(':nth-match(p, 2)', 'Plot with 2 curves and units');

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(-1\left[inch\right]\le x\le 1\left[inch\right]\right)=\left[inch\right]`);
  await page.locator('#add-row-5').click();
  await page.locator('#plot-expression-5-1 textarea').type('sigma(-1[inch]<=x<=1[inch])=[m]');

  // switch to log-log plot
  await page.locator('text=log x').nth(1).click();
  await page.locator('text=log y').nth(1).click();

  await page.keyboard.press('Escape');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });

  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl2 = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');
  await page.evaluate(() => window.scrollTo(0, 0));
  
  await page.locator('h1 >> text=Title for testing purposes only').click(); // make sure mouse is not over plot otherwise toolbar appears
  await page.keyboard.press('Escape'); // unselect title

  await page.screenshot({ path: `./tests/images/${browserName}_screenshot2.png`, fullPage: true });

  // reaload the first document through a hash update
  await page.evaluate(hash => window.history.pushState(null, null, hash), sheetUrl1.pathname);
  await page.evaluate(() => window.history.pushState(null, null, 'blah'));
  await page.evaluate(() => window.history.back());
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.history.back());
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.history.forward());
  await page.waitForTimeout(1000);

  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `./tests/images/${browserName}_screenshot1_check.png`, fullPage: true });

  expect(compareImages(`${browserName}_screenshot1.png`, `${browserName}_screenshot1_check.png`)).toEqual(0);


  // reload the second document through a page reload (use a hash this time to make sure that works as well for old links)
  await page.goto(`/#${sheetUrl2.pathname.slice(1)}`);
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500); // keyboard takes .4 sec to dissapear
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `./tests/images/${browserName}_screenshot2_check.png`, fullPage: true });

  expect(compareImages(`${browserName}_screenshot2.png`, `${browserName}_screenshot2_check.png`)).toEqual(0);
});


test('Test database consistency', async ({ page, browserName }) => {
  await page.goto('/');

  const width = 1300;
  const height = 6000;

  await page.setViewportSize({ width: width, height: height });

  // retrieve a previously saved document from database and check screenshot
  await page.goto('/2kftdqNYyiaqAEyhXboNZF');
  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `./tests/images/${browserName}_screenshot_reference_check.png`, fullPage: true });

  expect(compareImages(`${browserName}_reference.png`, `${browserName}_screenshot_reference_check.png`)).toEqual(0);
});