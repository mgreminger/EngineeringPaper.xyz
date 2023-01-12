import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

export const pyodideLoadTimeout = 150000;

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
export const precision = 13; 

import pixelmatch from 'pixelmatch';

const screenshotDir = "./tests/images";

export function compareImages(file1, file2) {
  const img1 = PNG.sync.read(fs.readFileSync(path.join(screenshotDir, file1)));
  const img2 = PNG.sync.read(fs.readFileSync(path.join(screenshotDir, file2)));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

  const diffOutBuffer = PNG.sync.write(diff);
  const file1Path = path.parse(file1);
  fs.writeFileSync(path.join(screenshotDir, `${file1Path.name}_diff.png`), diffOutBuffer);

  return numDiffPixels;
}


export async function loadPyodide(browser, page) {
  page = await browser.newPage();

  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  // reducing animations speeds up tests
  await page.emulateMedia( { reducedMotion: "reduce" } );

  await page.goto('/');

  await page.locator('text=Accept').click();

  // need to delete empty math cell so that there is not an error
  // the beforeEach hook will add it back
  await page.locator('#delete-0').click();

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  return page;
}


export async function newSheet(page) {
  // will create a new sheet to clear contents
  await page.evaluate(() => window.forceLoadBlankSheet());
}