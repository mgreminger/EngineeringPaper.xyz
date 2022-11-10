import { test, expect } from '@playwright/test';
import { complex, cot, pi, sqrt, tan, cos} from 'mathjs';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 


test('Imaginary numbers without units', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // test complex numbers
  await page.type(':nth-match(textarea, 1)', '2*\\sqrt -1');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '3+i^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '2+3*i=');

  await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

  let content = complex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(0, precision);
  expect(content.im).toBeCloseTo(2, precision);

  content = complex(await page.textContent('#result-value-1'));
  expect(content.re).toBeCloseTo(2, precision);
  expect(content.im).toBeCloseTo(0, precision);

  content = complex(await page.textContent('#result-value-2'));
  expect(content.re).toBeCloseTo(2, precision);
  expect(content.im).toBeCloseTo(3, precision);

});


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


  await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe('-1.0 - i');  

});


test('Test imaginary number unit conversions', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  await page.setLatex(0, String.raw`1\left[inch\right]-2\left[inch\right]\cdot i=\left[cm\right]`);
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\left(60+30\cdot i\right)\cdot 1\left[sec\right]=\left[min\right]`);
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`1000\left[J\right]\cdot i=\left[kJ\right]`);

  await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

  let content = complex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(2.54, precision);
  expect(content.im).toBeCloseTo(-5.08, precision);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('cm');

  content = complex(await page.textContent('#result-value-1'));
  expect(content.re).toBeCloseTo(1, precision);
  expect(content.im).toBeCloseTo(0.5, precision);  
  content = await page.textContent('#result-units-1');
  expect(content).toBe('min');

  content = complex(await page.textContent('#result-value-2'));
  expect(content.re).toBeCloseTo(0.0, precision);
  expect(content.im).toBeCloseTo(1.0, precision);  
  content = await page.textContent('#result-units-2');
  expect(content).toBe('kJ');

  // make sure unit inconsistencies cause error
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`1\left[in\right]+i=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});
  await page.locator('#cell-3 >> text=Dimension Error').waitFor({state: 'attached', timeout: 500});


  await page.setLatex(3, String.raw`1+i\cdot 1\left[inch\right]=`);
  await page.waitForSelector('.status-footer', {state: 'detached'});
  await page.locator('#cell-3 >> text=Dimension Error').waitFor({state: 'attached', timeout: 500});
  

  await page.setLatex(3, String.raw`1\left[inch\right]+i\cdot 1\left[inch\right]=\left[min\right]`);
  await page.waitForSelector('.status-footer', {state: 'detached'});
  await page.locator('#cell-3 >> text=Units Mismatch').waitFor({state: 'attached', timeout: 500});

});


test('Test angle function', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{angle}\left(1\left[inch\right]+\sqrt{3}\cdot 1\left[inch\right]\cdot i\right)=\left[deg\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{angle}\left(1-\sqrt{3}\cdot 1\cdot i\right)=\left[deg\right]`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{angle}\left(1-\sqrt{3}\cdot 1\left[inch\right]\cdot i\right)=\left[deg\right]`);

  await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 500});

  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(60.0, precision-1);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('deg');

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(-60.0, precision-1);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('deg');

});


test('Test real function', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{real}\left(1\left[cc\right]+2\left[ml\right]\cdot i\right)=\left[ml\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{real}\left(3+2\cdot i\right)=`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{real}\left(3\left[cc\right]+2\cdot i\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 500});

  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1, precision);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('ml');

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

});


test('Test imag function', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{imag}\left(1\left[cc\right]+2\left[ml\right]\cdot i\right)=\left[ml\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{imag}\left(3+2\cdot i\right)=`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{imag}\left(3+2\left[cc\right]\cdot i\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 500});

  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('ml');

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

});


test('Test conj function', async ({ page }) => {

  page.setLatex = async function (cellIndex, latex, subIndex) {
    await this.evaluate(([cellIndex, latex, subIndex]) => window.setCellLatex(cellIndex, latex, subIndex), 
                        [cellIndex, latex, subIndex]);
  }

  await page.goto('/');

  await page.waitForSelector("div.bx--modal-container");
  await page.keyboard.press('Escape');
  await page.click('#new-sheet');

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{conj}\left(-1\left[cc\right]+2\left[ml\right]\cdot i\right)=\left[l\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{conj}\left(3-2\cdot i\right)=`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{conj}\left(3\left[cc\right]+2\cdot i\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached', timeout: 100000});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 500});

  let content = complex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(-.001, precision);
  expect(content.im).toBeCloseTo(-.002, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('l');

  content = complex(await page.textContent('#result-value-1'));
  expect(content.re).toBeCloseTo(3, precision);
  expect(content.im).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

});