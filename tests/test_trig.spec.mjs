import { test, expect } from '@playwright/test';
import { complex, cot, pi, sqrt, tan, cos} from 'mathjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

test('Test trigonometric functions', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // test trigonometric functions
  await page.type(':nth-match(textarea, 1)', '\\cos(1)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(0.540302305868139717400, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '\\sin(30[degrees])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(0.5, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '\\sin(1[radians])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(0.84147098480789650665, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', '\\tan(45[degrees])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', '\\csc(1[sec])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-4');
  expect(content).toBe('Dimension Error');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 'sin(1)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-5');
  expect(parseFloat(content)).toBeCloseTo(0.841470984807896506652502321630, precision);

});


test('Test cot, deg conversion with trig functions, and precidence with parens', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`N=34`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`P=12.7\left[mm\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`P\cdot \left(\cot \left(\frac{180\left[deg\right]}{N}\right)-1\right)-.762\left[mm\right]=\left[mm\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`P\cdot \left(0.6+\cot \left(\frac{180\left[deg\right]}{N}\right)\right)=\left[mm\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(12.7*(cot(pi/34)-1)-.762, precision-2);
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(12.7*(0.6 + cot(pi/34)), precision-2);

});


test('Test inverse trig functions', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // check that inverse trig functions only accept unitless input
  await page.setLatex(0, String.raw`arcsin\left(5\left[meters\right]\right)=`);

  // make sure units errors are caught
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`arccos\left(.1+.2\left[m\right]\right)=`);

  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`arctan\left(1\right)=\left[deg\right]`);

  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`\arcsin\left(-\frac{\sqrt{3}\cdot 1\left[m\right]}{2000\left[mm\right]}\right)=`);

  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`\arccos\left(\frac{1\left[mile\right]}{2\left[mile\right]}+0\right)=\left[deg\right]`);

  await page.waitForSelector('text=Loading Pyodide...', {state: 'detached', timeout: 100000});
  await page.waitForSelector('text=Updating...', {state: 'detached', timeout: 100000});

  // make sure dimension errors are indicated
   await page.locator('#cell-0 >> text=Dimension Error').waitFor({state: 'attached', timeout: 100});
   await page.locator('#cell-1 >> text=Dimension Error').waitFor({state: 'attached', timeout: 100});


  let content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(45, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('deg');

  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(-pi/3, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('rad');

  content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo(60, precision-1);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('deg');

});