import { test, expect } from '@playwright/test';


// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 


test('Test min/max functions', async ({ page, browserName }) => {
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex), 
                        [cellIndex, latex]);
  }

  await page.goto('/');

  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();

  // Change title
  await page.locator('textarea').nth(0).type('x=');
  await page.locator('text=min').click();
  await page.locator('textarea').nth(0).type('s,t,-1[mm/s');
  await page.locator('textarea').nth(0).press('ArrowRight');
  await page.locator('textarea').nth(0).type(']');

  await page.locator('#add-math-cell').click();
  await page.locator('text=max').click();
  await page.locator('textarea').nth(1).type('-y/z');
  await page.locator('textarea').nth(1).press('ArrowRight');
  await page.locator('textarea').nth(1).type(',x');
  await page.locator('textarea').nth(1).press('ArrowRight');
  await page.locator('textarea').nth(1).type('=');

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, 'y=10\\left[mm\\right]');

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, 'z=5\\left[sec\\right]');

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, 's=2\\left[\\frac{m}{sec}\\right]');

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, 't=2\\left[\\frac{miles}{hour}\\right]');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  let content = await page.locator('#result-value-1').textContent();
  expect(parseFloat(content)).toBeCloseTo(-.001, precision);
  content = await page.locator('#result-units-1').textContent();
  expect(content).toBe('m^1*sec^-1');

  await page.setLatex(2, 'y=-10\\left[mm\\right]');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  content = await page.locator('#result-value-1').textContent();
  expect(parseFloat(content)).toBeCloseTo(.002, precision);

//   await page.pause();

});