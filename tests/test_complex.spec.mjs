import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, complexLatex, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Imaginary numbers without units', async () => {

  // test complex numbers
  await page.type(':nth-match(math-field.editable, 1)', '2*sqrt-1');
  await page.press(':nth-match(math-field.editable, 1)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 1)', '=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 2)', '3+i^2');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 3)', '2+3*i=');

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = complexLatex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(0, precision);
  expect(content.im).toBeCloseTo(2, precision);

  content = complexLatex(await page.textContent('#result-value-1'));
  expect(content.re).toBeCloseTo(2, precision);
  expect(content.im).toBeCloseTo(0, precision);

  content = complexLatex(await page.textContent('#result-value-2'));
  expect(content.re).toBeCloseTo(2, precision);
  expect(content.im).toBeCloseTo(3, precision);

});


test('Imaginary number regression test for #69', async () => {

  await page.locator('math-field.editable').nth(0).type('test=1+i');
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`i^{2}\cdot test=`);


  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe('-1 - i');  

});


test('Test imaginary number unit conversions', async () => {

  await page.setLatex(0, String.raw`1\left[inch\right]-2\left[inch\right]\cdot i=\left[cm\right]`);
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\left(60+30\cdot i\right)\cdot 1\left[sec\right]=\left[min\right]`);
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`1000\left[J\right]\cdot i=\left[kJ\right]`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = complexLatex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(2.54, precision);
  expect(content.im).toBeCloseTo(-5.08, precision);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('cm');

  content = complexLatex(await page.textContent('#result-value-1'));
  expect(content.re).toBeCloseTo(1, precision);
  expect(content.im).toBeCloseTo(0.5, precision);  
  content = await page.textContent('#result-units-1');
  expect(content).toBe('min');

  content = complexLatex(await page.textContent('#result-value-2'));
  expect(content.re).toBeCloseTo(0.0, precision);
  expect(content.im).toBeCloseTo(1.0, precision);  
  content = await page.textContent('#result-units-2');
  expect(content).toBe('kJ');

  // make sure unit inconsistencies cause error
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`1\left[in\right]+i=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});
  await page.locator('#cell-3 >> text=Dimension Error').waitFor({state: 'attached', timeout: 1000});


  await page.setLatex(3, String.raw`1+i\cdot 1\left[inch\right]=`);
  await page.waitForSelector('.status-footer', {state: 'detached'});
  await page.locator('#cell-3 >> text=Dimension Error').waitFor({state: 'attached', timeout: 1000});
  

  await page.setLatex(3, String.raw`1\left[inch\right]+i\cdot 1\left[inch\right]=\left[min\right]`);
  await page.waitForSelector('.status-footer', {state: 'detached'});
  await page.locator('#cell-3 >> text=Units Mismatch').waitFor({state: 'attached', timeout: 1000});

});


test('Test angle function', async () => {

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{angle}\left(1\left[inch\right]+\sqrt{3}\cdot 1\left[inch\right]\cdot i\right)=\left[deg\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{angle}\left(1-\sqrt{3}\cdot 1\cdot i\right)=\left[deg\right]`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{angle}\left(1-\sqrt{3}\cdot 1\left[inch\right]\cdot i\right)=\left[deg\right]`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 1000});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(60.0, precision-1);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('deg');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(-60.0, precision-1);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('deg');

});


test('Test real function', async () => {

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{real}\left(1\left[cc\right]+2\left[ml\right]\cdot i\right)=\left[ml\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{real}\left(3+2\cdot i\right)=`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{real}\left(3\left[cc\right]+2\cdot i\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 1000});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('ml');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

});


test('Test imag function', async () => {

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{imag}\left(1\left[cc\right]+2\left[ml\right]\cdot i\right)=\left[ml\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{imag}\left(3+2\cdot i\right)=`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{imag}\left(3+2\left[cc\right]\cdot i\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 1000});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);  
  content = await page.textContent('#result-units-0');
  expect(content).toBe('ml');

  content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

});


test('Test conj function', async () => {

  // angle function
  // with units
  await page.setLatex(0, String.raw`\mathrm{conj}\left(-1\left[cc\right]+2\left[ml\right]\cdot i\right)=\left[l\right]`);
  
  // without units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\mathrm{conj}\left(3-2\cdot i\right)=`);

  // inconsistent units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\mathrm{conj}\left(3\left[cc\right]+2\cdot i\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  // make sure inconsistent units generates error
  await page.locator('#cell-2 >> text=Dimension Error').waitFor({state: "attached", timeout: 1000});

  let content = complexLatex(await page.textContent('#result-value-0'));
  expect(content.re).toBeCloseTo(-.001, precision);
  expect(content.im).toBeCloseTo(-.002, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('l');

  content = complexLatex(await page.textContent('#result-value-1'));
  expect(content.re).toBeCloseTo(3, precision);
  expect(content.im).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('');

});


test('Test abs function with imaginary numbers and units', async () => {

  // define 2 complex impedance values with units
  await page.setLatex(0, String.raw`Z_{1}=\frac{1}{i\cdot 1e10\left[\frac{1}{sec}\right]\cdot 1\left[F\right]}`);
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`Z_{2}=i\cdot 1e10\left[\frac{1}{sec}\right]\cdot 1\left[henry\right]`);

  // query the abs of a complex expression with units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`\left|\frac{Z_{2}}{Z_{1}+Z_{2}}\right|=`);

  // test case with only imaginary component and units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`\left|-1\left[inches\right]\cdot i\right|=\left[cm\right]`);  

  // test case with both imaginary and real part and units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(4, String.raw`\left|-3\left[inch\right]+4\left[inch\right]\cdot i\right|=\left[inch\right]`);

  // test case with both imaginary and real part and units
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(5, String.raw`\left|3+4\left[inch\right]\cdot i\right|=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('');

  content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(2.54, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('cm');

  content = await page.textContent('#result-value-4');
  expect(parseLatexFloat(content)).toBeCloseTo(5, precision);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('inch');

  // make sure inconsistent units case generates correct error message
  await page.locator('#cell-5 >> text=Dimension Error').waitFor({state: "attached", timeout: 1000});

});