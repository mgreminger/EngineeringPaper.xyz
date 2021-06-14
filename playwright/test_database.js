import fs from 'fs';
import { PNG } from 'pngjs';

import { chromium, firefox } from 'playwright';
import pixelmatch from 'pixelmatch';
import expect from 'expect';

const headless = false;

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13;

let url;

if (process.argv.length > 2) {
  // use provided URL
  url = process.argv[2];
} else {
  // no URL provided, use default local host
  url = 'http://localhost:5000';
}


function compareImages(file1, file2) {
  const img1 = PNG.sync.read(fs.readFileSync(file1));
  const img2 = PNG.sync.read(fs.readFileSync(file2));
  const {width, height} = img1;
  const diff = new PNG({width, height});
  
  return pixelmatch(img1.data, img2.data, null, width, height, {threshold: 0.1});
}


[chromium, firefox].forEach(async (currentBrowser) => {

  const browser = await currentBrowser.launch({
    headless: headless,
    args: [],
    slowMo: 0
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  const startTime = Date.now();

  await page.goto(url);

  const width = 1000;
  const height = 1400;

  await page.setViewportSize({width:width, height:height});

  // Create a new document to test saving capability
  // Change title
  await page.click('text=New Sheet', {clickCount: 3});
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.type(':nth-match(textarea, 1)', 'x=3');

  await page.click('#add-documentation-cell');
  await page.type('#editor div', `Sheet 1`);

  await page.keyboard.press('Escape');

  await page.waitForSelector('text=Loading pyodide...', {state: 'detached', timeout: 60000});

  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl1 = new URL(await page.$eval('#shareable-link', el => el.value));
  console.log(`Sheet 1 hash: ${sheetUrl1.hash} (${currentBrowser.name()})`)
  
  await page.click('[aria-label="Close the modal"]');
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.screenshot({path: `${currentBrowser.name()}_screenshot1.png`, fullPage: true });

  // Try to save page again, should return the same link as before
  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl1Verify = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');

  expect(sheetUrl1.hash).toBe(sheetUrl1Verify.hash);

  // create and save a second document
  await page.click('#new-sheet');
  await page.click('text=New Sheet', {clickCount: 3});
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  await page.type(':nth-match(textarea, 1)', 'x=3');

  await page.click('#add-documentation-cell');
  await page.type('#editor div', `Sheet 2 is different!`);

  await page.keyboard.press('Escape');

  await page.waitForSelector('text=Loading pyodide...', {state: 'detached', timeout: 60000});

  await page.click('#upload-sheet');
  await page.click('text=Confirm');
  await page.waitForSelector('#shareable-link');
  const sheetUrl2 = new URL(await page.$eval('#shareable-link', el => el.value));
  await page.click('[aria-label="Close the modal"]');
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.screenshot({path: `${currentBrowser.name()}_screenshot2.png`, fullPage: true });

  // reaload the first document through a hash update
  await page.evaluate(hash => window.location.hash = hash, sheetUrl1.hash);
  await page.waitForSelector('text=Retrieving Sheet', {state: 'detached'});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({path: `${currentBrowser.name()}_screenshot1_check.png`, fullPage: true });

  expect(compareImages(`${currentBrowser.name()}_screenshot1.png`, `${currentBrowser.name()}_screenshot1_check.png`)).toEqual(0);


  // reload the second document through a page reload
  await page.goto(`${url}/${sheetUrl2.hash}`);
  await page.reload();
  await page.waitForSelector('text=Loading pyodide...', {state: 'detached', timeout: 60000});
  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({path: `${currentBrowser.name()}_screenshot2_check.png`, fullPage: true });

  expect(compareImages(`${currentBrowser.name()}_screenshot2.png`, `${currentBrowser.name()}_screenshot2_check.png`)).toEqual(0);

  console.log(`Elapsed time (${currentBrowser.name()}): ${(Date.now()-startTime)/1000} seconds`);

  // await page.pause();

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
});