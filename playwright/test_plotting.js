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

    page.setLatex = async function (cellIndex, latex) {
      await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                          [cellIndex, latex]);
    }

    const startTime = Date.now();

    await page.goto(url);

    const width = 1000;
    const height = 1300;

    await page.setViewportSize({width:width, height:height});

    // Create a new document to test saving capability
    await page.keyboard.press('Escape');
    await page.click('#new-sheet');

    // Change title
    await page.click('text=New Sheet', {clickCount: 3});
    await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

    // make sure first empty cell has Invalid Syntax error
    await page.waitForSelector('button:has-text("Invalid Syntax")');

    // test plot without units
    await page.click('#add-documentation-cell');
    await page.type('#editor div', 'Plot with 2 curves and no units');
    await page.setLatex(0, String.raw`y=x^{2}`);
    await page.click('#add-math-cell');
    await page.type(':nth-match(textarea, 2)', 'z=-x');
    await page.click('#add-math-cell');
    await page.type(':nth-match(textarea, 3)', 'y(-1<=x<=1)=');
    await page.type(':nth-match(textarea, 4)', 'z(-1<x<1)=');

    // add plot with 1 curve and units
    await page.click('#add-documentation-cell');
    await page.type(':nth-match(p, 2)', 'Plot with 1 curve and units');

    await page.click('#add-math-cell');
    await page.setLatex(5, String.raw`y\left(-1\left[inch\right]\le x\le 1\left[inch\right]\right)=\left[inch^{2}\right]`);

    // add expressions with errors to plot cells to test error reporting
    await page.type(':nth-match(textarea, 7)', 'y(-1<=s<=1)=');
    await page.waitForSelector('button:has-text("Results of expression does not evaluate to numeric values")');
    for(let i = 0; i<12; i++) {
      await page.press(':nth-match(textarea, 7)', 'Backspace');
    }

    await page.type(':nth-match(textarea, 7)', 'y(-1<=x<=1)=');
    await page.waitForSelector('button:has-text("Units Mismatch")');
    for(let i = 0; i<12; i++) {
      await page.press(':nth-match(textarea, 7)', 'Backspace');
    }

    await page.type(':nth-match(textarea, 7)', 'y=');
    await page.waitForSelector('button:has-text("Not a Plot")');
    for(let i = 0; i<2; i++) {
      await page.press(':nth-match(textarea, 7)', 'Backspace');
    }

    await page.type(':nth-match(textarea, 7)', 'y(-s<x<s)=');
    await page.waitForSelector('button:has-text("Limits of plot range do not evaluate to a number")');
    for(let i = 0; i<10; i++) {
      await page.press(':nth-match(textarea, 7)', 'Backspace');
    }

    await page.type(':nth-match(textarea, 7)', 'y(1[inch]<x<1[sec])=');
    await page.waitForSelector('button:has-text("Units of the upper and lower range limit do not match")');
    for(let i = 0; i<20; i++) {
      await page.press(':nth-match(textarea, 7)', 'Backspace');
    }

    await page.type(':nth-match(textarea, 7)', 'y(-1[inch]<x<1[inch])=[sec]');
    await page.waitForSelector('button:has-text("Units Mismatch")');
    for(let i = 0; i<29; i++) {
      await page.press(':nth-match(textarea, 7)', 'Backspace');
    }

    await page.type(':nth-match(textarea, 7)', 'y(-1<x<1, -1<s<1)=');
    await page.waitForSelector('button:has-text("Only one range may be specified for plotting")');
    for(let i = 0; i<18; i++) {
      await page.press(':nth-match(textarea, 7)', 'Backspace');
    }


    await page.pause();

    
    
    
    


    await page.pause();


    console.log(`Elapsed time (${currentBrowser.name()}): ${(Date.now()-startTime)/1000} seconds`);

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


