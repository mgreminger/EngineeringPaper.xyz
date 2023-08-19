import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import { complex } from 'mathjs';

export const pyodideLoadTimeout = 100000;

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
export const precision = 13; 

import pixelmatch from 'pixelmatch';

export const screenshotDir = "./tests/images";

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

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  page.forceDeleteCell = async function (index) {
    await this.evaluate((index) => window.forceDeleteCell(index), index);
    await this.waitForTimeout(200);
  }

  // reducing animations speeds up tests
  await page.emulateMedia( { reducedMotion: "reduce" } );

  await page.goto('/');

  await page.locator('text=Accept').click();

  // need to delete empty math cell so that there is not an error
  // the beforeEach hook will add it back
  await page.forceDeleteCell(0);

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: pyodideLoadTimeout });

  return page;
}


export async function newSheet(page) {
  // will create a new sheet to clear contents
  await page.evaluate(() => window.forceLoadBlankSheet());
}


export function complexLatex(input) {
  const cleanedInput = input.replace('\\cdot','').replace(/^=/, '').replaceAll(' ', '');
  return complex(cleanedInput);
}


export function parseLatexFloat(input) {
  input = input.replace('\\times', '').replace(/^=/, '').replace('10^{', 'e').replace('}', '').replaceAll(' ', '');
  return Number(input);
}