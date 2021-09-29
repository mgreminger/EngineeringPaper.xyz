import fs from 'fs';
import { PNG } from 'pngjs';

import { chromium, firefox } from 'playwright';
import pixelmatch from 'pixelmatch';
import expect from 'expect';
import fetch from 'node-fetch';


const headless = false;

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13;

let url;
let apiUrl;

if (process.argv.length > 2) {
  // use provided URL and public api
  url = process.argv[2];
  apiUrl = "https://engineeringpaper.herokuapp.com"; 
} else {
  // no URL provided, use default local host
  url = 'http://localhost:5000';
  apiUrl = "http://127.0.0.1:8000";
}

const browserList = [chromium, firefox]
await runTest();
await cleanup();


function compareImages(file1, file2) {
  const img1 = PNG.sync.read(fs.readFileSync(file1));
  const img2 = PNG.sync.read(fs.readFileSync(file2));
  const {width, height} = img1;
  const diff = new PNG({width, height});
  
  return pixelmatch(img1.data, img2.data, null, width, height, {threshold: 0.1});
}

async function runTest() {
  await Promise.all(browserList.map(async (currentBrowser) => {

    const browser = await currentBrowser.launch({
      headless: headless,
      args: [],
      slowMo: 0
    });
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles('./image_small.jpg');
    });

    page.setLatex = async function (cellIndex, latex) {
      await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                          [cellIndex, latex]);
    }

    const startTime = Date.now();

    await page.goto(url);

    const width = 1300;
    const height = 2000;

    await page.setViewportSize({width:width, height:height});

    // Create a new document to test saving capability
    await page.keyboard.press('Escape');
    await page.click('#new-sheet');

    // Change title
    await page.click('text=New Sheet', {clickCount: 3});
    await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

    await page.type(':nth-match(textarea, 1)', 'x=3');
    await page.click('#add-math-cell');
    await page.type(':nth-match(textarea, 2)', 'cos(x)=');

    await page.click('#add-documentation-cell');
    await page.type('#editor div', `Sheet 1\nπ`);
    await page.press('#editor div', 'Enter');

    await page.click('.ql-image'); // filechooser callback will handle selecting the image

    await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

    await page.click('#upload-sheet');
    await page.click('text=Confirm');
    await page.waitForSelector('#shareable-link');
    const sheetUrl1 = new URL(await page.$eval('#shareable-link', el => el.value));
    console.log(`Sheet 1 hash: ${sheetUrl1.hash} (${currentBrowser.name()})`)
    
    await page.click('[aria-label="Close the modal"]');
    await page.keyboard.press('Escape');
    await page.evaluate(() => window.scrollTo(0, 0));

    await page.screenshot({path: `${currentBrowser.name()}_screenshot1.png`, fullPage: true });

    // Try to save page again, should return the same link as before
    await page.click('#upload-sheet');
    await page.click('text=Confirm');
    await page.waitForSelector('#shareable-link');
    const sheetUrl1Verify = new URL(await page.$eval('#shareable-link', el => el.value));
    await page.click('[aria-label="Close the modal"]');

    expect(sheetUrl1.hash).toBe(sheetUrl1Verify.hash);

    // create and save a second document that has plots
    await page.click('#new-sheet');
    await page.click('text=New Sheet', {clickCount: 3});
    await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

    // test plot without units
    await page.click('#add-documentation-cell');
    await page.type('#editor div', 'Plot with 2 curves and no units');
    await page.type(':nth-match(textarea, 1)', 'y=x');
    await page.click('#add-math-cell');
    await page.type(':nth-match(textarea, 2)', 'sigma=-x');
    await page.click('#add-math-cell');
    await page.type(':nth-match(textarea, 3)', 'y(-1<=x<=1)=');
    await page.type(':nth-match(textarea, 4)', 'sigma(-1<x<1)=');

    // add plot with 1 curve and units
    await page.click('#add-documentation-cell');
    await page.type(':nth-match(p, 2)', 'Plot with 2 curves and units');

    await page.click('#add-math-cell');
    await page.setLatex(5, String.raw`y\left(-1\left[inch\right]\le x\le 1\left[inch\right]\right)=\left[inch\right]`);
    await page.type(':nth-match(textarea, 7)', 'sigma(-1[inch]<=x<=1[inch])=[m]');
    

    await page.keyboard.press('Escape');

    await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

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
    await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});
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
  }));
}

async function cleanup() {
  // delete test sheets that have been placed into the database
  let responseObject;
  const response = await fetch(`${apiUrl}/delete_test_sheets`, {method: "PUT"});

  if (response.ok) {
    responseObject = await response.json();
  } else {
    throw new Error(`Unexpected response status ${response.status} when attempting to delete sheets`);
  }

  expect(responseObject.numRowsDeleted).toBe(2*browserList.length);
}


