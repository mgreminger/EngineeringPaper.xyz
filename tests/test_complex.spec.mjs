import { test, expect } from '@playwright/test';
import { complex, cot, pi, sqrt, tan, cos} from 'mathjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

test('Imaginary number regression test for #69', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.locator('textarea').nth(0).type('test=1+i');
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`i^{2}\cdot test=`);


  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 100000});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe('-1.0 - i');  

});


test.skip('Test imaginary number unit conversions', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.locator('textarea').nth(0).type('test=1+i');
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`i^{2}\cdot test=`);


  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 100000});

  let content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(2.0, precision);  
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

});



test.skip('Test imaginary number functions', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.locator('textarea').nth(0).type('test=1+i');
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`i^{2}\cdot test=`);


  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 100000});

  let content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(2.0, precision);  
  content = await page.textContent('#result-units-2');
  expect(content).toBe('m');
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(10.0, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m');

});